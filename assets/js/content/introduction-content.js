var introductionContent = [
  "<h1>Introduction<\/h1> \
<p class=\"introduction\">CUDA is an API (Application Programming Interface) model created by Nvidia, a technology company that design graphics processing units (GPUs) and other related technologies.<\/p> \
<p class=\"introduction\">The API takes advantage of the high parallelism of the GPUs and computational capacity for general purpose applications, like fast sort algorithms of large lists and molecular dynamics simulations.<\/p>",

  "<h1>Terminology<\/h1> \
  CUDA memory access and processing are divided in two categories, according to where they happen: \
<h2>Host<\/h2> \
<p class=\"introduction\">The CPU and its memory (primary memory).<\/p> <br>\
<img src=\"assets\/img\/cpu+ram.png\" width=\"200\" height=\"105\" \/> \
<h2>Device<\/h2> \
<p class=\"introduction\">The GPU and its memory (graphic memory).<\/p> <br>\
<img src=\"assets\/img\/geforce.png\" width=\"200\" height=\"148\" \/>",

  "<h1>Code Execution<\/h1> <br> \
<p class=\"introduction\">Normally the execution is divided in 3 steps:<\/p> \
<ol type=\"1\" class=\"ol-introduction\"> \
<li>Copy data (from CPU primary memory) to GPU memory.<\/li> \
<li>Load GPU code in the graphics card.<\/li> \
<li>Copy results from GPU memory into the CPU memory.<\/li> \
<\/ol>",

  "<h2>Step 1<\/h2> <br> \
<img src=\"assets\/img\/cuda1.png\" class=\"cuda-img\"\/> \
<p class=\"introduction\">The data is copied from CPU memory in to GPU memory, passing through the PCI bus.<\/p>",

  "<h2>Step 2<\/h2> <br> \
<img src=\"assets\/img\/cuda2.png\" class=\"cuda-img\"\/> \
<p class=\"introduction\">The GPU code is loaded and executed caching data on chip to increase the performance.<\/p>",

  "<h2>Step 3<\/h2> <br> \
<img src=\"assets\/img\/cuda3.png\" class=\"cuda-img\"\/> \
<p class=\"introduction\">The results are copied from GPU memory in to CPU memory, passing through the PCI bus.<\/p>",

  "<h2>Memory management<\/h2> <br> \
<p class=\"introduction\">The data from host memory needs to be copied to the device memory before the device code call.<\/p> \
<p class=\"introduction\">Functions from CUDA API: <span class=\"code-green\">cudaMalloc<\/span>(), <span class=\"code-green\">cudaFree<\/span>(), <span class=\"code-green\">cudaMemcpy<\/span>().<\/p> \
<p class=\"introduction\">These functions are similar to <span class=\"code-blue\">malloc<\/span>(), <span class=\"code-blue\">free<\/span>() and <span class=\"code-blue\">memcpy<\/span>() from C/C++, but the ones from CUDA API handle data on the device memory.<\/p>",

  "<h2>Keyword <span class=\"code-green\">__global__<\/span><\/h2> <br> \
<p class=\"introduction\">Used to declare device code functions. It is called from host code and executed on the device, parallel to the execution of the host code, unless synchronization is forced using the corresponding functions.<\/p> <br> \
  <h2>Triple angle brackets<\/h2> <br> \
<p>&lt;&lt;&lt;<span class=\"code-variable\">N<\/span>, <span class=\"code-variable\">M<\/span>&gt;&gt;&gt; <\/p> \
<p class=\"introduction\">The triple angle brackets are used to make a call from host code to device code (also called a kernel launch) with <b>N<\/b> parallel blocks and <b>M<\/b> parallel threads per block.<\/p>",

  "<h2>Blocks<\/h2> <br> \
<p class=\"introduction\">Whenever a &lt;&lt;&lt;<span class=\"code-variable\">N<\/span>, <span class=\"code-variable\">M<\/span>&gt;&gt;&gt; kernel launch is made, a grid is created containing <b>N<\/b> blocks that will be executed in parallel.<\/p> \
<p class=\"introduction\">We can identify how many blocks are being executed through the <span class=\"code-variable\">gridDim<\/span>.x variable, and obtain the index of the current block through the <span class=\"code-variable\">blockIdx<\/span>.x variable.<\/p> \
<p class=\"introduction\">Note: the <b>.x<\/b> indicates the dimension being used, and the respective <b>.y<\/b> and <b>.z<\/b> values can also be obtained, but for the sake of simplicity only the <b>.x<\/b> value will be used here.<\/p>",

  "<h2>Threads<\/h2> <br> \
<p class=\"introduction\">Every block can be further divided into threads. Whenever a kernel launch &lt;&lt;&lt;<span class=\"code-variable\">N<\/span>, <span class=\"code-variable\">M<\/span>&gt;&gt;&gt; is made, the <b>N<\/b> blocks created will be divided into <b>M<\/b> threads.<\/p> \
<p class=\"introduction\">As with the blocks, we can identify the number of threads inside a block through the <span class=\"code-variable\">blockDim<\/span>.x variable and obtain the index of the current thread through the <span class=\"code-variable\">threadIdx<\/span>.x variable.<\/p> \
<p class=\"introduction\">If, for example, we want a code to access a vector in a way that each thread accesses a different vector position, the position to be accessed would be (<span class=\"code-variable\">blockIdx<\/span>.x <span class=\"code-operator\">*<\/span> <span class=\"code-variable\">blockDim<\/span>.x <span class=\"code-operator\">+<\/span> <span class=\"code-variable\">threadIdx<\/span>.x), and the corresponding kernel launch would be &lt;&lt;&lt;(<span class=\"code-variable\">arraySize<\/span>/<span class=\"code-variable\">blockSize<\/span> + <span class=\"code-variable\">1<\/span>), blockSize&gt;&gt;&gt;, resulting in something like this:<\/p> <br> \
<img src=\"assets\/img\/threads.png\" class=\"cuda-img\"\/>",

  "<h2>Threads (advantages)<\/h2> <br> \
<p class=\"introduction\">Threads, unlike blocks, have tools to facilitate parallel tasks, such as shared variables and syncing mechanisms. \
<p class=\"introduction\">If a variable is declared adding <span class=\"code-green\">__shared__<\/span> before the type, it will be allocated once per block and made available to all threads inside the current block.<\/p> \
<p class=\"introduction\">There is a function, <span class=\"code-green\">__syncthreads<\/span>(), that creates a barrier to synchronize all threads within the current block.<\/p>",

  "<h2>Code syncing<\/h2> <br> \
<p class=\"introduction\">Aside from the <span class=\"code-green\">__syncthreads<\/span>() function, there are functions that synchronize all CUDA calls when called from host code, since kernel launches, by default, don’t block the CPU.<\/p> \
<p class=\"introduction\">The <span class=\"code-green\">cudaDeviceSynchronize<\/span>() function blocks the CPU until all previous cuda calls have finished.<\/p> \
<p class=\"introduction\">The previously explained <span class=\"code-green\">cudaMemcpy<\/span>() functions also serves as a barrier and on top of that, keeps the CPU blocked until the copying process is finished.<\/p> \
<p class=\"introduction\">If, however, we want the copying process to ignore those precautions placed on the <span class=\"code-green\">cudaMemcpy<\/span>() function and just copy the memory, there is another function available, <span class=\"code-green\">cudaMemcpyAsync<\/span>().<\/p>",

  "<h1>Extra:<\/h1> \
<h3>Error Handling<\/h2> <br> \
<ul style=\".\"> \
<li>CUDA API calls return type is cudaError_t<\/li> \
<li>function: cudaError_t cudaGetLastError()<\/li> \
<li>function: char *cudaGetErrorString(cudaError_t)<\/li> \
<\/ul> \
<h3>Device Managing functions<\/h2> <br> \
<ul style=\".\"> \
<li>cudaGetDeviceCount(int *count)<\/li> \
<li>cudaSetDevice(int device)<\/li> \
<li>cudaGetDevice(int *device)<\/li> \
<li>cudaGetDeviceProperties(cudaDeviceProp *prop, int device)<\/li> \
<\/ul> \
<h3>Compiler<\/h2> <br> \
<ul style=\".\"> \
<li>nvcc<\/li> \
<\/ul>"
];

function getIntroductionContent(index) {
  if(index < 0)
    return null;
  if(index >= introductionContent.length)
    return null;
  return introductionContent[index];
}

function hasPrevious(index) {
  if(index <= 0)
    return false;
  return true;
}

function hasNext(index) {
  if (index >= introductionContent.length - 1)
    return false;
  return true;
}

function clamp(index) {
  if(index < 0)
    return 0;
  if(index >= introductionContent.length)
    return introductionContent.length - 1;
  return index;
}
