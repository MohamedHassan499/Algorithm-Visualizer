const boardDimensions = { // some enum
  NUM_ROWS: 30,
  NUM_COLUMNS: 60,
} 

let positionStart = {
    row: undefined,
    column: undefined,
  },
  positionEnd = {
    row: undefined,
    column: undefined,
  } 

function createBoard() {
  const table = document.getElementById("board") 
  table.innerHTML = "" 
  for (let i = 1;  i <= boardDimensions.NUM_ROWS;  ++i) {
    let row = document.createElement("tr") 
    for (let j = 1;  j <= boardDimensions.NUM_COLUMNS;  ++j) {
      row.appendChild(createNode(i, j)) 
    }
    table.appendChild(row) 
  }
}

function createNode(row, column) {
  const node = document.createElement("td") 
  node.id = `${row}-${column}` 
  return node 
}

function createStartAndEnd() {
  calculatePositionsStartAndEnd() 
  const source = document.createElement("img"),
    target = document.createElement("img") 
  addAttributesToStartAndEnd(source, target) 

  document
    .getElementById(`${positionStart.row}-${positionStart.column}`)
    .appendChild(source) 
  document
    .getElementById(`${positionEnd.row}-${positionEnd.column}`)
    .appendChild(target) 
}

function calculatePositionsStartAndEnd() {
  positionStart.row = parseInt(1 + Math.random() * boardDimensions.NUM_ROWS) 
  positionStart.column = parseInt(
    1 + Math.random() * boardDimensions.NUM_COLUMNS
  ) 

  do {
    positionEnd.row = parseInt(1 + Math.random() * boardDimensions.NUM_ROWS) 
    positionEnd.column = parseInt(
      1 + Math.random() * boardDimensions.NUM_COLUMNS
    ) 
  } while (
    positionStart.row === positionEnd.row &&
    positionStart.column === positionEnd.column
  ) 
}

function setPositionStartAndEnd(start, end){
  positionStart = start
  positionEnd = end
}

function addAttributesToStartAndEnd(source, target) {
  source.src = "img/source.png" 
  source.classList.add("source") 
  source.id = `${positionStart.row}-${positionStart.column}` 

  target.src = "img/target.png" 
  target.classList.add("target") 
  target.id = `${positionEnd.row}-${positionEnd.column}` 
}

export { createBoard, createStartAndEnd, setPositionStartAndEnd, boardDimensions, positionStart, positionEnd }