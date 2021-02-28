firestoreBlog.run(['$window', '$rootScope', '$state', '$stateParams', '$transitions', function($window, $rootScope, $state, $stateParams, $transitions){
	
	$rootScope.$state = $state;
	$rootScope.$stateParams = $stateParams;	
	$rootScope.goBack = function(){
		$window.history.back();
	};		
	
	angular.element('body').removeClass('show');

	
	$transitions.onSuccess({}, function($transition){
		var eTop = null;
		$rootScope.title = ' - '+$state.current.title || 'Unknown';
		
	});
}]);