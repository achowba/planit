import { Component, OnInit, AfterContentInit, AfterContentChecked, AfterViewInit } from '@angular/core';

import { AuthService } from './../../services/auth.service';
import { ApiService } from './../../services/api.service';

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

	constructor(public auth: AuthService, public api: ApiService) { }

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
