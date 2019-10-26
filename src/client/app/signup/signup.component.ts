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

		console.log(payload);

		this.api.post('users/login', payload).subscribe((data) => {
			console.log(data);
			this.auth.setUserDetails(data.token, data.email);
			this.router.navigate(['/home']);
		});
	}

}
