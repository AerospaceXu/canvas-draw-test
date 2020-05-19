const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

const width = document.body.clientWidth;
const height = document.body.clientHeight;

let canTouch = false;

let canPaint = false;
let lastX;
let lastY;

// 判断是否是手机屏幕
function judgePhone() {
  return 'ontouchstart' in document.documentElement;
}

window.addEventListener('load', function () {
  canvas.width = width;
  canvas.height = height;
  canTouch = judgePhone();
  if (canTouch) {
    ctx.fillStyle = 'black';
    ctx.strokeStyle = 'none';
    canvas.addEventListener('touchstart', startTouch);
  }
});

function startTouch(e) {
  canPaint = true;
  lastX = e.touches[0].clientX;
  lastY = e.touches[0].clientY;
  canvas.addEventListener('touchmove', moveTouch);
}

function moveTouch(e) {
  canvas.addEventListener('touchend', endTouch);
  if (canPaint === true) {
    drawLine(
      lastX,
      lastY,
      e.changedTouches[0].clientX,
      e.changedTouches[0].clientY
    );
    lastX = e.changedTouches[0].clientX;
    lastY = e.changedTouches[0].clientY;
  }
}

function endTouch(e) {
  canPaint = false;
  canvas.removeEventListener('touchmove', moveTouch);
  canvas.removeEventListener('touchend', endTouch);
}

function drawLine(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.lineWidth = 10;
  ctx.lineCap = 'round';
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}