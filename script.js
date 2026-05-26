const categoryButtons = document.querySelectorAll('.category-btn');
const questionButton = document.getElementById('question');
const answerButtons= document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

let score = 0;
let questionIndex = 0;
let questions = [];

categoryButtons.forEach(button => {
  button.addEventListener('click', async (e) => {
    
    const category = e.target.innerText.trim().toLowerCase();
    try {
      const promise = await fetch(`${category}.json`);

      if(!promise.ok){
          throw new Error(`Could not find ${category}.json`);
      }
      const data = await promise.json();
      questions = data;

      document.getElementById('category-buttons').style.display = 'none';
      document.querySelector('.quiz').style.display = 'block';
      document.querySelector('h2').style.display = 'none';
      document.querySelector('h1').style.display='none';

      startQuiz();
     
    } catch (error) {
      console.error(error);
    }
  });
});

function startQuiz(){
    questionIndex = 0;
    score = 0;
    showQuestions();
}

function showQuestions(){
    resetState();
    
    let currentQuestion = questions[questionIndex];
    let questionNo = questionIndex + 1;
    questionButton.innerHTML = questionNo + ". " + currentQuestion.question;
    

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add('answer-btn');
        
       
        answerButtons.appendChild(button);

        if(answer.correct){
            button.dataset.correct = answer.correct;
        }

        button.addEventListener('click', selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = 'none';
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}


function selectAnswer(e) {
    const selectedButton=e.target;
    const isCorrect=selectedButton.dataset.correct==='true';

    if(isCorrect){
     selectedButton.classList.add('correct');  
     score++;
    }
    else{
      selectedButton.classList.add('incorrect');
    }

    Array.from(answerButtons.children).forEach(button =>{
      if(button.dataset.correct === "true"){
        button.classList.add('correct');
      }

      button.disabled=true;
    });

    nextButton.style.display='block';
    nextButton.addEventListener('click',()=>{

      questionIndex++;
      if(questionIndex<questions.length){
        showQuestions();
      }else{
        showScore();
      }
    });
}

function showScore(){
  resetState();

  questionButton.innerHTML=`Quiz is over <br> Your score is: ${score} out of ${questions.length}`;

  nextButton.innerHTML='PLay again';
  nextButton.style.display='block';
  nextButton.onclick=()=>{
    location.reload();
  }
}