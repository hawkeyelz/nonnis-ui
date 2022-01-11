import { NONE_TYPE } from '@angular/compiler';
import { FnParam } from '@angular/compiler/src/output/output_ast';
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
import { delay, filter, first } from 'rxjs';
import { CarouselItemComponent } from './carousel-item/carousel-item.component';
import { ICarouselItem } from './interfaces/ICarouselItem';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.less'],
})
export class CarouselComponent implements OnInit, AfterContentInit {
  public activeIndex: number = 0;
  public previousIndex: number = 0;
  public itemArray: any[] = [];
  private slideFrom: any = null;
  private previousElement?: ElementRef;
  @ContentChildren('carouseItem') carouselItems?: QueryList<ElementRef>;
  @Input() wrapping: boolean = true;

  constructor(private elemntRef: ElementRef, private render: Renderer2) {}

  ngAfterContentInit(): void {
    console.log(this.carouselItems?.length);
    this.setInitialActiveSlide();
  }
  ngOnInit(): void {}

  setInitialActiveSlide(): void {
    let foundActive = false;
    this.carouselItems?.forEach((el: ElementRef, idx) => {
      const nativeEl = el.nativeElement;
      if (nativeEl.classList.contains('active')) {
        foundActive = true;
        this.activeIndex = idx;
      } else this.render.addClass(nativeEl, 'hidden');
    });
    const first = this.carouselItems?.get(0)?.nativeElement;
    if(!foundActive) {
      this.removeUnusedClassesFromElement(first);
      this.render.addClass(first, 'active');
      this.activeIndex = 0;
    }
  }

  slideTo(newActiveEl:ElementRef, curentEl: ElementRef, previousEl: ElementRef, direction:string) {
    //set Class For Active
    this.removeUnusedClassesFromElement(newActiveEl);
    this.render.addClass(newActiveEl, 'active');
    // setClassForPrevious
    this.removeUnusedClassesFromElement(previousEl);
    this.removeUnusedClassesFromElement(curentEl);
    this.render.addClass(curentEl, direction);
  }

  slideDirection(previousIndx:number):string{
    console.log(previousIndx, this.activeIndex);
    if (previousIndx < this.activeIndex){
      return 'right';
    } else if (previousIndx > this.activeIndex){
      return 'left';
    }
    return '';
  }

  ableToSlide(): boolean {
    if (this.carouselItems?.length && this.carouselItems.length > 0) {
      return true;
    }
    return false;
  }

  previousSlide(): void {
    this.ableToSlide() && this.selectSlide(this.activeIndex - 1);
  }

  nextSlide(): void {
    this.ableToSlide() && this.selectSlide(this.activeIndex + 1);
  }

  removeUnusedClassesFromElement(element: ElementRef) {
    this.render.removeClass(element, 'hidden');
    this.render.removeClass(element, 'active');
    this.render.removeClass(element, 'left');
    this.render.removeClass(element, 'right');
  }

  getNewActiveIndex(index: number): number {
    if (this.carouselItems?.length) {
      const itemsMaxIndex = this.carouselItems?.length - 1;
      if (!this.wrapping) {
        if (index > itemsMaxIndex) {
          return itemsMaxIndex;
        } else if (index < 0) {
          return 0;
        }
      } else {
        if(index > itemsMaxIndex){
          return 0;
        }
        if(index < 0){
          return itemsMaxIndex;
        }
      }
    }
    return index;
  }

  selectSlide(selectedIndex: number): void {
    if (selectedIndex == this.activeIndex) return;

    const currentIndex = this.activeIndex;
    this.activeIndex = this.getNewActiveIndex(selectedIndex);

    const activeEl = this.carouselItems?.get(this.activeIndex)?.nativeElement;
    const previousEl = this.carouselItems?.get(this.previousIndex)?.nativeElement;
    const currentEl = this.carouselItems?.get(currentIndex)?.nativeElement;
    this.removeUnusedClassesFromElement(activeEl);
    this.removeUnusedClassesFromElement(currentEl);
    const slideDir = this.slideDirection(currentIndex);
    this.setElementDirection(slideDir, activeEl, currentEl, previousEl);
  }

  setElementDirection(
    slideDir: string,
    newActiveEl: ElementRef,
    currentEl: ElementRef,
    previousEl: ElementRef
  ): void {
    this.itemArray = new Array(this.carouselItems?.length);
    this.carouselItems?.forEach((el, idx) => {
      const currentEl = el.nativeElement;
      if (currentEl === newActiveEl) {
        if (slideDir) {
          this.slideTo(newActiveEl, currentEl, previousEl, slideDir);
        }
      }
    });
  }
}
