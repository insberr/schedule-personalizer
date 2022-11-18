var $5SJX2$datefns = require("date-fns");
var $5SJX2$immer = require("immer");
var $5SJX2$ungapstructuredclone = require("@ungap/structured-clone");
require("fs");
var $5SJX2$peggy = require("peggy");

function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
function $parcel$exportWildcard(dest, source) {
  Object.keys(source).forEach(function(key) {
    if (key === 'default' || key === '__esModule' || dest.hasOwnProperty(key)) {
      return;
    }

    Object.defineProperty(dest, key, {
      enumerable: true,
      get: function get() {
        return source[key];
      }
    });
  });

  return dest;
}

$parcel$export(module.exports, "SCS", () => $9f7312223c5b9528$export$a5e2ae43fdd9439f);
$parcel$export(module.exports, "_statements", () => $61558216baa3c504$export$be9b774eeb6e293);
$parcel$export(module.exports, "_checkers", () => $f01796f3bf0333f6$export$efdd3424cb70c6f2);
$parcel$export(module.exports, "SCSFS", () => $b157dd72099cfdda$export$b43a5ce8debc1184);
//import { inspect } from "util";

function $6324ce8b5bc4dc81$export$78a28e85343c8674(s) {
    return s.statement !== undefined;
}
function $6324ce8b5bc4dc81$export$71aa6c912b956294(context, item) {
    const dt = context[item];
    if (dt != undefined) return dt;
    else {
        if (context.parent) return $6324ce8b5bc4dc81$export$71aa6c912b956294(context.parent, item);
        else //throw new Error("Unable to find item "+item+" in context.")
        return undefined;
    }
}
function $6324ce8b5bc4dc81$export$400db5518da0c173(src, dest) {
    Object.keys(src).forEach((element)=>{
        dest[element] = src[element];
    });
}
function $6324ce8b5bc4dc81$export$37717b9d00306a42(range) {
    //console.log(based)
    //console.log(based)
    const [start, end] = range.split(" to "); // ok
    //console.log(start,end)
    const startp = (0, $5SJX2$datefns.parse)(start, "H:mm", new Date());
    const endp = (0, $5SJX2$datefns.parse)(end, "H:mm", new Date());
    //console.log(startp, endp)
    return {
        start: $6324ce8b5bc4dc81$export$ea30f9d033bcdbca(startp),
        end: $6324ce8b5bc4dc81$export$ea30f9d033bcdbca(endp)
    };
}
function $6324ce8b5bc4dc81$export$ea30f9d033bcdbca(time) {
    return {
        h: (0, $5SJX2$datefns.getHours)(time),
        m: (0, $5SJX2$datefns.getMinutes)(time),
        s: (0, $5SJX2$datefns.getSeconds)(time)
    };
}
function $6324ce8b5bc4dc81$export$7b424ff55bf4aeae(start, end) {
    const arr = [];
    for(let dt = new Date(start); dt <= new Date(end); dt.setDate(dt.getDate() + 1))arr.push(new Date(dt));
    return arr;
}
function $6324ce8b5bc4dc81$export$c0dc94da39b7f40d(b, cb, parent) {
    if (Array.isArray(b)) b.forEach((e)=>$6324ce8b5bc4dc81$export$c0dc94da39b7f40d(e, cb, parent));
    else {
        cb(b, parent);
        b.args.forEach((c)=>{
            if (c.type == "block") $6324ce8b5bc4dc81$export$c0dc94da39b7f40d(c.data, cb, b);
        });
    }
}
function $6324ce8b5bc4dc81$export$2beb1e16bd100e3d(m) {
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





const $61558216baa3c504$export$df566d397d9dca37 = new Map().set("schedule", (args, c)=>{
    if (c.statement) {
        //console.log(c.statement)
        if (c.statement == "event") {
            const schedules = (0, $6324ce8b5bc4dc81$export$71aa6c912b956294)(c, "schedules");
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
    const ptimerange = (0, $6324ce8b5bc4dc81$export$37717b9d00306a42)(timeRange);
    outc = {
        ...ptimerange
    };
    const { type: type , num: num  } = (0, $6324ce8b5bc4dc81$export$2beb1e16bd100e3d)(typeM);
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
    const displayDate = (0, $6324ce8b5bc4dc81$export$71aa6c912b956294)(c, "displayDate") || new Date();
    const newTerm = t.filter((term)=>{
        return ((0, $5SJX2$datefns.isAfter)(displayDate, term.start) || (0, $5SJX2$datefns.isSameDay)(displayDate, term.start)) && ((0, $5SJX2$datefns.isBefore)(displayDate, term.end) || (0, $5SJX2$datefns.isSameDay)(displayDate, term.end));
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
    const toc = (0, $6324ce8b5bc4dc81$export$71aa6c912b956294)(c, item);
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
    const schs = (0, $6324ce8b5bc4dc81$export$71aa6c912b956294)(c, "schedules");
    if (!schs) throw new Error("No schedules in file!");
    const t = schs[toHer];
    if (!t) throw new Error("Schedule " + toHer + " doesnt exist!");
    (0, $6324ce8b5bc4dc81$export$400db5518da0c173)(t, c);
}).set("description", $61558216baa3c504$var$setSimple("description")).set("info", $61558216baa3c504$var$setSimple("info")).set("message", $61558216baa3c504$var$setSimple("message")).set("date", (args, c)=>{
    c.dates = c.dates || [];
    c.dates.push(new Date(args[0]));
}).set("from", (args, c)=>{
    if (c.statement == "event") {
        const from = args[0];
        const tost = args[1];
        if (tost != "to") console.warn("(from) Expected 'to' but got", tost);
        const to = args[2];
        c.dates = c.dates || [];
        c.dates.push(...(0, $6324ce8b5bc4dc81$export$7b424ff55bf4aeae)(new Date(from), new Date(to)));
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
}).set("comment", $61558216baa3c504$var$empty).set("multicomment", $61558216baa3c504$var$empty).set("import", $61558216baa3c504$var$empty).set("function", $61558216baa3c504$var$empty).set("call", $61558216baa3c504$var$empty).set("lunchConfig", (args, c)=>{
    (0, $6324ce8b5bc4dc81$export$400db5518da0c173)(args[0], c);
}).set("passing", (args, c)=>{
    c.studentLunches = c.studentLunches || {};
    c.studentLunches.passing = args[0];
}).set("lunch", (args, c)=>{
    const [lunchid, durataion] = args;
    c.studentLunches = c.studentLunches || {};
    c.studentLunches.lunches = c.studentLunches.lunches || {};
    c.studentLunches.lunches[lunchid] = (0, $6324ce8b5bc4dc81$export$37717b9d00306a42)(durataion);
}).set("user", (args, c)=>{
    // currently only uses `user classes contains` so thats all im going to support
    const classes = args.shift();
    const contains = args.shift();
    if (classes != "classes" || contains != "contains") throw new Error("Invalid user statement (lmao)");
    const checks = [];
    for (const what of args)checks.push((0, $6324ce8b5bc4dc81$export$2beb1e16bd100e3d)(what));
    // format
    // {
    // "user": {classes: [{type: "period", num: 1}, {type: "period", num: 2}]}
    // }
    // gl hf
    const userinfo = (0, $6324ce8b5bc4dc81$export$71aa6c912b956294)(c, "user");
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
    for (const what of args)checks.push((0, $6324ce8b5bc4dc81$export$2beb1e16bd100e3d)(what));
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
    const toRemove = args.map((e)=>(0, $6324ce8b5bc4dc81$export$2beb1e16bd100e3d)(e));
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
    const toRemove = (0, $6324ce8b5bc4dc81$export$2beb1e16bd100e3d)(matcher);
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
function $61558216baa3c504$var$empty(args, c) {
    c;
}
function $61558216baa3c504$var$setSimple(name) {
    return (args, c)=>{
        c[name] = args.join(" ");
    };
}
const $61558216baa3c504$export$be9b774eeb6e293 = Array.from($61558216baa3c504$export$df566d397d9dca37.keys());




function $51ed46b8955c1431$export$c6b8a85d6a4f3086(data, initcontext, resolver) {
    let context = (0, ($parcel$interopDefault($5SJX2$ungapstructuredclone)))(initcontext);
    for (const item of data)if ((0, $6324ce8b5bc4dc81$export$78a28e85343c8674)(item)) {
        if (item.statement == "function") {
            context = (0, ($parcel$interopDefault($5SJX2$immer)))(context, (c)=>{
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
            const parsed = new (0, $9f7312223c5b9528$export$a5e2ae43fdd9439f)(data1, resolver);
            context = $51ed46b8955c1431$export$c6b8a85d6a4f3086(parsed.parsed, context, resolver);
            continue;
        }
        const parsedArgs = [];
        item.args.forEach((element)=>{
            if (element.type == "block") {
                const blk = (0, ($parcel$interopDefault($5SJX2$immer)))($51ed46b8955c1431$export$c6b8a85d6a4f3086(element.data, {
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
                    const val = (0, $6324ce8b5bc4dc81$export$71aa6c912b956294)(context, name);
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
            const func = (0, $6324ce8b5bc4dc81$export$71aa6c912b956294)(context, "func_" + tocall);
            if (!func) throw new Error(`Function ${tocall} not found`);
            const argMapping = {};
            args.forEach((arg, i)=>{
                argMapping[func.args[i]] = arg;
            });
            //console.log("calling function "+tocall+" with args "+JSON.stringify(argMapping))
            context = $51ed46b8955c1431$export$c6b8a85d6a4f3086(func.body, {
                ...context,
                ...argMapping
            }, resolver);
            continue;
        }
        //console.log("executing",item.statement,"with", parsedArgs)
        context = $51ed46b8955c1431$var$executeStatement(item.statement, parsedArgs, context);
        if (context.stop) return initcontext;
    } else context = $51ed46b8955c1431$export$c6b8a85d6a4f3086(item, context, resolver);
    return context;
}
function $51ed46b8955c1431$var$executeStatement(statement, args, icontext) {
    const def = (_, c)=>{
        c.unknownCommands = c.unknownCommands || [];
        c.unknownCommands.push(statement);
    };
    return (0, ($parcel$interopDefault($5SJX2$immer)))(icontext, (c)=>{
        const exec = (0, $61558216baa3c504$export$df566d397d9dca37).get(statement) || def;
        exec(args, c);
    });
}




//const start = performance.now()
const $71e60bc64a32b98d$var$gened = $5SJX2$peggy.generate('start = prog:statement* { return prog.filter((p) => p) }\r\nws "whitespace" = [ \\t\\n\\r]*\r\nstatement = ws v:(comment / multilinecomment / block / command / eol ) ws { return v }\r\n\r\ncomment "comment" = "//" d:[^\\n]* "\\n"? { return {statement: "comment", "comment":d.join(\'\'), "args": [],  location: location() } }\r\nmultilinecomment "multiline comment" = "/*" d:[^*]* "*"+ ([^/*] [^*]* "*"+)* "/" { return {statement: "multicomment", "comment":d.join(\'\'), "args": [],  location: location() } }\r\n\r\n/*\r\nstring "string"\r\n  = quotation_mark chars:char* quotation_mark { return chars.join(""); }\r\n*/\r\ncharD\r\n  = unescapedDouble\r\n  / escape\r\n    sequence:(\r\n        \'"\'\r\n      / "\'"\r\n      / "\\\\"\r\n      / "/"\r\n      / "b" { return "\\b"; }\r\n      / "f" { return "\\f"; }\r\n      / "n" { return "\\n"; }\r\n      / "r" { return "\\r"; }\r\n      / "t" { return "\\t"; }\r\n      / "u" digits:$(HEXDIG HEXDIG HEXDIG HEXDIG) {\r\n          return String.fromCharCode(parseInt(digits, 16));\r\n        }\r\n    )\r\n    { return sequence; }\r\n\r\ncharS\r\n  = unescapedSingle\r\n  / escape\r\n    sequence:(\r\n        "\'"\r\n      / "\\""\r\n      / "\\\\"\r\n      / "/"\r\n      / "b" { return "\\b"; }\r\n      / "f" { return "\\f"; }\r\n      / "n" { return "\\n"; }\r\n      / "r" { return "\\r"; }\r\n      / "t" { return "\\t"; }\r\n      / "u" digits:$(HEXDIG HEXDIG HEXDIG HEXDIG) {\r\n          return String.fromCharCode(parseInt(digits, 16));\r\n        }\r\n    )\r\n    { return sequence; }\r\n\r\nescape\r\n  = "\\\\"\r\n\r\nunescapedDouble\r\n  = [^\\0-\\x1F\\x22\\x5C]\r\nunescapedSingle\r\n  = [^\\0-\\x1F\\x27\\x5C]\r\n\r\nDIGIT  = [0-9]\r\nHEXDIG = [0-9a-f]i\r\n\r\ntext "text" = [0-9a-z:()\\-$]i+ { return text() } // add the rest of the symbols?\r\nbracketed "bracketed text" = "[" j:[0-9a-z$\\-, :]i+ "]" { return j.join("") }\r\neol "semicolon" = ";" {return null}\r\n\r\nquotedargDouble "double quoted text" = "\\"" d:charD* "\\"" { return d.join("") }\r\nquotedargSingle "single quoted text" = "\'" d:charS* "\'" { return d.join("") }\r\n\r\nblock "block" = "{" "\\n"? state:statement+ "\\n"? "}" { return state.filter(s => s) }\r\n\r\narg "argument" = (o:block { return { type: "block", data: o } }) / (o:(quotedargDouble/quotedargSingle) { return {type: "quote", data: o } }) / (o:text { return {type: "text", data: o } }) / (o:bracketed { return {type: "bracket", data: o } })\r\ncommand "command" = statement:text args:(ws arg)* eol [ ]* com:comment? { return {statement, args:args.map(r => r[1]), comment:com,  location: location()} }\r\n', {
    output: "parser",
    cache: true
});
const $71e60bc64a32b98d$export$98e6a39c04603d36 = $71e60bc64a32b98d$var$gened.parse; //export const parseTime = end - start;


var $faefaad95e5fcca0$exports = {};

$parcel$export($faefaad95e5fcca0$exports, "LintLevel", () => $faefaad95e5fcca0$export$6e5c879485b013ad);
// add types here
let $faefaad95e5fcca0$export$6e5c879485b013ad;
(function(LintLevel) {
    LintLevel[LintLevel["info"] = 0] = "info";
    LintLevel[LintLevel["warn"] = 1] = "warn";
    LintLevel[LintLevel["error"] = 2] = "error";
})($faefaad95e5fcca0$export$6e5c879485b013ad || ($faefaad95e5fcca0$export$6e5c879485b013ad = {}));






function $f01796f3bf0333f6$var$combine(checks) {
    return (statement, parent)=>{
        for (const check of checks){
            const err = check(statement, parent);
            if (err) return err;
        }
    };
}
function $f01796f3bf0333f6$var$anyof(t) {
    for (const item of t){
        if (!item) return false;
    }
    return true;
}
function $f01796f3bf0333f6$var$varArgsofType(type, start) {
    return (statement, parent)=>{
        const argstocheck = statement.args.slice(start);
        for (const item of argstocheck){
            if (item.type != type) return {
                message: "All varargs of statement " + statement.statement + " must be of type " + $f01796f3bf0333f6$var$formatType(type) + " not " + $f01796f3bf0333f6$var$formatType(item.type),
                level: (0, $faefaad95e5fcca0$export$6e5c879485b013ad).error
            };
        }
    };
}
function $f01796f3bf0333f6$var$mustEqual(index, arg, value) {
    return (statement, parent)=>{
        if (statement.args[index].type == arg && statement.args[index].data != value) return {
            message: `Argument ${index} of ${statement.statement} must be ${value}, not ${statement.args[index].data}`,
            level: (0, $faefaad95e5fcca0$export$6e5c879485b013ad).error
        };
    };
}
function $f01796f3bf0333f6$var$parenting(parents) {
    return (statement, parent)=>{
        let parentStatement;
        if (!parent) parentStatement = "root";
        else parentStatement = parent.statement;
        if (!Object.keys(parents).includes(parentStatement)) return {
            message: `Statement ${statement.statement} must be inside ${Object.keys(parents).join(", ")}, not ${parentStatement}`,
            level: (0, $faefaad95e5fcca0$export$6e5c879485b013ad).error
        };
        else return parents[parentStatement](statement, parent);
    };
}
function $f01796f3bf0333f6$var$simple(args) {
    return $f01796f3bf0333f6$var$combine([
        $f01796f3bf0333f6$var$hasAmtOfArgs(args.length),
        ...args.map((n, i)=>$f01796f3bf0333f6$var$argumentOfType(i, n))
    ]);
}
function $f01796f3bf0333f6$var$formatType(t) {
    return ({
        text: "text",
        block: "block",
        quote: "quoted string",
        bracket: "bracketed string"
    })[t] || t;
}
function $f01796f3bf0333f6$var$argumentOfType(argumentIndex, type) {
    const ot = typeof type == "string" ? [
        type
    ] : type;
    return (statement, parent)=>{
        if (!ot.includes(statement.args[argumentIndex].type)) return {
            level: (0, $faefaad95e5fcca0$export$6e5c879485b013ad).error,
            message: `Argument ${argumentIndex} of ${statement.statement} must be any of (${ot.map((t)=>$f01796f3bf0333f6$var$formatType(t)).join(", ")}), not a ${$f01796f3bf0333f6$var$formatType(statement.args[argumentIndex].type)}`
        };
    };
}
function $f01796f3bf0333f6$var$hasAmtOfArgs(amt) {
    return (statement, parent)=>{
        if (statement.args.length != amt) return {
            message: `Statement ${statement.statement} must have ${amt} arguments, not ${statement.args.length}`,
            level: (0, $faefaad95e5fcca0$export$6e5c879485b013ad).error
        };
    };
}
const $f01796f3bf0333f6$export$efdd3424cb70c6f2 = new Map().set("schedule", $f01796f3bf0333f6$var$parenting({
    root: $f01796f3bf0333f6$var$simple([
        "text",
        "block"
    ]),
    event: $f01796f3bf0333f6$var$simple([
        "text"
    ])
})).set("term", $f01796f3bf0333f6$var$parenting({
    terms: $f01796f3bf0333f6$var$simple([
        "text",
        "bracket",
        "bracket"
    ])
})).set("info", $f01796f3bf0333f6$var$parenting({
    event: $f01796f3bf0333f6$var$simple([
        "quote"
    ])
})).set("description", $f01796f3bf0333f6$var$parenting({
    schedule: $f01796f3bf0333f6$var$simple([
        "quote"
    ])
})).set("root", ()=>{
    return {
        message: "reserved statement: root",
        level: (0, $faefaad95e5fcca0$export$6e5c879485b013ad).error
    };
}).set("call", (s, p)=>{
    if (s.args.length == 0) return {
        message: "Statement call requires 1+ arguments",
        level: (0, $faefaad95e5fcca0$export$6e5c879485b013ad).error
    };
}).set("comment", $f01796f3bf0333f6$var$simple([])).set("multicomment", $f01796f3bf0333f6$var$simple([])).set("function", (s, p)=>{
    if (s.args.length < 2 || s.args.length > 3) return {
        message: "Statement call requires 2-3 arguments",
        level: (0, $faefaad95e5fcca0$export$6e5c879485b013ad).error
    };
    if (s.args.length == 2) return $f01796f3bf0333f6$var$simple([
        "text",
        "block"
    ])(s, p);
    else return $f01796f3bf0333f6$var$simple([
        "text",
        "bracket",
        "block"
    ])(s, p);
}).set("class", $f01796f3bf0333f6$var$simple([
    "bracket",
    "bracket"
])).set("terms", $f01796f3bf0333f6$var$simple([
    "block"
])).set("lunches", $f01796f3bf0333f6$var$simple([
    "block"
])).set("only", $f01796f3bf0333f6$var$simple([
    "text",
    "text"
])).set("teacher", $f01796f3bf0333f6$var$simple([
    "bracket",
    "text",
    "text"
])).set("set", $f01796f3bf0333f6$var$simple([
    "text",
    "text"
])).set("config", $f01796f3bf0333f6$var$simple([
    "text",
    "text"
])).set("message", $f01796f3bf0333f6$var$simple([
    "quote"
])).set("user", $f01796f3bf0333f6$var$combine([
    $f01796f3bf0333f6$var$mustEqual(0, "text", "classes"),
    $f01796f3bf0333f6$var$mustEqual(1, "text", "contains"),
    $f01796f3bf0333f6$var$varArgsofType("bracket", 2)
])).set("self", $f01796f3bf0333f6$var$combine([
    $f01796f3bf0333f6$var$mustEqual(0, "text", "classes"),
    $f01796f3bf0333f6$var$mustEqual(1, "text", "contains"),
    $f01796f3bf0333f6$var$varArgsofType("bracket", 2)
])).set("event", $f01796f3bf0333f6$var$simple([
    "block"
])).set("inherit", $f01796f3bf0333f6$var$simple([
    "text"
])).set("date", $f01796f3bf0333f6$var$simple([
    "bracket"
])).set("lunchConfig", $f01796f3bf0333f6$var$simple([
    "block"
])).set("passing", $f01796f3bf0333f6$var$simple([
    "bracket"
])).set("lunch", $f01796f3bf0333f6$var$simple([
    "bracket",
    "bracket"
])).set("from", $f01796f3bf0333f6$var$parenting({
    lunchConfig: $f01796f3bf0333f6$var$simple([
        "bracket"
    ]),
    event: $f01796f3bf0333f6$var$simple([
        "bracket",
        "text",
        "bracket"
    ])
})).set("import", $f01796f3bf0333f6$var$simple([
    "quote"
])).set("events", $f01796f3bf0333f6$var$simple([
    "block"
])).set("day", (s, p)=>{
    switch(s.args.length){
        case 2:
            return $f01796f3bf0333f6$var$combine([
                $f01796f3bf0333f6$var$argumentOfType(0, "bracket"),
                $f01796f3bf0333f6$var$argumentOfType(1, "block")
            ])(s, p);
        case 4:
            return $f01796f3bf0333f6$var$combine([
                $f01796f3bf0333f6$var$argumentOfType(0, "bracket"),
                $f01796f3bf0333f6$var$mustEqual(1, "text", "to"),
                $f01796f3bf0333f6$var$argumentOfType(2, "bracket"),
                $f01796f3bf0333f6$var$argumentOfType(3, "block")
            ])(s, p);
        default:
            return {
                message: "Statement day requires 2 or 4 arguments",
                level: (0, $faefaad95e5fcca0$export$6e5c879485b013ad).error
            };
    }
}).set("remove", $f01796f3bf0333f6$var$varArgsofType("bracket", 0)).set("force", $f01796f3bf0333f6$var$simple([
    "text",
    "text"
])).set("replace", $f01796f3bf0333f6$var$combine([
    $f01796f3bf0333f6$var$mustEqual(0, "text", "class"),
    $f01796f3bf0333f6$var$argumentOfType(1, "bracket"),
    $f01796f3bf0333f6$var$mustEqual(2, "text", "with"),
    $f01796f3bf0333f6$var$argumentOfType(3, "block")
])).set("insert", $f01796f3bf0333f6$var$simple([
    "block",
    "text",
    "text"
]));







class $b157dd72099cfdda$export$b43a5ce8debc1184 {
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
        const parsed = new (0, $9f7312223c5b9528$export$a5e2ae43fdd9439f)(file, this.resolve.bind(this));
        return parsed.scheduleFor(date, context);
    }
    exec(filename, context) {
        const file = this.files[filename];
        if (!file) throw new Error(`File ${filename} not found`);
        const parsed = new (0, $9f7312223c5b9528$export$a5e2ae43fdd9439f)(file, this.resolve.bind(this));
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
        const parsed = new (0, $9f7312223c5b9528$export$a5e2ae43fdd9439f)(file, this.resolve.bind(this));
        return parsed.bundle();
    }
}


function $9f7312223c5b9528$var$quoteEscape(str) {
    let newStr = str;
    newStr = newStr.replace(/"/g, '\\"');
    newStr = newStr.replace(/'/g, "\\'");
    return newStr;
}
function $9f7312223c5b9528$var$stringArgToString(str) {
    return `'${$9f7312223c5b9528$var$quoteEscape(str)}'`;
}
class $9f7312223c5b9528$export$a5e2ae43fdd9439f {
    //parsedwithComments: Block
    constructor(data, resolver){
        this.parsed = (0, $71e60bc64a32b98d$export$98e6a39c04603d36)(data);
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
            if (element.dates.find((e)=>(0, $5SJX2$datefns.isSameDay)(e, date))) return {
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
            if ((0, $6324ce8b5bc4dc81$export$78a28e85343c8674)(statement)) {
                // statement
                let args = " " + statement.args.map((arg)=>{
                    if (arg.type == "block") return minifyStatement(arg.data).trim();
                    else if (arg.type == "quote") return $9f7312223c5b9528$var$stringArgToString(arg.data);
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
        (0, $6324ce8b5bc4dc81$export$c0dc94da39b7f40d)(this.parsed, (statement, parent)=>{
            if (statement.statement === "comment" || statement.statement === "multicomment") return;
            const e = (0, $f01796f3bf0333f6$export$efdd3424cb70c6f2).get(statement.statement);
            if (!e) {
                if ((0, $61558216baa3c504$export$df566d397d9dca37).get(statement.statement)) objs.push({
                    level: (0, $faefaad95e5fcca0$export$6e5c879485b013ad).info,
                    message: `No checker for statement: ${statement.statement}`,
                    location: statement.location
                });
                else objs.push({
                    level: (0, $faefaad95e5fcca0$export$6e5c879485b013ad).error,
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
            if ((0, $6324ce8b5bc4dc81$export$78a28e85343c8674)(statement)) {
                // statement
                let args = "";
                if (statement.args.length > 0) args = " " + statement.args.map((arg)=>{
                    if (arg.type == "block") return doPretty(arg.data).trim();
                    else if (arg.type == "quote") return $9f7312223c5b9528$var$stringArgToString(arg.data);
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
        const ret = (0, $51ed46b8955c1431$export$c6b8a85d6a4f3086)(this.parsed, initalContext || {}, this.resolver);
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
        const e = (0, ($parcel$interopDefault($5SJX2$immer)))(this.parsed, (p)=>{
            const dofunny = (b, parent)=>{
                if (Array.isArray(b)) b.forEach((e, i)=>{
                    if (e.statement == "import") {
                        const impst = e;
                        const toimp = impst.args[0].data;
                        const imp = this.resolver(toimp);
                        const parsed = new $9f7312223c5b9528$export$a5e2ae43fdd9439f(imp, this.resolver);
                        const bundledDep = parsed.bundle();
                        const newBlock = (0, $71e60bc64a32b98d$export$98e6a39c04603d36)(bundledDep);
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
        const n = new $9f7312223c5b9528$export$a5e2ae43fdd9439f("e;");
        n.parsed = e;
        return n.pretty();
    }
}
$parcel$exportWildcard(module.exports, $faefaad95e5fcca0$exports);


//# sourceMappingURL=scs.js.map
