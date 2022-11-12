'use strict';
const player_el0 = document.querySelector('.player--0');
const player_el1 = document.querySelector('.player--1');
const score_player_e0 = document.querySelector('#score--0');
const score_player_e1 = document.querySelector('#score--1');
const btn_new = document.querySelector('.btn--new');
const btn_roll = document.querySelector('.btn--roll');
const btn_hold = document.querySelector('.btn--hold');
const dice = document.querySelector('.dice');
score_player_e0.textContent = 0;
score_player_e1.textContent = 0;

let score;
let current_score = 0;
let active_person = 0;
let is_play = true;

const init_game = function () {
  score = [0, 0];
  current_score = 0;
  active_person = 0;
  is_play = true;
  document.querySelector(`.player--0`).classList.remove('player--winner');
  document.querySelector(`.player--1`).classList.remove('player--winner');
  player_el0.classList.remove('player--active');
  player_el1.classList.remove('player--active');
  player_el0.classList.add('player--active');
  score_player_e0.textContent = 0;
  score_player_e1.textContent = 0;
  document.querySelector('#current--0').textContent = 0;
  document.querySelector('#current--1').textContent = 0;
  dice.classList.remove('hidden')
};

init_game();

const change_player = () => {
  score[active_person] += current_score;

  document.querySelector(`#score--${active_person}`).textContent =
    score[active_person];
  current_score = 0;
  document.querySelector(`#current--${active_person}`).textContent =
    current_score;

  player_el0.classList.toggle('player--active');
  player_el1.classList.toggle('player--active');
  if (score[active_person] >= 20) {
    is_play = false;
    dice.classList.add('hidden');
    document
      .querySelector(`.player--${active_person}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${active_person}`)
      .classList.remove('player--active');
  }
  active_person = active_person === 1 ? 0 : 1;
};

btn_roll.addEventListener('click', () => {
  if (is_play) {
    let random_number = Math.trunc(Math.random() * 6) + 1;
    var i = 1;

    var animation_roll = setInterval(stop_roll, 200);

    function stop_roll() {
      dice.src = `dice-${i}.png`;
      i++;
      if (i == 6) {
        clearInterval(animation_roll);
        dice.src = `dice-${random_number}.png`;
        if (random_number !== 1) {
          current_score += random_number;
          document.querySelector(`#current--${active_person}`).textContent =
            current_score;
        } else {
          change_player();
        }
      }
    }
  }
});

btn_hold.addEventListener('click', () => {
  if (is_play) {
    change_player();
  }
});

btn_new.addEventListener('click', () => {
  init_game();
});
