import { createBoard, createStartAndEnd } from './board.js'
import BFS from './algorithms/bfs.js'
import DFS from './algorithms/dfs.js'

window.onload = () => {
  createBoard()
  createStartAndEnd()
}

document.getElementById("bfs").addEventListener("click", BFS) 
document.getElementById('dfs').addEventListener("click", DFS)