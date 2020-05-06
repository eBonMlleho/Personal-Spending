import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgbDate, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { formatDate } from '@angular/common';

import { Transaction } from '../transaction';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})

export class ReportComponent implements OnInit {

model: NgbDateStruct;

currentYear: number = 2020;
curentMonth: number = 2;
currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');

  
closeResult = '';
transactions = TRANSACTIONS;

yearSpending: number =0;
monthSpending: number =0;
spending: number =0;

yearSpendingShopping: number =0;
monthSpendingShopping: number =0;
yearSpendingBills: number =0;
monthSpendingBills: number =0;
yearSpendingRent: number =0;
monthSpendingRent: number =0;
yearSpendingGas: number =0;
monthSpendingGas: number =0;
yearSpendingDinning: number =0;
monthSpendingDinning: number =0;
yearSpendingEducation: number =0;
monthSpendingEducation: number =0;
yearSpendingTravel: number =0;
monthSpendingTravel: number =0;
yearSpendingEntertainment: number =0;
monthSpendingEntertainment: number =0;
yearSpendingTransportation: number =0;
monthSpendingTransportation: number =0;
yearSpendingOther: number =0;
monthSpendingOther: number =0;

yearDifference: number = 0;
monthDifference: number = 0;

prodiction: number = 0;

constructor(private modalService: NgbModal) { }

ngOnInit(): void {
  this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
  this.currentYear = Number(this.currentDate.split('-', 3)[0]);
  this.curentMonth = Number(this.currentDate.split('-', 3)[1])-1;//minus 1 because april is reconized as 3 and so on


  this.spending = this.calculateTotalAmount(this.transactions);
  this.prodiction = this.calculateProdiction(this.transactions,this.currentYear,this.curentMonth)

  this.yearSpending = this.calculateYearTotalAmount(this.transactions,this.currentYear);
  this.monthSpending = this.calculateMonthTotalAmount(this.transactions,this.currentYear,this.curentMonth);

  this.yearDifference =this.calculateYearTotalAmountDifference(this.transactions,this.currentYear);
  this.monthDifference = this.calculateMonthTotalAmountDifference(this.transactions,this.currentYear,this.curentMonth);

  this.yearSpendingEducation = this.calculateYearTotalAmountSpacific(this.transactions,this.currentYear, "Education");
  this.yearSpendingBills = this.calculateYearTotalAmountSpacific(this.transactions,this.currentYear, "Utility bills");
  this.yearSpendingRent = this.calculateYearTotalAmountSpacific(this.transactions,this.currentYear, "Rent");
  this.yearSpendingGas = this.calculateYearTotalAmountSpacific(this.transactions,this.currentYear, "Gas");
  this.yearSpendingDinning = this.calculateYearTotalAmountSpacific(this.transactions,this.currentYear, "Restaurants & Dining");
  this.yearSpendingTravel = this.calculateYearTotalAmountSpacific(this.transactions,this.currentYear, "Travel");
  this.yearSpendingTransportation = this.calculateYearTotalAmountSpacific(this.transactions,this.currentYear, "Transportation");
  this.yearSpendingEntertainment = this.calculateYearTotalAmountSpacific(this.transactions,this.currentYear, "Entertainment");
  this.yearSpendingOther = this.calculateYearTotalAmountSpacific(this.transactions,this.currentYear, "Other");
  this.yearSpendingShopping = this.calculateYearTotalAmountSpacific(this.transactions,this.currentYear, "Shopping");

  this.monthSpendingEducation = this.calculateMonthTotalAmountSpacific(this.transactions,this.currentYear,this.curentMonth, "Education");
  this.monthSpendingBills = this.calculateMonthTotalAmountSpacific(this.transactions,this.currentYear,this.curentMonth, "Utility bills");
  this.monthSpendingRent = this.calculateMonthTotalAmountSpacific(this.transactions,this.currentYear,this.curentMonth, "Rent");
  this.monthSpendingGas = this.calculateMonthTotalAmountSpacific(this.transactions,this.currentYear,this.curentMonth, "Gas");
  this.monthSpendingDinning = this.calculateMonthTotalAmountSpacific(this.transactions,this.currentYear,this.curentMonth, "Restaurants & Dining");
  this.monthSpendingTravel = this.calculateMonthTotalAmountSpacific(this.transactions,this.currentYear,this.curentMonth, "Travel");
  this.monthSpendingTransportation = this.calculateMonthTotalAmountSpacific(this.transactions,this.currentYear,this.curentMonth, "Transportation");
  this.monthSpendingEntertainment = this.calculateMonthTotalAmountSpacific(this.transactions,this.currentYear,this.curentMonth, "Entertainment");
  this.monthSpendingOther = this.calculateMonthTotalAmountSpacific(this.transactions,this.currentYear,this.curentMonth, "Other");
  this.monthSpendingShopping = this.calculateMonthTotalAmountSpacific(this.transactions,this.currentYear,this.curentMonth, "Shopping");
}

dateConverter(model: NgbDateStruct): string {
    return this.model.year + '/' + this.model.month + '/' + this.model.day;
}

onDateChange(): void{
  this.currentDate = formatDate(new Date(this.dateConverter(this.model)), 'yyyy-MM-dd', 'en'   );
  this.currentYear = Number(this.currentDate.split('-', 3)[0]);
  this.curentMonth = Number(this.currentDate.split('-', 3)[1])-1;//minus 1 because april is reconized as 3 and so on

  this.spending = this.calculateTotalAmount(this.transactions);
  this.prodiction = this.calculateProdiction(this.transactions,this.currentYear,this.curentMonth)

  this.yearSpending = this.calculateYearTotalAmount(this.transactions,this.currentYear);
  this.monthSpending = this.calculateMonthTotalAmount(this.transactions,this.currentYear,this.curentMonth);

  this.yearDifference =this.calculateYearTotalAmountDifference(this.transactions,this.currentYear);
  this.monthDifference = this.calculateMonthTotalAmountDifference(this.transactions,this.currentYear,this.curentMonth);

  this.yearSpendingEducation = this.calculateYearTotalAmountSpacific(this.transactions,this.currentYear, "Education");
  this.yearSpendingBills = this.calculateYearTotalAmountSpacific(this.transactions,this.currentYear, "Utility bills");
  this.yearSpendingRent = this.calculateYearTotalAmountSpacific(this.transactions,this.currentYear, "Rent");
  this.yearSpendingGas = this.calculateYearTotalAmountSpacific(this.transactions,this.currentYear, "Gas");
  this.yearSpendingDinning = this.calculateYearTotalAmountSpacific(this.transactions,this.currentYear, "Restaurants & Dining");
  this.yearSpendingTravel = this.calculateYearTotalAmountSpacific(this.transactions,this.currentYear, "Travel");
  this.yearSpendingTransportation = this.calculateYearTotalAmountSpacific(this.transactions,this.currentYear, "Transportation");
  this.yearSpendingEntertainment = this.calculateYearTotalAmountSpacific(this.transactions,this.currentYear, "Entertainment");
  this.yearSpendingOther = this.calculateYearTotalAmountSpacific(this.transactions,this.currentYear, "Other");
  this.yearSpendingShopping = this.calculateYearTotalAmountSpacific(this.transactions,this.currentYear, "Shopping");

  this.monthSpendingEducation = this.calculateMonthTotalAmountSpacific(this.transactions,this.currentYear,this.curentMonth, "Education");
  this.monthSpendingBills = this.calculateMonthTotalAmountSpacific(this.transactions,this.currentYear,this.curentMonth, "Utility bills");
  this.monthSpendingRent = this.calculateMonthTotalAmountSpacific(this.transactions,this.currentYear,this.curentMonth, "Rent");
  this.monthSpendingGas = this.calculateMonthTotalAmountSpacific(this.transactions,this.currentYear,this.curentMonth, "Gas");
  this.monthSpendingDinning = this.calculateMonthTotalAmountSpacific(this.transactions,this.currentYear,this.curentMonth, "Restaurants & Dining");
  this.monthSpendingTravel = this.calculateMonthTotalAmountSpacific(this.transactions,this.currentYear,this.curentMonth, "Travel");
  this.monthSpendingTransportation = this.calculateMonthTotalAmountSpacific(this.transactions,this.currentYear,this.curentMonth, "Transportation");
  this.monthSpendingEntertainment = this.calculateMonthTotalAmountSpacific(this.transactions,this.currentYear,this.curentMonth, "Entertainment");
  this.monthSpendingOther = this.calculateMonthTotalAmountSpacific(this.transactions,this.currentYear,this.curentMonth, "Other");
  this.monthSpendingShopping = this.calculateMonthTotalAmountSpacific(this.transactions,this.currentYear,this.curentMonth, "Shopping");

}




open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
}

