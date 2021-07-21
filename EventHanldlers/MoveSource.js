



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


