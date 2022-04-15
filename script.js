const q1 = document.querySelectorAll('[data-question-id = "one"]');
const q2 = document.querySelectorAll('[data-question-id = "two"]');
const q3 = document.querySelectorAll('[data-question-id = "three"]');

let answers = [];
let ansPos;
let result;

function changeToChecked(event) {
    const selection = event.currentTarget;
    const selectedAn = selection.parentElement.querySelector('.selected');
    const checkbox = selection.querySelector('.checkbox');
    if(selectedAn){
        selectedAn.classList.remove('selected');
        checkbox.classList.remove('selected');
        ansPos = answers.indexOf(selectedAn);
        answers.pop(ansPos);
    } 
    selection.classList.add('selected');
    checkbox.classList.add('selected');
    answers.splice(ansPos, 0, selection.dataset.choiceId);
    if(answers.length===3){
        for(let i = 0; i<q1.length; i++){
            q1[i].removeEventListener('click', changeToChecked);
        }
        for(let i = 0; i<q2.length; i++){
            q2[i].removeEventListener('click', changeToChecked);
        }
        for(let i = 0; i<q3.length; i++){
            q3[i].removeEventListener('click', changeToChecked);
        }
        showResults();
        return answers;
    }
}

addListener();

function addListener(){
    for(let i = 0; i<q1.length; i++){
        q1[i].addEventListener('click', changeToChecked);
        q2[i].addEventListener('click', changeToChecked);
        q3[i].addEventListener('click', changeToChecked);
    }    
}

function resetQuiz(event){
    const selected = document.querySelectorAll('.selected');
    const resultBox = document.querySelector('#results');
    resultBox.style.display = "none";
    for(let i = 0; i<selected.length; i++){
        selected[i].classList.remove('selected');
    }
    answers.length = 0;
    addListener();
}

function showResults(){
    const resultBox = document.querySelector('#results');
    resultBox.style.display = "block";
    let resultTitle = document.createElement('h1');
    let resultContent = document.createElement('p');
    let resetButton = document.createElement('button');
    resetButton.textContent = 'Ricomincia il quiz';
    resultTitle.classList.add('resTitle');
    resultContent.classList.add('resContent');
    resultBox.innerHTML = '';
    resultBox.appendChild(resultTitle);
    resultBox.appendChild(resultContent);
    resultBox.appendChild(resetButton);
    
    resetButton.addEventListener('click', resetQuiz);
    
    ansCheck();

    if('blep' === result){
        resultTitle.textContent = RESULTS_MAP['blep'].title;
        resultContent.textContent = RESULTS_MAP['blep'].contents;
    }
    if('burger' === result){
        resultTitle.textContent = RESULTS_MAP['burger'].title;
        resultContent.textContent = RESULTS_MAP['burger'].contents;
    }
    if('cart' === result){
        resultTitle.textContent = RESULTS_MAP['cart'].title;
        resultContent.textContent = RESULTS_MAP['cart'].contents;    
    }
    if('dopey' === result){
        resultTitle.textContent = RESULTS_MAP['dopey'].title;
        resultContent.textContent = RESULTS_MAP['dopey'].contents;
    }
    if('happy' === result){
        resultTitle.textContent = RESULTS_MAP['happy'].title;
        resultContent.textContent = RESULTS_MAP['happy'].contents;
    }
    if('nerd' === result){
        resultTitle.textContent = RESULTS_MAP['nerd'].title;
        resultContent.textContent = RESULTS_MAP['nerd'].contents;
    }
    if('shy' === result){
        resultTitle.textContent = RESULTS_MAP['shy'].title;
        resultContent.textContent = RESULTS_MAP['shy'].contents;
    }
    if('sleeping' === result){
        resultTitle.textContent = RESULTS_MAP['sleeping'].title;
        resultContent.textContent = RESULTS_MAP['sleeping'].contents;
    }
    if('sleepy' === result){
        resultTitle.textContent = RESULTS_MAP['sleepy'].title;
        resultContent.textContent = RESULTS_MAP['sleepy'].contents;
    }
}

function ansCheck(){
    for(let i = 0; i<answers.length; i++){
        if(answers[i] === answers[i+1] && answers[i] === answers[i+2] || 
            answers[i] === answers[i+1] || answers[i] === answers[i+2] || 
            answers[i] !== answers[i+1] && answers[i+1] !== answers[i+2]){
            return result = answers[i];
        }else if(answers[i] !== answers[i+1] && answers[i+1] === answers[i+2]){
            return result = answers[i+1];
        }
        return result;
    }
}
