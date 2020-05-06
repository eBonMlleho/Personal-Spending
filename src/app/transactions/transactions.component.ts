import { Component, OnInit} from '@angular/core';
import { Transaction } from '../transaction';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

import {Category} from '../category';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {NgbDate, NgbCalendar, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  // transactions = TRANSACTIONS;
  // transactionsAfterSortByTime = this.sortTransaction(this.transactions);
  //transactions = this.sortTransaction(TRANSACTIONS);  // sort transaction by time initially. this is for storage purpose
  //transactionsTobeDisplayed = this.transactions;    // this is for displayed purpose only
  
  transactions: Transaction[];
  transactionsTobeDisplayed: Transaction[];
  selectedTransaction: Transaction;
  model: NgbDateStruct;
  Amount: number;
  id: number;
  currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
  currentYear: string;
  currentDatee: string;
  currentMonth: string;
  categorySelected: string;


  categorys: Category[] = [
    {id: 1, name: 'Shopping'},
    {id: 2, name: 'Utility bills'},
    {id: 3, name: 'Rent'},
    {id: 4, name: 'Gas'},
    {id: 5, name: 'Restaurants & Dining'},
    {id: 6, name: 'Travel'},
    {id: 7, name: 'Entertainment'},
    {id: 8, name: 'Education'},
    {id: 9, name: 'Transportation'},
    {id: 10, name: 'Other'},
  ];

  // datepicker range variable
  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate;
  toDate: NgbDate | null = null;
  jsFromDate: Date;
  jsToDate: Date;


  constructor(private _http: HttpService, private router: Router) {
  }

  ngOnInit(): void {

    this.getAllTransactions();

    this.id = 0; // Todo editted
    this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en'); // default date
    this.categorySelected = 'Shopping'; // set default category type
    // set default time as current date
    this.currentYear = this.currentDate.split('-', 3)[0];
    this.currentDatee = this.currentDate.split('-', 3)[2];
    this.currentMonth = this.currentDate.split('-', 3)[1];
    this.model = {year: +this.currentYear, month: +this.currentMonth, day: +this.currentDatee};
  }

//Http Service get transactions from the server and initialize transactions.
  getAllTransactions(){
    this._http.getTransactions().subscribe( (data) => {
       this.transactions = data;
      //convert date type from SQL to javascript
       this.transactions.forEach(function(value){
           var dateParts = value.date.toString().split("-");
           value.date = new Date(Number(dateParts[0]), Number(dateParts[1]) - 1, Number(dateParts[2].substr(0,2)));
       });
       this.transactions = this.sortTransaction(this.transactions);
       this.transactionsTobeDisplayed = this.transactions;
    });
  }

  onSelect(transaction: Transaction): void {
    this.selectedTransaction = transaction;
  }


  addNewTransaction(): void {
    if (this.Amount == null) {return; }
    const newTransaction: Transaction = {id: this.id++, category: this.categorySelected,
    date: new Date(this.dateConverter(this.model)),  amount: +this.Amount, note: ''};
    
    this._http.postTransaction(newTransaction).subscribe(data => {
      //this.router.navigate(['/transactions']);
    })

    this.transactionsTobeDisplayed.push(newTransaction);

    // this.transactions = this.sortTransaction(this.transactions);
    this.transactionsTobeDisplayed = this.sortTransaction(this.transactions);
    // if selected date range, keep it
    if (this.jsFromDate != null && this.jsToDate != null) {
      this.transactionsTobeDisplayed = this.dateSortTransaction(this.transactions, this.jsFromDate, this.jsToDate);
    }
    this.Amount = null; // empty amount input field after each adding new transaction event
  }

  dateConverter(model: NgbDateStruct): string {
    return this.model.year + '/' + this.model.month + '/' + this.model.day;
  }

  sortTransaction(transactions): Transaction[] {
    return transactions.sort((a, b) => b.date - a.date);
  }


  // date picker
  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
    this.jsFromDate = new Date(this.fromDate.year, this.fromDate.month - 1, this.fromDate.day);
    this.jsToDate = new Date(this.toDate.year, this.toDate.month - 1, this.toDate.day);
    this.transactionsTobeDisplayed = this.dateSortTransaction(this.transactions, this.jsFromDate, this.jsToDate);
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }
  // date picker end
  dateSortTransaction(transactions, jsFromDate, jsToDate): Transaction[] {
    const alist: Transaction[] = [];
    for (const transaction of transactions) {
      if (transaction.date > jsFromDate && transaction.date < jsToDate) {
        alist.push(transaction);
      }
    }
    return alist;

  }
  ResetTime(): void {
    // this.transactionsTobeDisplayed = this.transactions;
    this.getAllTransactions();
  }
}


