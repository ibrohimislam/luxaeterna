var app =  angular.module( 'ReservationApp', [ 'ngRoute', 'ngResource', 'ngMaterial' ] );

app.config(['$routeProvider', function($routeProvider) {
	$routeProvider.
	when('/', {
		templateUrl: 'partials/info.html',
		controller: 'ReservationController'
	}).
	when('/booking/:id', {
		templateUrl: 'partials/booking.html',
		controller: 'ReservationController'
	}).

	otherwise({
		redirectTo: '/'
	});
}]);

app.factory('SearchResources', function ($location, $resource) {

	var auth_header = { 'Authorization': 'Basic aWJyb2hpbWlzbGFtQGdtYWlsLmNvbTpwYXNzd29yZA=='};

	var base_url = $location.protocol() + "://" + $location.host() + ":" + $location.port();

    return $resource(base_url+'/api/v1/pencarian/pool/:tujuan_id/:asal_id/', {tujuan_id:'@tujuan_id', asal_id:'@asal_id'}, {
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

app.controller('ReservationController', function($location, $scope, SearchResources, PoolResources){

	var base_url = $location.protocol() + "://" + $location.host() + ":" + $location.port();

	$scope.pools = {};
	$scope.pools_by_id = {};
	$scope.routes_by_id = {};

	$scope.booking_process = false;

	PoolResources.list().$promise.then(function(server_response){
		var pool = server_response.result;
		$scope.pools = groupbykota(pool);
		$scope.pools_by_id = reversebyid(pool);
	});

	$scope.search = function() {
		$scope.booking_process = false;

		SearchResources.pool({tujuan_id:$scope.tujuan_id, asal_id:$scope.asal_id}).$promise.then(function (server_response) {
			$scope.rute = $scope.pools_by_id[$scope.asal_id].nama + ' - ' + $scope.pools_by_id[$scope.tujuan_id].nama;
			$scope.search_result = server_response.result;
			$scope.routes_by_id = reversebyid($scope.search_result);
		});
	}

	$scope.booking = function(id) {
		$scope.booking_process = true;
		$scope.route_id = id;
		$scope.rute_data = $scope.routes_by_id[id];
		console.log();
	}

	$scope.submit = function(){
		
	}
});