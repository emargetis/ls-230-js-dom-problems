document.addEventListener('DOMContentLoaded', () => {
  function removeHighlight(element) {
    element.classList.remove('highlight');
  }
  
  function highlightSelected(elem) {
    elem.classList.add('highlight');
  }

  
  //clear any highlighting on the page
  document.body.addEventListener('click', event => {
    let highlightedChildren = document.querySelectorAll('.highlight');

    for (let idx = 0; idx < highlightedChildren.length; idx += 1) {
      removeHighlight(highlightedChildren[idx]); 
    }
  }, true);
  
  
  document.addEventListener('click', event => {
    if (event.target.tagName === 'A') {
      let href = event.target.getAttribute('href');
      highlightSelected(document.querySelector(href));
    } else if (event.target.parentNode.tagName === 'ARTICLE') {
      let artId = event.target.parentNode.id;
      highlightSelected(document.querySelector(`#${artId}`));
    } else {
      highlightSelected(document.querySelector('main'));
    } 
  });
  
  // //Original Solution
  // //Highlight main for click anywhere else on screen
  // document.body.addEventListener('click', event => {
  //   let main = document.querySelector('main');
  //   main.classList.add('highlight');
  // });
  
  // //Add event listener to each article
  // let articles = document.querySelectorAll('article');
  
  // for (let idx = 0; idx < articles.length; idx += 1) {
  //   articles[idx].addEventListener('click', event => {
  //     event.stopPropagation();
  //     event.currentTarget.classList.add('highlight');
  //   });
  // }
  
  // //Add event listener to each link
  // let links = document.querySelectorAll('a');
  
  // for (let idx = 0; idx < links.length; idx += 1) {
  //   links[idx].addEventListener('click', event => {
  //     event.stopPropagation();
  //     let targetArticle = event.currentTarget.getAttribute('href');
      
  //     let targetArticleNode = document.querySelector(targetArticle);
  //     targetArticleNode.classList.add('highlight');
  //   });
  // }
})