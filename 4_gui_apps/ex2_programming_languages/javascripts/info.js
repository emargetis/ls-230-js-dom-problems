const languagesDisplay = {
  languages: [
    {
      name: 'Ruby',
      description: 'Ruby is a dynamic, reflective, object-oriented, ' +
      'general-purpose programming language. It was designed and developed in the mid-1990s ' +
      'by Yukihiro Matsumoto in Japan. According to its creator, Ruby was influenced by Perl, ' +
      'Smalltalk, Eiffel, Ada, and Lisp. It supports multiple programming paradigms, ' +
      'including functional, object-oriented, and imperative. It also has a dynamic type ' +
      'system and automatic memory management.'
    },
  
    {
      name: 'JavaScript',
      description: 'JavaScript is a high-level, dynamic, untyped, and interpreted ' +
      'programming language. It has been standardized in the ECMAScript language ' +
      'specification. Alongside HTML and CSS, JavaScript is one of the three core ' +
      'technologies of World Wide Web content production; the majority of websites employ ' +
      'it, and all modern Web browsers support it without the need for plug-ins. JavaScript ' +
      'is prototype-based with first-class functions, making it a multi-paradigm language, ' +
      'supporting object-oriented, imperative, and functional programming styles.'
    },
  
    {
      name: 'Lisp',
      description: 'Lisp (historically, LISP) is a family of computer programming languages ' +
      'with a long history and a distinctive, fully parenthesized prefix notation. ' +
      'Originally specified in 1958, Lisp is the second-oldest high-level programming ' +
      'language in widespread use today. Only Fortran is older, by one year. Lisp has changed ' +
      'since its early days, and many dialects have existed over its history. Today, the best '+
      'known general-purpose Lisp dialects are Common Lisp and Scheme.'
    },
    
    {
      name: 'Short',
      description: 'Short is a made up language to test the show more functionality of this page'
    }
  ],
  
  cacheTemplates: function() {
    this.langTemplate = Handlebars.compile(document.querySelector('#langTemplate').innerHTML);
    Handlebars.registerHelper("descriptionLongEnough", function(description) {
      return description.length > 120;
    })
  },
  
  renderLanguages: function() {
    let languagesHTML = this.langTemplate({languages: this.languages});
    document.querySelector('#languages').innerHTML = languagesHTML;
  },
  
  shortenAllPreviews: function() {
    let descriptions = document.querySelectorAll('div.lang > p');
    descriptions.forEach(description => {
      this.showLessText(description);
    });
    let buttons = document.querySelectorAll('div.lang > a');
    buttons.forEach(button => {
      this.setShowMoreButtonText(button);
    });
  },
  
  showLessText: function(description) {
    if (description.textContent.length > 120) {
      description.textContent = description.textContent.slice(0, 121) + ' ...';
    }
  },
  
  showMoreText: function(description) {
     let languageName = description.parentElement.querySelector('h2').textContent;
     let fullDescription = this.languages.filter(language => {
       return language.name === languageName;
     })[0].description;
     
     description.textContent = fullDescription;
  },
  
  setShowMoreButtonText: function(button) {
    button.textContent = 'Show More';
  },
  
  setShowLessButtonText: function(button) {
    button.textContent = 'Show Less';
  },
  
  processClick: function(e) {
    e.preventDefault();
    let button = e.target;
    if (button.textContent === 'Show More') {
      this.showMoreText(button.parentElement.querySelector('p'));
      this.setShowLessButtonText(button);
    } else if (button.textContent === 'Show Less') {
      this.showLessText(button.parentElement.querySelector('p'));
      this.setShowMoreButtonText(button);
    }
    
  },
  
  bind: function() {
    let buttons = document.querySelectorAll('div.lang > a');
    buttons.forEach(button => {
      button.addEventListener('click', (e) => this.processClick(e));
    })
  },
  
  init: function() {
    this.cacheTemplates();
    this.renderLanguages();
    this.shortenAllPreviews();
    this.bind();
  }

}

document.addEventListener('DOMContentLoaded', () => {
  languagesDisplay.init();
})
