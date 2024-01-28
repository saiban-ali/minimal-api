import http from "http";
import { CorsConfig } from "../types";

const DEFAULT_OPTIONS: CorsConfig = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "*",
};

const applyHeaders = (
  response: http.ServerResponse,
  headers: Record<string, string | undefined>
) => {
  Object.entries(headers).forEach(([key, value]) => {
    if (value) {
      response.setHeader(key, value);
    }
  });
};

export const cors = (
  request: http.IncomingMessage,
  response: http.ServerResponse,
  config?: CorsConfig
) => {
  const corsConfig = { ...DEFAULT_OPTIONS, ...config };

  const requestOrigin = request.headers.origin;

  const responseHeaders: Record<string, string | undefined> = {};

  if (corsConfig.origin === "*") {
    responseHeaders["Access-Control-Allow-Origin"] = "*";
  } else if (typeof corsConfig.origin === "string") {
    responseHeaders["Access-Control-Allow-Origin"] = corsConfig.origin;
  } else if (Array.isArray(corsConfig.origin)) {
    if (requestOrigin && corsConfig.origin.includes(requestOrigin)) {
      responseHeaders["Access-Control-Allow-Origin"] = requestOrigin;
    }
  }

  if (corsConfig.credentials) {
    responseHeaders["Access-Control-Allow-Credentials"] = "true";
  }

  if (corsConfig.methods) {
    const methods = Array.isArray(corsConfig.methods)
      ? corsConfig.methods.join(",")
      : corsConfig.methods;
    responseHeaders["Access-Control-Allow-Methods"] = methods;
  }

  if (corsConfig.allowedHeaders) {
    const allowedHeaders = Array.isArray(corsConfig.allowedHeaders)
      ? corsConfig.allowedHeaders.join(",")
      : corsConfig.allowedHeaders;
    responseHeaders["Access-Control-Allow-Headers"] = allowedHeaders;
  }

  if (corsConfig.exposedHeaders) {
    const exposedHeaders = Array.isArray(corsConfig.exposedHeaders)
      ? corsConfig.exposedHeaders.join(",")
      : corsConfig.exposedHeaders;
    responseHeaders["Access-Control-Expose-Headers"] = exposedHeaders;
  }

  if (corsConfig.maxAge != null) {
    responseHeaders["Access-Control-Max-Age"] = corsConfig.maxAge.toString();
  }

  applyHeaders(response, responseHeaders);
};
