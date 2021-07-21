

function BFS() {
    let levels = 1 
    const NUM_ROWS = 30,
      NUM_COLUMNS = 60 
  
    let delay = 0.5 
  
    let start = `${positionRowStart}-${positionColumnStart}` 
    let nodesQueue = [start] 
    let toAnimateNodes = [] 
    let visited = {
      start: true,
    } 
  
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
          let changeX = x + dx[i],
            changeY = y + dy[i] 
          let currentNode = `${changeX}-${changeY}` 
          if (
            changeX >= 1 &&
            changeX <= NUM_ROWS &&
            changeY >= 1 &&
            changeY <= NUM_COLUMNS &&
            visited[currentNode] == undefined &&
            document.getElementById(currentNode).style.backgroundColor != "black" &&
            currentNode != start
          ) {
            parent[currentNode] = toStartNode 
  
            toAnimateNodes.push(currentNode) 
  
            setTimeout(() => {
              document.getElementById(currentNode).style.backgroundColor =
              "#49a5d7" 
            }, 0)
  
  
            document.getElementById(
              currentNode
            ).style.transitionDelay = `${delay}s` 
            delay += 0.005 
  
            if (currentNode == `${positionRowEnd}-${positionColumnEnd}`) {
              colorShortestPath(toAnimateNodes, parent, start, delay) 
              return 
            }
  
            nodesQueue.push(currentNode) 
  
            visited[currentNode] = true 
          }
        }
      }
    }
  }