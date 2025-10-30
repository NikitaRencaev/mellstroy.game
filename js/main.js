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