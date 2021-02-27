firestoreBlog.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) { 

	 $urlRouterProvider.otherwise('/');
	 $locationProvider.html5Mode(true);
	
	$stateProvider   
	.state('root', {
		views: {
			'@' : {
				 templateUrl: require('../templates/layout.html').default,
				 controller: 'root',
			},
			'header': {
				templateUrl: require('../templates/header.html').default,
			},
			'footer': {
				templateUrl: require('../templates/footer.html').default,
			}		    
		}
	})	                
	.state('home', {
		 parent: 'root',
		 title: 'Firestore Blog',
		url: '/',
		views: {
			'view': {
				 templateUrl: require('../templates/pages/home.html').default,
				controller: 'home'
			}
		}        
	})
	
}]);