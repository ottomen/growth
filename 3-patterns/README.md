## Real use cases

### DOM events

EventTarget: addEventListener() method
https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener

```javascript
document.addEventListener("click", (event) => {
  // ...
});
```

### Node.js

The Node.js Event emitter - https://nodejs.org/en/learn/asynchronous-work/the-nodejs-event-emitter

```javascript
const EventEmitter = require("node:events");
const eventEmitter = new EventEmitter();
eventEmitter.on("event", (name) => {
  // ...
});
```

### Electron.js

**Renderer process**

ipcRenderer https://www.electronjs.org/docs/latest/api/ipc-renderer#ipcrendererinvokechannel-args

```javascript
ipcRenderer.invoke("get-file", fileName).then((result) => {
  // get file content
});
```

**Main process**

```javascript
ipcMain.handle("get-file", async (event, fileName) => {
  // fetch and return file content
});
```

### WebSockets

WebSocket: close event
https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/close_event

```javascript
const ws = new WebSocket("wss://url");

ws.addEventListener("message", (event) => {
  console.log("Received:", event.data);
});

ws.addEventListener("open", () => {
  console.log("Connection established");
});

ws.addEventListener("close", () => {
  console.log("Connection closed");
});
```
