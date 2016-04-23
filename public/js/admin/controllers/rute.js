app.factory('RuteResources', function ($location, $resource) {

	var auth_header = { 'Authorization': 'Basic aWJyb2hpbWlzbGFtQGdtYWlsLmNvbTpwYXNzd29yZA=='};

	var base_url = $location.protocol() + "://" + $location.host() + ":" + $location.port();

    return $resource(base_url + '/api/v1/rute/:id', {id:'@id'}, {
        list:  { method: 'GET', headers: auth_header},
        get:  { method: 'GET', headers: auth_header},
        store: { method: 'POST', headers: auth_header},
        update: { method: 'PUT', headers: auth_header},
        destroy: { method: 'DELETE', headers: auth_header},
    })
});

app.controller('RuteController', function($scope, RuteResources, PoolResources){

	$("#view").foundation();
	RuteResources.list().$promise.then(function (server_response) {
		$scope.routes = server_response.result;

		PoolResources.list().$promise.then(function (server_response) {
			$scope.pool = server_response.result;
			$scope.init = true;
		});

	});


	$scope.error_messages = [];
	$scope.error_messages_edit = [];
	$scope.init = false;
	
	$scope.add = function(){
		
		var data = $scope.new_data;

		RuteResources.store(data).$promise.then(function (result) {

			console.log(result);

		    if (result.status == 'err') {
				$scope.error_messages = result.err;
		    } else {
		    	$scope.error_messages = [];
		    	
		    	$('#modalTambah').foundation('close');
				
				RuteResources.list().$promise.then(function (server_response){
					$scope.routes = server_response.result;
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

		RuteResources.destroy({id: targetId}).$promise.then(function (result) {
		    $('#modalHapus').foundation('close');
			RuteResources.list().$promise.then(function (server_response){
				$scope.routes = server_response.result;
			});
		});
	}

	$scope.showUpdate = function(_id){
		console.log(_id);

		RuteResources.get({id: _id}).$promise.then(function(server_response) {
			$scope.rute = {};
			console.log(server_response.result);
			$scope.rute.asal_id = server_response.result.asal_id;
			$scope.rute.tujuan_id = server_response.result.tujuan_id;
			$scope.rute.keberangkatan = server_response.result.keberangkatan;
			$scope.rute.harga = server_response.result.harga;

			$('#ubah-id').val(_id);
			$('#modalUbah').foundation('open');
		})
	}

	$scope.update = function(){
		var targetId = $('#ubah-id').val();

		console.log($scope.pool);

		RuteResources.update({id: targetId}, $scope.rute).$promise.then(function (result) {
		    
			console.log(result);

			if (result.err) {
				$scope.error_messages_edit = result.message;
		    } else {
		    	$scope.error_messages_edit = [];
		    	
		    	$('#modalUbah').foundation('close');
				RuteResources.list().$promise.then(function (server_response){
					
					console.log(server_response);
					$scope.routes = server_response.result;

				});
		    }

		});
	}
});