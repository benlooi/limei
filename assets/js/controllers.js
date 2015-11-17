angular.module('controllers',[])
.controller('homeCtrl', function ($scope,$state){

$scope.login = function () {
//do some database checking
console.log($scope.user);
$state.go('booking');
}

	
})
.controller('bookingCtrl', function ($scope,uiCalendarConfig,bookingServices){
$scope.events=[];
$scope.user={};
$scope.user.user_id=1;
	bookingServices.getSlots()
	.success(function (data){
		console.log(data);
		
		

		for (i=0;i<data.length;i++){
			var event={};
			if (data[i].student==0) {
				event.title="Available";
				event.className=['available']

			};
			event.id=parseInt(data[i].booking_id);
			event.start=new Date(data[i].time);
			$scope.events.push(event);
		}
		console.log($scope.events);


	})
	.error(function (err){
		console.log(err)
	})
	var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

 $scope.alertOnEventClick = function (date){
 	$scope.date=date;
 		$scope.thisdate=new Date(date.start);
 		$scope.thistime=date.start;
 		$scope.user="John";
 		console.log($scope.thisdate+"-"+$scope.user)
    	$('#book').modal('show');
    };

$scope.closeModal = function () {
	$('#book').modal('hide');
}

$scope.book = function () {
	bookingServices.bookSlot($scope.user.user_id,$scope.date)
.success(function (data){
	console.log(data);
})
.error(function (err){
	console.log(err);
})
}
    $scope.uiConfig = {
      calendar:{
        height: 450,
        editable: true,
        header:{
          left: 'title',
          center: '',
          right: 'today prev,next'
        },
        eventClick: $scope.alertOnEventClick,
        eventDrop: $scope.alertOnDrop,
        eventResize: $scope.alertOnResize,
        eventRender: $scope.eventRender
      }
    };

    $scope.changeLang = function() {
      if($scope.changeTo === 'Hungarian'){
        $scope.uiConfig.calendar.dayNames = ["Vasárnap", "Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek", "Szombat"];
        $scope.uiConfig.calendar.dayNamesShort = ["Vas", "Hét", "Kedd", "Sze", "Csüt", "Pén", "Szo"];
        $scope.changeTo= 'English';
      } else {
        $scope.uiConfig.calendar.dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        $scope.uiConfig.calendar.dayNamesShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        $scope.changeTo = 'Hungarian';
      }
    };


    $scope.eventSources = [$scope.events]
	
})

;