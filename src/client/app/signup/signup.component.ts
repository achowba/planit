import { Component, OnInit, ɵConsole } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

	// inject dependencies in the constructor
	constructor(private api: ApiService, private auth: AuthService, private router: Router, private toastr: ToastrService) { }

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
			this.toastr.success("Account Created Successfully", "Welcome");
			form.reset();
			this.router.navigate(['/login']);
		});
	}

}
