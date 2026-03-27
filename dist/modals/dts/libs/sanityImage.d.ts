export declare function sanityImageUrl(builder: any, source: {
    asset?: {
        _ref?: string;
    };
} | undefined): string | null;
interface envProp {
    proj: any;
    ds: any;
}
export declare function processImages<T>(builder: any, env: envProp, data: T): T;
export {};
