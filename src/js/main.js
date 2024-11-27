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
let second = document.getElementById('second');
let mili = document.getElementById('milisecond');
let countdown = null;

function startTimer(maxTime) { // maxTime is the target time in seconds
  if (countdown) return; // Prevent multiple intervals

  let elapsedTime = 0; // Initialize elapsed time in milliseconds

  countdown = setInterval(() => {
    elapsedTime += 100; // Increment by 100ms

    const secondsPassed = Math.floor(elapsedTime / 1000);
    const millisecondsPassed = Math.floor((elapsedTime % 1000) / 10); // Two-digit milliseconds

    second.textContent = secondsPassed;
    mili.textContent = millisecondsPassed.toString().padStart(2, '0'); // Always two digits

    // Stop the timer when maxTime is reached
    if (secondsPassed >= maxTime) {
      clearInterval(countdown);
      countdown = null;
      alert("Time's up!");
    }
  }, 100); // Update interval to 100ms
}

function resetTimer() {
  clearInterval(countdown);
  countdown = null;
  second.textContent = "00";
  mili.textContent = "00"; // Reset milliseconds
}



 //end of timer



 // Program 4
// Rumble word
function shuffleWord(word) {
    var array = word.split('');
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array.join('');
}

function setWord(word, idholder) {
    const rumbWord = document.getElementById(idholder);
    rumbWord.innerHTML = ""; // Clear existing content
    for (let index = 0; index < word.length; index++) {
        const temp = `<div class="relative max-w-xs border border-solid border-black rounded-2xl p-4 transition-all duration-500 col-span-12 xl:p-7 lg:col-span-3 md:col-span-6">
                        <div class="mb-6 flex justify-center">
                            <h1 class="font-extrabold text-6xl">${word[index].toUpperCase()}</h1>
                        </div>
                    </div>`;
        rumbWord.innerHTML += temp; // Append instead of overwriting
    }
}

function mainShuffle(){ 
    const wordtorumble = document.getElementById('wordtorumble')
    var word = wordtorumble.value

    var w = shuffleWord(word)
    setWord(w, 'rumbleWord') //set question

    setWord(word, 'rumbleOrginal') //set Answer
}

function rumbleAction(action){
    var rumbleShowAnswer = document.getElementById('rumbleShowAnswer')
   
    if(action == 'show'){
        rumbleShowAnswer.classList.remove('hidden')
    }

    if(action == 'hide'){
        rumbleShowAnswer.classList.add('hidden')
    }
}


function showAndhide(id, value){
    const element = document.getElementById(id)
    switch (value) {
        case 'show':
            element.classList.remove('hidden')
            break;
        case 'hide':
            element.classList.add('hidden')
            break;            
        default:
            console.log('d')
            break;
    }
 }




// ************************** FUNCTION ABOVE ********************************************

const socket = new WebSocket('ws://localhost:3000');
         
socket.onopen = () => {
  console.log('Connected to the server');
};




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


//program 4 
const rumbleAword = document.getElementById('rumbleAword')
const rumbleAnswer = document.getElementById('rumbleAnswer')

// Event Listeners

//program 4
rumbleAword.addEventListener('click', ()=> mainShuffle())
rumbleAnswer.addEventListener('click', () => rumbleAction('show'))


//test
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


