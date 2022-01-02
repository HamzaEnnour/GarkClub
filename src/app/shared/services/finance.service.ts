import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { AuthenticationService } from './authentication.service';

@Injectable({
	providedIn: 'root'
})
export class FinanceService {
	private readonly baseUrl = `${environment.apiUrl}/financials`;

	constructor(private http: HttpClient, private router: Router, private auth: AuthenticationService) {}

	createSpent(spent, academyId) {
		return this.http.post(`${this.baseUrl}/spents/${academyId}`, spent, {
			headers: new HttpHeaders({ Authorization: this.auth.Token })
		});
	}
	createIncome(income, academyId) {
		return this.http.post(`${this.baseUrl}/${academyId}`, income, {
			headers: new HttpHeaders({ Authorization: this.auth.Token })
		});
	}
	getAll(academyId) {
		return this.http.get(`${this.baseUrl}/${academyId}`, {
			headers: new HttpHeaders({ Authorization: this.auth.Token })
		});
	}

	getStats(academyId) {
		return this.http.get(`${this.baseUrl}/stats/${academyId}`, {
			headers: new HttpHeaders({ Authorization: this.auth.Token })
		});
	}
}
