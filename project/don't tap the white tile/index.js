function $(id) {
  return document.getElementById(id);
}

function creatediv(classname) {
  var div = document.createElement('div');
  div.className = classname;
  return div;
}
var clock = null, speed = 6, flag = false;

function start() {
  if (!flag) {
    init();
  } else {
    alert('已经开始');
  }
}

function init() {
  flag = true;
  speed = 6;
  for (var i = 0; i < 4; ++i) {
    createrow();
  }
  $('game').onclick = function(ev) {
    judge(ev);
  }
  clock = window.setInterval('move()', 30);
}

function createrow() {
  var con = $('con');
  var row = creatediv('row');
  var arr = createcell();

  con.appendChild(row);

  for (var i = 0; i < 4; ++i) {
    row.appendChild(creatediv(arr[i]));
  }

  if (con.firstChild == null) {
    con.appendChild(row);
  } else {
    con.insertBefore(row, con.firstChild);
  }
}

function delrow() {
  var con = $('con');
  if (con.childNodes.length == 6) {
    con.removeChild(con.lastChild);
  }
}

function createcell() {
  var tmp = ['cell', 'cell', 'cell', 'cell'];
  var i = Math.floor(Math.random() * 4);
  tmp[i] = 'cell black';
  return tmp;
}

function move() {
  var con = $('con');
  var top = parseInt(window.getComputedStyle(con, null)['top']);
  if (speed + top > 0) {
    top = 0;
  } else {
    top += speed;
  }
  con.style.top = top + 'px';
  over();
  if (top == 0) {
    createrow();
    con.style.top = '-102px';
    delrow();
  }
}

function speedup() {
  speed += 1;
  if (speed == 20) {
    alert('你超神了');
  }
}

function over() {
  var rows = $('con').childNodes;
  if (rows.length == 5 && rows[rows.length - 1].pass !== 1) {
    fail();
  }
  for (let i = 0; i < rows.length; ++i) {
    if (rows[i].pass1 == 1) {
      fail();
    }
  }
}

function fail() {
  clearInterval(clock);
  flag = false;
  alert('Score: '+parseInt($('number').innerHTML));
  var con = $('con');
  con.innerHTML = '';
  $('number').innerHTML = 0;
  con.style.top = '-408px';
}

function judge(ev) {
  if (
    ev.target.className.indexOf('black') == -1 &&
    ev.target.className.indexOf('cell') !== -1
  ) {
    ev.target.parentNode.pass1 = 1;
  }
  if (ev.target.className.indexOf('black') !== -1) {
    ev.target.className = 'cell';
    ev.target.parentNode.pass = 1;
    score();
  }
}

function score() {
  var newscore = parseInt($('number').innerHTML) + 1;
  $('number').innerHTML = newscore;
  if (newscore % 10 == 0) {
    speedup();
  }
}
