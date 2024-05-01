const cars = [
  { make: 'Honda', image: 'images/honda-accord-2005.jpg', model: 'Accord', year: 2005, price: 7000 },
  { make: 'Honda', image: 'images/honda-accord-2008.jpg', model: 'Accord', year: 2008, price: 11000 },
  { make: 'Toyota', image: 'images/toyota-camry-2009.jpg', model: 'Camry', year: 2009, price: 12500 },
  { make: 'Toyota', image: 'images/toyota-corrolla-2016.jpg', model: 'Corolla', year: 2016, price: 15000 },
  { make: 'Suzuki', image: 'images/suzuki-swift-2014.jpg', model: 'Swift', year: 2014, price: 9000 },
  { make: 'Audi', image: 'images/audi-a4-2013.jpg', model: 'A4', year: 2013, price: 25000 },
  { make: 'Audi', image: 'images/audi-a4-2013.jpg', model: 'A4', year: 2013, price: 26000 },
];

class Filters {
  constructor() {
    this.cacheTemplates();
    this.renderFilters();
    this.renderCarsList();
    this.bind();
  }
  
  bind() {
    document.querySelector('.filter_btn').addEventListener('click', (e) => this.filterSelection(e));
  }
  
  filterSelection(e) {
    e.preventDefault;
    
    let makeValue = document.querySelector('#make_select').value;
    let modelValue = document.querySelector('#model_select').value;
    let priceValue = document.querySelector('#price_select').value;
    let yearValue = document.querySelector('#year_select').value;
    
    let filterValues = {
      'data-make': makeValue, 
      'data-model': modelValue, 
      'data-price': priceValue, 
      'data-year': yearValue
    };
    let cars = [...document.querySelector("#cars").children];
    
    cars.forEach(car => {
      car.style.display = 'inline-block';
    });
    
    for (let val in filterValues) {
      if (filterValues[val]) {
        cars.forEach(car => {
          if (car.getAttribute(`${val}`) !== filterValues[val]) {
            car.style.display = 'none';
          }
        })
      } 
    }
  }
  
  cacheTemplates() {
    this.filterTemplate = Handlebars.compile(document.querySelector('#filterTemplate').innerHTML);
    this.carsTemplate = Handlebars.compile(document.querySelector('#carsTemplate').innerHTML);
    Handlebars.registerPartial('car', document.querySelector('#carPartial').innerHTML);
  }
  
  renderFilters() {
    let makes = this._getUniqueHandleBarList('make');
    let models = this._getUniqueHandleBarList('model');
    let prices = this._getUniqueHandleBarList('price');
    let years = this._getUniqueHandleBarList('year');
    
    document.querySelector('#filters').innerHTML = this.filterTemplate({
      makes,
      models,
      prices,
      years,
    })
  }
  
  renderCarsList() {
    document.querySelector('#cars').innerHTML = this.carsTemplate({cars});
  }
  
  _getUniqueHandleBarList(propertyName) {
    let uniqueValuesArray = [];
    
    cars.forEach(car => {
      if (uniqueValuesArray.indexOf(car[propertyName]) === -1) {
        uniqueValuesArray.push(car[propertyName]);
      }
    })
    
    console.log(uniqueValuesArray);
    
    return uniqueValuesArray.map(val => {
      return {[propertyName]: val};
    })
  }
}

document.addEventListener('DOMContentLoaded', () => new Filters());