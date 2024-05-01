document.addEventListener('DOMContentLoaded', () => {
  let animalFilters = {
    Classifications: ['Animals', 'Bear', 'Turtle', 'Whale', 'Salmon', 'Ostrich'],
    Vertebrate:	['Bear', 'Turtle', 'Whale', 'Salmon', 'Ostrich'],
    'Warm-blooded':	['Bear', 'Whale', 'Ostrich'],
    'Cold-blooded':	['Salmon', 'Turtle'],
    Mammal:	['Bear', 'Whale'],
    Bird:	['Ostrich'],
  };

  let classFilters = {
    Animals: ['Classifications', 'Vertebrate', 'Warm-blooded', 'Cold-blooded', 'Mammal', 'Bird'],
    Bear:	['Vertebrate', 'Warm-blooded', 'Mammal'],
    Turtle:	['Vertebrate', 'Cold-blooded'],
    Whale:	['Vertebrate', 'Warm-blooded', 'Mammal'],
    Salmon:	['Vertebrate', 'Cold-blooded'],
    Ostrich:	['Vertebrate', 'Warm-blooded', 'Bird'],
  };
  
  let clearBtn = document.querySelector('#clear');
  let animalClasses = document.querySelector('#animal-classifications');
  let animals = document.querySelector('#animals');
  
  //Show correct options
  function showOptions(fullList, desiredList) {
    let visibleOptions = [];
    
    for (let idx = 0; idx < fullList.length; idx += 1) {
      let option = fullList[idx];
      
      if (desiredList.indexOf(option.value) < 0) {
        option.style.display = 'none';
      } else {
        option.style.display = 'inline';
        visibleOptions.push(option);
      }
    }
    
    visibleOptions[0].selected = true;
  }
  
  //Clear button
  clearBtn.addEventListener('click', event => {
    event.preventDefault();
    
    //Show all animal options
    let animalOptionsDesired = animalFilters['Classifications'];
    let animalOptions = animals.children;
    showOptions(animalOptions, animalOptionsDesired);
    
    //Show all class options
    let classOptionsDesired = classFilters['Animals'];
    let classOptions = animalClasses.children;
    showOptions(classOptions, classOptionsDesired);
  });
  
  //Animal class selection filters animals
  animalClasses.addEventListener('change', event => {
    let animalOptionsDesired = animalFilters[event.target.value];
    let animalOptions = animals.children;
    showOptions(animalOptions, animalOptionsDesired);
  });
  
  //Animal selection filters class
  animals.addEventListener('change', event => {
    let classOptionsDesired = classFilters[event.target.value];
    let classOptions = animalClasses.children;
    showOptions(classOptions, classOptionsDesired);
  });
})