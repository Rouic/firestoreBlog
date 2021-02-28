import './controllers/app.controllers.home';
import './controllers/app.controllers.post';
import './controllers/app.controllers.search';

import AOS from 'aos';
import mrSticky from './supporting/sticky.js';
import mrDropdownGrid from './supporting/dropdown-grid.js';
import './supporting/navigation.js';
import mrOverlayNav from './supporting/overlay-nav.js';


firestoreBlog.controller('root', ['$state','$stateParams','$scope', '$timeout', '$rootScope', '$location', function($state, $stateParams, $scope, $timeout, $rootScope, $location){	
	
	$timeout(function(){
		AOS.init({ once: true });		
	});
}]);

firestoreBlog.controller('header', ['$state','$stateParams','$scope', '$timeout', '$rootScope', '$location', function($state, $stateParams, $scope, $timeout, $rootScope, $location){	
	
	$timeout(function(){
		new mrSticky(angular.element('#navbar-main'));
		console.log(mrDropdownGrid);
		angular.forEach(angular.element("[data-toggle='dropdown-grid']"), function(grid, i){
			const $dropdownGrid = $(grid);
			mrDropdownGrid.jQueryInterface.call($dropdownGrid, $dropdownGrid.data());
		});
		
		AOS.init({ once: true });
		
		
	});
	
}]);