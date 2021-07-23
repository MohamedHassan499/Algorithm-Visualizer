import {
  boardDimensions,
  setPositionStartAndEnd,
  positionStart,
  positionEnd,
} from "../board.js" 

import colorShortestPath from '../events/colorpath.js'

function validNode(node, x, y, visited) {
  return (
    x >= 1 &&
    x <= boardDimensions.NUM_ROWS &&
    y >= 1 &&
    y <= boardDimensions.NUM_COLUMNS &&
    visited[node] == undefined &&
    document.getElementById(node).style.backgroundColor !== "black"
  ) 
}

export default function BFS() {
  setPositionStartAndEnd(positionStart, positionEnd) 

  const start = `${positionStart.row}-${positionStart.column}` 
  const nodesQueue = [start] 
  const toAnimateNodes = [start] 
  let visited = {} 

  let parent = {} 
  console.log(start) 

  const dx = [0, 1, 0, -1] 
  const dy = [-1, 0, 1, 0] 

  while (nodesQueue.length) {
    let n = nodesQueue.length 

    for (let j = 0;  j < n;  ++j) {
      let toStartNode = nodesQueue[0] 
      let x = parseInt(toStartNode.substring(0, toStartNode.indexOf("-"))) 
      let y = parseInt(
        toStartNode.substring(toStartNode.indexOf("-") + 1, toStartNode.length)
      ) 
      nodesQueue.shift() 

      for (let i = 0;  i < 4;  ++i) {
        let newX = x + dx[i], newY = y + dy[i] 
        let currentNode = `${newX}-${newY}` 
        if (validNode(currentNode, newX, newY, visited)) {
          parent[currentNode] = toStartNode 

          toAnimateNodes.push(currentNode) 

          if (currentNode == `${positionEnd.row}-${positionEnd.column}`) {
            colorShortestPath(toAnimateNodes, parent, start)
            return 
          }

          nodesQueue.push(currentNode) 

          visited[currentNode] = true 
        }
      }
    }
  }
}