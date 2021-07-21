document.getElementById("bfs").addEventListener("click", BFS) 

function colorShortestPath(nodes, parent, start, delay) {
  let crawl = nodes[nodes.length - 1] 
  let path = [] 
  path.push(crawl) 

  while (parent[crawl] !== start) {
    path.push(parent[crawl]) 
    crawl = parent[crawl] 
  }
  path.push(crawl) 
  path = path.reverse() 
  setTimeout(() => {
    path.forEach((node) => {
      document.getElementById(node).style.backgroundColor = "#fffe6a" 
    }) 
  }, delay * 10) 
}