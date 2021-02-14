function show_number_with_animation(x, y, rand_num) {
  $('#container').append(
    '<div class="number cell" id="number_'+x+'_'+y+'"></div>'
  );
  var number_cell = $('#number_'+x+'_'+y);
  number_cell.css('background-color', get_number_background_color(rand_num));
  number_cell.css('color', get_number_color(rand_num));
  number_cell.text(rand_num);
  if (rand_num > 999) {
    number_cell.css('font-size', '45px');
  } else {
    number_cell.css('font-size', '60px');
  }
  number_cell.animate(
    {
      top: (20+120*x)+'px',
      left: (20+120*y)+'px',
    },
    50
  );
}

function show_move_animation(fx, fy, tx, ty) {
  var number_cell = $('#number_'+fx+'_'+fy);
  number_cell.animate(
    {
      top: (20+tx*120)+'px',
      left: (20+ty*120)+'px',
    },
    200
  );
}