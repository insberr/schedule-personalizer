import { loopWhile } from "deasync"
import { SCS } from "schedule-script";

type rollupContext = {
    resolve: (source: string, importer?: string, options?: {skipSelf?: boolean, isEntry?: boolean, assertions?: {[key: string]: string}, custom?: {[plugin: string]: any}}) => Promise<{id: string, external: boolean | "absolute", assertions: {[key: string]: string}, meta: {[plugin: string]: any} | null, moduleSideEffects: boolean | "no-treeshake", syntheticNamedExports: boolean | string}>
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
                // @ts-ignore
                return out as string
            }
            if (!id.endsWith(".scs")) {
                return;
            }
            let s = new SCS(code, resolver)
            return "export default '"+s.bundle()+"';"
        }

    }
}