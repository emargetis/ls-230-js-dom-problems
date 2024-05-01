const questions = [
  {
    id: 1,
    description: "Who is the author of <cite>The Hitchhiker's Guide to the Galaxy</cite>?",
    options: ['Dan Simmons', 'Douglas Adams', 'Stephen Fry', 'Robert A. Heinlein'],
  },
  {
    id: 2,
    description: 'Which of the following numbers is the answer to Life, the \
                  Universe and Everything?',
    options: ['66', '13', '111', '42'],
  },
  {
    id: 3,
    description: 'What is Pan Galactic Gargle Blaster?',
    options: ['A drink', 'A machine', 'A creature', 'None of the above'],
  },
  {
    id: 4,
    description: 'Which star system does Ford Prefect belong to?',
    options: ['Aldebaran', 'Algol', 'Betelgeuse', 'Alpha Centauri'],
  },
];

const answerKey = { '1': 'Douglas Adams', '2': '42', '3': 'A drink', '4': 'Betelgeuse' };

document.addEventListener('DOMContentLoaded', () => {
  class Quiz {
    constructor() {
      this.compileTemplates();
      this.renderQuiz();
      this.bind();
    }
    
    bind() {
      this.submitButton = document.querySelector('#submit');
      this.submitButton.addEventListener('click', (e) => this.gradeQuiz(e));
      
      this.resetButton = document.querySelector('#reset');
      this.resetButton.addEventListener('click', (e) => this.resetQuiz(e));
    }
    
    compileTemplates() {
      this.questionTemplate = Handlebars.compile(document.querySelector('#questionTemplate').innerHTML);
      this.questionHTML = this.questionTemplate({questions});
    }
    
    renderQuiz() {
      let fieldset = document.querySelector('fieldset');
      fieldset.innerHTML = this.questionHTML;
    }
    
    resetQuiz(e) {
      e.preventDefault();
      let results = document.querySelectorAll('.result');
      results.forEach(result => {
        result.innerHTML = ""
        result.classList.remove("wrong");
        result.classList.remove("correct");
      });
      
      let answeredQuestions = document.querySelectorAll('[name^="question"]:checked');
      answeredQuestions.forEach(question => {
        question.checked = false;
      });

      this.submitButton.removeAttribute("disabled");
    }
    
    gradeQuiz(e) {
      e.preventDefault;
      this.submitButton.setAttribute("disabled", true);
      
      let questions = document.querySelectorAll('.question');
      questions.forEach(question => {
        let answer = question.querySelector('[name^="question"]:checked');
        let resultText;
        let resultClass;
        let id = question.dataset.id;
        
        if (answer) {
          if (answerKey[id] === answer.value) {
            resultText = `Correct Answer`;
            resultClass = "correct";
          } else {
            resultText = `Wrong answer. The correct answer is: "${answerKey[id]}"`;
            resultClass = "wrong";
          }
        } else {
          resultText = `You did not answer this question. The correct answer is: "${answerKey[id]}"`;
          resultClass = "wrong";
        }
        
        let resultDiv = question.nextElementSibling;
        resultDiv.textContent = resultText;
        resultDiv.classList.add(`${resultClass}`);
      });
    }
  }
  
  new Quiz();
})