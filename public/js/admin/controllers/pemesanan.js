app.factory('PesananResources', function ($location, $resource) {

	var auth_header = { 'Authorization': 'Basic aWJyb2hpbWlzbGFtQGdtYWlsLmNvbTpwYXNzd29yZA=='};

	var base_url = $location.protocol() + "://" + $location.host() + ":" + $location.port();

    return $resource(base_url + '/api/v1/pemesanan/waiting', {}, {
        list:  { method: 'GET', headers: auth_header}
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

app.controller('MainController', function($scope, $http, $location, PesananResources, RuteResources, PoolResources){

	var base_url = $location.protocol() + "://" + $location.host() + ":" + $location.port();

	$("#view").foundation();

	$scope.update_list = function(){
		PesananResources.list().$promise.then(function (server_response) {
			console.log(server_response);
			$scope.list_pesanan = server_response.result;

			for (var i = $scope.list_pesanan.length - 1; i >= 0; i--) {
				$scope.list_pesanan[i].code = parseInt($scope.list_pesanan[i].id.substr(-2),16);
				$scope.list_pesanan[i].tanggal = new Date($scope.list_pesanan[i].tanggal);
				$scope.list_pesanan[i].rute_resolved = $scope.rute_by_id[$scope.list_pesanan[i].rute_id];
				$scope.list_pesanan[i].tarif = $scope.list_pesanan[i].rute.harga + $scope.list_pesanan[i].code;
				$scope.list_pesanan[i].rute_string = $scope.pool_by_id[$scope.list_pesanan[i].rute.asal_id].nama + ' - ' +  $scope.pool_by_id[$scope.list_pesanan[i].rute.tujuan_id].nama;
			};
		});
	}

	PoolResources.list().$promise.then(function (server_response) {
		$scope.pool_list = server_response.result;
		$scope.pool_by_id = reversebyid($scope.pool_list);


		RuteResources.list().$promise.then(function (server_response) {
			$scope.rute_list = server_response.result;
			$scope.rute_by_id = reversebyid($scope.rute_list);

			$scope.update_list();
		});

	});

	$scope.showKonfirmasi = function(_id) {
		$('#ubah-id').val(_id);
		$('#modalUbah').foundation('open');
	}

	$scope.update = function(_id) {
		$http.post(base_url + '/api/v1/pemesanan/payment_confirmation/' + $('#ubah-id').val(), {}).success(function(data, status) {
			RuteResources.list().$promise.then(function (server_response){
					
				console.log(server_response);
				$scope.routes = server_response.result;
				$('#modalUbah').foundation('close');

				$scope.update_list();
			});
        })
	}
});