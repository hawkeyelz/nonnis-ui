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
  holidayDates: Observable<Date[]> = new BehaviorSubject<Date[]>([]);
  importantDates: Observable<Date[]> = new BehaviorSubject<Date[]>([]);
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
  selected?: Date;

  constructor() {
    this.today = new Date();
  }

  getDaysOfTheMonth(date: Date): Day[] {
    this.selected = date;
    const startDate = this.dateToString(date, 1);
    const selectedDate = new Date(startDate);
    const startingDate = new Date(startDate);
    const daysInTheMonth: number = new Date(
      date.getUTCFullYear(),
      date.getUTCMonth() + 1,
      0
    ).getUTCDate();
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
      const day:Day = {
        special: this.isSpecialDate(previousDate),
        date: previousDate
      };
      day.special.other = true;
      endDays.push(day);
    }
    return endDays.reverse();
  }

  nextMonthStartDays(numDays: number, startingDate: Date): Day[] {
    let startDays: Day[] = [];
    const nextMonth = new Date(startingDate);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    for (let i = 1; i < numDays + 1; i++) {
      const nextDay: Date = new Date(nextMonth.setDate(i));
      const day:Day = {
        special: this.isSpecialDate(nextDay),
        date: nextDay
      };
      day.special.other=true;
      startDays.push(day);
    }
    return startDays;
  }

  isSpecialDate(date: Date): specialDate {
    let sd: specialDate = {
      selected: false,
      current: false,
      holiday: false,
      important: false,
      other: false,
    };

    if (this.comparDates(this.today, date)) {
      sd.current = true;
      return sd;
    }

    if (this.selected && this.comparDates(this.selected, date)) {
      sd.selected = true;
      return sd;
    }
    sd.holiday = this.checkDateInSpecialArray(this.Holidays, date);
    sd.important = this.checkDateInSpecialArray(this.ImportantDays, date);
    return sd;
  }

  checkDateInSpecialArray(dates: Date[], date: Date): boolean {
    for (let i = 0; i < dates.length; i++) {
      if (this.comparDates(dates[i], date)) {
        return true;
      }
    }
    return false;
  }

  comparDates(date1: Date, date2: Date): boolean {
    let d1: string = `${date1.getMonth()} ${date1.getDate()} ${date1.getFullYear()}`;
    let d2: string = `${date2.getMonth()} ${date2.getDate()} ${date2.getFullYear()}`;
    return d1 === d2;
  }

  validateDate(dateString: string): boolean {
    if (!isNaN(Date.parse(dateString))) {
      return true;
    }
    return false;
  }

  getMonthAbv(month: number): string {
    let abv = '';
    this.Months.subscribe((mon) => {
      abv = mon[month];
    });
    return abv;
  }

  dateToString(date: Date, day: number): string {
    return `${date.getUTCFullYear()}/${date.getUTCMonth() + 1}/${
      day > 0 ? day : date.getUTCDate()
    }`;
  }

}
