var app =  angular.module( 'ReservationApp', [ 'ngRoute', 'ngResource', 'ngMaterial' ] );

app.config(['$routeProvider', function($routeProvider) {
	$routeProvider.
	when('/', {
		templateUrl: 'partials/info.html',
		controller: 'ReservationController'
	}).
	when('/konfirmasi/:id', {
		templateUrl: 'partials/info.html',
		controller: 'ConfirmationController'
	}).
	when('/tiket/:id', {
		templateUrl: 'partials/info.html',
		controller: 'TicketController'
	}).
	otherwise({
		redirectTo: '/'
	});
}]);

app.factory('SearchResources', function ($location, $resource) {

	var auth_header = { 'Authorization': 'Basic aWJyb2hpbWlzbGFtQGdtYWlsLmNvbTpwYXNzd29yZA=='};

	var base_url = $location.protocol() + "://" + $location.host() + ":" + $location.port();

    return $resource(base_url+'/api/v1/pencarian/pool/:tujuan_id/:asal_id', {tujuan_id:'@tujuan_id', asal_id:'@asal_id'}, {
        pool:  { method: 'GET', headers: auth_header},
    })
    
});

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

app.factory('RouteResources', function ($location, $resource) {

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


app.factory('PemesananResources', function ($location, $resource) {

	var auth_header = { 'Authorization': 'Basic aWJyb2hpbWlzbGFtQGdtYWlsLmNvbTpwYXNzd29yZA=='};

	var base_url = $location.protocol() + "://" + $location.host() + ":" + $location.port();

    return $resource(base_url + '/api/v1/pemesanan/:id', {id:'@id'}, {
        get: { method: 'GET', headers: auth_header},
        store: { method: 'POST', headers: auth_header},
    })
});

app.controller('ReservationController', function($location, $scope, SearchResources, PoolResources, PemesananResources){

	var base_url = $location.protocol() + "://" + $location.host() + ":" + $location.port();

	$scope.min_date = new Date();

	$scope.pools = {};
	$scope.pools_by_id = {};
	$scope.routes_by_id = {};

	$scope.state = 1;

	PoolResources.list().$promise.then(function(server_response){
		var pool = server_response.result;
		$scope.pools = groupbykota(pool);
		$scope.pools_by_id = reversebyid(pool);
	});

	$scope.search = function() {
		$scope.state = 1;

		SearchResources.pool({tujuan_id:$scope.tujuan_id, asal_id:$scope.asal_id}).$promise.then(function (server_response) {
			$scope.rute = $scope.pools_by_id[$scope.asal_id].nama + ' - ' + $scope.pools_by_id[$scope.tujuan_id].nama;
			$scope.search_result = server_response.result;
			$scope.routes_by_id = reversebyid($scope.search_result);
		});
	}

	$scope.booking = function(id) {
		$scope.state = 2;
		$scope.route_id = id;
		$scope.rute_data = $scope.routes_by_id[id];
	}

	$scope.submit = function(){
		console.log($scope.route_id);

		PemesananResources.store({
			rute_id : $scope.route_id,
			namalengkap : $scope.nama,
			no_identitas : $scope.no_identitas,
			hp : $scope.hp,
			email : $scope.email,
			tanggal: $scope.tanggal,
			status: 0,
		}, function (server_response) {
			$scope.state = 3;
			$location.path('/konfirmasi/' + server_response.result.id);
		}, function (err) {
			console.log(err);
		});
	}
});

app.controller('ConfirmationController', function($http, $routeParams, $location, $scope, RouteResources, PoolResources, PemesananResources){

	var base_url = $location.protocol() + "://" + $location.host() + ":" + $location.port();
	
	$scope.state = 3;

	$scope.go = function(){
		if ($scope.status == 2) {
			$location.path('/tiket/' + $scope.pemesanan_id);
		} else {
            $http.post(base_url + '/api/v1/pemesanan/konfirmasi/' + $routeParams.id, {}).success(function(data, status) {
                $scope.status = 1;
                $scope.update_status_text();
            })
		}
	}

	$scope.update_status_text = function() {
		if ($scope.status == 2) {
			$scope.status_text = "telah dibayar";
			$scope.action = "selanjutnya";
			$scope.action_enabled = true;
		} else if ($scope.status == 1) {
			$scope.status_text = "menunggu konfirmasi";
			$scope.action = "menunggu konfirmasi";
			$scope.action_enabled = false;
		} else if ($scope.status == 0) {
			$scope.status_text = "belum dibayar";
			$scope.action = "konfirmasi";
			$scope.action_enabled = true;
		}
	}

	PemesananResources.get({id: $routeParams.id}).$promise.then(function(server_response){
		$scope.tanggal = new Date(server_response.result.tanggal);
		$scope.pemesanan_id = server_response.result.id;
		$scope.nama = server_response.result.namalengkap;
		$scope.no_identitas = server_response.result.no_identitas;
		$scope.hp = server_response.result.hp;
		$scope.email = server_response.result.email;

		$scope.status = server_response.result.status;
		$scope.update_status_text();

		$scope.code = parseInt(server_response.result.id.substr(-2),16);
		$scope.link = base_url + "/#/konfirmasi/" + server_response.result.id;

		RouteResources.get({id: server_response.result.rute_id}).$promise.then(function(server_response_rute){
			$scope.rute = server_response_rute.result.asal.nama + " - " + server_response_rute.result.tujuan.nama;
			$scope.rute_data = server_response_rute.result;
			$scope.harga = server_response_rute.result.harga;
		})
	})
});

app.controller('TicketController', function($routeParams, $location, $scope, RouteResources, PoolResources, PemesananResources){

	var base_url = $location.protocol() + "://" + $location.host() + ":" + $location.port();
	
	$scope.state = 4;

	PemesananResources.get({id: $routeParams.id}).$promise.then(function(server_response){
		$scope.status = server_response.result.status;
        if ($scope.status != 2) {
            $location.path('/konfirmasi/' + $routeParams.id);
        }

        $scope.id = server_response.result.id;
        $scope.tanggal = new Date(server_response.result.tanggal);
        $scope.pemesanan_id = server_response.result.id;
        $scope.nama = server_response.result.namalengkap;
        $scope.no_identitas = server_response.result.no_identitas;
        $scope.hp = server_response.result.hp;
        $scope.email = server_response.result.email;


		$scope.code = parseInt(server_response.result.id.substr(-2),16);
		$scope.link = base_url + "/#/konfirmasi/" + server_response.result.id;

		RouteResources.get({id: server_response.result.rute_id}).$promise.then(function(server_response_rute){
			$scope.rute = server_response_rute.result.asal.nama + " - " + server_response_rute.result.tujuan.nama;
			$scope.rute_data = server_response_rute.result;
			$scope.harga = server_response_rute.result.harga;
		})
	})


	$scope.print = function(){
      var originalContents = document.body.innerHTML;
      
      document.body.innerHTML = document.getElementById("tiket").innerHTML;


      setTimeout(function () {
        window.print();
        document.body.innerHTML = originalContents;
      }, 350);


      return true;
	}
});