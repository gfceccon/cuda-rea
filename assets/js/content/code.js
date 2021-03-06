var prettifyCode = function() {
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

var code = "<pre class=\"prettyprint linenums\">#include &lt;stdio.h&gt; \n\
#define N 1&lt;&lt;20 \n\
#define M 512 \n\
__global__ void reverse(int *d){ \n\
  __shared__ int s[N]; \n\
  int t = threadIdx.x; \n\
  int tr = N-t-1; \n\
  s[t] = d[t]; \n\
  __syncthreads(); \n\
  d[t] = s[tr]; \n\
} \n\
\n\
__global__ void saxpy(float a, float *x, float *y){ \n\
  int i = blockIdx.x*blockDim.x + threadIdx.x; \n\
  if (i &lt; N) y[i] = a*x[i] + y[i]; \n\
} \n\
\n\
int main(void){ \n\
  float *x, *y, *d_x, *d_y; \n\
  x = (float*)malloc(N*sizeof(float)); \n\
  y = (float*)malloc(N*sizeof(float)); \n\
\n\
  cudaMalloc(&d_x, N*sizeof(float)); \n\
  cudaMalloc(&d_y, N*sizeof(float)); \n\
\n\
  for (int i = 0; i &lt; N; i++) { \n\
    x[i] = 1.0f; \n\
    y[i] = 2.0f; \n\
  } \n\
\n\
  cudaMemcpy(d_x, x, N*sizeof(float), cudaMemcpyHostToDevice); \n\
  cudaMemcpy(d_y, y, N*sizeof(float), cudaMemcpyHostToDevice); \n\
\n\
  saxpy&lt;&lt;&lt;(N+M-1)\/M, M&gt;&gt;&gt;(2.0f, d_x, d_y); \n\
  cudaMemcpy(y, d_y, N*sizeof(float), cudaMemcpyDeviceToHost); \n\
  reverse&lt;&lt;&lt;1, N&gt;&gt;&gt;(d_x); \n\
  cudaMemcpy(x, d_x, N*sizeof(float), cudaMemcpyDeviceToHost); \n\
\n\
\n\
  free(x); free(y); \n\
  cudaFree(d_x); cudaFree(d_y); \n\
  return 0; \n\
} \
 <\/pre>";

var resizeEvent = function() {
  if($( window ).width() < 1300) {
    $("#page-inner").html("<div id=\"panel-tab\" class=\"panel panel-default\"> \n\
        <div class=\"panel-body\"> \n\
            <ul class=\"nav nav-pills\"> \n\
                <li class=\"active\"><a href=\"#code-pills\" data-toggle=\"tab\">Code<\/a> \n\
                <\/li> \n\
                <li class=\"\"><a href=\"#desc-pills\" data-toggle=\"tab\">Description<\/a> \n\
                <\/li> \n\
            <\/ul> \n\
     \n\
            <div class=\"tab-content\"> \n\
                <div class=\"tab-pane fade active in\" id=\"code-pills\"> \n"
  + code +
                "<\/div> \n\
                <div class=\"tab-pane fade\" id=\"desc-pills\"> \n\
                    <div id=\"buttons\"> \n\
                      <a id=\"previous\" class=\"btn btn-primary\" onclick=\"previous()\">Previous<\/a> \n\
                      <a id=\"next\" class=\"btn btn-primary\" onclick=\"next()\">Next<\/a> \n\
                      <!-- \/. BUTTONS --> \n\
                    <\/div> \n\
                    <div class=\"code-description\"> \n\
                      <div id=\"description\"> \n\
                      <\/div> \n\
                    <\/div> \n\
                <\/div> \n\
            <\/div> \n\
        <\/div> \n\
    <\/div>");
  } else {
    $("#page-inner").html(code +
"<div class=\"code-description\"> \n\
 <div id=\"buttons\"> \n\
   <a id=\"previous\" class=\"btn btn-primary\" onclick=\"previous()\">Previous<\/a> \n\
   <a id=\"next\" class=\"btn btn-primary\" onclick=\"next()\">Next<\/a> \n\
   <!-- \/. BUTTONS --> \n\
 <\/div> \n\
 <div id=\"description\"> \n\
 <\/div> \n\
<\/div> \n\
<div style=\"clear:both\"></div>");
  }
  prettifyCode();
  update();
}
$( window ).resize(resizeEvent);


document.onkeydown = function (e) {

    e = e || window.event;

    if (e.keyCode == '37') {
       previous();
    }
    else if (e.keyCode == '39') {
       next();
    }

}
