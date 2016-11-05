var index = 0;
var contentId = "";
var prevId = "";
var nextId = "";

function update() {
  index = clamp(index);
  document.getElementById(contentId).innerHTML = getIntroductionContent(index);
  if(!hasPrevious(index))
    document.getElementById(prevId).style.visibility = "hidden";
  else
    document.getElementById(prevId).style.visibility = "visible";
  if(!hasNext(index))
    document.getElementById(nextId).style.visibility = "hidden";
  else
    document.getElementById(nextId).style.visibility = "visible";
}

function previous() {
  index--;
  update();
}

function next() {
  index++;
  update();
}

function setIds(content, prev, next) {
  contentId = content;
  prevId = prev;
  nextId = next;
}
