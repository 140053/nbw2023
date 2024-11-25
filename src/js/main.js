function toggleHidden(action, elementIds) {
    const prog = document.getElementById('prog0')
    if(elementIds == 'banner1'){        
        prog.classList.add('hidden')
    }else{
        prog.classList.remove('hidden')
    }
    elementIds.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            if (action === 'hide') {
                element.classList.add('hidden');
            } else if (action === 'show') {
                element.classList.remove('hidden');
            }
        } else {
            console.error(`Element with id "${id}" not found.`);
        }
    });
}

// Usage examples:
function hideAll() {
    toggleHidden('hide', ['banner1', 'prog1', 'prog2', 'prog3', 'prog4']);
}

function showAll() {
    toggleHidden('show', ['banner1', 'prog1', 'prog2', 'prog3', 'prog4']);
}

function showProgram(programId) {
    // Hide all programs first
    toggleHidden('hide', ['banner1','prog1', 'prog2', 'prog3', 'prog4']);
    // Then show the specific program
    toggleHidden('show', [programId]);
}

function hidesidebar(action){
    const bannerl = document.getElementById("banl")
    const bannerr = document.getElementById("banr")

    if(action == "show"){
        bannerl.classList.remove("hidden")
        bannerr.classList.remove("hidden")
    }
    if(action == "hide"){
        bannerl.classList.add("hidden")
        bannerr.classList.add("hidden")
    }
}


// Timer 

let timerElement = document.getElementById('timer');
let countdown;
let timeLeft = 60;

function startTimer() {
  if (countdown) return; // Prevent multiple intervals

  countdown = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      timerElement.textContent = timeLeft;
    } else {
      clearInterval(countdown);
      countdown = null;
      alert("Time's up!");
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(countdown);
  countdown = null;
  timeLeft = 60;
  timerElement.textContent = timeLeft;
}


 //end of timer


// Selector buttons
// Banner
const showAllbtn = document.getElementById("bshowbanner");
const showmainbtn = document.getElementById("showmain");
const hidemaintbn = document.getElementById('hidemain');
const hidealltbn = document.getElementById('hideall');
const startTime = document.getElementById('timerStart');
const resetTime = document.getElementById("timerReset");

// Program buttons
const prog1btn = document.getElementById('showProg1');
const prog2btn = document.getElementById('showProg2');
const prog3btn = document.getElementById('showProg3');
const prog4btn = document.getElementById('showProg4');
const sidepanel = document.getElementById('showSide')


// Event Listeners
hidealltbn.addEventListener('click', hideAll);
showAllbtn.addEventListener('click',() => showProgram('banner1'));
sidepanel.addEventListener('click', () => hidesidebar('show'));
startTime.addEventListener('click', () => startTimer());
resetTime.addEventListener('click', () => resetTimer())

prog1btn.addEventListener('click', () => showProgram('prog1'));
prog2btn.addEventListener('click', () => showProgram('prog2'));
prog3btn.addEventListener('click', () => showProgram('prog3'));
prog4btn.addEventListener('click', () => showProgram('prog4'));

hidesidebar('show')











