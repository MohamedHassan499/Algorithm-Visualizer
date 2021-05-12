let lastCell = '';

let stillClicking = false;

// function mouseDown(){
//   stillClicking = true;
//   lastCell = 'x'
//   console.log(stillClicking)
// }

// function mouseUp(){
//   stillClicking = false;
//   lastCell = '';
//   console.log(stillClicking)

// }

// function hi(){
//   if(stillClicking){
//     console.log('hi');
//   }
// }

function colorCell(event) {
  if(lastCell != event.target.id && stillClicking){
  event.srcElement.style.backgroundColor =
    event.srcElement.style.backgroundColor === "black" ? "white" : "black";
  }
  lastCell = event.target.id;
}



































var positionRowStart, positionColumnStart;
var positionRowEnd, positionColumnEnd;

function BFS() {
  let levels = 1;
  const NUM_ROWS = 10,
    NUM_COLUMNS = 10;

  let delay = 0.5;

  let start = `${positionRowStart}-${positionColumnStart}`;
  let nodesQueue = [start];
  let toAnimateNodes = [];
  let visited = {
    start: true,
  };

  let parent = {};
  console.log(start)

  const dx = [0, 1, 0, -1];
  const dy = [-1, 0, 1, 0];

  while (nodesQueue.length) {
    let n = nodesQueue.length;

    for (let j = 0; j < n; ++j) {
      let toStartNode = nodesQueue[0];
      let x = parseInt(toStartNode.substring(0, toStartNode.indexOf("-")));
      let y = parseInt(
        toStartNode.substring(toStartNode.indexOf("-") + 1, toStartNode.length)
      );
      nodesQueue.shift();

      for (let i = 0; i < 4; ++i) {
        let changeX = x + dx[i],
          changeY = y + dy[i];
        let currentNode = `${changeX}-${changeY}`;
        if (
          changeX >= 1 &&
          changeX <= NUM_ROWS &&
          changeY >= 1 &&
          changeY <= NUM_COLUMNS &&
          visited[currentNode] == undefined &&
          document.getElementById(currentNode).style.backgroundColor != "black" &&
          currentNode != start
        ) {
          parent[currentNode] = toStartNode;

          toAnimateNodes.push(currentNode);
          document.getElementById(currentNode).style.backgroundColor =
            "#49a5d7";

          document.getElementById(
            currentNode
          ).style.transitionDelay = `${delay}s`;
          delay += 0.05;

          if (currentNode == `${positionRowEnd}-${positionColumnEnd}`) {
            colorShortestPath(toAnimateNodes, parent, start, delay);
            return;
          }

          nodesQueue.push(currentNode);

          visited[currentNode] = true;
        }
      }
    }
  }
}

document.getElementById("bfs").addEventListener("click", BFS);

function colorShortestPath(nodes, parent, start, delay) {
  let crawl = nodes[nodes.length - 1];
  let path = [];
  path.push(crawl);

  while (parent[crawl] !== start) {
    path.push(parent[crawl]);
    crawl = parent[crawl];
  }
  path.push(crawl);
  path = path.reverse();
  setTimeout(() => {
    path.forEach((node) => {
      document.getElementById(node).style.backgroundColor = "#fffe6a";
    });
  }, delay * 10);
}

document.getElementById("dfs").addEventListener("click", () => {
  let delay = 1;
  let table = document.getElementById("board");
  let time = 1;
  const visited = {};
  const dx = [1, -1, 0, 0];
  const dy = [0, 0, -1, 1];
  let row = positionRowStart,
    column = positionColumnStart;

  makeDFS(row, column, dx, dy, table, visited, delay);
});

function makeDFS(row, column, dx, dy, table, visited, delay) {
  const NUM_ROWS = 10,
    NUM_COLUMNS = 10;
  visited[`${row}-${column}`] = true;
  if (visited[positionRowEnd + "-" + positionColumnEnd] == true) return;

  for (let i = 0; i < 4; ++i) {
    const x = row + dx[i],
      y = column + dy[i];
    const currentNode = `${x}-${y}`;
    if (
      x >= 1 &&
      x <= NUM_ROWS &&
      y >= 1 &&
      y <= NUM_COLUMNS &&
      visited[currentNode] === undefined
    ) {
      document.getElementById(currentNode).style.backgroundColor =
      "#49a5d7";

    document.getElementById(
      currentNode
    ).style.transitionDelay = `${delay}s`;
    delay += 0.5;
      makeDFS(row + dx[i], column + dy[i], dx, dy, table, visited);
    }
  }
}

function initializeBoard() {
  let table = document.getElementById("board");
  const NUM_ROWS = 10,
    NUM_COLUMNS = 10;
  table.innerHTML = "";
  for (let i = 1; i <= NUM_ROWS; ++i) {
    let newRow = document.createElement("tr");
    for (let j = 1; j <= NUM_COLUMNS; ++j) {
      let newCell = document.createElement("td");
      newCell.classList.add('empty')
      newCell.setAttribute("id", i + "-" + j);
      newCell.setAttribute("onclick", "colorCell(event)");
      newCell.setAttribute("onmousemove", "colorCell(event)");
      newCell.setAttribute("onmouseup", "mouseUp()");
      newCell.setAttribute("onmousedown", "mouseDown()");
      newRow.appendChild(newCell);
    }
    table.appendChild(newRow);
  }

  positionRowStart = parseInt(1 + Math.random() * NUM_ROWS);
  positionColumnStart = parseInt(1 + Math.random() * NUM_COLUMNS);

  do {
    positionRowEnd = parseInt(1 + Math.random() * NUM_ROWS);
    positionColumnEnd = parseInt(1 + Math.random() * NUM_COLUMNS);
  } while (
    positionColumnStart === positionColumnEnd &&
    positionRowStart === positionRowEnd
  );

  let startCell = positionRowStart + "-" + positionColumnStart;
  let endCell = positionRowEnd + "-" + positionColumnEnd;

    let sourceImg = document.createElement('img');
    sourceImg.setAttribute('src', 'source.png')
    sourceImg.classList.add('source')

    let targetImg = document.createElement('img');
    targetImg.setAttribute('src', 'target.png')
    targetImg.classList.add('target')

  document.getElementById(startCell).appendChild(sourceImg);
  document.getElementById(endCell).appendChild(targetImg);
  
}

initializeBoard();




const fill = document.querySelector('.source');
const empties = document.querySelectorAll('.empty');

// Fill listeners
fill.addEventListener('dragstart', dragStart);
fill.addEventListener('dragend', dragEnd);

// Loop through empty boxes and add listeners
for (const empty of empties) {
  empty.addEventListener('dragover', dragOver);
  empty.addEventListener('dragenter', dragEnter);
  empty.addEventListener('dragleave', dragLeave);
  empty.addEventListener('drop', dragDrop);
}






function dragStart() {
  setTimeout(() => (this.className = 'invisible'), 0);
}

function dragEnd(e) {
  this.className = 'fill';
  let id = document.getElementsByClassName('fill')[0].parentElement.id
  console.log(id)
  id = id.split('-')
  positionRowStart = id[0], positionColumnStart = id[1]
  console.log(positionRowStart, positionColumnStart)
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
  this.className += ' hovered';
}

function dragLeave() {
  this.className = 'empty';
}

function dragDrop() {
  this.className = 'empty';
  this.append(fill);
}



