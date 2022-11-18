export type Block = (Statement | Block)[];
export type Statement = {
    statement: string;
    args: Arg[];
    comment?: {
        statement: string;
        args: Arg[];
        comment: string;
    } | string;
    location: {
        start: {
            offset: number;
            line: number;
            column: number;
        };
        end: {
            offset: number;
            line: number;
            column: number;
        };
    };
};
export type MinifyOptions = {
    keepMultiLineComments?: boolean;
    uncompressTopLevelMultiLineComments?: boolean;
    keepSingleLineComments?: boolean;
};
export type Arg = BlockArg | QuoteArg | TextArg | BracketArg;
export type BlockArg = {
    type: 'block';
    data: Block;
};
export type QuoteArg = {
    type: 'quote';
    data: string;
};
export type TextArg = {
    type: 'text';
    data: string;
};
export type BracketArg = {
    type: 'bracket';
    data: string;
};
export type Time = {
    h: number;
    m: number;
    s: number;
};
export type TimeRange = {
    start: Time;
    end: Time;
};
export type Output = {};
export enum LintLevel {
    info = 0,
    warn = 1,
    error = 2
}
export type LintObject = {
    location: {
        start: {
            offset: number;
            line: number;
            column: number;
        };
        end: {
            offset: number;
            line: number;
            column: number;
        };
    };
    level: LintLevel;
    message: string;
};
export const _statements: string[];
type Context = {
    parent?: Context;
    stop?: boolean;
    statement?: string;
    [key: string]: any;
};
type Checker = (statement: Statement, parent?: Statement) => {
    message: string;
    level: LintLevel;
} | void;
export const _checkers: Map<string, Checker>;
export class SCSFS {
    files: {
        [key: string]: string;
    };
    add(name: string, data: string): void;
    addAsync(files: {
        [key: string]: string;
    }, fetcher: (name: string) => Promise<string>): Promise<void[]>;
    scheduleFor(filename: string, date: Date, context?: Context): {
        schedule: unknown;
        event: unknown;
    } | undefined;
    exec(filename: string, context?: Context): Context;
    resolve(filename: string): string;
    bundle(filename: string): string;
}
export class SCS {
    parsed: Block;
    resolver: (name: string) => string;
    constructor(data: string, resolver?: (name: string) => string);
    scheduleFor(date: Date, context?: Context): {
        schedule: unknown;
        event: unknown;
    } | undefined;
    minify(options?: MinifyOptions): string;
    lint(): LintObject[];
    pretty(): string;
    exec(initalContext?: Context): Context;
    bundle(): string;
}

//# sourceMappingURL=scs.d.ts.map
