import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from './transaction';

const httpOptions = {
	headers: new HttpHeaders({
		'Content-Type': 'application/json'
	})
}

@Injectable({
  providedIn: 'root'
})
export class HttpService {

	TransactionURL:string = "http://coms-319-183.cs.iastate.edu:8080/transaction";

  constructor(private http: HttpClient) { }

  getTransactions():Observable<any>{
  	return this.http.get(this.TransactionURL);
  }

  postTransaction(transaction: Transaction):Observable<Transaction>{
  	return this.http.post<Transaction>(this.TransactionURL, transaction, httpOptions);
  }
}
