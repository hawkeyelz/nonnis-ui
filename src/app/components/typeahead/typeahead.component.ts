import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { TypeAheadItem } from 'src/app/interfaces/typeAheadItem';

@Component({
  selector: 'app-typeahead',
  templateUrl: './typeahead.component.html',
  styleUrls: ['./typeahead.component.less'],
})
export class TypeaheadComponent implements OnInit {
  public typeAheadValue = '';
  public typeaheadData = ['bo', 'dave', 'fran', 'clive', 'danny', 'Ralf'];
  public filteredData: TypeAheadItem[] = [];
  public showList = false;
  private mouseInLIst =false;
  public currentLIstIndex = 0;
  public inputFocused:boolean = false;
  constructor() {}
  @Input() CaseSensitive: boolean = false;
  ngOnInit(): void {}
  onChange(value: string): void {
    this.typeAheadValue = value;
    this.checkDataForValue(value);
  }

  selectFromDropDown(item:TypeAheadItem){
    this.typeAheadValue = item.value;
    this.filteredData = [];
    this.showList = false;
  }


  checkDataForValue(value: string): void {
    this.filteredData = [];
    this.typeaheadData.forEach((str, idx) => {
      let found = false;
      if (this.CaseSensitive) {
        found = str.includes(value);
      } else {
        found = str.toLowerCase().includes(value.toLowerCase());
      }
      if(found) {

        this.filteredData.push({
          value: str,
          text: str.replace(value,`<strong class="testme">${value}</strong>`)
        });
        return;
      }
    });
    this.showList = (this.filteredData.length > 0)
    this.currentLIstIndex = 0;
  }

  downKey() {
    (this.filteredData.length > 0 && this.currentLIstIndex < this.filteredData.length -1) && this.currentLIstIndex ++;
    console.log(this.currentLIstIndex);

  }

  upKey() {
    (this.filteredData.length > 0 && this.currentLIstIndex > 0) && this.currentLIstIndex --;
    console.log(this.currentLIstIndex);
  }

  enterKey() {
    (this.filteredData.length > 0) && this.selectFromDropDown(this.filteredData[this.currentLIstIndex]);

  }

  keyPress(event:any){
  if (event.keyCode === 38) {
    this.upKey();
  }
  if (event.keyCode === 40){
    this.downKey();
  }
  if(event.keyCode === 13){
    this.enterKey();
  }
  }
}