socket.onmessage = (event) => {

    if (event.data instanceof Blob) {
      // Handle Blob data
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const msg = JSON.parse(reader.result);

        // Banner
         if(msg.program == 'banner'){
            if(msg.action == 'show'){
                switch (msg.value) {
                    case "all":
                        showProgram('banner1')                    
                        break;
                    case "main":
                        showProgram('banner1')                    
                        break;
                    case "lbanner": 
                        //
                        break;

                    case "rbanner": 
                        //
                        break;
                
                    default:
                        console.log('lol')
                        break;
                }
            }

            if(msg.action== 'hide'){
                switch (msg.value) {
                    case "all":
                        hideAll()                   
                        break;
                    case "main":
                        hideAll()                  
                        break;
                    case "lbanner": 
                        //
                        break;

                    case "rbanner": 
                        //
                        break;
                   
                
                    default:
                        console.log('lol')
                        break;
                }
            }

            
            
         }

         //Program Activateion
         if(msg.program  == "Program"){
            hideAll()
            showAndhide(msg.action,msg.value)
            
         }


         //Program 1
         //msg  {"program":"prog1","action":"banner","value":"show"}
        if(msg.program == "prog1"){

            if(msg.action == 'banner'){
                showAndhide("prog-one-banner", msg.value)               
            }

            // Team
            const playing = document.getElementById('player')

            if(msg.action == "teamOne"){
                //const progOneTeamOne = document.getElementById('prog-one-team-one')
                
                if(msg.value == 'play'){
                    playing.innerText= 'team-one'
                }
                showAndhide("prog-one-team-one", msg.value)
            }

            if(msg.action == "teamTwo"){
                //const progOneTeamOne = document.getElementById('prog-one-team-one')
                if(msg.value == 'play'){
                    playing.innerText = 'team-two'
                }
                showAndhide("prog-one-team-two", msg.value)
            }

            if(msg.action == "teamThree"){
                //const progOneTeamOne = document.getElementById('prog-one-team-one')
                if(msg.value == 'play'){
                    playing.innerText = 'team-three'
                }
                showAndhide("prog-one-team-three", msg.value)
            }

            //round
            if(msg.action == 'round1'){
                showAndhide('prog-one-round-one-banner', msg.value)
            }

            if(msg.action == 'round2'){
                showAndhide('prog-one-round-two-banner', msg.value)
            }

            if(msg.action == 'round2'){
                showAndhide('prog-one-round-two-banner', msg.value)
            }

            // category

            if(msg.action == 'category1'){
                showAndhide('prog-one-round-one-category', msg.value)
            }
            if(msg.action == 'category2'){
                showAndhide('prog-one-round-two-category', msg.value)
            }

            if(msg.action == 'cat1'){

                const citem = document.getElementById('catOne-'+ msg.value)
                citem.classList.add('animate-zoomOut')
                citem.classList.add('hidden')

            }


            if(msg.action == 'category2'){
                showAndhide('prog-one-round-two-category', msg.value)
            }

            if(msg.action == 'cat2'){

                const citem = document.getElementById('catTwo-'+ msg.value)
                citem.classList.add('animate-zoomOut')
                citem.classList.add('hidden')

            }

            //Timer
            if(msg.action == "timer"){
                if (msg.value === 'start') {
                    // Your code here
                    startTimer(45)
                }

                if(msg.value === 'reset'){
                    resetTimer()
                }
                
                showAndhide('prog-one-timmer' , msg.value)
            }

            if(msg.action == "timer2"){
                if (msg.value === 'start') {
                    // Your code here
                    startTimer(120)
                }

                if(msg.value === 'reset'){
                    resetTimer()
                }
                
                showAndhide('prog-one-timmer' , msg.value)
            }




            if(msg.action == 'q1'){
                showAndhide('prog-one-round-one-question', msg.value)
            }
            if(msg.val1 == 'set'){
                const qholder = document.getElementById('qholder')
                if (qholder) {                    
                  // Ensure the element exists
                  qholder.innerText = ""; // Clear existing content
                  qholder.innerText = msg.val2; // Set new content
                } else {
                  console.error("Element with ID 'qholder' not found.");
                }

                //remove ans
                const ansholder = document.getElementById('ansholder')

                while(ansholder.firstChild){
                    ansholder.removeChild(ansholder.firstChild)
                }
            }

            //set ans
            if (msg.val1 === 'one') { // Use strict equality for better type checking
                const ansholder = document.getElementById('ansholder');
                const second = document.getElementById('second');
                const mili = document.getElementById('milisecond');
                const team = document.getElementById('player')
                
                // Ensure all elements exist to prevent errors
                if (ansholder && second && mili) {
                    const b = document.createElement('button');

                    b.className = "rounded-lg py-2.5 px-6 text-center w-full text-white bg-indigo-600 font-semibold text-lg transition-all duration-500 hover:bg-indigo-700";
                    
                    // Use template strings for clear, formatted output
                    b.innerHTML = `
                        ${msg.val2}<br />
                        <span class="font-thin text-sm">${second.innerText}</span> Sec &
                        <span class="font-thin text-sm">${mili.innerText}</span> mili
                    `;
                    
                    ansholder.appendChild(b);

                    var teamans 
                    switch (team.textContent) {
                        case "team-one":
                            teamans  = document.getElementById('prog-one-team-one-ans');
                            break;
                        case "team-two":
                            teamans  = document.getElementById('prog-one-team-two-ans');
                            break;
                        case "team-three":
                            teamans  = document.getElementById('prog-one-team-three-ans');
                            break;
                    
                        default:
                            break;
                    }

                    // Create a new li element
                    const liElement = document.createElement('li');

                    // Add classes to the li element
                    liElement.className = "flex flex-row items-center space-x-4";

                    // Set the inner HTML of the li element
                    liElement.innerHTML = `
                    <!-- Icon -->
                    <svg class="flex-shrink-0 w-6 h-6 text-indigo-600" viewBox="0 0 30 30" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                        d="M10 14.7875L13.0959 17.8834C13.3399 18.1274 13.7353 18.1275 13.9794 17.8838L20.625 11.25M15 27.5C8.09644 27.5 2.5 21.9036 2.5 15C2.5 8.09644 8.09644 2.5 15 2.5C21.9036 2.5 27.5 8.09644 27.5 15C27.5 21.9036 21.9036 27.5 15 27.5Z"
                        stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                    <div>
                        <p>${msg.val2} <span>${second.innerText}:${mili.innerText}</span></p>
                    </div>
                    `;

                    // Append the new li element to the ul
                    console.log(team.textContent)
                    console.log(liElement)
                    teamans.appendChild(liElement);
                } else {
                    console.error('One or more required elements are missing.');
                }
            }

            //question 2
            if(msg.action == 'q2'){
                showAndhide('prog-one-round-two-question', msg.value)
            }

            if(msg.val1 == 'set2'){
                const qholder = document.getElementById('qholdertwo')
                if (qholder) {                    
                  // Ensure the element exists
                  qholder.innerText = ""; // Clear existing content
                  qholder.innerText = msg.val2; // Set new content
                } else {
                  console.error("Element with ID 'qholder' not found.");
                }

                //remove ans
                const ansholder = document.getElementById('ansholdertwo')

                while(ansholder.firstChild){
                    ansholder.removeChild(ansholder.firstChild)
                }
            }

            //set ans
            if (msg.val1 === 'two') { // Use strict equality for better type checking
                const ansholder = document.getElementById('ansholdertwo');
                const second = document.getElementById('second');
                const mili = document.getElementById('milisecond');
                const team = document.getElementById('player')
                
                // Ensure all elements exist to prevent errors
                if (ansholder && second && mili) {
                    const b = document.createElement('button');
                   // b.id = msg.value

                    b.className = "rounded-lg py-2.5 px-6 text-center w-full text-white bg-indigo-600 font-semibold text-lg transition-all duration-500 hover:bg-indigo-700";
                    
                    // Use template strings for clear, formatted output
                    b.innerHTML = `
                        ${msg.val2}<br />
                        <span id="${msg.val2.replace(" ", '')}" class="font-thin text-sm"></span>
                        `;
                    
                    ansholder.appendChild(b);

                    
                } else {
                    console.error('One or more required elements are missing.');
                }
            }

            if (msg.action == 'hulaa') {
                
                const btn = document.getElementById(msg.value);
                const team = document.getElementById('player');
                let teamans;
            
                // Determine the target element based on the team
                switch (team.textContent) {
                    case "team-one":
                        teamans = document.getElementById('prog-one-team-one-ans-two');
                        break;
                    case "team-two":
                        teamans = document.getElementById('prog-one-team-two-ans-two');
                        break;
                    case "team-three":
                        teamans = document.getElementById('prog-one-team-three-ans-two');
                        break;
                    default:
                        console.error("Invalid team specified");
                        return; // Exit if no valid team is found
                }
            
                if (!teamans) {
                    console.error("Target element not found");
                    return; // Exit if the target element is not found
                }
                console.log(teamans)
            
                // Create a new li element
                const liElement = document.createElement('li');
            
                // Add classes to the li element
                liElement.className = "flex flex-row items-center space-x-4";
            
                // Set the inner HTML of the li element
                liElement.innerHTML = `
                    <!-- Icon -->
                    <svg class="flex-shrink-0 w-6 h-6 text-indigo-600" viewBox="0 0 30 30" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M10 14.7875L13.0959 17.8834C13.3399 18.1274 13.7353 18.1275 13.9794 17.8838L20.625 11.25M15 27.5C8.09644 27.5 2.5 21.9036 2.5 15C2.5 8.09644 8.09644 2.5 15 2.5C21.9036 2.5 27.5 8.09644 27.5 15C27.5 21.9036 21.9036 27.5 15 27.5Z"
                            stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                    <div>
                        <p>${msg.value} <span>${second.innerText}:${mili.innerText} Seconds</span></p>
                    </div>
                `;
            
                // Append the new li element to the ul
                teamans.appendChild(liElement);
                console.log(liElement)
            
                // Update button text
                btn.innerText = `${second.innerText}:${mili.innerText} Seconds`;

            }
            

            


            //Score Board

            if(msg.action == "score"){
                showAndhide('prog-one-score-board' , msg.value)
            }
            

        }

        if(msg.program == "prog2"){

            if( msg.action == "banner"){
                showAndhide('prog2-banner', msg.value)
            }

            if(msg.value == 'spin'){
                SpinWheel()
            }

            if(msg.action == 'wheel'){
                showAndhide('chart', msg.value)
            }

            if(msg.action == 'Answer'){
                if(msg.value == 'hide'){
                    const qq = document.getElementById('roletaQ')
                    const qqa = document.getElementById('roleteAns')
                    qq.innerText = ''
                    qqa.innerText = ''
                }
                showAndhide('prog2-ans', msg.value)
            }

        }

        if(msg.program == "prog3"){
            const prog3hold = document.getElementById('prog3-holder')
            const prog3qq = document.getElementById('prog3qq')
            const prog3aa = document.getElementById('prog3aa')

            if(msg.action == 'banner'){
                showAndhide('p2banner', msg.value)
            }
            if(msg.action == "question"){                
                showAndhide('prog3-holder', 'show')
                prog3qq.textContent = msg.value

            }
            if(msg.action == "Anser"){
                prog3aa.textContent = msg.value
                
            }
            if(msg.action == "reset"){
                showAndhide('prog3-holder', 'hide')
                prog3aa.innerText = ""
                prog3qq.innerText = ""
                
            }
        }

        if(msg.program == "prog4"){
            if(msg.action == 'banner'){
                showAndhide('prog4-banner', msg.value)
            }
            const qq = document.getElementById('prog4-qq')
            const aa = document.getElementById('prog4-aa')
            const qhol = document.getElementById('rumbleWord')
            const ahol = document.getElementById('rumbleOrginal')

            if(msg.action == "question"){
                showAndhide('prog4-qq', 'show')
                var word = shuffleWord(msg.value)
                setWord(word, 'rumbleWord')
                setWord(msg.value, 'rumbleOrginal')
                



            }
            if(msg.action == "Anser"){
                showAndhide('prog4-aa', 'show')
                
            }
            if(msg.action == "reset"){
                showAndhide('prog4-qq', 'hide')
                showAndhide('prog4-aa', 'hide')
                
            }
        }

         

         

          
          console.log(`msg  ${reader.result}`);
        } catch (error) {
          console.log(`Error parsing Blob message: ${reader.result}`);
        }
      };
      reader.readAsText(event.data);
    }
  };












