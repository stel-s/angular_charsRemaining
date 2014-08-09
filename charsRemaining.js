var app = angular.module('plunker', []);

app.controller('MainCtrl', function($scope) {
  $scope.maxChars="34";
  $scope.firstMaxChars = 28;
  $scope.secondMaxChars=54;
});


app.directive('charsRemaining',function($compile){
  
  return{
    restrict:'A',
    //for use multiple times in same view with different maxchars
    scope:true,
    link:function(scope,elem,attrs){
      //var maxChars = Number(attrs.charsRemaining);  
      console.log("d"+attrs.charsRemaining);
      var maxChars;
      
      
     	if(attrs.charsRemaining===""){
    	 maxChars = scope.maxChars;
      
       
      	}else if((attrs.charRemaining)!==""){
        //get maxChars either from controller or directly from elem attribute
          maxChars =Number(scope.$eval(attrs.charsRemaining))|| Number(attrs.charsRemaining);  
      	}
    
		//var maxChars = scope.firstMaxChars;
		var br=angular.element("</br>");
	    //using span.text()	  	
		var span = angular.element('<span ></span>');
	    elem.after(br);
	    br.after(span);
	    //using {{}}
	    var markup =$compile( "<span>using interpolation: {{remaining}} </span> ")(scope);
      	span.after(br);
      	br.after(markup);
    
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
                    	span.text("exceeded");
					  	scope.remaining="exceeded";
                    }
                    
              }else {
                scope.remaining=maxChars;
                span.text(maxChars);
            }
           }
          );
       	}
     };
 });
