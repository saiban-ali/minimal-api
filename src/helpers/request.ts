import http from "http";
import { Method, MinimalRequest } from "../types";

const readRequestBody = async (request: http.IncomingMessage) => {
  return new Promise<Uint8Array[]>((resolve, reject) => {
    const data: Uint8Array[] = [];

    request.on("data", (chunk) => {
      data.push(chunk);
    });

    request.on("end", () => {
      resolve(data);
    });

    request.on("error", (error) => {
      reject(error);
    });
  });
};

const readJsonBody = async (request: http.IncomingMessage) => {
  const body = await readRequestBody(request);
  return JSON.parse(Buffer.concat(body).toString());
};

const readTextBody = async (request: http.IncomingMessage) => {
  const body = await readRequestBody(request);
  return Buffer.concat(body).toString();
};

const reactArrayBuffer = async (request: http.IncomingMessage) => {
  const body = await readRequestBody(request);
  return Buffer.concat(body).buffer;
};

export const createMinimalRequest = (
  request: http.IncomingMessage,
  url: URL,
  params: Record<string, string> = {}
): MinimalRequest => {
  return {
    url: request.url,
    method: request.method as Method,
    headers: request.headers,
    searchParams: url.searchParams,
    params,
    json: () => readJsonBody(request),
    text: () => readTextBody(request),
    arrayBuffer: () => reactArrayBuffer(request),
  };
};
