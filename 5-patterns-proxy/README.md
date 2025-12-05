# Proxy pattern

In computer programming, the proxy pattern is a software design pattern. A proxy, in its most general form, is a class functioning as an interface to something else.
The proxy could interface to anything: a network connection, a large object in memory, a file, or some other resource that is expensive or impossible to duplicate. In short, a proxy is a wrapper or agent object that is being called by the client to access the real serving object behind the scenes.

## Use cases:

- Access control (Protection Proxy)
- Interceptors for original object (Interceptor Proxy)
- Validation for setter/getter/apply of original object
- Memoization/caching of values
- Logging purposes

## Vanilla JS Proxy

The Proxy object enables you to create a proxy for another object, which can intercept and redefine fundamental operations for that object.

```js
const obj = {
  name: "Some",
};

const proxiedObj = new Proxy(obj, {});

console.log(proxiedObj.name);
```

[Vanilla Proxy example](./vanilla-proxy.ts)

Limitations: Proxy does not have direct access to the original object's private elements.

## Immer.js

Immer (German for: always) is a tiny package that allows you to work with immutable state in a more convenient way.

Link: https://immerjs.github.io/immer/

## Nginx Reverse proxy

[<img src="./images/nginx-proxy.png" width="650"/>](./images/nginx-proxy.png)

In computer networks, a reverse proxy or surrogate server is a proxy server that appears to any client to be an ordinary web server, but in reality merely acts as an intermediary that forwards the client's requests to one or more ordinary web servers.
Reverse proxies help increase scalability, performance, resilience, and security, but they also carry a number of risks.

Link: https://docs.nginx.com/nginx/admin-guide/web-server/reverse-proxy/

### Layer 4 vs Layer 7

Layer 4 load balancing takes place at the transport layer of the OSI model, which is in charge of delivering messages regardless of their content. Layer 4 load balancers simply route network packets to and from the upstream server without inspecting them. By reviewing the initial few packets in the transmission control protocol (TCP) stream, they can only make limited routing decisions.

Layer 7 load balancing works at the application layer of the OSI model, which is in charge of the message’s actual content. Application Load Balancers route network traffic in a more complex way, typically for TCP-based traffic such as HTTP or HTTPS. A Layer 7 load balancer, unlike a Layer 4 load balancer, disconnects network traffic and processes the message inside.

Link: https://medium.com/@harishramkumar/difference-between-layer-4-vs-layer-7-load-balancing-57464e29ed9f

