type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type ExtractResponseContent<
  TOperation,
  TMethod extends "get" | "post" | "put" | "patch" | "delete",
  TStatus extends number,
  TMime extends string = "application/json"
> = TOperation extends {
  [method in TMethod]: {
    responses: {
      [status in TStatus]: {
        content: {
          [mime in TMime]: infer TData;
        };
      };
    };
  };
}
  ? Prettify<TData> | undefined
  : never;

export type ExtractRequestBody<
  TOperation,
  TMethod extends "put" | "post" | "patch" | "delete",
  TMime extends string = "application/json"
> = TOperation extends {
  [method in TMethod]: {
    requestBody: {
      content: {
        [mime in TMime]: infer TData;
      };
    };
  };
}
  ? Prettify<TData>
  : never;
