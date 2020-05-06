import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {TransactionsComponent} from './transactions/transactions.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {ReportComponent} from './report/report.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'transactions', component: TransactionsComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'report', component: ReportComponent }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
