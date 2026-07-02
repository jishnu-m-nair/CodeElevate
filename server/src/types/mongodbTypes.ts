export type MongoSet<T> = Partial<T>;
export type MongoUnset<T> = Partial<Record<keyof T, '' | 1>>;
