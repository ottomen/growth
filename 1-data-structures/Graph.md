# Graph

[<img src="./images/Tred-G.svg" width="450"/>](./images/Tred-G.svg)

A non-linear data structure consisting of Nodes (also called Vertices) and Edges (the connections between them). Unlike a Tree, a Graph has no "root" and can contain cycles (paths that loop back to the start).

Graphs are the systematic tool for modeling Networks. Connections can be:

- Directed: Like Twitter (User A follows User B, but not necessarily vice versa).
- Undirected: Like Facebook (A and B are "friends"—the connection is mutual).
- Weighted: Like Google Maps (the edge represents a distance or "cost").

## Big O and operations

| Create      | Read           | Update        | Delete      | Find             |
| ----------- | -------------- | ------------- | ----------- | ---------------- |
| O(1) vertex | O(1) adjacency | O(1) add edge | O(V) vertex | O(N + M) BFS/DFS |

## Possible operations and cost

```javascript
/**
 * Adjacency List implementation.
 * Best for "Sparse" graphs (few connections per node).
 */
const graph = {
  A: ["B", "C"],
  B: ["A", "D"],
  C: ["A"],
  D: ["B"],
};

// O(1) - Adding a new Vertex (Node)
graph["E"] = [];

// O(1) - Adding an Edge (Connection)
graph["A"].push("E");
graph["E"].push("A");

// O(N + M) - BFS Search
// Systematic way to find the shortest path in an unweighted graph.
function bfs(startNode, target) {
  const queue = [startNode];
  const visited = new Set();
  // ... traversal logic ...
}
```

## When to use

You can use this data structure in very specific use cases like:

- Social Networks: Modeling "Following" or "Friendship" relationships.
- Recommendation Engines: "People who liked X also liked Y" (analyzing connections between nodes).
- GPS & Pathfinding: Finding the shortest route between two physical locations (Dijkstra's Algorithm).
- Dependency Graphs: Used by package managers (npm, yarn) or build tools (Webpack) to determine the order of script execution.

## When to avoid

You don't need Graphs :)
