import {isSameDay as $iyewM$isSameDay, parse as $iyewM$parse, getHours as $iyewM$getHours, getMinutes as $iyewM$getMinutes, getSeconds as $iyewM$getSeconds, isAfter as $iyewM$isAfter, isBefore as $iyewM$isBefore} from "date-fns";
import $iyewM$immer from "immer";
import $iyewM$ungapstructuredclone from "@ungap/structured-clone";
import "fs";
import {generate as $iyewM$generate} from "peggy";

function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
//import { inspect } from "util";

function $54da6e53a22882a8$export$78a28e85343c8674(s) {
    return s.statement !== undefined;
}
function $54da6e53a22882a8$export$71aa6c912b956294(context, item) {
    const dt = context[item];
    if (dt != undefined) return dt;
    else {
        if (context.parent) return $54da6e53a22882a8$export$71aa6c912b956294(context.parent, item);
        else //throw new Error("Unable to find item "+item+" in context.")
        return undefined;
    }
}
function $54da6e53a22882a8$export$400db5518da0c173(src, dest) {
    Object.keys(src).forEach((element)=>{
        dest[element] = src[element];
    });
}
function $54da6e53a22882a8$export$37717b9d00306a42(range) {
    //console.log(based)
    //console.log(based)
    const [start, end] = range.split(" to "); // ok
    //console.log(start,end)
    const startp = (0, $iyewM$parse)(start, "H:mm", new Date());
    const endp = (0, $iyewM$parse)(end, "H:mm", new Date());
    //console.log(startp, endp)
    return {
        start: $54da6e53a22882a8$export$ea30f9d033bcdbca(startp),
        end: $54da6e53a22882a8$export$ea30f9d033bcdbca(endp)
    };
}
function $54da6e53a22882a8$export$ea30f9d033bcdbca(time) {
    return {
        h: (0, $iyewM$getHours)(time),
        m: (0, $iyewM$getMinutes)(time),
        s: (0, $iyewM$getSeconds)(time)
    };
}
function $54da6e53a22882a8$export$7b424ff55bf4aeae(start, end) {
    const arr = [];
    for(let dt = new Date(start); dt <= new Date(end); dt.setDate(dt.getDate() + 1))arr.push(new Date(dt));
    return arr;
}
function $54da6e53a22882a8$export$c0dc94da39b7f40d(b, cb, parent) {
    if (Array.isArray(b)) b.forEach((e)=>$54da6e53a22882a8$export$c0dc94da39b7f40d(e, cb, parent));
    else {
        cb(b, parent);
        b.args.forEach((c)=>{
            if (c.type == "block") $54da6e53a22882a8$export$c0dc94da39b7f40d(c.data, cb, b);
        });
    }
}
function $54da6e53a22882a8$export$2beb1e16bd100e3d(m) {
    const ptyper = m.split(" ");
    let num = null;
    let type = "period";
    if (ptyper.length == 1) {
        const isNum = /^\d+$/.test(ptyper[0]);
        if (isNum) num = parseInt(ptyper[0]);
        else type = ptyper[0];
    } else {
        const [rtype, rnum] = ptyper;
        num = parseInt(rnum);
        type = rtype;
    }
    return {
        num: num,
        type: type
    };
}





