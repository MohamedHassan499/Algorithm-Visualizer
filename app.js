function colorCell(event){
    event.srcElement.style.backgroundColor = (event.srcElement.style.backgroundColor === 'black' ? 'white' : 'black'); 
}


var positionRowStart, positionColumnStart;
var positionRowEnd, positionColumnEnd;


function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
}



for(let i = 2; i <= 32; ++i){
     document.getElementsByClassName('select-row')[0].innerHTML += `<option>${i}</option>`
     document.getElementsByClassName('select-column')[0].innerHTML += `<option>${i}</option>`
}

document.getElementById('draw-board').addEventListener('click', constructNewBoard);


function constructNewBoard(){
    let table = document.getElementById('board');
    let numRows = document.getElementsByClassName('select-row')[0].value;
    let numColumns = document.getElementsByClassName('select-column')[0].value;
    table.innerHTML = '';
    for(let i = 1; i <= numRows; ++i){
        let newRow = document.createElement('tr');
        for(let j = 1; j <= numColumns; ++j){
            let newCell = document.createElement('td');
            newCell.setAttribute('id',  i + '-' + j);
            newCell.setAttribute('ondrop', 'drop(event)');
            newCell.setAttribute('ondragover', 'allowDrop(event)');
            newCell.setAttribute('onclick', 'colorCell(event)')
            newRow.appendChild(newCell);
        }
        table.appendChild(newRow);
    }

        positionRowStart = parseInt(1 + Math.random() * (numRows));
        positionColumnStart = parseInt(1 + Math.random() * (numColumns));

    do{
        positionRowEnd =  parseInt(1 + Math.random() * (numRows));
        positionColumnEnd = parseInt(1 + Math.random() * (numColumns));
    }while(positionColumnStart === positionColumnEnd && positionRowStart === positionRowEnd);

    let startCell = positionRowStart + '-' + positionColumnStart;
    let endCell = positionRowEnd + '-' + positionColumnEnd;

    let startSymbol = document.createElement('p');
    startSymbol.innerHTML = 's';
    startSymbol.setAttribute('draggable', 'true')

    let endSymbol = document.createElement('p');
    endSymbol.innerHTML = 'e';
    endSymbol.setAttribute('draggable', 'true')


    document.getElementById(startCell).appendChild(startSymbol);
    document.getElementById(endCell).appendChild(endSymbol);

}




function BFS(){

        let levels = 1;

        console.log('clicked')
        let numRows = document.getElementsByClassName('select-row')[0].value;
        let numColumns = document.getElementsByClassName('select-column')[0].value;

        let start = positionRowStart + '-' + positionColumnStart;
        let nodesQueue = [start];
        let toAnimateNodes = [];
        let visited = {
            start: true
        }

        const dx = [0, 1, 0, -1];
        const dy = [-1, 0, 1, 0];

        while(nodesQueue.length){

            let n = nodesQueue.length;

            for(let j = 0; j < n; ++j){

                let currentNode = nodesQueue[0];
                let x = parseInt(currentNode.substring(0, currentNode.indexOf('-')));
                let y = parseInt(currentNode.substring(currentNode.indexOf('-') + 1, currentNode.length));
                nodesQueue.shift();

                for(let i = 0; i < 4; ++i){
                    let changeX = x + dx[i], changeY = y + dy[i];
                    let temp = changeX + '-' + changeY;
                    if(changeX >= 1 && changeX <= numRows && changeY >= 1 && changeY <= numColumns
                        && visited[temp] == undefined && document.getElementById(temp).style.backgroundColor != 'black') {

                        if(temp == positionRowEnd + '-' + positionColumnEnd){
                            colorNode(toAnimateNodes);
                            return;
                         }

                         nodesQueue.push(temp);

                        document.getElementById(temp).innerHTML = levels;
                        visited[temp] = true;
                    }
                }


            }

            
            levels++;
        }  
}

document.getElementById('bfs').addEventListener('click', BFS);






function colorNode(nodes){
    
    for(let node of nodes){
         setTimeout(() => {
            document.getElementById(node).style.backgroundColor = '#40cee3';
        }, 0);
    }
}







document.getElementById('dfs').addEventListener('click', () => {

    let table = document.getElementById('board');
    let time = 1;
    const visited = {};
    const dx = [1, -1, 0, 0];
    const dy = [0, 0, -1, 1];
    let row = positionRowStart, column = positionColumnStart

    makeDFS(row, column, dx, dy, table, visited)

})

function makeDFS(row, column, dx, dy, table, visited){

    console.log(row, column)
    visited[row + '-' + column] = true;
    let numRows = document.getElementsByClassName('select-row')[0].value;
    let numColumns = document.getElementsByClassName('select-column')[0].value;
    if(visited[positionRowEnd + '-' + positionColumnEnd] == true)
        return;


    for(let i = 0; i < 4; ++i){

        if(  row + dx[i] >= 1 && row + dx[i] <=  numRows && column + dy[i] >= 1 && column + dy[i] <= numColumns &&  visited[(row + dx[i]) + '-' + (column + dy[i])] === undefined){
            makeDFS(row + dx[i], column + dy[i], dx, dy, table, visited)
        }
    }

}
