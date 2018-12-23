var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $http) {
   $scope.submit= function(){
      var data = $.param({
        food: JSON.stringify({
            fid: $scope.fid,
            name: $scope.name,
            grams: $scope.grams,
            calories: $scope.calories,
            protein: $scope.protein,
            carb: $scope.carb,
            fat: $scope.fats,
            price: $scope.price
        })
      });

      $http.post("https://trtri2.github.io/angularjs_gmail_tutorial/index.html", data).success(function(data, status) {
        console.log('Data posted successfully');
      })
   }
});
