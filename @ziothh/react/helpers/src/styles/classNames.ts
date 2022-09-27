export type ClassNamesParameter = string | false | undefined | null | {[className: string]: boolean} | ClassNamesParameter[]

const parseArgsArray = (argsArr: ClassNamesParameter[], acc: string[]): string[] => {
    for (let index = 0; index < argsArr.length; index++) {
        acc = parseArg(argsArr[index], acc)
    }

    return acc
}

const parseArg = (arg: ClassNamesParameter, acc: string[]): string[] => {
    if (!arg) return acc

    if (typeof arg === "string") acc.push(arg)
    else if (Array.isArray(arg)) acc = parseArgsArray(arg, acc)
    else {
        const entries = Object.entries(arg)
        for (let index = 0; index < entries.length; index++) {
            const [className, isActive] = entries[index];
            
            if (isActive) acc.push(className)
        }
    }

    return acc
}

const classNames = (...classNames: (ClassNamesParameter | ClassNamesParameter[])[]): string => {
    return parseArgsArray(classNames, []).join(" ")
}

export default classNames
