import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../shared/auth-api/authentication.service';

@Component({
    selector: 'app-full-layout',
    templateUrl: './full-layout.component.html',
    styleUrls: ['./full-layout.component.css']
})
export class FullLayoutComponent implements OnInit {

    public isCollapsed = true;

    constructor(private authService: AuthenticationService) { }

    ngOnInit() {
    }

    logout(route) {
            this.authService.logout();
    }
}
