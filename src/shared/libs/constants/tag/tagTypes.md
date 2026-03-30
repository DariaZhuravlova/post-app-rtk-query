# Tag Types (RTK Query + FSD)

Единая система тегов для RTK Query с использованием Feature-Sliced Design.
Позволяет избежать магических строк и синхронизировать invalidate/provide логику.

---

## 1. Константы тегов (shared слой)

**shared/constants/tagTypes.ts**

```ts
export const TAG_TYPES = {
  USER: "User",
  POST: "Post",
} as const;

export type TagType = (typeof TAG_TYPES)[keyof typeof TAG_TYPES];
```

---

## 2. Генератор queryKeys

**shared/lib/queryKeys/index.ts**

```ts
class GenerateQueryKeys<T> {
  private queryKey: T;

  constructor(key: T) {
    this.queryKey = key;
  }

  all() {
    return [this.queryKey as T];
  }

  lists() {
    return [{ type: this.queryKey as T, id: "LIST" }];
  }

  list(info: { [key: string]: any }) {
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
    return [{ type: this.queryKey as T, id: "ITEMS" }];
  }

  item(id: string | number) {
    return [...this.items(), { type: this.queryKey as T, id }];
  }
}

export const generateQueryKeys = <T extends string>(key: T) =>
  new GenerateQueryKeys<T>(key);
```

---

## 3. Использование в entities (пример: user)

### QueryKeys

**entities/user/model/queryKeys.ts**

```ts
import { generateQueryKeys } from "@/shared/lib/queryKeys";
import { TAG_TYPES } from "@/shared/constants/tagTypes";

export const userQueryKeys = generateQueryKeys(TAG_TYPES.USER);
```

---

### API

**entities/user/api/userApi.ts**

```ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userQueryKeys } from "../model/queryKeys";
import { TAG_TYPES } from "@/shared/constants/tagTypes";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: [TAG_TYPES.USER],

  endpoints: (builder) => ({
    getUsers: builder.query<any[], { page?: number }>({
      query: (params) => ({
        url: "/users",
        params,
      }),
      providesTags: (result, error, arg) => [
        ...userQueryKeys.lists(),
        ...userQueryKeys.list(arg || {}),
      ],
    }),

    getUserById: builder.query<any, number>({
      query: (id) => `/users/${id}`,
      providesTags: (result, error, id) => userQueryKeys.item(id),
    }),

    updateUser: builder.mutation<any, { id: number; data: any }>({
      query: ({ id, data }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        ...userQueryKeys.item(id),
        ...userQueryKeys.lists(),
      ],
    }),

    createUser: builder.mutation<any, any>({
      query: (data) => ({
        url: `/users`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: () => userQueryKeys.lists(),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useCreateUserMutation,
} = userApi;
```

---

## 4. Масштабируемость

```ts
tagTypes: Object.values(TAG_TYPES);
```

---

## 5. Структура проекта (FSD)

```
src/
  shared/
    constants/
      tagTypes.ts
      tagTypes.md
    lib/
      queryKeys/

  entities/
    user/
      api/
        userApi.ts
      model/
        queryKeys.ts

    post/
      api/
      model/
```

---

## 6. Что это даёт

- один источник правды для тегов
- отсутствие магических строк
- удобный invalidate/provide
- масштабируемость
- читаемый и предсказуемый код

---

## 7. Рекомендации

- всегда использовать `TAG_TYPES` вместо строк
- не фильтровать значения через `Boolean` (ломает `0`)
- держать queryKeys в `model` слое сущности
- не смешивать разные сущности в одном `queryKeys`
