var app = angular.module("myApp", []);

app.controller("mainController", function ($scope, $http) {
  $scope.formData = {};
  
  $scope.checkedTodo = {
    "text-decoration": "line-through"
  };
  
  function getAllTodos() {
    $http.get("/api/todos")
    .success(function(data) {
      $scope.todos = data.data;
      console.log(data);
    }).error(function(err) {
      console.log(err);
    });
  }

  // show all todos in the landing page.
  getAllTodos();
    
  // create a todo when submitting a form.
  $scope.createTodo = function() {
    $scope.formData.done = "false";
    $http.post("/api/todos", $scope.formData)
      .success(function(data) {
        $scope.formData = {};
        getAllTodos();
      }).error(function(err) {
      console.log(err);
    });
  };
  
  $scope.updateTodo = function(todo) {
    $scope.formData = todo;
    $http.put("/api/todos/" + todo.id, $scope.formData)
      .success(function(data) {
        $scope.formData = {};
        getAllTodos();
      }).error(function(err) {
        console.log(err);
      });
  }
  
  $scope.deleteTodo = function(todo_id) {
    $http.delete("/api/todos/" + todo_id)
      .success(function(data) {
        getAllTodos();
      }).error(function(err) {
      console.log(err);
    });
  };
});
