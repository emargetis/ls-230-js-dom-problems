// function nodeSwap(id1, id2) {
//   let ele1 = document.getElementById(`${id1}`);
//   let ele2 = document.getElementById(`${id2}`);
//   if (!ele1 || !ele2) return undefined;
  
//   if (ancestralRelationship(ele1, ele2)) return undefined;
//   if (ancestralRelationship(ele2, ele1)) return undefined;
  
//   let ele1Copy = ele1.cloneNode(true);
//   ele1.parentElement.insertBefore(ele1Copy, ele1);

//   ele2.parentElement.replaceChild(ele1, ele2);
//   ele1Copy.parentElement.replaceChild(ele2, ele1Copy);
// }

function nodeSwap(id1, id2) {
  let ele1 = document.getElementById(`${id1}`);
  let ele2 = document.getElementById(`${id2}`);
  if (!ele1 || !ele2) return undefined;
  
  if (ancestralRelationship(ele1, ele2)) return undefined;
  if (ancestralRelationship(ele2, ele1)) return undefined;
  
  let placeholder = document.createElement('div');
  
  ele1.parentNode.insertBefore(placeholder, ele1);
  ele2.parentElement.insertBefore(ele1, ele2);
  placeholder.insertAdjacentElement("afterend", ele2);
  
  placeholder.remove();
}

function ancestralRelationship(node, target) {
  if (node === target) {
    return true;
  }
  
  for (let idx = 0; idx < node.children.length; idx += 1) {
    if (ancestralRelationship(node.children[idx], target)) {
      return true;
    }
  }
  
  return false;
}

// at least one of the id attributes doesn't exist
nodeSwap(1, 20); //= undefined

// at least one of the nodes is a "child" of the other
nodeSwap(1, 4); //= undefined
nodeSwap(9, 3); //= undefined

// one swap
nodeSwap(1, 2);

// multiple swaps
nodeSwap(3, 1);
nodeSwap(7, 9);