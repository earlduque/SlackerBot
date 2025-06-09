/*
activation_example:!roll 5d12
regex:^!roll
flags:i
*/

(function(){
  var pattern = /^!roll (-?)(\d*)d(-?)(\d*)/i;
  var matches = current.text.match(pattern);

  if (!matches) {
    new Slacker().send_chat(current, ':upside_down_face: Say `number` `d` `number`!', false);
    return;
  }

  if (matches[1] === '-' || matches[3] === '-') {
    new Slacker().send_chat(current, 'Stop that', false);
    return;
  }

  var total_dice = parseInt(matches[2], 10);
  var sides = parseInt(matches[4], 10);

  if (isNaN(total_dice) || isNaN(sides) || total_dice < 1 || sides < 1) {
    new Slacker().send_chat(current, 'One of those is not a number!', false);
    return;
  }

  if (total_dice > 100 || sides > 1000000) {
    new Slacker().send_chat(current, 'You rolled: a lot', false);
    return;
  }

  var rolls = Array.from({ length: total_dice }, () => Math.floor(Math.random() * sides) + 1);
  var sum = rolls.reduce((total, roll) => total + roll, 0);
  var avg = sum / total_dice;

  var message = [
    'You rolled: ',
    rolls.join(', '),
    '.\nAverage of ',
    avg,
    '.\nSum of ',
    sum
  ].join('');

  new Slacker().send_chat(current, message, false);
})();

