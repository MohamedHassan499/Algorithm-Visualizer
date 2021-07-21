
document.getElementById("dfs").addEventListener("click", () => {
    let delay = 1 
    let table = document.getElementById("board") 
    let time = 1 
    const visited = {} 
    const dx = [1, -1, 0, 0] 
    const dy = [0, 0, -1, 1] 
    let row = positionRowStart,
      column = positionColumnStart 
  
    makeDFS(row, column, dx, dy, table, visited, delay) 
  }) 
  
  function makeDFS(row, column, dx, dy, table, visited, delay) {
    const NUM_ROWS = 30,
      NUM_COLUMNS = 60 
    visited[`${row}-${column}`] = true 
    if (visited[positionRowEnd + "-" + positionColumnEnd] == true) return 
  
    for (let i = 0;  i < 4;  ++i) {
      const x = row + dx[i],
        y = column + dy[i] 
      const currentNode = `${x}-${y}` 
      if (
        x >= 1 &&
        x <= NUM_ROWS &&
        y >= 1 &&
        y <= NUM_COLUMNS &&
        visited[currentNode] === undefined
      ) {
        document.getElementById(currentNode).style.backgroundColor =
        "#49a5d7" 
  
      document.getElementById(
        currentNode
      ).style.transitionDelay = `${delay}s` 
      delay += 0.5 
        makeDFS(row + dx[i], column + dy[i], dx, dy, table, visited) 
      }
    }
  }