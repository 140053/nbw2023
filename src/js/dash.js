const socket = new WebSocket('ws://localhost:3000');
         
socket.onopen = () => {
  console.log('Connected to the server');
};




// ****************** FUNCTION SATART HERE *********************
//Socket Util



function sendCommand(program, status) {
  const cmd = { program: program, status: status };
  socket.send(JSON.stringify(cmd));
}

function sendUtil(program, action, value) {
  const cmval = { program: program, action: action, value: value };
  socket.send(JSON.stringify(cmval));
}

function sendUtils(program, val1, val2, val3) {
    const cmval = { program: program, val1: val1, val2: val2, val3: val3 };
    socket.send(JSON.stringify(cmval));
  }


// Sound 
function btncorrect(){
    const audio = new Audio("/assets/sound/correct.mp3");
    audio.play();
}
function WrongSound(){
    sendCommand('sound', 'wrong');
    const audio = new Audio("/assets/sound/wrong.mp3");
    audio.play();
}


// Variable to track the currently playing audio
let currentAudio = null;

function PlayMusic(sts, mnum) {
    // Create an object to store all audio instances
    const sounds = {
        m1: new Audio("/assets/main/sound/kumpas.mp3"),
        m2: new Audio("/assets/main/sound/ere.mp3"),
        m3: new Audio("/assets/main/sound/heaven.mp3"),
        m4: new Audio("/assets/main/sound/mahika.mp3"),
        m5: new Audio("/assets/main/sound/palagi.mp3"),
        m6: new Audio("/assets/main/sound/lihim.mp3"),
        m7: new Audio("/assets/main/sound/dito.mp3"),
        m8: new Audio("/assets/main/sound/raining.mp3"),
        m9: new Audio("/assets/main/sound/seleos.mp3"),
        m10: new Audio("/assets/main/sound/sarobilog.mp3"),
    };

    if (sts === 'play') {
        if (currentAudio && !currentAudio.paused) {
            currentAudio.pause();
            currentAudio.currentTime = 0; // Reset previous audio
        }

        if (sounds[mnum]) {
            currentAudio = sounds[mnum];
            currentAudio.play();
        } else {
            console.error("Invalid music number:", mnum);
        }
    } else if (sts === 'pause') {
        if (currentAudio && !currentAudio.paused) {
            currentAudio.pause();
        }
    } else if (sts === 'resume') {
        if (currentAudio && currentAudio.paused) {
            currentAudio.play();
        }
    } else if (sts === 'stop') {
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0; // Reset to the start
            currentAudio = null; // Clear the current audio reference
        }
    } else {
        console.error("Invalid status:", sts);
    }
}

// Example usage:
//PlayMusic('play', 'm1'); // Play m1
///setTimeout(() => PlayMusic('pause', 'm1'), 5000); // Pause after 5 seconds
//setTimeout(() => PlayMusic('resume', 'm1'), 8000); // Resume after 3 seconds
//setTimeout(() => PlayMusic('stop', 'm1'), 12000); // Stop after 4 seconds
//


// Example usage:
//PlayMusic('play', 'm1'); // Play m1
//setTimeout(() => PlayMusic('pause', 'm1'), 5000); // Pause after 5 seconds
//setTimeout(() => PlayMusic('resume', 'm1'), 8000); // Resume after 3 seconds

