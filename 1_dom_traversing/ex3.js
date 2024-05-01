function domTreeTracer(id) {
  let currentElement = document.getElementById(`${id}`);
  let returnArr = [];
  
  while (currentElement.tagName !== "BODY") {
    let currentLevelSiblings = currentElement.parentNode.children;
    let levelArr = [];
    
    [...currentLevelSiblings].forEach(sibling => {
      levelArr.push(sibling.tagName);
    })
    
    returnArr.push(levelArr);
    currentElement = currentElement.parentNode;
  }
  
  return returnArr;
}

domTreeTracer(1); //= [["ARTICLE"]]
domTreeTracer(2); //= [["HEADER", "MAIN", "FOOTER"], ["ARTICLE"]]
domTreeTracer(22); //= [["A"], ["STRONG"], ["SPAN", "SPAN"], ["P", "P"], ["SECTION", "SECTION"], ["HEADER", "MAIN", "FOOTER"], ["ARTICLE"]]