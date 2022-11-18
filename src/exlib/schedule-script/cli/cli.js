'use strict';
Object.defineProperty(exports, '__esModule', { value: !0 });
const e = require('fs'),
    t = require('fs/promises'),
    i = require('path'),
    l = require('..');
let o = process.argv.slice(2);
const n = ['prettyMany', 'pretty', 'minifyMany', 'minify', 'lint', 'exec', 'parse'],
    s = { [l.LintLevel.error]: '\x1b[31m', [l.LintLevel.warn]: '\x1b[33m', [l.LintLevel.info]: '\x1b[90m', reset: '\x1b[0m' };
function r(t) {
    return (l) => {
        let o = '';
        try {
            o = (0, e.readFileSync)((0, i.join)((0, i.dirname)(t), l), 'utf-8');
        } catch (s) {
            try {
                o = (0, e.readFileSync)((0, i.join)((0, i.dirname)(t), l + '.scs'), 'utf-8');
            } catch (n) {
                throw Error(`Cannot resolve ${l}`);
            }
        }
        return o;
    };
}
function a() {
    console.log('SCS-CLI v0.0.0'),
        console.log('Usage:'),
        console.log(),
        console.log('scs prettyMany [...files]'),
        console.log('prettifies many files in place'),
        console.log(),
        console.log('scs pretty <infile> [outfile]'),
        console.log('prettify a single file'),
        console.log(),
        console.log('scs minifyMany [...files]'),
        console.log('minifies many files in place'),
        console.log(),
        console.log('scs minify <infile> [outfile]'),
        console.log('minifies a single file'),
        console.log(),
        console.log('scs lint [...files]'),
        console.log('lints many files'),
        console.log(),
        console.log('scs exec <infile> [outfile] [...args]'),
        console.log('executes infile, writes the output context to outfile. specify args in key=value, spaces not supported'),
        console.log('example: scs exec in.scs out.json grade=10 name=weckysmecky'),
        console.log(),
        console.log('scs parse <infile> [outfile]'),
        console.log('parses infile and outputs the parsed tree to outfile'),
        console.log();
}
async function c(e) {
    let l = [],
        o = 0;
    for (; o < e.length; ) {
        let n = e[o],
            s = await (0, t.stat)(n);
        if (s.isDirectory()) {
            let r = await (0, t.readdir)(n);
            e = [...e, ...r.map((e) => (0, i.join)(n, e))];
        }
        s.isFile() && '.scs' == (0, i.extname)(n) && l.push(n), o++;
    }
    return l;
}
async function f(i, l, o) {
    if (!(0, e.existsSync)(i)) throw Error('infile doesnt exist!');
    let n = await (0, t.readFile)(i, 'utf-8'),
        s = performance.now(),
        r = await o(n),
        a = performance.now();
    return '-' == l ? (process.stdout.write(r), -1) : (await (0, t.writeFile)(l, r), a - s);
}
async function u(e) {
    if (!n.includes(e || 'undefined')) {
        a();
        return;
    }
    if ('minify' == e) {
        let i = o.shift(),
            y = o.shift() || '-';
        if (!i) {
            a();
            return;
        }
        let p = await f(i, y, async (e) => {
            let t = new l.SCS(e, r(i));
            return t.minify();
        });
        -1 != p && console.log('Minified', i, 'in', p.toFixed(2), 'ms');
    } else if ('pretty' == e) {
        let g = o.shift(),
            m = o.shift() || '-';
        if (!g) {
            a();
            return;
        }
        let w = await f(g, m, async (e) => {
            let t = new l.SCS(e, r(g));
            return t.pretty();
        });
        -1 != w && console.log('Prettified', g, 'in', w.toFixed(2), 'ms');
    } else if ('parse' == e) {
        let d = o.shift(),
            h = o.shift() || '-';
        if (!d) {
            a();
            return;
        }
        let x = await f(d, h, async (e) => {
            let t = new l.SCS(e, r(d));
            return JSON.stringify(t.parsed, null, 2);
        });
        -1 != x && console.log('Parsed', d, 'in', x.toFixed(2), 'ms');
    } else if ('exec' == e) {
        let S = o.shift(),
            v = o.shift() || '-',
            F = o.map((e) => {
                let [t, i] = e.split('='),
                    l = JSON.parse(i);
                return [t, l];
            }),
            C = {};
        if (
            (F.forEach((e) => {
                C[e[0]] = e[1];
            }),
            !S)
        ) {
            a();
            return;
        }
        let L = await f(S, v, async (e) => {
            let t = new l.SCS(e, r(S));
            return JSON.stringify(t.exec(C), null, 2);
        });
        -1 != L && console.log('Executed', S, 'in', L.toFixed(2), 'ms');
    } else if ('minifyMany' == e) {
        let M = await c([...o]);
        for (let $ of ((o = []), M)) (o = [$, $]), await u('minify');
    } else if ('prettyMany' == e) {
        let E = await c([...o]);
        for (let b of ((o = []), E)) (o = [b, b]), await u('pretty');
    } else if ('lint' == e) {
        let j = await c([...o]),
            q = [];
        for (let k of j) {
            let J = await (0, t.readFile)(k, 'utf-8'),
                N = new l.SCS(J, r(k)),
                O = N.lint();
            q.push(...O.map((e) => ({ ...e, file: k })));
        }
        q.forEach((e) => {
            console.log(
                `[${s[e.level]}${l.LintLevel[e.level].toUpperCase()}${s.reset}] ${e.file}:${e.location.start.line}:${e.location.start.column} ${
                    e.message
                }`
            );
        });
    } else a();
}
u(o.shift());

//# sourceMappingURL=cli.js.map
