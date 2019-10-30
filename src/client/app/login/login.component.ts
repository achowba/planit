import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

	username: string = '';

	// inject dependencies in the constructor
    constructor(private api: ApiService, private auth: AuthService, private router: Router, private toastr: ToastrService) { }

    ngOnInit() {
        if (this.auth.isLoggedIn()) {
            this.router.navigate(['/home']);
        }
    }

    loginUser(form: NgForm) {
        const values = form.value;

        const payload = {
            email: values.email,
            password: values.password
		}

		this.toastr.info("Logging In User...", "Please Wait");

        this.api.post('users/login', payload).subscribe((data) => {
			if (data.status == "success") {
				form.reset();
				this.auth.setUserDetails(data.token, data.email, data.username);
				this.username = this.auth.getUserDetails().username;
				this.router.navigate(['/home']);
				this.toastr.info(`Hello, ${this.username}`, "Welcome", {
					timeOut: 2000
				});
			} else {
				this.toastr.error("Failed to Login User. Wrong Email or Password.", "An Error Occured");
			}

        });
    }

}
