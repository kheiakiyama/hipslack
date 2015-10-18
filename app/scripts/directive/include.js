app.directive('myInclude', function($http, $compile) {
  return function(scope, element, attr) {
    $http.get(attr.myInclude).success(function(response) {
      element.html(response);
      $compile(element.contents())(scope);
    })
  };
});