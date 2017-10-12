import angular from 'angular';
import uiRouter from '@uirouter/angularjs';

// imports other angular modules here

import appComponent from './app.component';

const MODULE_NAME = 'app';
const SELECTOR_NAME = 'app';

angular.module(MODULE_NAME, [
        uiRouter
	// add other angular modules here
    ])

    .config(($urlRouterProvider, $locationProvider, $httpProvider, $stateProvider) => {
        "ngInject";
        // @see: https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions
        // #how-to-configure-your-server-to-work-with-html5mode
        $locationProvider.html5Mode(true).hashPrefix('!');
        $urlRouterProvider.otherwise('/');
        $stateProvider.state(
            'home', {
            url: '/'
        });
    })

    .component(SELECTOR_NAME, appComponent);

export default MODULE_NAME;
