function arrayToList(array) {
	var list = null;
	for (var i = array.length -1; i >= 0; i--) {
		list = {value: array[i], rest: list};
	}
	return list;
}


function listToArray(list) {
	var array = [];
	for (var node = list; node; node = node.rest) {
		array.push(node.value);
	}
	return array;
}


function prepend(element, list) {
	return {value: element, rest: list};
}


function nth(list, num) {
	if (!list) {
		return undefined;
	}
	else if (num == 0) {
		return list.value;
	}
	else {
		return nth(list.rest, num -= 1);
	}
}
