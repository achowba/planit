import { Component, OnInit } from '@angular/core';

import { AuthService } from './../../services/auth.service';
import { ApiService } from './../../services/api.service';

@Component({
	selector: 'app-nav',
	templateUrl: './nav.component.html',
	styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

	user: Object;

	constructor(public auth: AuthService, public api: ApiService) { }

	ngOnInit() {
		if (this.auth.isLoggedIn()) {
			this.user = this.auth.getUserDetails();
		}
	}

	ngOnChanges() {
		if (this.auth.isLoggedIn()) {
			this.user = this.auth.getUserDetails();
			return this.user;
		}
	}

	logout() {
		this.auth.logout();
	}

}
