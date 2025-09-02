export type AnyObject = Record<string, any>;

export const objectGet = (obj: AnyObject, path: string): any => {
    return path.split('.').reduce((carry, key) => {
        if (carry === undefined || carry === null) {
            return undefined;
        }
        return carry[key];
    }, obj);
};
export const objectSet = (obj: AnyObject, path: string, value: any) => {
    const keys = path.split('.');
    let current: AnyObject = obj;

    keys.forEach((key, i) => {
        if (i === keys.length - 1) {
            current[key] = value;
        } else {
            if (!(key in current)) {
                const nextKey = keys[i + 1];
                current[key] = /^\d+$/.test(nextKey) ? [] : {};
            }
            current = current[key];
        }
    });
};
