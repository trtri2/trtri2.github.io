var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope) {
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

      $http.post("sqltest.js", data).success(function(data, status) {
        console.log('Data posted successfully');
      })
   }
});
