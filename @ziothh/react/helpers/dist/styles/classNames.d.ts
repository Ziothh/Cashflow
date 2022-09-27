export declare type ClassNamesParameter = string | false | undefined | null | {
    [className: string]: boolean;
} | ClassNamesParameter[];
declare const classNames: (...classNames: (ClassNamesParameter | ClassNamesParameter[])[]) => string;
export default classNames;
