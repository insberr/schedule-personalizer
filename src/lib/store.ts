import { persistWritable } from "./persistStore";

export const nameStore = persistWritable("name", "");