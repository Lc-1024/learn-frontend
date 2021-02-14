var score = 0;
var board = new Array();
var has_conflicted = new Array();

window.onload = function() {set_cell();};

$(document).keydown(function (event) {
  switch (event.keyCode) {
    case 37: // left
      event.preventDefault();
      if (move_left()) {
        setTimeout('gen()', 210);
        setTimeout('is_gameover()', 300);
      }
      break;
    case 38: // up
      event.preventDefault();
      if (move_up()) {
        setTimeout('gen()', 210);
        setTimeout('is_gameover()', 300);
      }
      break;
    case 39: // right
      event.preventDefault();
      if (move_right()) {
        setTimeout('gen()', 210);
        setTimeout('is_gameover()', 300);
      }
      break;
    case 40: // down
      event.preventDefault();
      if (move_down()) {
        setTimeout('gen()', 210);
        setTimeout('is_gameover()', 300);
      }
      break;
  }
});

function is_gameover() {
  if (nospace(board) && nomove(board)) {
    update_score('END '+score);
  }
}

function move_left() {
  if (!can_move_left(board)) {
    return false;
  }

  for (var i = 0; i < 4; ++i) {
    for (var j = 1; j < 4; ++j) {
      if (board[i][j] == 0) continue;
      for (var k = 0; k < j; ++k) {
        if (moved(i, j, i, k, board)) break;
      }
    }
  }
  setTimeout('update_board_view()', 200);
  return true;
}
function move_right() {
  if (!can_move_right(board)) {
    return false;
  }

  for (var i = 0; i < 4; ++i) {
    for (var j = 2; j >= 0; --j) {
      if (board[i][j] == 0) continue;
      for (var k = 3; k > j; --k) {
        if (moved(i, j, i, k, board)) break;
      }
    }
  }
  setTimeout('update_board_view()', 200);
  return true;
}
function move_up() {
  if (!can_move_up(board)) {
    return false;
  }

  for (var j = 0; j < 4; ++j) {
    for (var i = 1; i < 4; ++i) {
      if (board[i][j] == 0) continue;
      for (var k = 0; k < i; ++k) {
        if (moved(i, j, k, j, board)) break;
      }
    }
  }
  setTimeout('update_board_view()', 200);
  return true;
}
function move_down() {
  if (!can_move_down(board)) {
    return false;
  }

  for (var j = 0; j < 4; ++j) {
    for (var i = 2; i >= 0; --i) {
      if (board[i][j] == 0) continue;
      for (var k = 3; k > i; --k) {
        if (moved(i, j, k, j, board)) break;
      }
    }
  }
  setTimeout('update_board_view()', 200);
  return true;
}

// move i, j to l, k
function moved(i, j, l, k, board) {
  if (board[l][k] == 0 && no_block(i, j, l, k, board)) {
    show_move_animation(i, j, l, k);
    board[l][k] = board[i][j];
    board[i][j] = 0;
    return true;
  }
  else if (board[l][k] == board[i][j] && !has_conflicted[l][k] && no_block(i, j, l, k, board)) {
    show_move_animation(i, j, l, k);
    board[l][k] += board[i][j];
    board[i][j] = 0;
    score += board[l][k];
    update_score(score);
    has_conflicted[l][k] = true;
    return true;
  }
  return false;
}

function new_game() {
  for (var i = 0; i < 4; ++i) {
    board[i] = new Array();
    has_conflicted[i] = new Array();
    for (var j = 0; j < 4; ++j) {
      board[i][j] = 0;
      has_conflicted[i][j] = false;
    }
  }
  gen();
  gen();
  update_board_view();
  score = 0;
  update_score(score);
}

function set_cell() {
  for (var i = 0; i < 4; ++i) {
    for (var j = 0; j < 4; ++j) {
      var id = '#'+i+'_'+j;
      var cell = $(id);
      cell.css('top', (20+120*i)+'px');
      cell.css('left', (20+120*j)+'px');
    }
  }
}

function gen() {
  if (nospace(board)) {
    return false;
  }
  var x = parseInt(Math.floor(Math.random() * 4));
  var y = parseInt(Math.floor(Math.random() * 4));
  while (true) {
    if (board[x][y] == 0) {
      break;
    }
    x = parseInt(Math.floor(Math.random() * 4));
    y = parseInt(Math.floor(Math.random() * 4));
  }
  var rand_num = Math.random() < 0.5? 2: 4;
  board[x][y] = rand_num;
  show_number_with_animation(x, y, rand_num);
  return true;
}

function update_board_view() {
  $('.number').remove();
  for (var i = 0; i < 4; ++i) {
    for (var j = 0; j < 4; ++j) {
      if (board[i][j] == 0) continue;
      $('#container').append(
        '<div class="number cell" id="number_'+i+'_'+j+'"></div>'
      );
      var number_cell = $('#number_'+i+'_'+j);
      number_cell.css('top', (20+120*i)+'px');
      number_cell.css('left', (20+120*j)+'px');
      number_cell.css('background-color', get_number_background_color(board[i][j]));
      number_cell.css('color', get_number_color(board[i][j]));
      if (board[i][j] > 999) {
        number_cell.css('font-size', '45px');
      } else {
        number_cell.css('font-size', '60px');
      }
      number_cell.text(board[i][j]);
      has_conflicted[i][j] = false;
    }
  }
}

function update_score(score) {
  $('#score').text(score);
}

function nospace() {
  for (var i = 0; i < 4; ++i) {
    for (var j = 0; j < 4; ++j) {
      if (board[i][j] == 0) return false;
    }
  }
  return true;
}
