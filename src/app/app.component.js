import template from './app.html';
import './app.scss';

class AppController {
    constructor() {
        this.url = 'https://github.com/preboot/angular-webpack';
    }
}

let appComponent = {
    template,
    controller: AppController,
    controllerAs: 'app'
};

export default appComponent;
