import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

import { Todo } from './../../models/todo.model';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

	@Input() todo: Todo;

	todos: Todo[] = [];
	noTodos: boolean = true;

	constructor(private api: ApiService, private auth: AuthService, private toastr: ToastrService) { }

	ngOnInit() {
		if (this.auth.isLoggedIn()) {
			this.toastr.info("Fetching todos");
			this.api.get('todos').subscribe((data) => {
				this.toastr.clear();
				this.todos = data.todos;
			});
		}
	}

	deleteTodo(e, todoId) {
		this.api.delete(`todos/${todoId}`).subscribe((data) => {
			if (data.status === 'success') {
				e.target.parentNode.parentNode.parentNode.style.display = 'none';
				this.todos = this.updateTodoArray(todoId, this.todos);
				this.toastr.success("Todo Deleted Successfully", "Deleted");
			} else {
				this.toastr.error("Failed to Delete Todo.", "An Error Occured")
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
				this.toastr.success("Todo Marked as Completed", "Updated");
			} else {
				this.toastr.error("Failed to Mark Todo as Completed.", "An Error Occured.")
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

	updateTodoArray (id, arr) {
		if (arr.length != 0) {
			return arr.filter((todo) => {
				return todo._id != id;
			});
		}
	}
}
