var codeDescription = [
  {
    lines: [],
    description: "<h1>Introduction to Code 1<\/h1> <br> \
    <p class=\"description\">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tortor nibh, iaculis sed elementum a, mattis ac nunc. Nunc placerat tristique tellus, ut accumsan erat mollis ut. Suspendisse ac quam pellentesque, dictum nisl eget, euismod felis. Donec ac rutrum mi. Suspendisse sit amet lacus consectetur, sagittis nisl ut, luctus est. Vivamus feugiat hendrerit nisl ut suscipit. Cras sed odio quis augue viverra accumsan. Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras ligula tellus, tincidunt nec quam ut, efficitur ullamcorper nulla.<\/p>"
  },
  {
    lines: [1, 2],
    description: "<h1>Introduction to Code 2<\/h1> <br> \
    <p class=\"description\">Phasellus semper odio et enim elementum, a semper neque accumsan. Aenean condimentum odio quis diam mollis, sit amet lobortis nisi auctor. Nam convallis erat sed dui hendrerit, ut dapibus eros convallis. Morbi sodales fermentum ante eu efficitur. Morbi iaculis urna arcu, vestibulum dictum erat hendrerit id. Pellentesque in purus lacus. Donec mollis efficitur commodo.<\/p>"
  },
  {
    lines: [17],
    description: "<h1>Introduction to Code 3<\/h1> <br> \
    <p class=\"description\">Suspendisse potenti. Suspendisse scelerisque fringilla molestie. Sed lobortis ex at venenatis maximus. In congue dui vel congue suscipit. Nunc ac nunc risus. Pellentesque efficitur lorem bibendum, tincidunt augue condimentum, pharetra nibh. Quisque faucibus lectus tincidunt lobortis maximus. Suspendisse maximus volutpat dui at suscipit. Nulla efficitur lobortis nulla a feugiat. Phasellus nec sem lectus. Donec auctor nulla quis condimentum aliquam. Curabitur eu facilisis velit, sed mollis libero. Cras dapibus sapien porta elit dignissim tincidunt. Phasellus quis augue at velit vulputate volutpat in vitae tortor.<\/p>"
  },
  {
    lines: [3, 12],
    description: "<h1>Introduction to Code 4<\/h1> <br> \
    <p class=\"description\">Curabitur nisi augue, blandit vitae risus non, vulputate blandit lacus. Curabitur maximus sem ac erat luctus consequat. Aliquam varius ullamcorper tellus non cursus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla gravida erat ligula, vehicula consequat ex aliquet pellentesque. Nulla vitae tortor luctus, vestibulum metus sit amet, posuere nulla. Nulla neque nibh, consectetur ut rhoncus at, suscipit sit amet urna. Interdum et malesuada fames ac ante ipsum primis in faucibus. Suspendisse pharetra turpis et dolor interdum, ut luctus arcu tempus. In tincidunt felis quis risus posuere, sed mattis enim commodo. Fusce non turpis ante. Phasellus ac dolor quam. Duis posuere efficitur lectus ut dignissim. Sed euismod maximus augue, vel pulvinar libero scelerisque convallis. Integer ut tellus eget sem scelerisque vulputate. Vivamus efficitur mattis felis id efficitur.<\/p>"
  }
];


function getCodeDescription(index) {
  if(index < 0)
    return null;
  if(index >= codeDescription.length)
    return null;
  return codeDescription[index].description;
}

function clearLines() {
  $("li[id|='l']").css("background-color", "none");
}

function colorLines(index, rgb) {
  var lines = codeDescription[index].lines;
  for (var i = 0; i < lines.length; i++) {
    $("#l-" + lines[i]).css("background-color", "#" + rgb);
  }
}

function hasPrevious(index) {
  if(index <= 0)
    return false;
  return true;
}

function hasNext(index) {
  if (index >= codeDescription.length - 1)
    return false;
  return true;
}

function clamp(index) {
  if(index < 0)
    return 0;
  if(index >= codeDescription.length)
    return codeDescription.length - 1;
  return index;
}
