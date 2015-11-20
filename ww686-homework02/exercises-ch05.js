// exercises-ch05.js

// 5.1 - Flattening
var arrays = [[2, 4, 6], [8], [10, 12]];

console.log(arrays.reduce(function flatten(current, next) {
  return current.concat(next);
}, []));


// 5.4 - Every and then some
function every(array, action) {
  for (var i = 0; i < array.length; i++) {
    if (!action(array[i])) {
      return false;
    }
  }
  return true;
}

function some(array, action) {
  for (var i = 0; i < array.length; i++) {
    if (action(array[i])) {
      return true;
    }
  }
  return false;
}

// every assignment
console.log("Running every...");
console.log(every([9, 48, 204, 528942], function(n) {
  return n % 3 == 0;
}));

// some assignment
console.log("Running some...");
console.log(some(['aardvark', 'abbreviate', 'abacuses', 'abandoners', 'abalones'], function(word) {
  return word.length == 9;
}));
