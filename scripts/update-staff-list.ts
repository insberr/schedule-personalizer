import { existsSync } from 'fs';
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
const configURL = '/config/master.json5';
import fetch from 'node-fetch';
import { xml2js } from 'xml-js';
import { titleCase } from 'title-case';
import produce from 'immer';
async function doOperation({
    url,
    username,
    password,
    method,
    args,
}: {
    url: string;
    username: string;
    password: string;
    method: string;
    args: Record<string, any>;
}): Promise<any> {
    let paramStr = '&lt;Parms&gt;';
    Object.entries(args).forEach(([key, value]) => {
        paramStr += '&lt;' + key + '&gt;';
        paramStr += value;
        paramStr += '&lt;/' + key + '&gt;';
    });
    paramStr += '&lt;/Parms&gt;';
    let murl = 'https://' + url + '/Service/PXPCommunication.asmx';
    const resp = await fetch(murl, {
        method: 'POST',
        headers: {
            'Content-Type': 'text/xml; charset=utf-8',
            SOAPAction:
                'http://edupoint.com/webservices/ProcessWebServiceRequest',
        },
        body:
            '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"  xmlns:tns="http://edupoint.com/webservices/" xmlns:tm="http://microsoft.com/wsdl/mime/textMatching/"><soap:Body><ProcessWebServiceRequest xmlns="http://edupoint.com/webservices/"><userID>' +
            username +
            '</userID><password>' +
            password +
            '</password><skipLoginLog>1</skipLoginLog><parent>0</parent><webServiceHandleName>PXPWebServices</webServiceHandleName><methodName>' +
            method +
            '</methodName><paramStr>' +
            paramStr +
            '</paramStr></ProcessWebServiceRequest></soap:Body></soap:Envelope>',
    });
    const rawxml = await resp.text();
    const rbody: any = xml2js(rawxml, { compact: true });
    const body =
        rbody['soap:Envelope']['soap:Body']['ProcessWebServiceRequestResponse'][
            'ProcessWebServiceRequestResult'
        ]['_text'];
    const rbody2: any = xml2js(body, { compact: true });
    return fixThatDamnXML(rbody2);
}

function fixThatDamnXML(xml: any): any {
    const thisObj: Record<any, any> = {};
    Object.keys(xml).forEach((key: any) => {
        const obj = xml[key];
        if (Array.isArray(obj)) {
            thisObj[key] = obj.map((o: any) => fixThatDamnXML({ tmp: o }).tmp);
        } else if (obj._text) {
            thisObj[key] = obj._text;
        } else if (obj._attributes) {
            thisObj[key] = Object.assign(fixThatDamnXML(obj), obj._attributes);
            delete thisObj[key]._attributes;
        } else if (typeof obj == 'object') {
            thisObj[key] = fixThatDamnXML(obj);
        } else {
            thisObj[key] = obj;
        }
    });
    //console.log(JSON.stringify(thisObj, null, 2))
    return thisObj;
}

export async function StudentSchoolInfo({
    url,
    username,
    password,
}: {
    url: string;
    username: string;
    password: string;
}): Promise<any> {
    return await doOperation({
        url,
        username,
        password,
        method: 'StudentSchoolInfo',
        args: {},
    });
}
import JSON5 from 'json5';
import type { MasterSettings } from '../src/types';
function fs_for(url: string) {
    return new URL(join('..', 'static', url), import.meta.url);
}
function fetch_local(url: string) {
    let fl = fs_for(url);
    console.log('fetch:', url, '->', fl.href);
    if (existsSync(fl)) {
        return Promise.resolve({
            text: () => readFile(fl, 'utf-8'),
        });
    } else {
        throw new Error('File not found: ' + fl);
    }
}

type Staff = {
    Name: string;
    EMail: string;
    Title: string;
    Phone: string;
    Extn: string;
    StaffGU: string;
};

type CoolStaff = {
    name: {
        first: string;
        last: string;
        middle?: string;
    };
    email: string;
    title: string;
    id: string;
};

function capitalizeFirstLetter(string: string) {
    return titleCase(string);
}

let username = process.argv[2];
let password = process.argv[3];
let matcher = /(.+), ([A-Z\-]+)( \w)?\.?/;
async function main() {
    let data = await (await fetch_local(configURL)).text();
    let config = JSON5.parse<MasterSettings>(data);
    let studentvueurl = config.studentVueUrl;
    console.log(
        'Fetching studentvue data from',
        studentvueurl,
        'using:',
        username + ':' + '*'.repeat(password.length)
    );
    let schoolinfo = (
        await StudentSchoolInfo({
            url: studentvueurl,
            username,
            password,
        })
    ).StudentSchoolInfoListing;
    let schoolName = schoolinfo.School;
    //console.log(schoolinfo)
    let staff: Staff[] = schoolinfo.StaffLists.StaffList;
    console.log('Found', staff.length, 'staff members from', schoolName);
    let fixedstafflist: CoolStaff[] = staff.map((s) => {
        // LASTNAME, FIRSTNAME MIDDLEINITIAL.
        let mt = matcher.exec(s.Name);
        if (s.EMail == undefined) {
            console.log(s);
            throw new Error('gamer');
        }
        if (mt == undefined) {
            console.log('Failed to match', s.Name);
            throw new Error('Failed to match');
        }
        let [_, last, first, middle] = mt;
        return {
            name: {
                first: capitalizeFirstLetter(first.toLowerCase()),
                last: capitalizeFirstLetter(last.toLowerCase()),
                middle: middle?.trim().toUpperCase(),
            },
            email: s.EMail,
            title: s.Title,
            id: s.StaffGU,
        };
    });
    //console.log(fixedstafflist)
    let newConfig = produce(config, (draft) => {
        let school = draft.schools.find((s) => s.stvName == schoolName);
        if (school == undefined) {
            throw new Error('School not found in config');
        }
        school.staff = fixedstafflist;
    });
    let fl = fs_for(configURL);
    console.log('Writing new config to', fl.href);
    await writeFile(fl, JSON5.stringify(newConfig, null, 2));
}

main();
