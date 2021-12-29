import { Injectable } from '@angular/core';
import { Day } from '../interfaces/dates';

@Injectable({
  providedIn: 'root'
})
export class DatesService {
  ImportantDays:Date[]=[];
  Holidays: Date[]=[];
  today: Date;
  constructor(){
    this.today = new Date();
  }

  getDaysOfTheMonth(month:number, year:number):Day[]{
    const startDate = `${year}/${month}/${1}`;
    const selectedDate = new Date(startDate);
    const startingDate = new Date(startDate);
    const daysInTheMonth:number = new Date(year, month, 0).getDate();
    let days:Day[] = [];

    for(let i=1; i < daysInTheMonth+1; i++){
    const  nextDate = new Date(startingDate.setDate(i))
      days.push({
        holiday: this.Holidays.includes(nextDate),
        currentDay: this.today == nextDate,
        important: this.ImportantDays.includes(nextDate),
        date: nextDate
      });
    }

    if (selectedDate.getDay()>0){
      days = [...this.PreviousMonthEndDays(selectedDate.getDay(), selectedDate) ,...days]
    }

    if (days.length < 42){
      days = [...days, ...this.nextMonthStartDays(42-days.length, selectedDate)];
    }
    return days;
  }

  PreviousMonthEndDays(numDays:number, startDate: Date):Day[]{
    let endDays:Day[] = [];
    for(let i=0; i<numDays; i++){
      const previousDate = new Date(startDate);
      previousDate.setDate(-i);
      endDays.push({
        currentDay: this.today == previousDate,
        holiday: this.Holidays.includes(previousDate),
        important: this.ImportantDays.includes(previousDate),
        date: previousDate
      });
    }
    return endDays.reverse();
  }

  nextMonthStartDays(numDays:number, startingDate: Date):Day[]{
    let startDays:Day[] = [];
    const nextMonth = new Date(startingDate);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    for (let i=1; i<numDays+1; i++){
      const nextDay:Date = new Date(nextMonth.setDate(i));
      startDays.push({
        currentDay: this.today == nextDay,
        holiday: this.Holidays.includes(nextDay),
        important: this.ImportantDays.includes(nextDay),
        date: nextDay
      });
    }
    return startDays;
  }
}
