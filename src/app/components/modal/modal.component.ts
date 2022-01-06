import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.less']
})
export class ModalComponent implements OnInit {
  @Input() ShowModal:boolean = false;
  @Input() title:string = '';
  @Output() okModal:EventEmitter<Boolean> = new EventEmitter<Boolean>();
  @Input() footerText: string = '';
  @Input() headerText: string = '';
  constructor() { }

  ngOnInit(): void {
  }
  cancel(){
    this.ShowModal = false;
    this.okModal.emit(false);
  }
  ok(){
    this.okModal.emit(true);
  }

}
