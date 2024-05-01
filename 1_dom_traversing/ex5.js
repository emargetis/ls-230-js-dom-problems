function colorGeneration(targetGen) {
  if (walkWithGeneration === 0) return;
  
  function walkWithGeneration(node, generation, callback) {
    callback(node, generation); 
    
    for (let index = 0; index < node.children.length; index += 1) {
      walkWithGeneration(node.children[index], generation + 1, callback);
    }
  }
  
  walkWithGeneration(document.body, 0, (node, generation) => {
    if (generation === targetGen) node.classList.add('generation-color');
  });
}