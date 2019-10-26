import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

	// inject dependencies in the constructor
	constructor(private api: ApiService, private auth: AuthService, private router: Router) { }

	ngOnInit() {
		if (this.auth.isLoggedIn()) {
			this.router.navigate(['/home']);
		}
	}

	registerUser(form: NgForm) {
		const values = form.value;

		const payload = {
			username: values.username,
			email: values.email,
			password: values.password
		}

		this.api.post('users/signup', payload).subscribe((data) => {
			// this.auth.setUserDetails(data.token, data.email);
			form.reset();
			this.router.navigate(['/login']);
		});
	}

}
