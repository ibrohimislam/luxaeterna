app.factory('PesananResources', function ($location, $resource) {

	var auth_header = { 'Authorization': 'Basic aWJyb2hpbWlzbGFtQGdtYWlsLmNvbTpwYXNzd29yZA=='};

	var base_url = $location.protocol() + "://" + $location.host() + ":" + $location.port();

    return $resource(base_url + '/api/v1/pemesanan/:id', {id:'@id'}, {
        get:  { method: 'GET', headers: auth_header}
    })
});

var reversebyid = function(array){

	var x = {};

	for (var i = 0; i < array.length; ++i) {
		var obj = array[i];
		x[obj.id] = obj;
	}

	return x;
}

app.controller('CheckInController', function($scope, $http, $location, PesananResources, RuteResources, PoolResources){

	var base_url = $location.protocol() + "://" + $location.host() + ":" + $location.port();

	$("#view").foundation();

	$scope.test = function(){
		$scope.tiket = {};
		$scope.get_data($scope.id);
	}

	$scope.get_data = function(_id){
		PesananResources.get({id: _id}).$promise.then(function (server_response) {
			console.log(server_response);
			$scope.tiket = server_response.result;

			if (typeof ($scope.tiket) != 'undefined') {
				$scope.tiket.code = parseInt($scope.tiket.id.substr(-2),16);
				$scope.tiket.tanggal = new Date($scope.tiket.tanggal);
				$scope.tiket.rute_resolved = $scope.rute_by_id[$scope.tiket.rute_id];
				$scope.tiket.tarif = $scope.tiket.rute.harga + $scope.tiket.code;
				$scope.tiket.rute_string = $scope.pool_by_id[$scope.tiket.rute.asal_id].nama + ' - ' +  $scope.pool_by_id[$scope.tiket.rute.tujuan_id].nama;
			}
		});
	}

	PoolResources.list().$promise.then(function (server_response) {
		$scope.pool_list = server_response.result;
		$scope.pool_by_id = reversebyid($scope.pool_list);


		RuteResources.list().$promise.then(function (server_response) {
			$scope.rute_list = server_response.result;
			$scope.rute_by_id = reversebyid($scope.rute_list);
		});

	});
});