const $933af8b9d3f1e499$export$df566d397d9dca37 = new Map().set("schedule", (args, c)=>{
    if (c.statement) {
        //console.log(c.statement)
        if (c.statement == "event") {
            const schedules = (0, $54da6e53a22882a8$export$71aa6c912b956294)(c, "schedules");
            if (!schedules) throw new Error("unable to find schedules");
            const sch = schedules[args[0]];
            if (!sch) throw new Error("Cannot find schedule " + args[0]);
            c.schedule = args[0];
        } else {
            c.schedule = args;
            return;
        }
    } else {
        // define top level schedule
        c.schedules = c.schedules || {};
        const name = args.shift();
        const data = args.pop();
        c.schedules[name] = data;
    }
}).set("class", (args, c)=>{
    c.classes = c.classes || [];
    let outc = {};
    const typeM = args[0];
    const timeRange = args[1];
    const ptimerange = (0, $54da6e53a22882a8$export$37717b9d00306a42)(timeRange);
    outc = {
        ...ptimerange
    };
    const { type: type , num: num  } = (0, $54da6e53a22882a8$export$2beb1e16bd100e3d)(typeM);
    outc = {
        ...outc,
        type: type,
        num: num
    };
    c.classes.push(outc);
}).set("event", (args, c)=>{
    c.events = c.events || [];
    c.events.push(args[0]);
}).set("terms", (args, c)=>{
    let t = args[0].terms;
    if (t == undefined) t = [];
    c.terms = t;
    const displayDate = (0, $54da6e53a22882a8$export$71aa6c912b956294)(c, "displayDate") || new Date();
    const newTerm = t.filter((term)=>{
        return ((0, $iyewM$isAfter)(displayDate, term.start) || (0, $iyewM$isSameDay)(displayDate, term.start)) && ((0, $iyewM$isBefore)(displayDate, term.end) || (0, $iyewM$isSameDay)(displayDate, term.end));
    });
    if (newTerm.length == 0) c.term = 0;
    else c.term = newTerm[0].termIndex + 1;
}).set("term", (args, c)=>{
    const termIndex = parseInt(args[0]) - 1;
    const start = new Date(args[1]);
    const end = new Date(args[2]);
    c.terms = c.terms || [];
    c.terms.push({
        termIndex: termIndex,
        start: start,
        end: end
    });
}).set("only", (args, c)=>{
    // only <item> <compare> searches the context for the item "item" and compares it,
    // @TODO allow many types of comparisons
    const [item, compare] = args;
    const toc = (0, $54da6e53a22882a8$export$71aa6c912b956294)(c, item);
    if (toc == undefined) console.warn("Unable to find item", item, "in context, this is probably an issue");
    c.stop = toc?.toString() != compare;
}).set("lunches", (args, c)=>{
    const tech = args[0];
    c.lunches = {};
    tech.teachers.forEach((element)=>{
        c.lunches[element.id] = element.lunch;
    });
    c.teachers = tech.teachers;
}).set("teacher", (args, c)=>{
    const [name, id, _lunch] = args;
    const lunch = parseInt(_lunch);
    c.teachers = c.teachers || [];
    c.teachers.push({
        name: name,
        id: id,
        lunch: lunch
    });
}).set("inherit", (args, c)=>{
    const toHer = args[0];
    const schs = (0, $54da6e53a22882a8$export$71aa6c912b956294)(c, "schedules");
    if (!schs) throw new Error("No schedules in file!");
    const t = schs[toHer];
    if (!t) throw new Error("Schedule " + toHer + " doesnt exist!");
    (0, $54da6e53a22882a8$export$400db5518da0c173)(t, c);
}).set("description", $933af8b9d3f1e499$var$setSimple("description")).set("info", $933af8b9d3f1e499$var$setSimple("info")).set("message", $933af8b9d3f1e499$var$setSimple("message")).set("date", (args, c)=>{
    c.dates = c.dates || [];
    c.dates.push(new Date(args[0]));
}).set("from", (args, c)=>{
    if (c.statement == "event") {
        const from = args[0];
        const tost = args[1];
        if (tost != "to") console.warn("(from) Expected 'to' but got", tost);
        const to = args[2];
        c.dates = c.dates || [];
        c.dates.push(...(0, $54da6e53a22882a8$export$7b424ff55bf4aeae)(new Date(from), new Date(to)));
    } else if (c.statement == "lunchConfig") {
        c.studentLunches = c.studentLunches || {};
        c.studentLunches.basedOn = args[0];
    } else c.from = args;
}).set("set", (args, c)=>{
    const key = args.shift();
    const value = args.shift();
    c[key] = value;
}).set("config", (args, c)=>{
    c.config = c.config || {};
    const key = args.shift();
    const value = args.shift();
    c.config[key] = value;
}).set("comment", $933af8b9d3f1e499$var$empty).set("multicomment", $933af8b9d3f1e499$var$empty).set("import", $933af8b9d3f1e499$var$empty).set("function", $933af8b9d3f1e499$var$empty).set("call", $933af8b9d3f1e499$var$empty).set("lunchConfig", (args, c)=>{
    (0, $54da6e53a22882a8$export$400db5518da0c173)(args[0], c);
}).set("passing", (args, c)=>{
    c.studentLunches = c.studentLunches || {};
    c.studentLunches.passing = args[0];
}).set("lunch", (args, c)=>{
    const [lunchid, durataion] = args;
    c.studentLunches = c.studentLunches || {};
    c.studentLunches.lunches = c.studentLunches.lunches || {};
    c.studentLunches.lunches[lunchid] = (0, $54da6e53a22882a8$export$37717b9d00306a42)(durataion);
}).set("user", (args, c)=>{
    // currently only uses `user classes contains` so thats all im going to support
    const classes = args.shift();
    const contains = args.shift();
    if (classes != "classes" || contains != "contains") throw new Error("Invalid user statement (lmao)");
    const checks = [];
    for (const what of args)checks.push((0, $54da6e53a22882a8$export$2beb1e16bd100e3d)(what));
    // format
    // {
    // "user": {classes: [{type: "period", num: 1}, {type: "period", num: 2}]}
    // }
    // gl hf
    const userinfo = (0, $54da6e53a22882a8$export$71aa6c912b956294)(c, "user");
    if (!userinfo) {
        c.stop = true;
        return;
    }
    userinfo.classes = userinfo.classes || [];
    for (const check of checks){
        const found = userinfo.classes.find((e)=>e.type == check.type && e.num == check.num);
        if (found) {
            c.stop = false;
            return;
        }
    }
    c.stop = true;
}).set("self", (args, c)=>{
    // currently only uses `self classes contains` so thats all im going to support
    const classes = args.shift();
    const contains = args.shift();
    if (classes != "classes" || contains != "contains") throw new Error("Invalid self statement (lmao)");
    const checks = [];
    for (const what of args)checks.push((0, $54da6e53a22882a8$export$2beb1e16bd100e3d)(what));
    // format
    // {
    // "user": {classes: [{type: "period", num: 1}, {type: "period", num: 2}]}
    // }
    // gl hf
    const cls = c.classes;
    if (!cls) {
        c.stop = true;
        return;
    }
    for (const check of checks){
        const found = cls.find((e)=>e.type == check.type && e.num == check.num);
        if (found) {
            c.stop = false;
            return;
        }
    }
    c.stop = true;
}).set("day", (args, c)=>{
    const _start = args.shift();
    let data;
    let _end;
    if (typeof args[0] == "string") {
        const to = args.shift();
        if (to != "to") throw new Error("expected to, got " + to);
        _end = args.shift();
        data = args.shift();
    } else {
        _end = _start;
        data = args.shift();
    }
    const end = parseInt(_end) + 1;
    const start = parseInt(_start);
    const values = Array.from({
        length: end - start
    }, (v, k)=>k + start);
    c.days = c.days || {};
    values.forEach((m)=>{
        c.days[m.toString()] = data;
    });
}).set("events", (args, c)=>{
    const days = args[0].days;
    c.eventOverrides = days;
}).set("remove", (args, c)=>{
    const classes = c.classes;
    if (!classes) return;
    const toRemove = args.map((e)=>(0, $54da6e53a22882a8$export$2beb1e16bd100e3d)(e));
    let lastRemovedIndex = -1;
    c.classes = classes.filter((e, i)=>{
        const found = toRemove.find((f)=>f.type == e.type && f.num == e.num);
        if (found) lastRemovedIndex = i;
        return !found;
    });
    c.lastOP = lastRemovedIndex;
}).set("force", (args, c)=>{
    c.forced = c.forced || {};
    const key = args.shift();
    const value = args.shift();
    c.forced[key] = value;
}).set("replace", (args, c)=>{
    /*replace class [arrival] with {
            class [period 0] [6:30 to 7:30];
        };*/ args.shift(); // class
    const matcher = args.shift();
    args.shift(); // with
    const data = args.shift();
    if (!data.classes) return;
    const classes = c.classes;
    if (!classes) return;
    const toRemove = (0, $54da6e53a22882a8$export$2beb1e16bd100e3d)(matcher);
    const indexOfToReplace = classes.findIndex((e)=>{
        return toRemove.type == e.type && toRemove.num == e.num;
    });
    if (indexOfToReplace == -1) return;
    c.classes.splice(indexOfToReplace, 1, ...data.classes);
    c.lastOP = indexOfToReplace;
}).set("insert", (args, c)=>{
    /*
        insert {
            class [period 11] [$eleven];
            class [period 12] [$twelve];
            class [period 13] [$thirteen];
        } last operation;
        */ const toInsert = args.shift();
    if (!toInsert.classes) return;
    let index = -1;
    //console.log(args)
    if (args.join(" ") == "last operation") index = c.lastOP;
    else {
        args.shift(); // at
        //console.log(args)
        index = parseInt(args[0]);
    }
    const classes = c.classes;
    if (!classes) return;
    if (index == -1) return;
    //console.log(index);
    c.classes.splice(index, 0, ...toInsert.classes);
});
function $933af8b9d3f1e499$var$empty(args, c) {
    c;
}
function $933af8b9d3f1e499$var$setSimple(name) {
    return (args, c)=>{
        c[name] = args.join(" ");
    };
}
const $933af8b9d3f1e499$export$be9b774eeb6e293 = Array.from($933af8b9d3f1e499$export$df566d397d9dca37.keys());




