const botBtn = document.querySelector('.bot');
const friendBtn = document.querySelector('.friend');

botBtn.addEventListener('click', () => {
  window.location.href = "bot.html";
});

friendBtn.addEventListener('click', () => {
  window.location.href = 'friend.html';
});