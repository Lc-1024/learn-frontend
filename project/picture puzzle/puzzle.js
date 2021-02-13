var time = 0;
var pause = true;
var set_timer;
var d = [0, 1, 2, 3, 4, 5, 6, 7, 8, 0];
var d_direct = [
  [0],
  [2, 4],
  [1, 3, 5],
  [2, 6],
  [1, 5, 7],
  [2, 4, 6, 8],
  [3, 5, 9],
  [4, 8],
  [5, 7, 9],
  [6, 8],
];
var d_posXY = [
  [0],
  [0, 0],
  [150, 0],
  [300, 0],
  [0, 150],
  [150, 150],
  [300, 150],
  [0, 300],
  [150, 300],
  [300, 300],
];

function move(id) {
  if (pause) return;
  var i = 1, target_d = 0;
  for (i = 1; i < 10; ++i) {
    if (d[i] == id) break;
  }
  target_d = whereCanTo(i);
  if (target_d != 0) {
    d[i] = 0;
    d[target_d] = id;
    document.getElementById('d'+id).style.left = d_posXY[target_d][0] + 'px';
    document.getElementById('d'+id).style.top  = d_posXY[target_d][1] + 'px';
  }
  var finish_flag = true;
  for (var k = 1; k < 9; ++k) {
    if (d[k] != k) {
      finish_flag = false;
      break;
    }
  }
  if (finish_flag == true) {
    start();
    setTimeout(function(){alert('congratulation!');}, 300);
  }
}

function whereCanTo(id) {
  var j = 0;
  for (j = 0; j < d_direct[id].length; ++j) {
    if (d[d_direct[id][j]] == 0) {
      return d_direct[id][j];
    }
  }
  return 0;
}

function timer() {
  time += 1;
  var min = parseInt(time / 60);
  var sec = time % 60;
  document.getElementById('timer').innerHTML = min + ':' + sec;
}

function start() {
  if (pause) {
    document.getElementById('start').innerHTML = 'pause';
    pause = false;
    set_timer = setInterval(timer, 1000);
  }
  else {
    document.getElementById('start').innerHTML = 'start';
    pause = true;
    clearInterval(set_timer);
  }
}

function reset() {
  time = 0;
  random_d();
  if (pause) {
    start();
  }
}

function random_d() {
  var to;
  for (var i = 9; i > 1; --i) {
    to = parseInt(Math.random() * (i - 1) + 1);
    if (d[i] > 0 && d[i] < 9) {
      document.getElementById('d' + d[i]).style.left = d_posXY[to][0] + 'px';
      document.getElementById('d' + d[i]).style.top = d_posXY[to][1] + 'px';
    }
    if (d[to] > 0 && d[to] < 9) {
      document.getElementById('d' + d[to]).style.left = d_posXY[i][0] + 'px';
      document.getElementById('d' + d[to]).style.top = d_posXY[i][1] + 'px';
    }
    var tmp = d[to];
    d[to] = d[i];
    d[i] = tmp;
  }
}

window.onload = function () {
  random_d();
};
