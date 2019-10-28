import { Component, enableProdMode } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

import { ApiService } from '../services/api.service';

enableProdMode();

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})

export class AppComponent {
	title = 'app works!';

	constructor (public api: ApiService, private toastr: ToastrService) {}

	ngOnInit() {
	}

	showToaster(){
		this.toastr.success("Hello, I'm the toastr message.")
		this.toastr.error("Hello, I'm the toastr message.")
		this.toastr.warning("Hello, I'm the toastr message.")
		this.toastr.info("Hello, I'm the toastr message.")
	}

}
