import { Component, OnInit, AfterContentInit, AfterContentChecked, AfterViewInit } from '@angular/core';

import { AuthService } from './../../services/auth.service';
import { ApiService } from './../../services/api.service';
import { Router, NavigationEnd } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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

	constructor(public auth: AuthService, public api: ApiService, public router: Router, public toastr: ToastrService) {
		this.router.events.subscribe((_: NavigationEnd) => {
			this.currentUrl = _.url
		})

	}

	ngOnInit() {
		if (this.auth.isLoggedIn()) {
			this.user = this.auth.getUserDetails();
			if (this.user.username) {
				/* this.toastr.info(`Hello, ${this.user.username}`, "Welcome", {
					timeOut: 2000
				}); */
			}
		}
	}

	ngAfterContentChecked(){
		if (this.auth.isLoggedIn()) {
			this.user = this.auth.getUserDetails();
		}
	}

	logout() {
		this.toastr.info(`See you later, ${this.user.username}`, "Bye");
		this.auth.logout();
	}

}
