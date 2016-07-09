/**
* Ladda preloader directive
* https://github.com/DevTeamHub/ladda-preloader-directive
* (c) 2016 Dev Team Inc. http://dev-team.com
* License: MIT
*/

(function (root, factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['angular', 'ladda'], factory);
    } else if (typeof module !== 'undefined' && typeof module.exports === 'object') {
        // CommonJS support (for us webpack/browserify/ComponentJS folks)
        module.exports = factory(window.angular || require('angular'), require('ladda'));
    } else {
        // in the case of no module loading system
        return factory(root.angular, root.ladda);
    }
}(this, function (angular, ladda) {

    var preloaderModule = angular.module('dev-team-preloader', []);

    preloaderModule.directive('dtPreloader', dtPreloaderDirective);

    function dtPreloaderDirective() {
        return {
            scope: {
                dtPreloader: "&",
                color: "@",
                label: "@"
            },
            templateUrl: templateSelector,
            restrict: "A",
            replace: true,
            transclude: true,
            controller: ['$scope', '$element', dtPreloaderController],
            controllerAs: "ctrl"
        };

        function templateSelector(element, attrs) {
            if (attrs.templateUrl) {
                return attrs.templateUrl;
            }
            return "dt-preloader.tmpl.html";
        }
    }

    function dtPreloaderController($scope, $element) {
        var laddaElement = ladda.create($element[0]);

        this.click = function click() {
            start();
            var promise = $scope.dtPreloader();
            if (promise) {
                promise.finally(function() {
                    stop();
                });
            } else {
                stop();
            }
        }

        function start() {
            $scope.inProgress = true;
            laddaElement.start();
        }

        function stop() {
            laddaElement.stop();
            $scope.inProgress = false;
        }
    }

    angular.module("dev-team-preloader").run(["$templateCache", function ($templateCache) {
        $templateCache.put("dt-preloader.tmpl.html",
        "<button class=\"ladda-button\" ng-class=\"{preloader: inProgress}\" ng-click=\"ctrl.click()\" data-style=\"zoom-out\" data-spinner-color={{color}}><span class=\"ladda-label\">{{label}}</span><span ng-transclude></span></button>");
    }]);
}));