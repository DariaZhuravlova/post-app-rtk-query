export const TAG_TYPES = {
    USER: "User",
    POST: "Post",
} as const;

export type TagType = (typeof TAG_TYPES)[keyof typeof TAG_TYPES];
