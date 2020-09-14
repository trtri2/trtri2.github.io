var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $http) {
   $scope.submit= function(fid, name, grams, calories, protein, carb, fats, price){
      var data = $.param({
        food: JSON.stringify({
            fid: fid,
            name: name,
            grams: grams,
            calories: calories,
            protein: protein,
            carb: carb,
            fat: fats,
            price: price
        })
      });
      $http.post('api/food', JSON.stringify(data)).then(function (response)){
        if (response.data)
        $scope.msg = "Post data Succdessfully";
      }, function (response){
        $scope.msg = "FAILED BRO";
      });

      // $http.post("https://trtri2.github.io/angularjs_gmail_tutorial/index.html", data).success(function(data, status) {
      //   console.log('Data posted successfully');
      // })
   }
});
