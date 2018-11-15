//(function () {
//    var version = "1.120";
//    var app = angular.module("myDirective",[]);
//    var dynamicdeditor = function ($compile) {

//        return {
//            restrict: 'EAM',
//            replace: true,
//            scope: true,
//            controller: 'dynamicdController',
//            controllerAs: 'ctrl',
//            bindToController: {
//                model: '=?',
//                indexofitems: '=?'
//            },
          

//            link: function ($scope, $element, $attrs) {
//                alert(1);
//                //var s = $scope.$eval($attrs.dynamicd);
//                //$($element).append($compile("<div class='flex layout-row' " + s + " config='editor.config'></div>")($scope).get(0))

//            }
//        };
//    }
//    function dynamicdController($scope, $timeout, $window, $element) {
        
//    }
//    app.controller('dynamicdController', dynamicdController);
//    dynamicdController.$inject = ["$scope", "$timeout", "$window", "$element"];
//    dynamicdeditor.$inject = ['$compile'];
//    app.directive('dynamicd', dynamicdeditor);;
    
//})();
+(function () {
    var pageEditor = angular.module('pageEditor', []);
    pageEditor.controller('pageEditorCtrl', ['$scope', function ($scope) {
        $scope.newMenu = { Name: '', Url: '#' };
        removeByValue = function (arr, val) {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] === val) {
                    arr.splice(i, 1);
                    break;
                }
            }
        };
        $scope.addMenu = function () {
            $scope.model.Menus.push(
                $scope.newMenu
            );
            $scope.newMenu = { Name: '', Url: '#' };
        }
        $scope.deleteMenu = function (x) {
            debugger;
            if ($scope.model.Menus.length == 1) {
                $scope.model.Menus.pop();
            } else {
                removeByValue($scope.model.Menus, x);
            }
        }
    }]);

   
    var app = angular.module("myApp", ["pageEditor"]).config( [
    '$compileProvider',
    function( $compileProvider )
    {   
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|s?ftp|mailto|tel|file|javascript):/);
        // Angular before v1.2 uses $compileProvider.urlSanitizationWhitelist(...)
    }
    ]);
    app.run(function ($rootScope, $templateCache, $compile) {
        $templateCache.removeAll();
        $rootScope.$compile = $compile;
        $rootScope.$on('$routeChangeStart', function (event, next, current) {
            if (typeof (current) !== 'undefined') {
                
                $templateCache.remove(current.templateUrl);
            }
        });
        $rootScope.$on('$viewContentLoaded', function () {
            $templateCache.removeAll();
        });
    });
 
})();