function $192fb86f1f48148c$export$c6b8a85d6a4f3086(data, initcontext, resolver) {
    let context = (0, $iyewM$ungapstructuredclone)(initcontext);
    for (const item of data)if ((0, $54da6e53a22882a8$export$78a28e85343c8674)(item)) {
        if (item.statement == "function") {
            context = (0, $iyewM$immer)(context, (c)=>{
                let args = [];
                if (item.args.length == 3) args = item.args.splice(1, 1)[0].data.split(" ");
                const name = item.args[0].data;
                const body = item.args[1].data;
                c["func_" + name] = {
                    args: args,
                    body: body
                };
            });
            continue;
        } else if (item.statement == "import") {
            const name = item.args[0].data;
            const data1 = resolver(name);
            const parsed = new (0, $cb24f610f487e366$export$a5e2ae43fdd9439f)(data1, resolver);
            context = $192fb86f1f48148c$export$c6b8a85d6a4f3086(parsed.parsed, context, resolver);
            continue;
        }
        const parsedArgs = [];
        item.args.forEach((element)=>{
            if (element.type == "block") {
                const blk = (0, $iyewM$immer)($192fb86f1f48148c$export$c6b8a85d6a4f3086(element.data, {
                    parent: context,
                    statement: item.statement
                }, resolver), (r)=>{
                    delete r.parent;
                    delete r.statement;
                    delete r.stop;
                });
                parsedArgs.push(blk);
            } else {
                if (element.data.startsWith("$")) {
                    const name = element.data.substring(1);
                    const val = (0, $54da6e53a22882a8$export$71aa6c912b956294)(context, name);
                    if (val == undefined) throw new Error(`Variable ${name} not found`);
                    parsedArgs.push(val);
                    return;
                }
                parsedArgs.push(element.data);
            }
        });
        if (item.statement == "call") {
            const tocall = parsedArgs.shift();
            const args = parsedArgs;
            const func = (0, $54da6e53a22882a8$export$71aa6c912b956294)(context, "func_" + tocall);
            if (!func) throw new Error(`Function ${tocall} not found`);
            const argMapping = {};
            args.forEach((arg, i)=>{
                argMapping[func.args[i]] = arg;
            });
            //console.log("calling function "+tocall+" with args "+JSON.stringify(argMapping))
            context = $192fb86f1f48148c$export$c6b8a85d6a4f3086(func.body, {
                ...context,
                ...argMapping
            }, resolver);
            continue;
        }
        //console.log("executing",item.statement,"with", parsedArgs)
        context = $192fb86f1f48148c$var$executeStatement(item.statement, parsedArgs, context);
        if (context.stop) return initcontext;
    } else context = $192fb86f1f48148c$export$c6b8a85d6a4f3086(item, context, resolver);
    return context;
}
function $192fb86f1f48148c$var$executeStatement(statement, args, icontext) {
    const def = (_, c)=>{
        c.unknownCommands = c.unknownCommands || [];
        c.unknownCommands.push(statement);
    };
    return (0, $iyewM$immer)(icontext, (c)=>{
        const exec = (0, $933af8b9d3f1e499$export$df566d397d9dca37).get(statement) || def;
        exec(args, c);
    });
}




