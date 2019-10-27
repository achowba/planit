import { Component, OnInit, AfterContentInit, AfterContentChecked, AfterViewInit } from '@angular/core';

import { AuthService } from './../../services/auth.service';
import { ApiService } from './../../services/api.service';
import { Router, NavigationEnd } from '@angular/router';

interface User {
	username: string,
	email: string
}


@Component({
	selector: 'app-nav',
	templateUrl: './nav.component.html',
	styleUrls: ['./nav.component.scss']
})

export class NavComponent implements OnInit,  AfterContentChecked {

	user: User;
	currentUrl: string;

	constructor(public auth: AuthService, public api: ApiService, public router: Router) {
		this.router.events.subscribe((_: NavigationEnd) => {
			this.currentUrl = _.url
		})

	}

	ngOnInit() {
		if (this.auth.isLoggedIn()) {
			this.user = this.auth.getUserDetails();
		}
	}

	ngAfterContentChecked(){
		if (this.auth.isLoggedIn()) {
			this.user = this.auth.getUserDetails();
		}
	}

	logout() {
		this.auth.logout();
	}

}
