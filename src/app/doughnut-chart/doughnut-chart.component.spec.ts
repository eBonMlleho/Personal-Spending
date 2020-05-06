import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoughnutChartComponent } from './doughnut-chart.component';

describe('DoughnutChartComponent', () => {
  let component: DoughnutChartComponent;
  let fixture: ComponentFixture<DoughnutChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoughnutChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoughnutChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should create big testing file', () => {
    expect(component.testTesting).toContain('big');
  });

  it('barChartLabels should have correct lable names in x-axis', () => {
    expect(component.barChartLabels).toEqual( ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']);
  });

  it('barChartLabels should have correct lablel in year 2019', () => {
    expect(component.barChartData[0].label).toEqual( '2019');
  });

  it('test function testing with function parameters', () => {
    expect(component.testFunction(component.anytestNumber)).toEqual(54);
  });

  it('Total spending in JAN in 2019', () => {
    expect(component.calculateMonthTotalAmount(component.transactions, 2019, 0)).toEqual(50);
  });

  it('Total spending in AUG in 2019', () => {
    expect(component.calculateMonthTotalAmount(component.transactions, 2019, 7)).toEqual(63);
  });

  it('test findCategoryAmount function', () => {
    expect(component.findCategoryAmount(component.transactions, component.categoryList)[0]).toEqual(24);
  });

});
