var app = angular.module("myApp", []);

app.controller("mainController", function ($scope, $http) {
  $scope.formData = {};

  function getAllDevices() {
    $http.get("/api/users/1/homes/1/rooms/1/devices")
    .success(function(data) {
      $scope.devices = data.data;
      console.log(data);
    }).error(function(err) {
      console.log(err);
    });
  }

  // show all todos in the landing page.
  getAllDevices();

  $scope.updateDeviceValues = function(device) {
    $scope.formData = device;
    $http.put("/api/users/1/homes/1/rooms/1/devices/" + device.id, $scope.formData)
      .success(function(data) {
        $scope.formData = {};
        getAllDevices();
      }).error(function(err) {
        console.log(err);
      });
  }
});
