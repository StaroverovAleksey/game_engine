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
