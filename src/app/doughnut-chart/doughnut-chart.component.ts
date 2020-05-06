import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions, ChartDataSets} from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
import { HttpService } from '../http.service';
import { Transaction } from '../transaction';
// import { listenerCount } from 'cluster';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.css']
})

export class DoughnutChartComponent implements OnInit {

  transactions: Transaction[] = [];
  CatrgoryAmountMapping = new Map();

  // test testing
  testTesting = 'big';
  anytestNumber = 54;

// DOUGHNUT CHART SECTION
  // find all distinct categories
  categoryList: any[];
  // find all category values  doughnutChartData: MultiDataSet = [55, 20, 15, 10, 1]
  categoryAmount: any[];
  // create label： doughnutChartLabels: Label[] = [this.transactions[1].category, 'Shopping', 'Entertainment', 'bla', 'blaa'];
  doughnutChartLabels: Label[];
  doughnutChartData: MultiDataSet;
  doughnutChartType: ChartType = 'doughnut';

  public doughnutChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    title: {
      text: 'Total spending distribution',
      display: true
    },

  };

// BAR CHART SECTION
  public barChartLabels: Label[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  public barChartData: ChartDataSets[];

  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    title: {
      text: 'Spending & Payments by Month',
      display: true
    },
    scales: {
      yAxes: [{
         scaleLabel: {
            display: true,
            labelString: 'Money'
         },
         ticks: {
          // stepSize: 2,
          beginAtZero: true
       }
      }]
   }
  };

  constructor(private _http: HttpService) {
  }

  ngOnInit(): void {
    this.getAllTransactions();    
  }

  getAllTransactions(){
    this._http.getTransactions().subscribe( (data) => {
         this.transactions = data;
        //convert date type from SQL to javascript
         this.transactions.forEach(function(value){
             var dateParts = value.date.toString().split("-");
             value.date = new Date(Number(dateParts[0]), Number(dateParts[1]) - 1, Number(dateParts[2].substr(0,2)));
         });
         this.showGraph();
    });
  }

  showGraph(){
   // DOUGHNUT CHART SECTION
    // find all distinct categories
    this.categoryList = this.findAllDistinctCategory(this.transactions);

    // find all category values  doughnutChartData: MultiDataSet = [55, 20, 15, 10, 1]
    this.categoryAmount = this.findCategoryAmount(this.transactions, this.categoryList);
    // create label： doughnutChartLabels: Label[] = [this.transactions[1].category, 'Shopping', 'Entertainment', 'bla', 'blaa'];
    this.doughnutChartLabels = this.categoryList;
    this.doughnutChartData = this.categoryAmount;

    this.barChartData = [
      { data: this.BarChartData(this.transactions, 2019), label: '2019' },
      { data: this.BarChartData(this.transactions, 2020), label: '2020' },
      // { data: [28, 48, 40, 19, 86, 27, 90], label: '2021' }
    ];

  }


  add(x: number, y: number): number {
    return x + y;
  }

  findAllDistinctCategory(transactions): string [] {
    const alist: any[] = [];
    for (const transaction of transactions) {
      if (!alist.includes(transaction.category)) {
        alist.push(transaction.category);
      }
    }
    return alist;
  }

  findCategoryAmount(transactions, categoryList): any [] {
    const alist: any[] = [];
    let sum = 0;

    // find all category of same type
    for (const category of categoryList) {
      for (const transaction of transactions) {
        if (transaction.category === category) {
          sum = sum + transaction.amount;
        }
      }
      alist.push(sum);
      sum = 0;
    }
    return alist;
  }

  BarChartData(transactions, year): number[] {
    const list = [];
    // calculate 12 month total spending
    for (let i = 0; i < 12; i++) {
      list.push(this.calculateMonthTotalAmount(transactions, year, i));
    }
    return list;
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


  testFunction( anyNUmber): number {
    return anyNUmber;
  }


}
