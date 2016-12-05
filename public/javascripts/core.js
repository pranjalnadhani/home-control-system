var app = angular.module("myApp", ["angularMoment", "rzModule"]);

app.controller("mainController", function ($scope, $http) {
  $scope.formData = {};

  function getAllDevices() {
    $http.get("/api/users/1/homes/1/rooms/1/devices")
    .success(function(data) {
      var devices = data.data;
      for(i = 0; i < devices.length; i++){
        var now = moment(Date.now());
        var then = moment(devices[i].updated_at);
        if(now.diff(then, 'minutes') <= 5){
          devices[i]["available"] = "ONLINE";
        } else {
          devices[i]["available"] = "OFFLINE";
        }
      }
      $scope.devices = devices;
      console.log(data);
    }).error(function(err) {
      console.log(err);
    });
  }

  // show all todos in the landing page.
  getAllDevices();

  $scope.updateDeviceValues = function(device) {
    $scope.formData = device;
    $http.put("/api/users/1/homes/1/rooms/1/devices/" + device._id, $scope.formData)
      .success(function(data) {
        $scope.formData = {};
        getAllDevices();
      }).error(function(err) {
        console.log(err);
      });
  }
});
