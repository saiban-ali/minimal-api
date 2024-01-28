import http from "http";
import { cors } from "./helpers/cors";
import { createMinimalRequest } from "./helpers/request";
import {
  addRoute,
  getHandlerMapForMethod,
  getRequestHandler,
} from "./helpers/router";
import { CreateServerConfig, Handler, Method, MinimalServer } from "./types";

let _server: MinimalServer;

function createServer(
  config?: CreateServerConfig,
  callback?: () => void
): MinimalServer;
function createServer(callback?: () => void): MinimalServer;
function createServer(
  configOrCallback?: CreateServerConfig | (() => void),
  callbackArg?: () => void
) {
  const config =
    typeof configOrCallback === "function" ? undefined : configOrCallback;
  const callback =
    typeof configOrCallback === "function" ? configOrCallback : callbackArg;

  const server = http.createServer(async (request, response) => {
    // Set CORS headers

    if (config?.cors) {
      cors(
        request,
        response,
        typeof config?.cors === "object" ? config?.cors : undefined
      );
    }

    // Handle Preflight Request
    if (request.method === "OPTIONS") {
      response.statusCode = 204;
      response.end();
      return;
    }

    const url = new URL(request.url!, `http://${request.headers.host}`);
    const methodHandlers = getHandlerMapForMethod(
      request.method?.toLowerCase() as Method
    );

    const params: Record<string, string> = {};
    const handler = getRequestHandler(
      url.pathname.split("/").filter((p) => p),
      methodHandlers,
      params
    );

    if (!handler) {
      response.writeHead(404, "Not Found");
      response.end();
      return;
    }

    handler(createMinimalRequest(request, url, params)).then((result) => {
      if (!result) {
        response.statusCode = 200;
        response.end();
        return;
      }

      const { contentType, statusCode, data, headers } = result;

      response.setHeader("Content-Type", "text/plain");

      if (contentType) {
        response.setHeader("Content-Type", contentType);
      }

      response.statusCode = statusCode ?? 200;

      if (headers) {
        for (const [key, value] of Object.entries(headers)) {
          response.setHeader(key, value);
        }
      }

      response.end(data);
    });
  });

  const port = config?.port ?? 4000;

  server.listen(port, callback);

  _server = {
    httpServer: server,
    addRoute: (method: Method, path: string, handler: Handler) => {
      const methodMap = getHandlerMapForMethod(method.toLowerCase() as Method);
      if (!methodMap) {
        throw new Error(`Unsupported method: ${method}`);
      }

      addRoute(path, handler, methodMap);
    },
  };

  return _server;
}

const getServer = () => _server;

export { createServer, getServer };
