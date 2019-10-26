import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

	userToken: string = 'user-token';
	userEmail: string = 'user-email';
	userName: string = 'user-name';
	user: Object = {};

	constructor(private router: Router) { }

	setUserDetails(token: string, email: string, username: string) {
		localStorage.setItem(this.userToken, token);
		localStorage.setItem(this.userEmail, email);
		localStorage.setItem(this.userName, username);
	}

	getUserDetails() {
		return this.user = {
			token: localStorage.getItem(this.userToken),
			email: localStorage.getItem(this.userEmail),
			username: localStorage.getItem(this.userName)
		}
	}

	isLoggedIn() {
		return this.getUserDetails().token !== null && this.getUserDetails().email !== null;
	}

	logout() {
		localStorage.removeItem(this.userToken);
		localStorage.removeItem(this.userEmail);
		localStorage.removeItem(this.userName);
		this.router.navigate(['/login']);
	}

}
