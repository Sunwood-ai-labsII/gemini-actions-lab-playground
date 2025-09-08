const drawButton = document.getElementById('draw-button');
const resultDiv = document.getElementById('result');

const fortunes = ['大吉', '中吉', '小吉', '吉', '凶', '大凶'];

drawButton.addEventListener('click', () => {
  const randomIndex = Math.floor(Math.random() * fortunes.length);
  const fortune = fortunes[randomIndex];
  resultDiv.textContent = fortune;
});