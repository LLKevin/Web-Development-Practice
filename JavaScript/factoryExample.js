// Vars are attached to the 'window' object and are globally scoped. 
// const & let variable are globally scoped, but are not attached to the window object.

// this is a constructor
const User = function(name){
    this.name = name;
    this.discordName = "@"+ name;
}

// Just a function and doesn't require the new keyword;
function createUser(name){
    const discordName = "@" + name;
    //Extended Factory Pattern:
    let reputation = 0;
    const getReputation = () => reputation;
    const giveReputation = () => reputation++;
    //--------------
    return {name,getReputation, giveReputation, discordName};
}


//Destructuring Objects:
const obj = { a: 1, b: 2 };
const { a, b } = obj;
// This creates two variables, a and b,
// which are equivalent to
// const a = obj.a;
// const b = obj.b;

const array = [1, 2, 3, 4, 5];
const [ zerothEle, firstEle ] = array;
// This creates zerothEle and firstEle, both of which point
// to the elements in the 0th and 1st indices of the array


const josh = createUser("Josh");
josh.giveReputation();
josh.getReputation();

// Extending Functionality of User Factory:
function createPlayer(name, level){
    const {getReputation, giveReputation} = createUser(name);
    const increaseLevel = () => level++;
    return {name, getReputation, giveReputation, increaseLevel};    
}

    // Can be extended by using Object.assign method to add desired properties.
function createPlayer(name, level){
    const  user = createUser(name);
    const increaseLevel=()=> level++;
    return Object.assign({}, user, {increaseLevel});
}


// Module Pattern: IIFEs (Immediately Invoking Function Expression):
// Example #1:
const calculator = (function () {
    const add = (a, b) => a + b;
    const sub = (a, b) => a - b;
    const mul = (a, b) => a * b;
    const div = (a, b) => a / b;
    //Exposes the functions to be used in other places. 
    return { add, sub, mul, div };
  })();
  
  calculator.add(3,5); // 8
  calculator.sub(6,2); // 4
  calculator.mul(14,5534); // 77476
  


  // Module Pattern Example #2:
  const documentMock = (() => ({
    querySelector: (selector) => ({
      innerHTML: null,
    }),
  }))();
  
  const Formatter = (function(doc) {
    const log = (message) => console.log(`[${Date.now()}] Logger: ${message}`);
  
    const makeUppercase = (text) => {
      log("Making uppercase");
      return text.toUpperCase();
    };
  
    const writeToDOM = (selector, message) => {
      doc.querySelector(selector).innerHTML = message;
    }
  
    return {
      makeUppercase,
      writeToDOM,
    }
    // contains module dependencies required to function; A mock object can be used for testing purposes. 
    // Modules should be treated as closed entities. Example, document is only available when the dom is accessible, so an error would occur.
  })(document || documentMock);
  