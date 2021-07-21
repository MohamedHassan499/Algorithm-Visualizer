var positionRowStart, positionColumnStart;
var positionRowEnd, positionColumnEnd;

let isToggling = false;

function enableToggle(e) {
  console.log(e.target.id)
  isToggling = true;
  let table = document.getElementById('board')
  if (e.target === table) {
    toggle(e);
  }
}

function disableToggle() {
  console.log('disableToggle')
  isToggling = false;
}

function toggle(e) {
  if (isToggling === false) {
    return;
  }
  e.target.style.backgroundColor = e.target.style.backgroundColor == "black" ? "white" : "black"
}



function BFS() {
  let levels = 1;
  const NUM_ROWS = 30,
    NUM_COLUMNS = 60;

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

          setTimeout(() => {
            document.getElementById(currentNode).style.backgroundColor =
            "#49a5d7";
          }, 0)


          document.getElementById(
            currentNode
          ).style.transitionDelay = `${delay}s`;
          delay += 0.005;

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
  const NUM_ROWS = 30,
    NUM_COLUMNS = 60;
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


window.onload = function(){

  let table = document.getElementById("board");
  table.onmousedown = enableToggle;
  const NUM_ROWS = 30,
    NUM_COLUMNS = 60;
  table.innerHTML = "";
  for (let i = 1; i <= NUM_ROWS; ++i) {
    let newRow = document.createElement("tr");
    for (let j = 1; j <= NUM_COLUMNS; ++j) {
      let newCell = document.createElement("td");


      newCell.classList.add('empty')
      //newCell.setAttribute('onmousedown', 'return false');
      newCell.setAttribute("id", i + "-" + j);
      newCell.onmouseenter = toggle;

      newCell.setAttribute('ondrop', 'drop(event)'); 
      newCell.setAttribute('ondragover', 'allowDrop(event)');


      newRow.appendChild(newCell);
    }
    table.appendChild(newRow);
  }

  table.onmouseup = disableToggle;

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
    sourceImg.setAttribute('id', 'source')
    sourceImg.setAttribute('draggable', 'true')
    sourceImg.setAttribute('ondragstart', 'drag(event)')
    

    let targetImg = document.createElement('img');
    targetImg.setAttribute('src', 'target.png')

    
    targetImg.classList.add('target')
    targetImg.setAttribute('id', 'target')
    targetImg.setAttribute('draggable', 'true')
    targetImg.setAttribute('ondragstart', 'drag(event)')


  document.getElementById(startCell).appendChild(sourceImg);
  document.getElementById(endCell).appendChild(targetImg);
  
}









function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  console.log(ev.target.id)
  let newPosition = ev.target.id.split('-')
  positionRowStart = newPosition[0], positonColumnStart = newPosition[1]
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
}