private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
}


calculateYearTotalAmount(transactions, year): number {
  let sum = 0;
  for (const transaction of transactions) {
    if (transaction.date.getFullYear() === year ) {
      sum = sum + transaction.amount;
    }
  }
  return sum;
}


calculateTotalAmount(transactions): number {
  let sum = 0;
  for (const transaction of transactions) {
    
      sum = sum + transaction.amount;

  }
  return sum;
}

calculateMonthTotalAmount(transactions, year, month): number {
  let sum = 0;
  for (const transaction of transactions) {
    if (transaction.date.getFullYear() === year && transaction.date.getMonth() === month) {
      sum = sum + transaction.amount;
    }
  }
  return sum;
}

calculateMonthTotalAmountSpacific(transactions, year,month,category): number {
  let sum = 0;
  for (const transaction of transactions) {
    if (transaction.date.getFullYear() === year && transaction.date.getMonth() === month && transaction.category === category) {
      sum = sum + transaction.amount;
    }
  }
  return sum;
 }

 calculateYearTotalAmountSpacific(transactions, year,category): number {
  let sum = 0;
  for (const transaction of transactions) {
    if (transaction.date.getFullYear() === year  && transaction.category === category) {
      sum = sum + transaction.amount;
    }
  }
  return sum;
 }



