import { Injectable, ɵisSubscribable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Day } from '../interfaces/dates';
import { specialDate } from '../interfaces/specialDate';

@Injectable({
  providedIn: 'root',
})
export class DatesService {
  ImportantDays: Date[] = [];
  Holidays: Date[] = [];
  Months: Observable<string[]> = new BehaviorSubject<string[]>([
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'July',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ]);


  today: Date;
  constructor() {
    this.today = new Date();
  }

  getDaysOfTheMonth(date: Date): Day[] {
    const startDate = `${date.getFullYear()}/${date.getMonth() + 1}/${1}`;
    const selectedDate = new Date(startDate);
    const startingDate = new Date(startDate);
    const daysInTheMonth: number = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0
    ).getDate();
    let days: Day[] = [];

    for (let i = 1; i < daysInTheMonth + 1; i++) {
      const nextDate = new Date(startingDate.setDate(i));
      days.push({
        special: this.isSpecialDate(nextDate),
        date: nextDate,
      });
    }

    if (selectedDate.getDay() > 0) {
      days = [
        ...this.PreviousMonthEndDays(selectedDate.getDay(), selectedDate),
        ...days,
      ];
    }

    if (days.length < 42) {
      days = [
        ...days,
        ...this.nextMonthStartDays(42 - days.length, selectedDate),
      ];
    }
    return days;
  }

  PreviousMonthEndDays(numDays: number, startDate: Date): Day[] {
    let endDays: Day[] = [];
    for (let i = 0; i < numDays; i++) {
      const previousDate = new Date(startDate);
      previousDate.setDate(-i);
      endDays.push({
        special: this.isSpecialDate(previousDate),
        date: previousDate,
      });
    }
    return endDays.reverse();
  }

  nextMonthStartDays(numDays: number, startingDate: Date): Day[] {
    let startDays: Day[] = [];
    const nextMonth = new Date(startingDate);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    for (let i = 1; i < numDays + 1; i++) {
      const nextDay: Date = new Date(nextMonth.setDate(i));
      startDays.push({
        special: this.isSpecialDate(nextDay),
        date: nextDay,
      });
    }
    return startDays;
  }

  isSpecialDate(date: Date): specialDate {
    let sd: specialDate = {
      current: false,
      holiday: false,
      important: false,
    };
    const today = new Date();
    if (this.comparDates(today, date)) {
      sd.current = true;
      return sd;
    }

    for (let i = 0; i < this.Holidays.length; i++) {
      if (this.comparDates(this.Holidays[i], date)) {
        sd.holiday = true;
        return sd;
        break;
      }
    }

    for (let i = 0; i < this.ImportantDays.length; i++) {
      if (this.comparDates(this.ImportantDays[i], date)) {
        sd.important = true;
        return sd;
        break;
      }
    }

    return sd;
  }

  comparDates(date1: Date, date2: Date): boolean {
    let d1: string = `${date1.getMonth()} ${date1.getDate()} ${date1.getFullYear()}`;
    let d2: string = `${date2.getMonth()} ${date2.getDate()} ${date2.getFullYear()}`;
    return d1 === d2;
  }

  validateDate(dateString: string): boolean {
    console.log(dateString, Date.parse(dateString));
    if (!isNaN(Date.parse(dateString))) {
      return true;
    }
    return false;
  }

  getMonthAbv(month: number): string {
    let abv = '';
  this.Months.subscribe(mon => {
      abv= mon[month];
    });
    return abv;
  }
}
