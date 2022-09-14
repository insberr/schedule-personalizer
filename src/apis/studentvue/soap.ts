/* eslint-disable @typescript-eslint/no-explicit-any */
// oh god
// shh dont touch

import * as config from '../../config/settings';
import { xml2js } from 'xml-js';

const url = config.studentvueAPIEndpoint;
export async function doOperation(username: string, password: string, methodName: string, args: Record<string, any>): Promise<any> {
    let paramStr = '&lt;Parms&gt;';
    Object.entries(args).forEach(([key, value]) => {
        paramStr += '&lt;' + key + '&gt;';
        paramStr += value;
        paramStr += '&lt;/' + key + '&gt;';
    });
    paramStr += '&lt;/Parms&gt;';
    const resp = await fetch(url,{
        method: 'POST',
        headers: {
            'Content-Type': 'text/xml; charset=utf-8',
            SOAPAction: "http://edupoint.com/webservices/ProcessWebServiceRequest"
        },
        body: '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"  xmlns:tns="http://edupoint.com/webservices/" xmlns:tm="http://microsoft.com/wsdl/mime/textMatching/"><soap:Body><ProcessWebServiceRequest xmlns="http://edupoint.com/webservices/"><userID>'+username+'</userID><password>'+password+'</password><skipLoginLog>1</skipLoginLog><parent>0</parent><webServiceHandleName>PXPWebServices</webServiceHandleName><methodName>'+methodName+'</methodName><paramStr>'+paramStr+'</paramStr></ProcessWebServiceRequest></soap:Body></soap:Envelope>'
    })
    const rawxml = await resp.text()
    const rbody: any = xml2js(rawxml, {compact: true })
    const body = rbody["soap:Envelope"]["soap:Body"]["ProcessWebServiceRequestResponse"]["ProcessWebServiceRequestResult"]["_text"]
    const rbody2: any = xml2js(body, { compact: true })
    return fixThatDamnXML(rbody2)
}

function fixThatDamnXML(xml: any): any {
    const thisObj: Record<any, any> = {}
    Object.keys(xml).forEach((key: any) => {
        const obj = xml[key]
        if (Array.isArray(obj)) {
            thisObj[key] = obj.map((o: any) => fixThatDamnXML({ tmp: o }).tmp)
        } else if (obj._text) {
            thisObj[key] = obj._text
        } else if (obj._attributes) {
            thisObj[key] = Object.assign(fixThatDamnXML(obj),obj._attributes)
            delete thisObj[key]._attributes
        } else if (typeof obj == "object") {
            thisObj[key] = fixThatDamnXML(obj)
        }
        else {
            thisObj[key] = obj
        }

    })
    //console.log(JSON.stringify(thisObj, null, 2))
    return thisObj
}