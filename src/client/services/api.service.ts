import { Injectable } from '@angular/core';
import { Http, Headers, Request, RequestOptions, RequestMethod, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ToastrService } from 'ngx-toastr';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { environment } from '../environments/environment';
import { AuthService } from './auth.service';

@Injectable()
export class ApiService {

	private baseUrl = environment.apiUrl;

	constructor(private http: Http, private auth: AuthService, private toastr: ToastrService) { }

	// create a wrapper function for getting data
	get(url: string) {
		return this.makeRequest(url, RequestMethod.Get);
	}

	// create a wrapper function for posting data
	post(url: string, body: Object) {
		return this.makeRequest(url, RequestMethod.Post, body);
	}

	// create a wrapper function for updating data
	put(url: string, body: Object) {
		return this.makeRequest(url, RequestMethod.Put, body);
	}

	// create a wrapper function for deleting data
	delete(url: string) {
		return this.makeRequest(url, RequestMethod.Delete);
	}

	patch(url: string, body: object) {
		return this.makeRequest(url, RequestMethod.Patch, body);
	}

	// define a request function
	makeRequest(url: string, method: RequestMethod, body?: Object) {
		const headers = new Headers();

		headers.append('Content-Type', 'application/json');
		headers.append('Authorization', `Bearer ${this.auth.getUserDetails().token}`);
		headers.append('X-Current-User', `${this.auth.getUserDetails().email}`);

		const requestOptions = new RequestOptions({
			url: `${this.baseUrl}/${url}`,
			method,
			headers,
		});

		if (body) {
			requestOptions.body = body;
		}

		const request = new Request(requestOptions);

		return this.http.request(request).map((res: Response) => res.json()).catch((res: Response) => this.onRequestError(res));
	}

	// function to handle errors
	onRequestError(res: Response) {
		let statusCode = res.status;
		let body = res.json();

		let error = {
			statusCode,
			error: body.error
		}

		this.toastr.error("Failed to Complete Action.", "An Error Occured.");
		return Observable.throw(error);
	}

}
