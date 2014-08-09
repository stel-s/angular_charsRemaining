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
	  	var span = angular.element('<span ></span>');
	    elem.after(br);
	    br.after(span);
	    var markup =$compile( "<span> {{remaining}} </span> ")(scope);
	    span.after(markup);
        console.log(elem);
            scope.$watch(function(){
              var val=elem.val();
              return val;
            },function(newValue,oldValue){
              console.log(newValue,oldValue);
              if (newValue){
                 var remaining=maxChars-newValue.length;
                 scope.remaining=remaining;
                     if(remaining>0){
                         span.text(remaining);
                 	 }else{
                    	span.text("exceeded")
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

