// produce an array of numbers based on arguments
function range(start, end, step) {

	//if (step == null) step = 1;
  step = (step || 1);
  // if no end, end becomes the start and new start is 0
  if (end == null) {
    end = start;
    start = 0;
  }

	var array = [];


	if (step > 0) {
    // positive step
		for (i = start; i < end; i += step) {
			array.push(i);
		}
	}
	else{
    //negative step
		for (i = start; i > end; i += step) {
			array.push(i);
		}
	}


	return array;
}


console.log(range(5));
console.log(range(2, 5));
console.log(range(2, 9, 2));
console.log(range(5, 0, -1));
console.log(range(6, -1, -2));
console.log(range(6, -1, 1));