//const start = performance.now()
const $88e81ade0398d8f7$var$gened = $iyewM$generate('start = prog:statement* { return prog.filter((p) => p) }\r\nws "whitespace" = [ \\t\\n\\r]*\r\nstatement = ws v:(comment / multilinecomment / block / command / eol ) ws { return v }\r\n\r\ncomment "comment" = "//" d:[^\\n]* "\\n"? { return {statement: "comment", "comment":d.join(\'\'), "args": [],  location: location() } }\r\nmultilinecomment "multiline comment" = "/*" d:[^*]* "*"+ ([^/*] [^*]* "*"+)* "/" { return {statement: "multicomment", "comment":d.join(\'\'), "args": [],  location: location() } }\r\n\r\n/*\r\nstring "string"\r\n  = quotation_mark chars:char* quotation_mark { return chars.join(""); }\r\n*/\r\ncharD\r\n  = unescapedDouble\r\n  / escape\r\n    sequence:(\r\n        \'"\'\r\n      / "\'"\r\n      / "\\\\"\r\n      / "/"\r\n      / "b" { return "\\b"; }\r\n      / "f" { return "\\f"; }\r\n      / "n" { return "\\n"; }\r\n      / "r" { return "\\r"; }\r\n      / "t" { return "\\t"; }\r\n      / "u" digits:$(HEXDIG HEXDIG HEXDIG HEXDIG) {\r\n          return String.fromCharCode(parseInt(digits, 16));\r\n        }\r\n    )\r\n    { return sequence; }\r\n\r\ncharS\r\n  = unescapedSingle\r\n  / escape\r\n    sequence:(\r\n        "\'"\r\n      / "\\""\r\n      / "\\\\"\r\n      / "/"\r\n      / "b" { return "\\b"; }\r\n      / "f" { return "\\f"; }\r\n      / "n" { return "\\n"; }\r\n      / "r" { return "\\r"; }\r\n      / "t" { return "\\t"; }\r\n      / "u" digits:$(HEXDIG HEXDIG HEXDIG HEXDIG) {\r\n          return String.fromCharCode(parseInt(digits, 16));\r\n        }\r\n    )\r\n    { return sequence; }\r\n\r\nescape\r\n  = "\\\\"\r\n\r\nunescapedDouble\r\n  = [^\\0-\\x1F\\x22\\x5C]\r\nunescapedSingle\r\n  = [^\\0-\\x1F\\x27\\x5C]\r\n\r\nDIGIT  = [0-9]\r\nHEXDIG = [0-9a-f]i\r\n\r\ntext "text" = [0-9a-z:()\\-$]i+ { return text() } // add the rest of the symbols?\r\nbracketed "bracketed text" = "[" j:[0-9a-z$\\-, :]i+ "]" { return j.join("") }\r\neol "semicolon" = ";" {return null}\r\n\r\nquotedargDouble "double quoted text" = "\\"" d:charD* "\\"" { return d.join("") }\r\nquotedargSingle "single quoted text" = "\'" d:charS* "\'" { return d.join("") }\r\n\r\nblock "block" = "{" "\\n"? state:statement+ "\\n"? "}" { return state.filter(s => s) }\r\n\r\narg "argument" = (o:block { return { type: "block", data: o } }) / (o:(quotedargDouble/quotedargSingle) { return {type: "quote", data: o } }) / (o:text { return {type: "text", data: o } }) / (o:bracketed { return {type: "bracket", data: o } })\r\ncommand "command" = statement:text args:(ws arg)* eol [ ]* com:comment? { return {statement, args:args.map(r => r[1]), comment:com,  location: location()} }\r\n', {
    output: "parser",
    cache: true
});
const $88e81ade0398d8f7$export$98e6a39c04603d36 = $88e81ade0398d8f7$var$gened.parse; //export const parseTime = end - start;


