recommenderApp.directive("spinner", function(){
	return {
		restrict: "A",
		template:   '<div class="bounce1"></div>' +
  					'<div class="bounce2"></div>' +
  					'<div class="bounce3"></div>'
	}
});