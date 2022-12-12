import { loopWhile } from "deasync"
import { basename } from "path";
import { SCS } from "schedule-script";
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
    resolve: (source: string, importer?: string, options?: {skipSelf?: boolean, isEntry?: boolean, assertions?: {[key: string]: string}, custom?: {[plugin: string]: any}}) => Promise<{id: string, external: boolean | "absolute", assertions: {[key: string]: string}, meta: {[plugin: string]: any} | null, moduleSideEffects: boolean | "no-treeshake", syntheticNamedExports: boolean | string}>
    emitFile:  (emittedFile: EmittedChunk | EmittedAsset) => string
}

export function scs(this: rollupContext) {
    return {
        name: "scs",
        shouldTransformCachedModule: (inp: {id:string}) => {
            const id = inp.id;
            if (id.endsWith(".scs")) {
                return true
            }
        },
        transform: (code: string, id: string) => {
            const resolver = (iid: string) => {
                let out: string | null = null;
                this.resolve(iid).then((v) => out = v.id)
                loopWhile(() => out != null) // fuck shit
                // @ts-expect-error you cant expect god to do all the work
                return out as string
            }
            if (!id.endsWith(".scs")) {
                return;
            }
            const s = new SCS(code, resolver)
            const emited = this.emitFile({
                type: "asset",
                fileName: basename(id),
                source: s.bundle()
            })
            return `export default import.meta.ROLLUP_FILE_URL_${emited};`;
        }

    }
}