var $81c1b644006d48ec$exports = {};

$parcel$export($81c1b644006d48ec$exports, "LintLevel", () => $81c1b644006d48ec$export$6e5c879485b013ad);
// add types here
let $81c1b644006d48ec$export$6e5c879485b013ad;
(function(LintLevel) {
    LintLevel[LintLevel["info"] = 0] = "info";
    LintLevel[LintLevel["warn"] = 1] = "warn";
    LintLevel[LintLevel["error"] = 2] = "error";
})($81c1b644006d48ec$export$6e5c879485b013ad || ($81c1b644006d48ec$export$6e5c879485b013ad = {}));






function $472b49552010b40e$var$combine(checks) {
    return (statement, parent)=>{
        for (const check of checks){
            const err = check(statement, parent);
            if (err) return err;
        }
    };
}
function $472b49552010b40e$var$anyof(t) {
    for (const item of t){
        if (!item) return false;
    }
    return true;
}
function $472b49552010b40e$var$varArgsofType(type, start) {
    return (statement, parent)=>{
        const argstocheck = statement.args.slice(start);
        for (const item of argstocheck){
            if (item.type != type) return {
                message: "All varargs of statement " + statement.statement + " must be of type " + $472b49552010b40e$var$formatType(type) + " not " + $472b49552010b40e$var$formatType(item.type),
                level: (0, $81c1b644006d48ec$export$6e5c879485b013ad).error
            };
        }
    };
}
function $472b49552010b40e$var$mustEqual(index, arg, value) {
    return (statement, parent)=>{
        if (statement.args[index].type == arg && statement.args[index].data != value) return {
            message: `Argument ${index} of ${statement.statement} must be ${value}, not ${statement.args[index].data}`,
            level: (0, $81c1b644006d48ec$export$6e5c879485b013ad).error
        };
    };
}
function $472b49552010b40e$var$parenting(parents) {
    return (statement, parent)=>{
        let parentStatement;
        if (!parent) parentStatement = "root";
        else parentStatement = parent.statement;
        if (!Object.keys(parents).includes(parentStatement)) return {
            message: `Statement ${statement.statement} must be inside ${Object.keys(parents).join(", ")}, not ${parentStatement}`,
            level: (0, $81c1b644006d48ec$export$6e5c879485b013ad).error
        };
        else return parents[parentStatement](statement, parent);
    };
}
function $472b49552010b40e$var$simple(args) {
    return $472b49552010b40e$var$combine([
        $472b49552010b40e$var$hasAmtOfArgs(args.length),
        ...args.map((n, i)=>$472b49552010b40e$var$argumentOfType(i, n))
    ]);
}
function $472b49552010b40e$var$formatType(t) {
    return ({
        text: "text",
        block: "block",
        quote: "quoted string",
        bracket: "bracketed string"
    })[t] || t;
}
function $472b49552010b40e$var$argumentOfType(argumentIndex, type) {
    const ot = typeof type == "string" ? [
        type
    ] : type;
    return (statement, parent)=>{
        if (!ot.includes(statement.args[argumentIndex].type)) return {
            level: (0, $81c1b644006d48ec$export$6e5c879485b013ad).error,
            message: `Argument ${argumentIndex} of ${statement.statement} must be any of (${ot.map((t)=>$472b49552010b40e$var$formatType(t)).join(", ")}), not a ${$472b49552010b40e$var$formatType(statement.args[argumentIndex].type)}`
        };
    };
}
function $472b49552010b40e$var$hasAmtOfArgs(amt) {
    return (statement, parent)=>{
        if (statement.args.length != amt) return {
            message: `Statement ${statement.statement} must have ${amt} arguments, not ${statement.args.length}`,
            level: (0, $81c1b644006d48ec$export$6e5c879485b013ad).error
        };
    };
}
const $472b49552010b40e$export$efdd3424cb70c6f2 = new Map().set("schedule", $472b49552010b40e$var$parenting({
    root: $472b49552010b40e$var$simple([
        "text",
        "block"
    ]),
    event: $472b49552010b40e$var$simple([
        "text"
    ])
})).set("term", $472b49552010b40e$var$parenting({
    terms: $472b49552010b40e$var$simple([
        "text",
        "bracket",
        "bracket"
    ])
})).set("info", $472b49552010b40e$var$parenting({
    event: $472b49552010b40e$var$simple([
        "quote"
    ])
})).set("description", $472b49552010b40e$var$parenting({
    schedule: $472b49552010b40e$var$simple([
        "quote"
    ])
})).set("root", ()=>{
    return {
        message: "reserved statement: root",
        level: (0, $81c1b644006d48ec$export$6e5c879485b013ad).error
    };
}).set("call", (s, p)=>{
    if (s.args.length == 0) return {
        message: "Statement call requires 1+ arguments",
        level: (0, $81c1b644006d48ec$export$6e5c879485b013ad).error
    };
}).set("comment", $472b49552010b40e$var$simple([])).set("multicomment", $472b49552010b40e$var$simple([])).set("function", (s, p)=>{
    if (s.args.length < 2 || s.args.length > 3) return {
        message: "Statement call requires 2-3 arguments",
        level: (0, $81c1b644006d48ec$export$6e5c879485b013ad).error
    };
    if (s.args.length == 2) return $472b49552010b40e$var$simple([
        "text",
        "block"
    ])(s, p);
    else return $472b49552010b40e$var$simple([
        "text",
        "bracket",
        "block"
    ])(s, p);
}).set("class", $472b49552010b40e$var$simple([
    "bracket",
    "bracket"
])).set("terms", $472b49552010b40e$var$simple([
    "block"
])).set("lunches", $472b49552010b40e$var$simple([
    "block"
])).set("only", $472b49552010b40e$var$simple([
    "text",
    "text"
])).set("teacher", $472b49552010b40e$var$simple([
    "bracket",
    "text",
    "text"
])).set("set", $472b49552010b40e$var$simple([
    "text",
    "text"
])).set("config", $472b49552010b40e$var$simple([
    "text",
    "text"
])).set("message", $472b49552010b40e$var$simple([
    "quote"
])).set("user", $472b49552010b40e$var$combine([
    $472b49552010b40e$var$mustEqual(0, "text", "classes"),
    $472b49552010b40e$var$mustEqual(1, "text", "contains"),
    $472b49552010b40e$var$varArgsofType("bracket", 2)
])).set("self", $472b49552010b40e$var$combine([
    $472b49552010b40e$var$mustEqual(0, "text", "classes"),
    $472b49552010b40e$var$mustEqual(1, "text", "contains"),
    $472b49552010b40e$var$varArgsofType("bracket", 2)
])).set("event", $472b49552010b40e$var$simple([
    "block"
])).set("inherit", $472b49552010b40e$var$simple([
    "text"
])).set("date", $472b49552010b40e$var$simple([
    "bracket"
])).set("lunchConfig", $472b49552010b40e$var$simple([
    "block"
])).set("passing", $472b49552010b40e$var$simple([
    "bracket"
])).set("lunch", $472b49552010b40e$var$simple([
    "bracket",
    "bracket"
])).set("from", $472b49552010b40e$var$parenting({
    lunchConfig: $472b49552010b40e$var$simple([
        "bracket"
    ]),
    event: $472b49552010b40e$var$simple([
        "bracket",
        "text",
        "bracket"
    ])
})).set("import", $472b49552010b40e$var$simple([
    "quote"
])).set("events", $472b49552010b40e$var$simple([
    "block"
])).set("day", (s, p)=>{
    switch(s.args.length){
        case 2:
            return $472b49552010b40e$var$combine([
                $472b49552010b40e$var$argumentOfType(0, "bracket"),
                $472b49552010b40e$var$argumentOfType(1, "block")
            ])(s, p);
        case 4:
            return $472b49552010b40e$var$combine([
                $472b49552010b40e$var$argumentOfType(0, "bracket"),
                $472b49552010b40e$var$mustEqual(1, "text", "to"),
                $472b49552010b40e$var$argumentOfType(2, "bracket"),
                $472b49552010b40e$var$argumentOfType(3, "block")
            ])(s, p);
        default:
            return {
                message: "Statement day requires 2 or 4 arguments",
                level: (0, $81c1b644006d48ec$export$6e5c879485b013ad).error
            };
    }
}).set("remove", $472b49552010b40e$var$varArgsofType("bracket", 0)).set("force", $472b49552010b40e$var$simple([
    "text",
    "text"
])).set("replace", $472b49552010b40e$var$combine([
    $472b49552010b40e$var$mustEqual(0, "text", "class"),
    $472b49552010b40e$var$argumentOfType(1, "bracket"),
    $472b49552010b40e$var$mustEqual(2, "text", "with"),
    $472b49552010b40e$var$argumentOfType(3, "block")
])).set("insert", $472b49552010b40e$var$simple([
    "block",
    "text",
    "text"
]));







