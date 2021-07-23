import {
  boardDimensions,
  positionStart,
  positionEnd,
} from "../board.js" 
import colorShortestPath from '../events/colorpath.js'


export default function DFS() {
  const visited = {}
  const parent = {}
  const toAnimateNodes = []
  let row = positionStart.row,
    column = positionStart.column 

  traverseGraph(row, column, visited, toAnimateNodes, parent) 
  colorShortestPath(toAnimateNodes, parent,`${positionStart.row}-${positionStart.column}`)
}

function validNode(node, x, y, visited) {
  return (
    x >= 1 &&
    x <= boardDimensions.NUM_ROWS &&
    y >= 1 &&
    y <= boardDimensions.NUM_COLUMNS &&
    visited[node] == undefined
  ) 
}

function traverseGraph(row, column, visited, toAnimateNodes, parent) {
  visited[`${row}-${column}`] = true 

  if (visited[`${positionEnd.row}-${positionEnd.column}`] === true) return 

  const dx = [1, 0, 0, -1] 
  const dy = [0, 1, -1, 0] 

  for (let i = 0;  i < 4;  ++i) {
    const x = row + dx[i],
    y = column + dy[i] 
    const currentNode = `${x}-${y}` 
    if (validNode(currentNode, x, y, visited)) {
      parent[currentNode] = `${row}-${column}` 
      toAnimateNodes.push(currentNode)
      traverseGraph(x, y, visited, toAnimateNodes, parent) 
    }
  }
}