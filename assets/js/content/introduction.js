var index = 0;
var contentId = "";
var prevId = "";
var nextId = "";

function update() {
  index = clamp(index);
  $(contentId).html(getIntroductionContent(index));
  if(!hasPrevious(index))
    $(prevId).css("visibility", "hidden");
  else
    $(prevId).css("visibility", "visible");
  if(!hasNext(index))
    $(nextId).css("visibility", "hidden");
  else
    $(nextId).css("visibility", "visible");
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
  contentId = "#" + content;
  prevId = "#" + prev;
  nextId = "#" + next;
}
