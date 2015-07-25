angular.module('home.controllers', [])

.controller('homeCtrl', function($scope, $ionicPlatform) {
	$ionicPlatform.ready(function(){
		try{ 	
			$scope.checkboxModel={};
			$scope.Check=function(id){
				if(id=='1'){
					$scope.checkboxModel.value1=true;
					$scope.checkboxModel.value2=false;
					$scope.checkboxModel.value3=false;
				}else if(id=='2'){
					$scope.checkboxModel.value2=true;
					$scope.checkboxModel.value1=false;
					$scope.checkboxModel.value3=false;
				}else if(id=='3'){
					$scope.checkboxModel.value3=true;
					$scope.checkboxModel.value2=false;
					$scope.checkboxModel.value1=false;
				}
				
			} 
		}catch(err){
			console.log(err.message);
		}
	});	
})


