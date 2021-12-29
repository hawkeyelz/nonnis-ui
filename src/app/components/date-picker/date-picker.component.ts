import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Day } from 'src/app/interfaces/dates';
import {DatesService}from '../../services/dates.service';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.less']
})
export class DatePickerComponent implements OnInit {
  currentDate:String;
  togglePicker: boolean = false;
  dates: Day[] = [];
  constructor(datesSrv: DatesService) {
    const date = new Date;
    this.currentDate = `${date.getUTCMonth()+1}/${date.getUTCDate()}/${date.getFullYear()}`;
    this.dates = datesSrv.getDaysOfTheMonth(new Date());
   }
  ngOnInit(): void {
  }

  datePickerClick(){
    this.togglePicker = !this.togglePicker;
  }

  dateClick(date:Date){
    this.togglePicker = false;
    this.currentDate = `${date.getUTCMonth()+1}/${date.getUTCDate()}/${date.getUTCFullYear()}`;
  }



}
