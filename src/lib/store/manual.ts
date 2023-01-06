import { persistWritable } from "$lib/persistStore"
import type { Terms } from "$types"


export const manualTerms = persistWritable<Terms>("manualInput", [])