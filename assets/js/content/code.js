window.onload = function() {
  prettyPrint();
  $("li.L0").each(function(index) {
    $(this).attr("id", "l-" + (index * 10));
  });
  $("li.L1").each(function(index) {
    $(this).attr("id", "l-" + (index * 10 + 1));
  });
  $("li.L2").each(function(index) {
    $(this).attr("id", "l-" + (index * 10 + 2));
  });
  $("li.L3").each(function(index) {
    $(this).attr("id", "l-" + (index * 10 + 3));
  });
  $("li.L4").each(function(index) {
    $(this).attr("id", "l-" + (index * 10 + 4));
  });
  $("li.L5").each(function(index) {
    $(this).attr("id", "l-" + (index * 10 + 5));
  });
  $("li.L6").each(function(index) {
    $(this).attr("id", "l-" + (index * 10 + 6));
  });
  $("li.L7").each(function(index) {
    $(this).attr("id", "l-" + (index * 10 + 7));
  });
  $("li.L8").each(function(index) {
    $(this).attr("id", "l-" + (index * 10 + 8));
  });
  $("li.L9").each(function(index) {
    $(this).attr("id", "l-" + (index * 10 + 9));
  });
}

var index = 0;
var descriptionId = "";
var prevId = "";
var nextId = "";

function update() {
  index = clamp(index);
  $(descriptionId).html(getCodeDescription(index));
  clearLines();
  colorLines(index, "FFDE84");
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

function setIds(description, prev, next) {
  descriptionId = "#" + description;
  prevId = "#" + prev;
  nextId = "#" + next;
}
