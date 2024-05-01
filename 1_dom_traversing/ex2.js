/*
id1
-direct (9): blankText, h1, blankText, p, blankText, a, 
         blankText, div, blankText
-indirect (10): 
  -h1 (2): text, em
  -p (6): blankText, text, blankText, span, text, blankText
  -a (1): strong
  -div (1): p

id2
-direct (2): text, em
-indirect (1):
  -em (1): text

id3
-direct (1): text

id4
-direct(6): blankText, text, blankText, span, text, blankText
-indirect(1):
  -span (1): text
  
id5
-direct (1): text

id6
-direct (1): strong
-indirect (1):
  -strong(1): text

id7
-direct (1): text

id8
-direct (1): p
-indirect(1):
  -p (1): a

id9
-direct (1): a
-indirect(1):
  -a (1): text
  
id10
-direct (1): text

*/


// sample output
// > childNodes(1);
// = [9, 12]
// > childNodes(4);
// = [3, 1]
// > childNodes(9);
// = [1, 1]

function walk(node, callback) {
  callback(node);                                                   // do something with node
  for (let index = 0; index < node.childNodes.length; index += 1) { // for each child node
    walk(node.childNodes[index], callback);                         // recursively call walk()
  }
}

function childNodes(id) {
  let element = document.getElementById(`${id}`);
  let children = element.childNodes;
  let childrenArr = Array.prototype.slice.call(children);
  let directCount = children.length;
  let indirectCount = 0;

  childrenArr.forEach(child => {
    walk(child, node => {
      indirectCount += node.childNodes.length;
    });
  });
  
  return [directCount, indirectCount];
}

childNodes(1);
childNodes(4);
childNodes(9);