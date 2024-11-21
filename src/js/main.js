function toggleHidden(action, elementIds) {
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






//Selector button
//banner
const showAllbtn = document.getElementById("bshowall");
const showmainbtn = document.getElementById("showmain");
const hidemaintbn = document.getElementById('hidemain');
const hidealltbn = document.getElementById('hideall');

//program

const prog1 = document.getElementById('prog1')
const prog2 = document.getElementById('prog2')
const prog3 = document.getElementById('prog3')
const prog4 = document.getElementById('prog4')





hidealltbn.addEventListener('click', hideAll);

showAllbtn.addEventListener('click', showAll)