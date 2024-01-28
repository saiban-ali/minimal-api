# Minimal-API

`Minimal-API` is a sleek and efficient Node.js package for creating HTTP servers. It's designed to be lightweight and dependency-free, offering a streamlined approach to server setup and route management. The package provides `createServer` and `getServer` functions for a seamless development experience.

## Features

- **Zero Dependencies**: Fully functional with no third-party dependencies.
- **Quick Server Setup**: Effortlessly set up an HTTP server with customizable options.
- **CORS Support**: In-built CORS handling for cross-origin requests.
- **Dynamic Route Handling**: Add and manage routes easily.
- **Singleton Server Access**: Conveniently access your server instance across your application.

## Installation

Install the package via npm:

```bash
npm install minimal-api
```

## Usage

### Creating a Server

Initialize your server using `createServer` with ES6 syntax:

```javascript
import { createServer } from "minimal-api";

const port = 4000;

const server = createServer({ port, cors: true }, () => {
  console.log(`Server listening on port ${port}`);
});
```

#### Options

| Option          | Type                  | Description                                                                                           | Default |
| --------------- | --------------------- | ----------------------------------------------------------------------------------------------------- | ------- |
| `port`          | `number`              | Server listening port.                                                                                | `4000`  |
| `cors`          | `boolean` \| `Object` | Configures CORS. Set to `true` for default settings, or provide an object for detailed configuration. | `false` |
| `serverOptions` | `http.ServerOptions`  | Additional options for the HTTP server.                                                               | `{}`    |

**CORS Object Structure:**

| Property         | Type                   | Description                                                 |
| ---------------- | ---------------------- | ----------------------------------------------------------- |
| `origin`         | `string` \| `string[]` | Specify allowed origins.                                    |
| `methods`        | `string` \| `string[]` | Allowed HTTP methods.                                       |
| `allowedHeaders` | `string` \| `string[]` | Custom headers that the server will accept.                 |
| `exposedHeaders` | `string` \| `string[]` | Headers that are safe to expose to the client.              |
| `credentials`    | `boolean`              | Indicates whether the request can include user credentials. |
| `maxAge`         | `number`               | Maximum age for the CORS settings.                          |

**MinimalRequest Type:**

| Property       | Type                                  | Description                       |
| -------------- | ------------------------------------- | --------------------------------- |
| `url`          | `string` \| `undefined`               | The request URL.                  |
| `method`       | `Method` \| `undefined`               | The HTTP method used.             |
| `headers`      | `http.IncomingHttpHeaders`            | The request headers.              |
| `searchParams` | `URLSearchParams`                     | The URL search parameters.        |
| `params`       | `Record<string, string \| undefined>` | URL parameters.                   |
| `json`         | `() => Promise<T>`                    | Function to get JSON body.        |
| `text`         | `() => Promise<string>`               | Function to get text body.        |
| `arrayBuffer`  | `() => Promise<ArrayBuffer>`          | Function to get ArrayBuffer body. |

**Handler Type:**

| Property    | Type                                                                                                                           | Description                  |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------ | ---------------------------- |
| `request`   | `MinimalRequest`                                                                                                               | The request object.          |
| **Returns** | `Promise< { contentType?: string; statusCode?: number; data?: any; headers?: Record<string, string>; } \| undefined \| void >` | The response object or void. |

### Adding Routes

Use `addRoute` to define routes on your server with ES6 syntax:

```javascript
import { MinimalRequest, Handler } from "minimal-api";

const routeHandler: Handler = async (request: MinimalRequest) => {
  // Handle the request
  // Return response details
};

server.addRoute("get", "/", routeHandler);
```

### Accessing the Server Instance

Retrieve the server instance anywhere in your code using ES6 imports:

```javascript
import { getServer } from "minimal-api";

const server = getServer();
// Now use 'server' as needed
```

## Example

Complete example of using `minimal-api` to set up a server, add routes, and access the server instance using ES6:

```javascript
import { createServer, getServer, MinimalRequest, Handler } from "minimal-api";

// Server setup
const server = createServer({ port: 4000, cors: true }, () => {
  console.log("Server is running on port 4000");
});

// Adding a route
const helloWorldHandler: Handler = async (request: MinimalRequest) => {
  // Handle request and return response details
  return {
    contentType: "text/plain",
    statusCode: 200,
    data: "Hello from Minimal-API!",
  };
};

server.addRoute("get", "/", helloWorldHandler);

// Accessing the server instance
const serverInstance = getServer();
// Utilize 'serverInstance' as required
```

## Contributing

Contributions are what make the open-source community an amazing place to learn, inspire, and create. Any contributions you make are **immensely appreciated**.

## License

Distributed under the MIT License. See [LICENSE](https://opensource.org/licenses/MIT) for more information.

## Contact

Saiban Ali - [@saiban-ali](https://linkedin.com/in/saibanali0405)

Project Link: [https://github.com/saiban-ali/minimal-api](https://github.com/saiban-ali/minimal-api)
