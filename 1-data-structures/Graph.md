# Graph

[<img src="./images/Tred-G.svg" width="450"/>](./images/Tred-G.svg)

```javascript
const graph = {
  A: ["B", "C"],
  B: ["A", "D"],
  C: ["A"],
  D: ["B"],
};

graph["E"] = ["A"];
console.log(graph["A"]);
graph["A"].push("E");
delete graph["E"];
console.log("A" in graph);
```

| Create      | Read           | Update        | Delete      | Find             |
| ----------- | -------------- | ------------- | ----------- | ---------------- |
| O(1) vertex | O(1) adjacency | O(1) add edge | O(V) vertex | O(V + E) BFS/DFS |