class $041911773bccd167$export$b43a5ce8debc1184 {
    files = {};
    add(name, data) {
        this.files[name] = data;
    }
    addAsync(files, fetcher) {
        return Promise.all(Object.keys(files).map(async (f)=>{
            this.add(f, await fetcher(files[f]));
        }));
    }
    scheduleFor(filename, date, context) {
        // @todo pls add type
        // this function should do way more processing, ie including lunch info
        const file = this.files[filename];
        if (!file) throw new Error(`File ${filename} not found`);
        const parsed = new (0, $cb24f610f487e366$export$a5e2ae43fdd9439f)(file, this.resolve.bind(this));
        return parsed.scheduleFor(date, context);
    }
    exec(filename, context) {
        const file = this.files[filename];
        if (!file) throw new Error(`File ${filename} not found`);
        const parsed = new (0, $cb24f610f487e366$export$a5e2ae43fdd9439f)(file, this.resolve.bind(this));
        return parsed.exec(context);
    }
    resolve(filename) {
        const data = this.files[filename];
        if (!data) throw new Error(`File ${filename} not found`);
        return data;
    }
    bundle(filename) {
        const file = this.files[filename];
        if (!file) throw new Error(`File ${filename} not found`);
        const parsed = new (0, $cb24f610f487e366$export$a5e2ae43fdd9439f)(file, this.resolve.bind(this));
        return parsed.bundle();
    }
}


