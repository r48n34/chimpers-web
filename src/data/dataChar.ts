export const binToHiddenChar = {
    "st" : "\u2063", // not in use
    "00" : "\u200C", // 8204
    "01" : "\u200D", // 8205
    "10" : "\u2060", // 8288
    "11" : "\u2062", // 8290
    "en" : "\u2064" // not in use
}

export const hiddenCharTobin = {
    "8204" : "00", 
    "8205" : "01", 
    "8288" : "10", 
    "8290" : "11",
}

export const hiddenCharTobinNum = [8204, 8205, 8288, 8290]