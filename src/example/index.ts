import { createServer } from "../index";

const port = 4000;

const server = createServer({ port, cors: true }, () => {
  console.log(`Server listening on port ${port}`);
});

server.addRoute("get", "/", async () => {});
server.addRoute("get", "/id", async (request) => {
  return {
    statusCode: 200,
    contentType: "application/json",
    data: JSON.stringify({ message: "Id route hit" }),
  };
});

server.addRoute("get", "/id/nested", async (request) => {
  return {
    statusCode: 200,
    contentType: "application/json",
    data: JSON.stringify({
      message: "Nested route hit",
      query: request.searchParams.get("query"),
    }),
  };
});

server.addRoute("get", "/id/:param", async (request) => {
  return {
    statusCode: 200,
    contentType: "application/json",
    data: JSON.stringify({
      message: "param route hit",
      query: request.searchParams.get("query"),
      params: request.params,
    }),
  };
});

server.addRoute("get", "/id/:param2", async (request) => {
  return {
    statusCode: 200,
    contentType: "application/json",
    data: JSON.stringify({
      message: "param2 route hit",
      query: request.searchParams.get("query"),
      params: request.params,
    }),
  };
});

server.addRoute("get", "/id/:param2/nested", async (request) => {
  return {
    statusCode: 200,
    contentType: "application/json",
    data: JSON.stringify({
      message: "param2 nested route hit",
      query: request.searchParams.get("query"),
      params: request.params,
    }),
  };
});

server.addRoute("get", "/id/:param1/nested/:nested2", async (request) => {
  return {
    statusCode: 200,
    contentType: "application/json",
    data: JSON.stringify({
      message: "param1 nested2 route hit",
      query: request.searchParams.get("query"),
      params: request.params,
    }),
  };
});

server.addRoute("get", "/id/:param1/:nested2", async (request) => {
  return {
    statusCode: 200,
    contentType: "application/json",
    data: JSON.stringify({
      message: "param1 nested double route hit",
      query: request.searchParams.get("query"),
      params: request.params,
    }),
  };
});