function $cb24f610f487e366$var$quoteEscape(str) {
    let newStr = str;
    newStr = newStr.replace(/"/g, '\\"');
    newStr = newStr.replace(/'/g, "\\'");
    return newStr;
}
function $cb24f610f487e366$var$stringArgToString(str) {
    return `'${$cb24f610f487e366$var$quoteEscape(str)}'`;
}
class $cb24f610f487e366$export$a5e2ae43fdd9439f {
    //parsedwithComments: Block
    constructor(data, resolver){
        this.parsed = (0, $88e81ade0398d8f7$export$98e6a39c04603d36)(data);
        this.resolver = resolver || ((name)=>{
            throw new Error("Cannot resolve without a resolver. - Name: " + name);
        });
    //this.parsedwithComments = this.parsed;
    }
    scheduleFor(date, context) {
        // @todo pls add type
        // this function should do way more processing, ie including lunch info
        // also adding default schedules
        const execed = this.exec({
            displayDate: date,
            ...context
        });
        for (const _element of execed.events){
            const element = _element;
            if (!element.dates) continue;
            if (element.dates.find((e)=>(0, $iyewM$isSameDay)(e, date))) return {
                schedule: execed.schedules[element.schedule],
                event: element
            };
        }
    }
    minify(options) {
        // TODO: finish options
        let out = "";
        function minifyStatement(statement) {
            let out = "";
            if ((0, $54da6e53a22882a8$export$78a28e85343c8674)(statement)) {
                // statement
                let args = " " + statement.args.map((arg)=>{
                    if (arg.type == "block") return minifyStatement(arg.data).trim();
                    else if (arg.type == "quote") return $cb24f610f487e366$var$stringArgToString(arg.data);
                    else if (arg.type == "text") return arg.data;
                    else if (arg.type == "bracket") return "[" + arg.data + "]";
                }).join(" ");
                if (statement.args.length == 0) args = "";
                if (statement.statement === "comment") {
                    if (options?.keepSingleLineComments) // The extra space at the start and end is important
                    out += ` /* [single] ${statement.comment} */ `;
                    return out;
                } else if (statement.statement === "multicomment") {
                    // TODO add uncompress multi line comments
                    if (options?.keepMultiLineComments) out += ` /* ${statement.comment.replace(/\n/gm, "")} */ `;
                    return out;
                }
                out += statement.statement + args;
                out += ";";
            } else // block
            return "{" + statement.map(minifyStatement).join("") + "}";
            return out;
        }
        for (const statement of this.parsed)out += minifyStatement(statement);
        return out;
    }
    lint() {
        const objs = [];
        (0, $54da6e53a22882a8$export$c0dc94da39b7f40d)(this.parsed, (statement, parent)=>{
            if (statement.statement === "comment" || statement.statement === "multicomment") return;
            const e = (0, $472b49552010b40e$export$efdd3424cb70c6f2).get(statement.statement);
            if (!e) {
                if ((0, $933af8b9d3f1e499$export$df566d397d9dca37).get(statement.statement)) objs.push({
                    level: (0, $81c1b644006d48ec$export$6e5c879485b013ad).info,
                    message: `No checker for statement: ${statement.statement}`,
                    location: statement.location
                });
                else objs.push({
                    level: (0, $81c1b644006d48ec$export$6e5c879485b013ad).error,
                    message: `Unknown statement: ${statement.statement}`,
                    location: statement.location
                });
            } else {
                const ret = e(statement, parent);
                if (ret) objs.push({
                    ...ret,
                    location: statement.location
                });
            }
        });
        return objs;
    }
    pretty() {
        let deep = 0;
        let out = "";
        function doPretty(statement) {
            let o = "";
            const indent = " ".repeat(deep * 4);
            if ((0, $54da6e53a22882a8$export$78a28e85343c8674)(statement)) {
                // statement
                let args = "";
                if (statement.args.length > 0) args = " " + statement.args.map((arg)=>{
                    if (arg.type == "block") return doPretty(arg.data).trim();
                    else if (arg.type == "quote") return $cb24f610f487e366$var$stringArgToString(arg.data);
                    else if (arg.type == "text") return arg.data;
                    else if (arg.type == "bracket") return "[" + arg.data + "]";
                }).join(" ");
                if (statement.statement == "comment") o += indent + "//" + statement.comment + "\n";
                else if (statement.statement == "multicomment") o += indent + "/*\n" + statement.comment.trimStart().replace(/^/, "\n" + indent).replace("\n", indent) + "*/\n";
                else {
                    o += indent + statement.statement + args;
                    let endNewLine = "\n";
                    if (o.endsWith("}")) {
                        o += ";";
                        endNewLine = "\n\n";
                    } else {
                        o += ";";
                        endNewLine = "\n";
                    }
                    if (statement.comment) o += " //" + statement.comment.comment;
                    o += endNewLine;
                }
            } else {
                // block
                o += indent + "{\n";
                deep++;
                for (const statemen of statement)o += doPretty(statemen);
                deep--;
                o += indent + "}\n";
            }
            return o;
        }
        for (const statement of this.parsed){
            let newLine = "\n";
            if (statement.statement !== undefined) {
                if (statement.statement === "comment" || statement.statement === "multicomment") newLine = "";
            }
            out += newLine + doPretty(statement);
        }
        out = out.trimStart();
        // figure out how to just not make the extra new lines lol
        const extraNewlines = out.match(/\n{3}/gm);
        if (extraNewlines) for (const newline of extraNewlines){
            // get position of newlines
            const pos = out.indexOf(newline);
            // replace the newlines with one newline
            out = out.slice(0, pos) + "\n\n" + out.slice(pos + newline.length);
        }
        return out;
    }
    exec(initalContext) {
        const ret = (0, $192fb86f1f48148c$export$c6b8a85d6a4f3086)(this.parsed, initalContext || {}, this.resolver);
        // transform the context into the right data format here
        // fuck you
        const newret = {};
        for(const key in ret){
            if (key.startsWith("func_")) continue;
            newret[key] = ret[key];
        }
        return newret;
    }
    bundle() {
        const e = (0, $iyewM$immer)(this.parsed, (p)=>{
            const dofunny = (b, parent)=>{
                if (Array.isArray(b)) b.forEach((e, i)=>{
                    if (e.statement == "import") {
                        const impst = e;
                        const toimp = impst.args[0].data;
                        const imp = this.resolver(toimp);
                        const parsed = new $cb24f610f487e366$export$a5e2ae43fdd9439f(imp, this.resolver);
                        const bundledDep = parsed.bundle();
                        const newBlock = (0, $88e81ade0398d8f7$export$98e6a39c04603d36)(bundledDep);
                        newBlock.unshift({
                            statement: "comment",
                            args: [],
                            comment: " *" + toimp + "*",
                            location: {
                                start: {
                                    offset: 0,
                                    line: 0,
                                    column: 0
                                },
                                end: {
                                    offset: 0,
                                    line: 0,
                                    column: 0
                                }
                            }
                        });
                        b[i] = newBlock;
                        return;
                    }
                    dofunny(e, parent);
                });
                else b.args.forEach((c)=>{
                    if (c.type == "block") dofunny(c.data, b);
                });
            };
            dofunny(p);
        });
        const n = new $cb24f610f487e366$export$a5e2ae43fdd9439f("e;");
        n.parsed = e;
        return n.pretty();
    }
}


export {$cb24f610f487e366$export$a5e2ae43fdd9439f as SCS, $933af8b9d3f1e499$export$be9b774eeb6e293 as _statements, $472b49552010b40e$export$efdd3424cb70c6f2 as _checkers, $041911773bccd167$export$b43a5ce8debc1184 as SCSFS, $81c1b644006d48ec$export$6e5c879485b013ad as LintLevel};
//# sourceMappingURL=scs.mjs.map