// Example usage:
//PlayMusic('play', 'm1'); // Play m1
//PlayMusic('pause', 'm1'); // Pause m1
//PlayMusic('resume', 'm1'); // Resume m1



 function activateProg(prog){
    deactivateProg()
    sendUtil('Program', prog, 'show')
    const program = document.getElementById(prog+ "-control")
    program.classList.remove("hidden")
 }

 function deactivateProg(){
    const prog = [ 'prog1', 'prog2', 'prog3', 'prog4']
    prog.forEach(id => {
        const element = document.getElementById(id + "-control");
        if (element) {
            element.classList.add('hidden');
        } else {
           // console.error(`Element with id "${id}" not found.`);
        }
    });
 }

 function setquestion(question){
    sendUtil('prog1', 'qq1', question)
 }

 function selectQ(id, sts){

    const prog = [ 'qq1', 'qq2', 'qq3', 'qq4', 'qq5']
    const selected = document.getElementById(id)
    console.log(id+"-q")
    const selectedq = document.getElementById(id + '-q')
    const selectedqt = document.getElementById(id + '-qt')

    prog.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            
            if(sts == 'activate'){
                element.classList.add('hidden');
                selected.classList.remove('hidden')
                selected.classList.remove('container')
                selected.classList.add('col-span-5')
                selectedq.classList.remove('hidden')
                sendUtil('prog1', 'q1', 'show')
                sendUtils('prog1','set', selectedqt.textContent,'')
            }else{
                element.classList.remove('hidden');
                selected.classList.add('container')
                selected.classList.remove('col-span-5')
                selectedq.classList.add('hidden')
                sendUtil('prog1', 'q1', 'hide')
            }

        } else {
           // console.error(`Element with id "${id}" not found.`);
        }
    });
 }

 function HulaAns(id){
    //if(round == 'two'){
        btncorrect()
    //}
    sendUtil('prog1', 'hulaa', id)
 }

 function selectQ2(id, sts){

    const prog = [ 'qqq1', 'qqq2', 'qqq3', 'qqq4', 'qqq5']
    const selected = document.getElementById(id)
    console.log(id+"-q")
    const selectedq = document.getElementById(id + '-q')
    const selectedqt = document.getElementById(id + '-qt')

    prog.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            
            if(sts == 'activate'){
                element.classList.add('hidden');
                selected.classList.remove('hidden')
                selected.classList.remove('container')
                selected.classList.add('col-span-5')
                selectedq.classList.remove('hidden')
                sendUtil('prog1', 'q2', 'show')
                sendUtils('prog1','set2', selectedqt.textContent,'')
            }else{
                element.classList.remove('hidden');
                selected.classList.add('container')
                selected.classList.remove('col-span-5')
                selectedq.classList.add('hidden')
                sendUtil('prog1', 'q2', 'hide')
            }

        } else {
           // console.error(`Element with id "${id}" not found.`);
        }
    });
 }

 function SelectAns(val, round){
    if(round == 'one'){
        btncorrect()
    }
    sendUtils('prog1', round, val)
    
    
 }


 function ShowHideCat(cat, sts){
    sendUtil('prog1', cat, sts)
    const catlist = document.getElementById(cat+ '-list')
    if(sts == 'show'){
        catlist.classList.remove('hidden')
    }else{
        catlist.classList.add('hidden')
    }

 }


// *************** function end here ***************************



//Variable Declaration 
const bshowall = document.getElementById('bshowall');
const showmain = document.getElementById('showmain')

//hide
const hidemain = document.getElementById('hidemain')
const hideall = document.getElementById('hideall');



//Event Handlers
//____banner
//show
bshowall.addEventListener('click', ()=> sendUtil('banner', 'show', 'all'));
showmain.addEventListener('click', ()=> sendUtil('banner', 'show', 'main'));
//hide
hidemain.addEventListener('click', () => sendUtil('banner', 'hide', 'main'))
hideall.addEventListener('click', () => sendUtil('banner', 'hide', 'all'));



//Program 1 

//--banner
const progoneshowbanner = document.getElementById('prog-one-show-banner')
const progonehidebanner = document.getElementById('prog-one-hide-banner')

//Team
const progTeamOne = document.getElementById('prog-one-team-one-present')
const progTeamTwo = document.getElementById('prog-one-team-two')
const progTeamThree = document.getElementById('prog-one-team-three')

//++++ Event Listener
//banner
progoneshowbanner.addEventListener('click', () => sendUtil("prog1", 'banner', 'show'))
progonehidebanner.addEventListener('click', () => sendUtil("prog1", 'banner', 'hide'))
//team
//progTeamOne.addEventListener('click', () => sendUtil('prog1', 'team', 'one'))

