import { Component, OnInit } from '@angular/core';
import { Day } from 'src/app/interfaces/dates';
import {DatesService}from '../../services/dates.service';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.less']
})
export class DatePickerComponent implements OnInit {
  dates: Day[] = [];
  constructor(datesSrv: DatesService) {
    this.dates = datesSrv.getDaysOfTheMonth(2, 2020);
   }
  ngOnInit(): void {
  }

}
