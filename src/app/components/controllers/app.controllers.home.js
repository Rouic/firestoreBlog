import mrIsotope from '../supporting/isotope';
import AOS from 'aos';
import '../supporting/svg-injector';
import { SVGInjector } from '@tanem/svg-injector';

firestoreBlog.controller('home', ['$timeout', function($timeout){	
	
	$timeout(function(){
		angular.forEach(angular.element("[data-isotope-collection]"), function(iso, i){
			const $isoGrid = $(iso);
			mrIsotope.jQueryInterface.call($isoGrid, $isoGrid.data());
		});
		angular.element(window).resize();
		AOS.init({ once: true });
		SVGInjector(document.querySelectorAll('[data-inject-svg]'));
		
	}, 1000);
	
}]);