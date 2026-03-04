export declare const binToHiddenChar: {
    readonly st: "⁣";
    readonly "00": "‌";
    readonly "01": "‍";
    readonly "10": "⁠";
    readonly "11": "⁢";
    readonly en: "⁤";
};
export type BinChar = keyof typeof binToHiddenChar;
export declare const hiddenCharTobin: {
    readonly "8204": "00";
    readonly "8205": "01";
    readonly "8288": "10";
    readonly "8290": "11";
};
export type HiddenCharKey = keyof typeof hiddenCharTobin;
export declare const hiddenCharTobinNum: number[];
