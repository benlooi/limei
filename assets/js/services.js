angular.module('services',[])
.factory ('userServices',function ($http){
	
	var factory={};
	return factory;
})

.factory ('bookingServices',function ($http){
	
	var factory={};

	factory.getSlots = function () {
		return $http.get('apis/index.php/booking/getslots');
	}
	factory.bookSlot = function (user,datetime) {

		return $http.post('apis/index.php/booking/bookslot',{user:user,datetime:datetime});
	}
	return factory;

})