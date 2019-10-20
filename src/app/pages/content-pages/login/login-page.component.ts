import { Component, ViewChild, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup } from '@angular/forms/src/model';
import { UserLogin } from './login-page.classes';
import { LoginService } from './login.service';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ICoreStorageService } from '../../../core/core-storage/core-storage.service';
import { GLOBAL_SET_STORAGE } from '../../../core/core-storage/core-storage.factory';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent {

    loginForm: FormGroup;
    loginData: UserLogin;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private loginService: LoginService,
        private formBuilder: FormBuilder,
        @Inject(GLOBAL_SET_STORAGE) private storage: ICoreStorageService,
    ) { }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            UserName: ['', Validators.required],
            password: ['', Validators.required]
        });
    }
    // On submit button click    
    onSubmit() {
        debugger;
        this.loginForm.value.UserId = 10;
        this.loginService.authenticate(this.loginForm.value).subscribe(data => {
            //     /*     
            //        SuperAdmin = 0,
            //        Customer = 1
            //        SiteAdmin = 2,
            //        Handler = 3   
            //    */
            let token: string = this.storage.get('token')
            const helper = new JwtHelperService();
            let tokenData = helper.decodeToken(token);

            this.router.navigate(['/dashboard/dashboard1']);
        });
        this.loginForm.reset();
    }
    // On Forgot password link click
    onForgotPassword() {
        this.router.navigate(['forgotpassword'], { relativeTo: this.route.parent });
    }
    // On registration link click
    onRegister() {
        this.router.navigate(['register'], { relativeTo: this.route.parent });
    }
}