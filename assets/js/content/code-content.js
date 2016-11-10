var codeDescription = [
  {
    lines: [],
    description: "<h1>Code explanation<\/h1> <br> \
    <p class=\"description\">&nbsp;&nbsp;&nbsp;In this section the portions of the code highlighted in the other tab will be explained. Do keep in mind these explanations will be focused on the specifities of the CUDA API, and pieces of code considered common for C/C++ languages will be ignored.<br><br>\
    Note: If you have any doubts about any of the concepts mentioned here, please refer to the intro section.<\/p>"
  },
  {
    lines: [1, 2],
    description: "<h1>Defines<\/h1> <br> \
    <p class=\"description\">&nbsp;&nbsp;&nbsp;The first define, N, will be used to determine the size of the arrays created further ahead. In this case the value used is 2^20.<br>\
    &nbsp;&nbsp;&nbsp;The other define, M, will be used to determine the size of the blocks created when making kernel launches with multiples threads.<\/p>"
  },
  {
    lines: [3, 12],
    description: "<h1>Device code: functions<\/h1> <br> \
    <p class=\"description\">&nbsp;&nbsp;&nbsp;These are the functions that when called in the host code will be executed by the device. They will be explained in detail further ahead.<\/p>"
  },
  {
    lines: [17],
    description: "<h1>Host code: main function<\/h1> <br> \
    <p class=\"description\">&nbsp;&nbsp;&nbsp;In this specific example the host code consists of only the main function, but other ones could easily be created if needed.<\/p>"
  },
  {
      lines: [18, 19, 20, 21, 22, 23],
      description: "<h1>Arrays<\/h1> <br> \
      <p class=\"description\">&nbsp;&nbsp;&nbsp;The arrays used in the code are declared(note how the arrays that will be allocated inside the graphic memory are declared normally) and allocated here.<br> \
      &nbsp;&nbsp;&nbsp;It's important to note that the cudaMalloc function, unlike it's counterpart, malloc, does not return the address of the allocated memory. and instead must receive the pointer's address as a parameter.<\/p>"
  },
  {
      lines: [25, 26, 27, 28, 29, 30, 31],
      description: "<h1>Filling up the arrays<\/h1> <br> \
      <p class=\"description\">&nbsp;&nbsp;&nbsp;The loop first fills the host memory arrays, x and y, with <span class=\"code-variable\">1.0<\/span> and <span class=\"code-variable\">2.0<\/span> respectively.<br> \
      &nbsp;&nbsp;&nbsp;The values are then copied to their device memory counterparts, d_x and d_y, using the cudaMemcpy function. Since the copy is from host memory to device memory, the appropriate parameter must be passed to the function.<\/p>"
  },
  {
      lines: [33, 34, 12, 13, 14, 15],
      description: "<h1>saxpy function<\/h1> <br> \
      <p class=\"description\">&nbsp;&nbsp;&nbsp;The saxpy function creates many blocks and threads and makes it so every thread acesses a different index of the arrays, calculates (ax + y) and then saves the result to the corresponding position of the y array, all in parallel.<br> \
      &nbsp;&nbsp;&nbsp;The first important thing to note here is the kernel launch. The second parameter's value is the defined M value, no surprises there, but the first parameter must be adjusted so that no matter the size of the array passed, all its members bust be processed by a different thread, even if the number of threads surpasses the necessary.<br> \
      &nbsp;&nbsp;&nbsp;Inside the function itself, the i variable receives the index value of the numbers that will be processed by this specific thread, and then checks to see if the value is within bounds before calculating (ax + y) and saving the result in the y array. The boundary check is very important, because, as was just stated, the number of threads might be higher than the number of elements inside the array.<br> \
      &nbsp;&nbsp;&nbsp;Back in the host code, there is a cudaMemcpy call that copies the contents of <span class=\"code-variable\">d_y<\/span> back to the host memory pointed by <span class=\"code-variable\">y<\/span>. Due to the nature of the cudaMemcpy funtion, we have a guarantee that the array copied will contain the results after the execution of saxpy is finished. Also note that, as this time the copy is made from device to memory, the last parameter is different.<\/p>"
  },
  {
      lines: [35, 36, 3, 4, 5, 6, 7, 8, 9, 10],
      description: "<h1>reverse function<\/h1> <br> \
      <p class=\"description\">&nbsp;&nbsp;&nbsp;The reverse function, unlike the saxpy function, creates a single block and one thread for each array position and uses a shared memory between those threads to invert the contents of the array passed.<br> \
      &nbsp;&nbsp;&nbsp;The kernel launch and the cudaMemcpy function inside the host code do not offer anything new for us to comment.<br> \
      &nbsp;&nbsp;&nbsp;Inside the function though, there is a shared variable created. This array has the same size as the one to be reversed and, because of the __shared__ keyword, is created only once, since there is only one block.<br> \
      &nbsp;&nbsp;&nbsp;The <span class=\"code-variable\">t<\/span> variable contains the current position of the array, and the <span class=\"code-variable\">tr<\/span> variable contains it's mirrored position inside the array.<br> \
      &nbsp;&nbsp;&nbsp;The values of the original array are first copied to the auxiliar variable independently by each thread. There is then a call to the __syncthreads function, to guarantee that the values have been copied before they are copied back to the original array in their mirrored positions.<\/p>"
  },
  {
      lines: [39, 40, 41],
      description: "<h1>Memory deallocation and end of main function<\/h1> <br> \
      <p class=\"description\">After the execution is finished, the memory must be deallocated. As we can see, there is no difference between the free and cudaFree functions, unlike the previous equivalents.<\/p>"
  },
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
