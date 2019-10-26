import { Component } from '@angular/core';

import { ApiService } from '../services/api.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})

export class AppComponent {
	title = 'app works!';

	constructor (public api: ApiService) {}

	ngOnInit() {
		this.api.get('todos').subscribe(data => {
			console.log(data);
		})
	}
}