calculateMonthTotalAmountDifference(transactions, year, month): number {
  let sum = 0;
  let lastSum = 0;
  let lastYear = year;
  let lastMonth = month - 1;
  if(lastMonth < 0){
    lastYear = lastYear - 1;
    lastMonth = 11;
  }
  for (const transaction of transactions) {
    if (transaction.date.getFullYear() === year && transaction.date.getMonth() === month) {
      sum = sum + transaction.amount;
    }
    if (transaction.date.getFullYear() === lastYear && transaction.date.getMonth() === lastMonth) {
      lastSum = lastSum + transaction.amount;
    }
  }
  return sum - lastSum;
}

calculateYearTotalAmountDifference(transactions, year): number {
  let sum = 0;
  let lastSum = 0;
  let lastYear = year - 1;
  for (const transaction of transactions) {
    if (transaction.date.getFullYear() === year ) {
      sum = sum + transaction.amount;
    }
    if (transaction.date.getFullYear() === lastYear) {
      lastSum = lastSum + transaction.amount;
    }
  }
  return sum - lastSum;
}

calculateProdiction(transactions, year, month): number {
  let span = 24;
  let sum = 0;
  let lastSum = 0;
  let lastYear = year;
  let lastMonth = month;
  let i = 0;
  for(i = 0; i < 24;++i){

    if(lastMonth < 0){
      lastYear = lastYear - 1;
      lastMonth = 11;
   }
     for (const transaction of transactions) {
      if (transaction.date.getFullYear() === lastYear && transaction.date.getMonth() === lastMonth) {
        sum = sum + transaction.amount;
      }
     }
     if(sum === lastSum){
       span = span - 1;
     }
     lastSum = sum;
    lastMonth = lastMonth - 1;
  }
  var numb = sum/span * 12;
  numb = +numb.toFixed(0);
  return numb;
}

}

