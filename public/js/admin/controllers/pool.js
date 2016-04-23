
app.factory('PoolResources', function ($location, $resource) {

	var auth_header = { 'Authorization': 'Basic aWJyb2hpbWlzbGFtQGdtYWlsLmNvbTpwYXNzd29yZA=='};

	var base_url = $location.protocol() + "://" + $location.host() + ":" + $location.port();

    return $resource(base_url + '/api/v1/pool/:id', {id:'@id'}, {
        list:  { method: 'GET', headers: auth_header},
        get:  { method: 'GET', headers: auth_header},
        store: { method: 'POST', headers: auth_header},
        update: { method: 'PUT', headers: auth_header},
        destroy: { method: 'DELETE', headers: auth_header},
    })
});

app.factory('KotaResources', function ($location, $resource) {

	var auth_header = { 'Authorization': 'Basic aWJyb2hpbWlzbGFtQGdtYWlsLmNvbTpwYXNzd29yZA=='};

	var base_url = $location.protocol() + "://" + $location.host() + ":" + $location.port();

    return $resource(base_url + '/api/v1/kota/:id', {id:'@id'}, {
        list:  { method: 'GET', headers: auth_header},
    })
});


app.controller('PoolController', function($scope, PoolResources, KotaResources){

	$("#view").foundation();
	PoolResources.list().$promise.then(function (server_response) {
		$scope.pools = server_response.result;

		KotaResources.list().$promise.then(function (server_response) {
			console.log(server_response);

			$scope.kota = server_response.result;
			$scope.init = true;
		});
	});


	$scope.error_messages = [];
	$scope.error_messages_edit = [];
	$scope.init = false;
	
	$scope.add = function(){
		
		var data = getFormJSON($('#form-tambah'));

		PoolResources.store(data).$promise.then(function (result) {

			console.log(result);

		    if (result.status == 'err') {
				$scope.error_messages = result.err;
		    } else {
		    	$scope.error_messages = [];
		    	
		    	$('#modalTambah').foundation('close');
				
				PoolResources.list().$promise.then(function (server_response){
					$scope.pools = server_response.result;
				});
		    }
		});
	}

	$scope.confirmDestroy = function(id){
		$('#hapus-id').val(id);
		$('#modalHapus').foundation('open');
	}

	$scope.destroy = function(id){
		var targetId = $('#hapus-id').val();

		PoolResources.destroy({id: targetId}).$promise.then(function (result) {
		    $('#modalHapus').foundation('close');
			PoolResources.list().$promise.then(function (server_response){
				$scope.pools = server_response.result;
			});
		});
	}

	$scope.showUpdate = function(_id){
		console.log(_id);

		PoolResources.get({id: _id}).$promise.then(function(server_response) {
			$scope.pool = {};
			console.log(server_response.result);
			$scope.pool.nama = server_response.result.nama;
			$scope.pool.kota_id = server_response.result.kota_id;

			$('#ubah-id').val(_id);
			$('#modalUbah').foundation('open');
		})
	}

	$scope.update = function(){
		var targetId = $('#ubah-id').val();

		console.log($scope.pool);

		PoolResources.update({id: targetId}, $scope.pool).$promise.then(function (result) {
		    
			console.log(result);

			if (result.err) {
				$scope.error_messages_edit = result.message;
		    } else {
		    	$scope.error_messages_edit = [];
		    	
		    	$('#modalUbah').foundation('close');
				PoolResources.list().$promise.then(function (server_response){
					
					$scope.pools = server_response.result;

				});
		    }

		});
	}
});