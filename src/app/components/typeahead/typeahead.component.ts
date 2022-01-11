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
  constructor() {}
  @Input() CaseSensitive: boolean = false;
  ngOnInit(): void {}
  onChange(value: string): void {
    this.typeAheadValue = value;
    console.log(value);
    this.checkDataForValue(value);
  }

  selectFromDropDown(item:TypeAheadItem){
    this.typeAheadValue = item.value;
    this.filteredData = [];
  }


  checkDataForValue(value: string): void {
    this.filteredData = [];
    this.typeaheadData.forEach((str, idx) => {
      let found = false;
      let returnValue:TypeAheadItem = { text: str, value: str};
      if (this.CaseSensitive) {
        found = str.includes(value);
        returnValue = {text: str, value: str};
        this.filteredData.push(returnValue);

      } else {
        found = str.toLowerCase().includes(value.toLowerCase());
      }
      if(found) {

        returnValue = {
          value: str,
          text: str.replace(value,`<strong class="testme">${value}</strong>`)
        };
        this.filteredData.push(returnValue);
        return;
      }


    });
    console.log(this.filteredData);
  }
}
