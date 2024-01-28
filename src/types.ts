import http from "http";

export type CorsConfig = {
  origin?: string | string[];
  methods?: string | string[];
  allowedHeaders?: string | string[];
  exposedHeaders?: string | string[];
  credentials?: boolean;
  maxAge?: number;
};

export type CreateServerConfig = {
  port?: number;
  cors?: true | CorsConfig;
};

export type Method = "get" | "post" | "put" | "delete" | "patch" | "head";

export type MinimalRequest<T = any> = {
  url: string | undefined;
  method: Method | undefined;
  headers: http.IncomingHttpHeaders;
  searchParams: URLSearchParams;
  params: Record<string, string | undefined>;
  json: () => Promise<T>;
  text: () => Promise<string>;
  arrayBuffer: () => Promise<ArrayBuffer>;
};

export type Handler = (request: MinimalRequest) => Promise<
  | {
      contentType?: string;
      statusCode?: number;
      data?: any;
      headers?: Record<string, string>;
    }
  | undefined
  | void
>;

export type MinimalServer = {
  httpServer: http.Server;
  addRoute: (method: Method, path: string, handler: Handler) => void;
};

export type MethodMap = Map<string, { handler?: Handler; paths: MethodMap }>;
