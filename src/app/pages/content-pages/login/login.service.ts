import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
// import { map } from 'rxjs/operators';
// import { Observable } from 'rxjs';
// import 'rxjs/Rx';
// import { AppConstatnt } from 'app/app.constant';
import { HttpClient } from '@angular/common/http';
import { CoreHttpService } from '../../../core/core-http.service';
import { UserLogin } from './login-page.classes';
// import { Token } from './../../../app.constant';


@Injectable()
export class LoginService {
    baseUrl: string = 'http://localhost:54115/api/';
    apiUrl: string = this.baseUrl + 'User/';
    constructor(
        private corehttpservice: CoreHttpService
    ) {
        // this.apiUrl = this.appconstant.getUrl() + "/CustomLogin/Authenticate"
    }

    authenticate(userData: UserLogin) {
        debugger;
        return this.corehttpservice.postRequest<UserLogin, void>(this.apiUrl + 'Authenticate', userData);
    }

}
