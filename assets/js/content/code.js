var code = "<prev class=\"prettyprint linenums\">#include &lt;stdio.h&gt;\n\
#define N 1&lt;&lt;20\n\
#define M 512\n\
__global__ void reverse(int *d){\n\
  __shared__ int s[N];\n\
  int t = threadIdx.x;\n\
  int tr = N-t-1;\n\
  s[t] = d[t];\n\
  __syncthreads();\n\
  d[t] = s[tr];\n\
}\n\
\n\
__global__ void saxpy(float a, float *x, float *y){\n\
  int i = blockIdx.x*blockDim.x + threadIdx.x;\n\
  if (i &lt; N) y[i] = a*x[i] + y[i];\n\
}\n\
\n\
int main(void){\n\
float *x, *y, *d_x, *d_y;\n\
  x = (float*)malloc(N*sizeof(float));\n\
  y = (float*)malloc(N*sizeof(float));\n\
\n\
  cudaMalloc(&d_x, N*sizeof(float)); \n\
  cudaMalloc(&d_y, N*sizeof(float));\n\
\n\
  for (int i = 0; i &lt; N; i++) {\n\
    x[i] = 1.0f;\n\
    y[i] = 2.0f;\n\
  }\n\
\n\
  cudaMemcpy(d_x, x, N*sizeof(float), cudaMemcpyHostToDevice);\n\
  cudaMemcpy(d_y, y, N*sizeof(float), cudaMemcpyHostToDevice);\n\
\n\
  // Perform SAXPY on 1M elements\n\
  saxpy&lt;&lt;&lt;(N+M-1)/M, M&gt;&gt;&gt;(2.0f, d_x, d_y);\n\
  // Copy back result \n\
  cudaMemcpy(y, d_y, N*sizeof(float), cudaMemcpyDeviceToHost);\n\
// Reverse content of x vector using parallel threads and copy back the result\n\
  reverse&lt;&lt;&lt;1, N&gt;&gt;&gt;(d_x);\n\
  cudaMemcpy(x, d_x, N*sizeof(float), cudaMemcpyDeviceToHost);\n\
\n\
\n\
free(x); free(y);\n\
cudaFree(d_x); cudaFree(d_y);\n\
return 0;\n\
}<//pre>";

window.onload = function() {
  prettyPrint();
}
