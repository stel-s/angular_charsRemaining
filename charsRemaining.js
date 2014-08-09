var app = angular.module('MyApp', []);

app.controller('MainCtrl', function($scope) {
  
  $scope.firstMaxChars = 20;
 
});



app.directive('charsRemaining',function($compile){
  
  return{
    restrict:'A',
    link:function(scope,elem,attrs){
		var maxChars = scope.firstMaxChars;
		var br=angular.element("</br>");
	//using span.text()	  	
		var span = angular.element('<span ></span>');
	    elem.after(br);
	    br.after(span);
	//using {{}}
	    var markup =$compile( "<span>using interpolation: {{remaining}} </span> ")(scope);
	    span.after(br);
	    br.after(markup);
        console.log(elem);
            scope.$watch(function(){
              var val=elem.val();
              return val;
            },function(newValue,oldValue){
              console.log(newValue,oldValue);
              if (newValue){
                 var remaining=maxChars-newValue.length;
                 
                     if(remaining>0){
						             span.text(remaining);
						            scope.remaining=remaining;
                        
                 	 }else{
                    	span.text("exceeded")
					  	scope.remaining="exceeded";
                     }
              }else {
              scope.remaining=maxChars;
              span.text(maxChars);
            }
           }
          )
       }
  	}
 })
