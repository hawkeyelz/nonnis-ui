import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Day } from 'src/app/interfaces/dates';
import { DatesService } from '../../services/dates.service';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.less'],
})
export class DatePickerComponent implements OnInit {
  currentDate: string = '';
  overPicker: boolean = false;
  togglePicker: boolean = false;
  validDate: boolean = true;
  selectedYear: number = 0;
  selectedMonth: number = 0;
  selectedDay: number = 1;
  selectedDate: Date = new Date();
  dates: Day[] = [];
  monthDisplay: string = '';

  constructor(private datesSrv: DatesService) {
  }
  ngOnInit(): void {
    const date = new Date();
    this.currentDate = `${date.getUTCMonth() + 1}/${date.getUTCDate()}/${date.getFullYear()}`;
    this.selectedYear = date.getUTCFullYear();
    this.selectedMonth = date.getUTCMonth();
    this.updateDateCalender();

    //toggle date picker off when clicked outside the date picker component
    document.addEventListener('click', () => {
      if (this.togglePicker && !this.overPicker) {
        this.togglePicker = false;
      }
    });

  }

  changeDate(newDate: Date) {

  }

  datePickerClick() {
    const date: Date = this.datesSrv.validateDate(this.currentDate)
      ? new Date(this.currentDate)
      : new Date();
    this.dates = this.datesSrv.getDaysOfTheMonth(date);
    this.togglePicker = !this.togglePicker;
  }

  dateClick(date: Date) {
    this.togglePicker = false;
    this.currentDate = `${
      date.getUTCMonth() + 1
    }/${date.getUTCDate()}/${date.getUTCFullYear()}`;
    this.selectedYear = date.getUTCFullYear();
    this.selectedMonth =  date.getUTCMonth();
    this.selectedDay = date.getUTCDate();
    this.updateDateCalender();
  }

  modelChange(value: string) {
    this.validDate = this.datesSrv.validateDate(value);
    if (this.validDate) {
      const date = new Date(value);
      this.selectedYear = date.getUTCFullYear();
      this.selectedMonth= date.getUTCMonth();
      this.selectedDay = date.getUTCDate();

    }
  }

  updateDateCalender(){
    const newDate = `${this.selectedMonth + 1}/${this.selectedDay}/${this.selectedYear}`;
    const valid = this.datesSrv.validateDate(newDate);
    this.validDate = valid;
    if (valid){
      this.currentDate = newDate;
      this.selectedDate = new Date(this.selectedYear, this.selectedMonth + 1, 1);
      this.dates = this.datesSrv.getDaysOfTheMonth(new Date(newDate));
      this.monthDisplay = this.datesSrv.getMonthAbv(this.selectedMonth);
    }
  }

  changedDate(){
    const dateString = `${this.selectedMonth} ${this.selectedYear} ${this.selectedDay}`;
    const newDate = new Date();
    this.datesSrv.validateDate(dateString)? this.dates = this.datesSrv.getDaysOfTheMonth(new Date(dateString)) : null;
  }

  validateInput() {
    this.validDate = this.datesSrv.validateDate(this.currentDate);
  }

  yearChange(num: number) {
    this.selectedYear += num;
    this.updateDateCalender();
  }
  monthChange(num: number) {
    this.selectedMonth += num;
    if (this.selectedMonth < 0) {
      this.selectedMonth=11;
      this.selectedYear += num;
    }
    if (this.selectedMonth > 11) {
      this.selectedMonth = 0;
      this.selectedYear += num;
    }
    this.updateDateCalender();
  }

  setToday(){
    const today = new Date();
    this.selectedYear = today.getUTCFullYear();
    this.selectedMonth = today.getUTCMonth();
    this.selectedDay = today.getUTCDate();
    this.updateDateCalender();
    this.togglePicker = false;
  }

  clear() {
    this.currentDate = '';
    this.togglePicker = false;
  }
}
