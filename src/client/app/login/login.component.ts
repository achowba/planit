import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

	// inject dependencies in the constructor
    constructor(private api: ApiService, private auth: AuthService, private router: Router) { }

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

        this.api.post('users/login', payload).subscribe((data) => {
			form.reset();
            this.auth.setUserDetails(data.token, data.email, data.username);
            this.router.navigate(['/home']);
        });
    }

}
