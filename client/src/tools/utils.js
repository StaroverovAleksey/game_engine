export const isEmpty = (obj) => {
    for (const key in obj) {
        return false;
    }
    return true;
};

export const firstProp = (obj) => {
    for (const key in obj) {
        return key;
    }
    return null;
};

export const previousProp = (obj, prop) => {
    const props = Object.keys(obj);
    for (let i = 0; i < props.length; i++) {
        if (props[i] === prop) {
            return i > 0 ? props[i - 1] : props[props.length - 1];
        }
    }
    return null;
};

export const nextProp = (obj, prop) => {
    const props = Object.keys(obj);
    for (let i = 0; i < props.length; i++) {
        if (props[i] === prop) {
            return i < props.length - 1 ? props[i + 1] : props[0];
        }
    }
    return null;
};
