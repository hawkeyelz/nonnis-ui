import { Component } from '@angular/core';
import { DatesService } from './services/dates.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'nonnis-ui';
  showModal:boolean = false;
  constructor(datesServ: DatesService){
  }
  closeModal(){
    this.showModal = false;
  }
}


