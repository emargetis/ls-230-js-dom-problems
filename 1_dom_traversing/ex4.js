function sliceTree(startId, endId) {
  const startElement = document.getElementById(`${startId}`);
  let endElement = document.getElementById(`${endId}`);
  if (!endElement || !startElement) return undefined;
  
  let currentElement = endElement;
  let returnArr = [];
  
  do {
    returnArr.unshift(currentElement.tagName);
    currentElement = currentElement.parentElement;
  } while (currentElement !== startElement && currentElement !== document.body);

  if (currentElement === document.body) {
    return undefined;
  } else {
    returnArr.unshift(currentElement.tagName);
  }
  
  return returnArr;
}

sliceTree(1, 4); //["ARTICLE", "HEADER", "SPAN", "A"]
sliceTree(1, 76); //undefined
sliceTree(2, 5); //undefined
sliceTree(5, 4); //undefined
sliceTree(1, 23); //["ARTICLE", "FOOTER"]
sliceTree(1, 22); //["ARTICLE", "MAIN", "SECTION", "P", "SPAN", "STRONG", "A"]
sliceTree(11, 19); //["SECTION", "P", "SPAN", "STRONG", "A"]