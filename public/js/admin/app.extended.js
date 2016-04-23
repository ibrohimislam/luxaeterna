var app = angular.module('myApp',['ngRoute', 'ngResource']);

app.filter('regex', function() {
  return function(input, field, regex) {
      var patt = new RegExp(regex);      
      var out = [];
      for (var i = 0; i < input.length; i++){
          if(patt.test(input[i][field]))
              out.push(input[i]);
      }      
    return out;
  };
});

app.directive('myEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.myEnter);
                });

                event.preventDefault();
            }
        });
    };
});

app.config(['$routeProvider', function($routeProvider) {
	$routeProvider.
	when('/rute', {
		templateUrl: 'partials/admin/rute.html',
		controller: 'RuteController'
	}).
	when('/pool', {
		templateUrl: 'partials/admin/pool.html',
		controller: 'PoolController'
	}).
	when('/', {
		templateUrl: 'partials/admin/pemesanan.html',
		controller: 'MainController'
	}).
	when('/checkin', {
		templateUrl: 'partials/admin/checkin.html',
		controller: 'CheckInController'
	}).
	when('/laporan', {
		templateUrl: 'partials/admin/laporan.html',
		controller: 'ReportController'
	}).
	otherwise({
		redirectTo: '/rute'
	});
}]);