const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');

let timePassed = 0;
let timeLeft = 0;
let timer = null;

// добавления 0 перед цифрой, если число меньше 10
const padNumber = (number) => {
  return number.toString().padStart(2, '0');
}
// получаем часы, минуты и секунды 
const getTime = (s) => {
  const hours = Math.floor(s / 3600);
  const minutes = Math.floor((s % 3600) / 60);
  const seconds = s % 60;

  return { hours, minutes, seconds }
}

// Напишите реализацию createTimerAnimator
// который будет анимировать timerEl
const createTimerAnimator = () => {
  return (seconds) => {
    const { hours, minutes, seconds: sec } = getTime(seconds);
    timerEl.innerText = `${padNumber(hours)}:${padNumber(minutes)}:${padNumber(sec)}`
  };
};

const animateTimer = createTimerAnimator();
// что бы при загрузке и обновление стр не дергался timerEl
animateTimer(0);

// здесь получаем и изменяем значение input с помощью регулярки
inputEl.addEventListener('input', () => inputEl.value = inputEl.value.replace(/[^\d]/g, ''));

buttonEl.addEventListener('click', () => {

  // здесь заново ставим нулевые значения потому что при старте 
  // нового таймера создается n-ый таймер и те который были созданы продолжатся
  // и при достижения 0 уходит в минус   
  timeLeft = 0;
  timePassed = 0;
  timer = clearInterval(timer);

  const seconds = Number(inputEl.value);
  // здесь вызываем фнк что бы отчёт пошёл с того времени из которого должно начаться
  animateTimer(seconds);
  // здесь проверяем если значения больше 0 то запускаем таймер иначе ничего не происходит
  timer = seconds > 0 && setInterval(() => {
    timePassed = timePassed += 1;
    timeLeft = seconds - timePassed;

    animateTimer(timeLeft);

    if (timeLeft === 0) clearInterval(timer)
  }, 1000);

  inputEl.value = '';
});
