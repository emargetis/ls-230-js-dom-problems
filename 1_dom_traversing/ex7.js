function nodesToArr(currentElement = document.body) {
  let returnArr = [];
  
  returnArr.push(currentElement.tagName);
  
  let childrenArr = [];
  
  for (let idx = 0; idx < currentElement.children.length; idx += 1) {
    childrenArr.push(nodesToArr(currentElement.children[idx]));
  }
  
  returnArr.push(childrenArr);
  
  return returnArr;
}