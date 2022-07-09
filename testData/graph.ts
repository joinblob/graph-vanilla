// const graph: Array<Array<String>> = [
//   ["p", "t", "u"],
//   ["t", "u"],
//   ["s", "t", "p", "v"],
//   ["u", "v"],
//   ["v", "p", "t"],
// ];

import Graph from "./GraphDataType";

const graph: Graph = {
  nodes: ["p", "t", "s", "u", "v"], // 0, 1, 2, 3, 4
  graph: [
    [0, 1, 3],
    [1, 3],
    [2, 1, 0, 4],
    [3, 4],
    [4, 0, 1],
  ],
};

// const graph: Graph = {
//   nodes: ["p", "t"], // 0, 1
//   graph: [[0, 1]],
// };

export default graph;
