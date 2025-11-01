const cars = document.querySelectorAll('.car');
const audio = document.querySelectorAll(".audio"); 
const audioBack = document.querySelectorAll(".audio-back"); 

cars.forEach((el, index) => {
    el.addEventListener('click', () => {
        el.classList.toggle('active');
        
        if(el.classList.contains('active')) {
            audio[index].play();
        } else {
            audioBack[index].play();
        }
    })
});

const mellstroy = document.querySelector('.hero__mellstroy');
mellstroy.addEventListener('click', () => {
    mellstroy.classList.toggle('active');
})

// mellstroy audio
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

const mellstroyAudio = document.querySelectorAll('.audio-mellstroy');

mellstroy.addEventListener('click', () => {
    if(mellstroy.classList.contains('active')) {
        let num = getRandomInt(0, 5);
        mellstroyAudio[num].play();
    } else {
        for (let index = 0; index < mellstroyAudio.length; index++) {
            mellstroyAudio[index].pause();
        }
    }
})

// casino wheel
const wheel = document.querySelector('.wheel');
const audioWhell = document.querySelector('.audio-wheel');
const winWindow = document.querySelector('.casino__win-window');
const winAudio = document.querySelectorAll('.audio-wheel-win')

let position = 2180;

wheel.addEventListener('click', () => {
    if (wheel.classList.contains('active') == false) {
        wheel.classList.add('active');
        let nextPosition = position * 2;
        wheel.style.transform = `rotate(${nextPosition}deg)`;
        position = nextPosition;
        audioWhell.play();

        // win
        winWindow.classList.remove('active');

        setTimeout(() => {
            wheel.classList.remove('active');
            winWindow.classList.add('active');

            winAudio[0].play();
            winAudio[1].play();
            winAudio[2].play();
        }, 8000);
        // 
    } else {
        return false;
    }
})

// video
const historyElements =  document.querySelectorAll('.history__element');
const historyVideos = document.querySelectorAll('.video-mellstroy');

historyVideos.forEach((element, index) => {
    element.addEventListener('click', () => {
        console.log(historyElements[index]);
        if(element.paused == false)
            historyElements[index].classList.remove('active');
        else
            historyElements[index].classList.add('active');
    })
});

// historyVideos.addEventListener('click', () => {
//     historyVideos.forEach((element, index) => {
//     console.log(historyElements[index]);
//         if(element.paused == false)
//             historyElements[index].classList.add('active');
//         else
//             historyElements[index].classList.remove('active');
//     });
// })


// Модальное окно
const modalWindow = document.querySelector('.modal-window');
const buttonInfo = document.querySelector('.help-button');
const closeButton = document.querySelector('.close-button');
const modalInfoGame = document.querySelector('.modal-window__info-game');
const modalContents = document.querySelectorAll('.modal-window .container div');

// При клике на кнопку вызываем модальное окно
buttonInfo.addEventListener('click', () => {
    modalWindow.classList.add('active');
    // Добавляем класс к содержмиому
    modalInfoGame.classList.add('active');
})

// При клике на кнопку закрываем модалку
closeButton.addEventListener('click', () => {
    modalWindow.classList.remove('active');

    modalContents.forEach(element => {
        element.classList.remove('active');
        const videos = document.querySelectorAll('.modal-window-edit video')
        videos.forEach(element => {
          element.pause();
        });
    });
})


// MEMLUCK
const images = [
  './img/memluck/dont-known.png',
  './img/memluck/easy-mell.png',
  './img/memluck/flex.png',
  './img/memluck/lisiy.png',
  './img/memluck/back-money.png'
];

const winChance = 0.3; // вероятность выигрыша (30%)
// Воспроизведение звука при вращении
const spinSound = document.getElementById('spinSound');

const slots = document.querySelectorAll('.memluck__slot');
let spinning = false;

window.addEventListener('DOMContentLoaded', () => {
  const slots = document.querySelectorAll('.memluck__slot');
  // Изначально заполняем картинки
  slots.forEach((slot) => {
    const inner = slot.querySelector('.slot-inner');
    const randIdx = Math.floor(Math.random() * images.length);
    const img = document.createElement('img');
    img.src = images[randIdx];
    img.style.width = '100%';
    inner.appendChild(img);
  });
});

document.querySelector('.play-button').addEventListener('click', () => {
  if (spinning) return;
  spinning = true;

  // Воспроизведение звука
  if (spinSound) {
    spinSound.currentTime = 0;
    spinSound.play();
  }

  const results = [];
  let completedCount = 0;
  const isWin = Math.random() < winChance;
  const winImageIndex = Math.floor(Math.random() * images.length);
  const winImageSrc = images[winImageIndex];

  // Индексы центральной линии
  const centralLineIndices = [2, 7, 12, 17, 22, 27];

  // для части, показывающей выигрыш
  const lineResults = Array(slots.length).fill(null);
  centralLineIndices.forEach(i => {
    lineResults[i] = isWin ? winImageIndex : null;
  });

  // Анимация прокрутки
  slots.forEach((slot, index) => {
    const inner = slot.querySelector('.slot-inner');
    inner.innerHTML = '';
    const spinCount = 20 + Math.floor(Math.random() * 10);
    let count = 0;

    const spinInterval = setInterval(() => {
      if (count >= spinCount) {
        clearInterval(spinInterval);
        // финальный результат
        let finalIndex;
        if (lineResults[index] !== null) {
          finalIndex = lineResults[index];
        } else {
          finalIndex = Math.floor(Math.random() * images.length);
        }
        const img = document.createElement('img');
        img.src = images[finalIndex];
        img.style.width = '100%';
        inner.innerHTML = '';
        inner.appendChild(img);
        results[index] = finalIndex;
        if (++completedCount === slots.length) {
          checkLineWin();
          spinning = false;
        }
        return;
      }

      inner.innerHTML = '';
      const randIndex = Math.floor(Math.random() * images.length);
      const img = document.createElement('img');
      img.src = images[randIndex];
      img.style.width = '100%';
      inner.appendChild(img);
      count++;
    }, 100);
  });

  function checkLineWin() {
    const centerImagesSrc = centralLineIndices.map(i => {
        const inner = slots[i].querySelector('.slot-inner');
        const img = inner.querySelector('img');
        return img ? img.src : null;
    });

    const getFileName = (path) => path ? path.substring(path.lastIndexOf('/') + 1) : null;

    const firstFileName = getFileName(centerImagesSrc[0]);
    const allEqual = centerImagesSrc.every(src => getFileName(src) === firstFileName && src !== null);

    if (allEqual) {

        const winImageFileName = firstFileName;
        const winImageIndexInArray = images.findIndex(imagePath => getFileName(imagePath) === winImageFileName);

        modalWindow.classList.add('active');
        const edits = document.querySelectorAll('.modal-window-edit')

        edits[winImageIndexInArray].classList.add('active');
    }
    }
});