export const saveLocalStorage = (name: string, value: any) => {
    const val = typeof value === "object"? JSON.stringify(value) : value;
    localStorage.setItem(name, val);
};

export const removeLocalStorage = (name: string) => {
    localStorage.removeItem(name);
}