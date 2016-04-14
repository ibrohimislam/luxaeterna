var groupbykota = function(array){

	var x = {};

	for (var i = 0; i < array.length; ++i) {
		var obj = array[i];

		//If a property for this DtmStamp does not exist yet, create
		if (x[obj.kota.nama] === undefined)
			x[obj.kota.nama] = [];

		//x will always be the array corresponding to the current DtmStamp. Push a value the current value to it.
		x[obj.kota.nama].push({id: obj.id, nama: obj.nama});
	}

	return x;
} 

var reversebyid = function(array){

	var x = {};

	for (var i = 0; i < array.length; ++i) {
		var obj = array[i];
		x[obj.id] = obj;
	}

	return x;
}