class GenerateQueryKeys<T> {
    private queryKey: T;

    constructor(key: T) {
        this.queryKey = key;
    }

    all() {
        return [this.queryKey as T];
    }

    lists() {
        return [{type: this.queryKey as T, id: "LIST"}];
    }

    list(info: {[key: string]: any}) {
        return [
            ...this.lists(),
            ...Object.values(info)
                .filter((value) => value !== undefined && value !== null)
                .map((value) => ({
                    type: this.queryKey as T,
                    id: value,
                })),
        ];
    }

    items() {
        return [{type: this.queryKey as T, id: "ITEMS"}];
    }

    item(id: string | number) {
        return [...this.items(), {type: this.queryKey as T, id}];
    }
}

export const generateQueryKeys = <T extends string>(key: T) => new GenerateQueryKeys<T>(key);
