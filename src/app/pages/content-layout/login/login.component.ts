import {Component, OnDestroy, OnInit} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {RouterClient} from '../../../shared/routes/router.model';
import {ApiService} from '../../../shared/api/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {


    public appVersion = environment.version;
    public status = {
        processing: false,
        icon: 'icon-login',
        error: false,
        message: ''
    };
    public loginForm: FormGroup;
    public loggedInSubs: Subscription;

    constructor(
        private api: ApiService,
        private router: Router,
        private fb: FormBuilder,
        private toastrService: ToastrService
    ) {
    }

    ngOnInit() {
        this.api.logout(true);
        this.loginForm = this.fb.group({
            email: '',
            password: '',
        });
    }

    submitSuccess() {
        this.status.processing = false;
        this.status.icon = 'ft-check';
        this.loginForm.controls['password'].setValue(null);
    }

    submitFailed() {
        this.status.processing = false;
        this.status.icon = 'ft-x';
        this.loginForm.controls['password'].setValue(null);
    }

    loginFailed(err, message) {
        if (err.status === 401 || err.status === 400) {
            this.toastrService.warning( message, 'Login Failed.');
        } else {
            console.log('An error occurred at login attempt:');
            console.log(err);
            this.toastrService.error(err.error ? err.error : 'An error occurred while attempting to login.', 'Error');
        }
    }

    async loginAccount() {
        try {
            const account = await this.api.login(this.loginForm.get('email').value, this.loginForm.get('password').value).toPromise();
            this.submitSuccess();
            this.api.setLogin(account);
            this.router.navigate([RouterClient.SETUP]);
        } catch (err) {
            this.submitFailed();
            this.loginFailed(err, 'Invalid username or password.');
        }
    }

    // On submit button click
    async onSubmit() {
        if (this.status.processing) {
            return;
        }
        this.status.processing = true;
        await this.loginAccount();
    }

    ngOnDestroy() {
        if (this.loggedInSubs) {
            this.loggedInSubs.unsubscribe();
        }
    }
}
