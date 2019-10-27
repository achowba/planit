import { Component, OnInit, Input, HostBinding, ElementRef } from '@angular/core';

import { Router } from '@angular/router';

import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

import { Todo } from './../../models/todo.model';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

	@Input() todo: Todo; //

	todos: Todo[];
	constructor(private api: ApiService, private auth: AuthService, private router: Router, private elRef: ElementRef) { }

	ngOnInit() {
		if (this.auth.isLoggedIn()) {
			this.api.get('todos').subscribe((data) => {
				this.todos = data.todos;
			});
		}
    }

	deleteTodo(e, todoId) {
		let payload = {
			todoId,
		}

		this.api.delete(`todos/${todoId}`).subscribe((data) => {
			if (data.status === 'success') {
				e.target.parentNode.parentNode.parentNode.style.display = 'none';
			}
		});
	}

	completeTodo(e, todoId) {
		let payload = {
			completed: true
		}

		this.api.patch(`todos/${todoId}`, payload).subscribe((data) => {
			if (data.status === 'success') {
				e.target.disabled = true;
			}
		});
	}

	displayTime(timeString) {
		if (timeString) {
			let day = timeString.split('T')[0];
			let time = timeString.split('T')[1];
			time = time.split('.')[0];
			time = `${time.split(':')[0]}:${time.split(':')[1]}`

			return `${day} | ${time}`
		}
	}
}
