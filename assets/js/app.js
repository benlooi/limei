angular.module('jwss',['controllers','services','ui.router','ui.calendar'])
.config(function($stateProvider,$urlRouterProvider){
$stateProvider
.state('home',{
	url: '/home',
	templateUrl: 'templates/home.html',
	controller:'homeCtrl'
})
.state('booking',{
	url: '/booking',
	templateUrl: 'templates/booking.html',
	controller:'bookingCtrl'
})

;
$urlRouterProvider.otherwise('/home');
});
