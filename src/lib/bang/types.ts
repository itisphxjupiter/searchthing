export interface Bang {
    c: string;    // Category
    d: string;    // Domain
    s: string;    // Search Engine Name
    sc: string;   // Subcategory
    t: string;    // Bang Trigger
    u: string;    // URL Template
}

export type BangModule = {
    [key: string]: Bang[];
}