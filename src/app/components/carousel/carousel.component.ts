import {
  AfterContentInit,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  Input,
  OnInit,
  QueryList,
  Renderer2,
} from '@angular/core';
import { delay, filter } from 'rxjs';
import { CarouselItemComponent } from './carousel-item/carousel-item.component';
import { ICarouselItem } from './interfaces/ICarouselItem';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.less'],
})
export class CarouselComponent implements OnInit, AfterContentInit {
  currentIndex: number = 0;
  public carouselItemArray: boolean[]=[];

  constructor(private elemntRef: ElementRef, private render: Renderer2) {}
  @ContentChildren('carouseItem') carouselItems?: QueryList<ElementRef>;

  ngAfterContentInit(): void {
    let afterActive = false;
     this.carouselItems?.map((el: ElementRef, idx) => {
      const nativeEl = el.nativeElement;
       const active = nativeEl.classList.contains('active');
       this.setElementClass(idx);
      return active;
    });
  }
  ngOnInit(): void {}

  selectSlide(index: number): void {
    const selEl = this.carouselItems?.get(index);
    const curEl = this.carouselItems?.get(this.currentIndex);
    if (selEl){
      this.render.addClass(selEl.nativeElement, 'active');
    }
    this.currentIndex = index;
    this.setElementClass(this.currentIndex);
  }

  setElementClass(index:number):void{
    let isActive = false;
    this.carouselItemArray = [];
    this.carouselItems?.map((el,idx) => {
      const nativeEl = el.nativeElement;
      let activeIndex = Array.from(nativeEl.classList).indexOf('active');
      if (idx === this.currentIndex){
        this.render.removeClass(nativeEl, 'left');
        this.render.removeClass(nativeEl, 'right');
        this.render.removeClass(nativeEl,'active');
        this.render.addClass(nativeEl, 'active');
      }
      if (activeIndex > -1) {
        isActive = true;
        this.carouselItemArray.push(true);

      } else {
        this.carouselItemArray.push(false);
      if(!isActive){
        this.render.addClass(nativeEl,'left');
      } else {
        this.render.addClass(nativeEl, 'right');
      }
      }


    });
  }
}
