import { Handler, Method, MethodMap } from "../types";

const requestMap = new Map<Method, MethodMap>();
requestMap.set("get", new Map());
requestMap.set("post", new Map());
requestMap.set("put", new Map());
requestMap.set("delete", new Map());
requestMap.set("patch", new Map());
requestMap.set("head", new Map());

export const addRoute = (
  path: string,
  handler: Handler,
  methodMap: MethodMap
) => {
  if (path === "/") {
    methodMap?.set("/", { handler, paths: new Map() });
    return;
  }
  const pathChunks = path.split("/").filter((p) => p);
  pathChunks.forEach((chunk, index) => {
    const path = `/${chunk}`;
    if (!methodMap?.has(path)) {
      methodMap?.set(path, {
        handler: undefined,
        paths: new Map(),
      });
    }

    const pathMap = methodMap?.get(path)!;
    if (index === pathChunks.length - 1) {
      pathMap.handler = handler;
    }
    methodMap = pathMap.paths;
  });
};

export const getRequestHandler = (
  pathChunks: string[],
  map?: MethodMap,
  params: Record<string, string> = {}
): Handler | undefined => {
  if (pathChunks.length === 0) {
    return map?.get("/")?.handler as Handler;
  }

  const path = `/${pathChunks[0]}`;
  if (map?.has(path)) {
    const pathMap = map.get(path);
    if (pathChunks.length === 1) {
      return pathMap?.handler as Handler;
    }

    if (pathMap?.paths.size === 0) {
      return;
    }

    return getRequestHandler(pathChunks.slice(1), pathMap?.paths, params);
  }

  const keys = Array.from(map?.keys() ?? []).filter((key) => {
    return key.startsWith("/:");
  });

  if (keys.length === 0) {
    return;
  }

  if (pathChunks.length === 1) {
    for (const key of keys) {
      const pathMap = map?.get(key);
      if (pathMap?.handler) {
        params[key.slice(2)] = pathChunks[0];
        return pathMap.handler;
      }
    }

    return;
  }

  let handler;

  for (const key of keys) {
    const pathMap = map?.get(key);
    if (pathMap?.paths.size === 0) {
      continue;
    }

    handler = getRequestHandler(pathChunks.slice(1), pathMap?.paths, params);

    if (handler) {
      params[key.slice(2)] = pathChunks[0];
      break;
    }
  }

  return handler;
};

export const getHandlerMapForMethod = (method: Method) => {
  return requestMap.get(method);
};
