import { basename } from 'path';
import { Block, SCS, Statement } from 'schedule-script';
import fs from 'node:fs';

type ModuleInfo = {
    id: string; // the id of the module, for convenience
    code: string | null; // the source code of the module, `null` if external or not yet available
    ast: any; // the parsed abstract syntax tree if available
    hasDefaultExport: boolean | null; // is there a default export, `null` if external or not yet available
    isEntry: boolean; // is this a user- or plugin-defined entry point
    isExternal: boolean; // for external modules that are referenced but not included in the graph
    isIncluded: boolean | null; // is the module included after tree-shaking, `null` if external or not yet available
    importedIds: string[]; // the module ids statically imported by this module
    importedIdResolutions: ResolvedId[]; // how statically imported ids were resolved, for use with this.load
    importers: string[]; // the ids of all modules that statically import this module
    dynamicallyImportedIds: string[]; // the module ids imported by this module via dynamic import()
    dynamicallyImportedIdResolutions: ResolvedId[]; // how ids imported via dynamic import() were resolved
    dynamicImporters: string[]; // the ids of all modules that import this module via dynamic import()
    implicitlyLoadedAfterOneOf: string[]; // implicit relationships, declared via this.emitFile
    implicitlyLoadedBefore: string[]; // implicit relationships, declared via this.emitFile
    assertions: { [key: string]: string }; // import assertions for this module
    meta: { [plugin: string]: any }; // custom module meta-data
    moduleSideEffects: boolean | 'no-treeshake'; // are imports of this module included if nothing is imported from it
    syntheticNamedExports: boolean | string; // final value of synthetic named exports
};

type ResolvedId = {
    id: string; // the id of the imported module
    external: boolean | 'absolute'; // is this module external, "absolute" means it will not be rendered as relative in the module
    assertions: { [key: string]: string }; // import assertions for this import
    meta: { [plugin: string]: any }; // custom module meta-data when resolving the module
    moduleSideEffects: boolean | 'no-treeshake'; // are side effects of the module observed, is tree-shaking enabled
    syntheticNamedExports: boolean | string; // does the module allow importing non-existing named exports
};
type EmittedChunk = {
    type: 'chunk';
    id: string;
    name?: string;
    fileName?: string;
    implicitlyLoadedAfterOneOf?: string[];
    importer?: string;
    preserveSignature?: 'strict' | 'allow-extension' | 'exports-only' | false;
};

type EmittedAsset = {
    type: 'asset';
    name?: string;
    fileName?: string;
    source?: string | Uint8Array;
};
type rollupContext = {
    resolve: (
        source: string,
        importer?: string,
        options?: { skipSelf?: boolean; isEntry?: boolean; assertions?: { [key: string]: string }; custom?: { [plugin: string]: any } }
    ) => Promise<{
        id: string;
        external: boolean | 'absolute';
        assertions: { [key: string]: string };
        meta: { [plugin: string]: any } | null;
        moduleSideEffects: boolean | 'no-treeshake';
        syntheticNamedExports: boolean | string;
    }>;
    emitFile: (emittedFile: EmittedChunk | EmittedAsset) => string;
    load: (dt: {
        id: string;
        resolveDependencies?: boolean;
        assertions?: { [key: string]: string } | null;
        meta?: { [plugin: string]: any } | null;
        moduleSideEffects?: boolean | 'no-treeshake' | null;
        syntheticNamedExports?: boolean | string | null;
    }) => Promise<ModuleInfo>;
    getModuleInfo: (moduleId: string) => ModuleInfo | null;
};

// the worker path must be absolute
/*const resolveSync = createSyncFn(require.resolve('./resolver'), {
  //tsRunner: 'tsx', // optional, can be `'ts-node' | 'esbuild-register' | 'esbuild-runner' | 'tsx'`
})*/

/*function waitForPromise<T>(p: Promise<T>): T {
    let out: T;
    let done = false
    p.then((o) => {
        console.log("Promise resoved!")
        out = o;
        done = true
    }).catch((e) => {
        throw e;
    })
    while (!done) {
        sleep(100)
    }
    @ts-expect-error hahahaha
    return out;
}*/

function isBlock(b: Block | Statement): b is Block {
    return Array.isArray(b);
}

async function recurseInto(b: Block | Statement, cb: (b: Statement, parent?: Statement) => Promise<void>, parent?: Statement) {
    if (isBlock(b)) {
        for (const e of b) {
            await recurseInto(e, cb, parent);
        }
    } else {
        await cb(b, parent);
        for (const c of b.args) {
            if (c.type == 'block') {
                await recurseInto(c.data, cb, b);
            }
        }
    }
}

export function scs() {
    return {
        name: 'scs',
        shouldTransformCachedModule(inp: { id: string }) {
            const id = inp.id;
            if (id.endsWith('.scs')) {
                return true;
            }
        },

        async transform(this: rollupContext, code: string, id: string) {
            /*const resolver = (iid: string) => {
                //let out: string | null = null;
                console.log("starting resolve of "+iid)
                const out = ""
                //console.log(v.id)
                // @s-expect-error you cant expect god to do all the work
                return out as string
            }*/
            if (!id.endsWith('.scs')) {
                return;
            }

            const resolved: { [key: string]: string } = {};
            const s = new SCS(code, (tor) => resolved[tor]);
            const tImp = this.getModuleInfo(id);
            if (tImp == null) {
                throw new Error('uhno');
            }

            await recurseInto(s.parsed, async (s) => {
                if (s.statement === 'import') {
                    const toImport = s.args[0].data as string;
                    console.log(`Resolving ${toImport}`);
                    const resolvez = await this.resolve(toImport, id);
                    // console.log(`Resolved`, resolvez);
                    const loaded = await this.load({ ...resolvez, meta: { scs: { noEmit: true } } });
                    // console.log(loaded);
                    // console.log(`${toImport} -> ${loaded}`);
                    resolved[toImport] = loaded.meta.scs.source;
                }
            });

            // maybe also do linting here do display cool warnings?
            const bundled = new SCS(s.bundle()); // bad, maybe add a minify option
            if (!tImp.meta.scs?.noEmit) {
                const emited = this.emitFile({
                    type: 'asset',
                    fileName: basename(id),
                    source: bundled.minify(),
                });
                return `export default import.meta.ROLLUP_FILE_URL_${emited};`;
            }
            return {
                code: ``,
                meta: { scs: { source: bundled.minify() } },
            };
        },
    };
}

