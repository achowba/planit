import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-add-todo',
	templateUrl: './add-todo.component.html',
	styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit {

	// inject dependencies in the constructor
	constructor(private api: ApiService, private auth: AuthService, private toastr: ToastrService) { }

	id: string;

	ngOnInit() {
	}

	addTodo(form: NgForm) {
		const values = form.value;

		const payload = {
			title: values.title,
			description: values.description
		}

		this.api.post('todos', payload).subscribe((data) => {
			if (data.status === 'success') {
				form.reset();
				this.toastr.success("Todo Added Successfully", "Added");
			} else {
				this.toastr.error("Failed to Add Todo.", "An Error Occured");
			}
			// this.router.navigate(['/home']);
		});
	}

}
