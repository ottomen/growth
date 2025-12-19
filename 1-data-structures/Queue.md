# Queue

[<img src="./images/450px-Fifo_queue.png" width="450"/>](./images/450px-Fifo_queue.png)

FIFO is an abbreviation for first in, first out.

```javascript
const queue = [];
queue.push(1);
console.log(queue[0]);
queue[0] = 5;
queue.shift();
console.log(arr.find((item) => item === 10));
```

| Create | Read            | Update          | Delete       | Find |
| ------ | --------------- | --------------- | ------------ | ---- |
| O(1)   | O(1) peek front | O(1) front only | O(1) dequeue | O(n) |
