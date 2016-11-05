var introductionContent = [
  "<h1>Introduction<//h1> \
<p class=\"introduction\">CUDA is an API (Application Programming Interface) model created by Nvidia, a technology company that design graphics processing units (GPUs) and other related technologies.<//p> \
<p class=\"introduction\">The API takes advantage of the high parallelism of the GPUs and computational capacity for general purpose applications, like fast sort algorithms of large lists and molecular dynamics simulations.<//p>",
  "CUDA memory access and processing is divided in two blocks: \
<h2>Host<//h2> \
<p class=\"introduction\">The CPU and its memory (primary memory).<//p> <br>\
<img src=\"assets//img//cpu+ram.png\" width=\"200\" height=\"105\" //> \
<h2>Device<//h2> \
<p class=\"introduction\">The GPU and its memory (graphic memory).<//p> <br>\
<img src=\"assets//img//geforce.png\" width=\"200\" height=\"148\" //>",
  "<prev class=\"brush: cpp\">#include &lt;stdio.h&gt;\
  #define N 1&lt;&lt;20\
  #define M 512\
  __global__ void reverse(int *d){\
  	__shared__ int s[N];\
  	int t = threadIdx.x;\
  	int tr = N-t-1;\
  	s[t] = d[t];\
  	__syncthreads();\
  	d[t] = s[tr];\
  }\
  \
  __global__ void saxpy(float a, float *x, float *y){\
  	int i = blockIdx.x*blockDim.x + threadIdx.x;\
  	if (i &lt; N) y[i] = a*x[i] + y[i];\
  }\
  \
  int main(void){\
  float *x, *y, *d_x, *d_y;\
  	x = (float*)malloc(N*sizeof(float));\
  	y = (float*)malloc(N*sizeof(float));\
  \
  	cudaMalloc(&d_x, N*sizeof(float)); \
  	cudaMalloc(&d_y, N*sizeof(float));\
  \
  	for (int i = 0; i &lt; N; i++) {\
  		x[i] = 1.0f;\
  		y[i] = 2.0f;\
  	}\
  \
  	cudaMemcpy(d_x, x, N*sizeof(float), cudaMemcpyHostToDevice);\
  	cudaMemcpy(d_y, y, N*sizeof(float), cudaMemcpyHostToDevice);\
  \
  	// Perform SAXPY on 1M elements\
  	saxpy&lt;&lt;&lt;(N+M-1)/M, M&gt;&gt;&gt;(2.0f, d_x, d_y);\
  	// Copy back result \
  	cudaMemcpy(y, d_y, N*sizeof(float), cudaMemcpyDeviceToHost);\
  // Reverse content of x vector using parallel threads and copy back the result\
  	reverse&lt;&lt;&lt;1, N&gt;&gt;&gt;(d_x);\
  	cudaMemcpy(x, d_x, N*sizeof(float), cudaMemcpyDeviceToHost);\
  \
  \
  free(x); free(y);\
  cudaFree(d_x); cudaFree(d_y);\
  return 0;\
  }<//pre>"
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
