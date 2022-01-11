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

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.less'],
})
export class CarouselComponent implements OnInit, AfterContentInit {
  public activeIndex: number = 0;
  public itemArray: any[] = [];
  public isAuto = false;
  public playing = false;
  private movementDir = '';
  private timer: any;
  @ContentChildren('carouseItem') carouselItems?: QueryList<ElementRef>;

  @Input() wrapping: boolean = true;
  @Input() autoPlayOnStart: boolean = false;
  @Input() autodirction: string = 'left';
  @Input() slideinterval: number = 5;

  constructor(private render: Renderer2) {
    if (this.autodirction || this.slideinterval > 0) {
      this.isAuto = true;
    }
  }

  ngOnInit(): void {}
  ngAfterContentInit(): void {
    if (this.autodirction && this.slideinterval > 0) {
      if (this.autoPlayOnStart) {
        this.startSlideTimer();
      }
    }
    this.setInitialActiveSlide();
  }

  startSlideTimer(): void {
    this.playing = true;
    if (this.slideinterval && this.autodirction) {
      this.wrapping = true;
      this.timer = setInterval(() => {
        (this.movementDir = this.autodirction),
          this.selectSlide(this.activeIndex + 1);
      }, this.slideinterval * 1000);
    }
  }

  stopSlideTimer(): void {
    this.playing = false;
    if (this.timer) clearInterval(this.timer);
  }

  setInitialActiveSlide(): void {
    let foundActive = false;
    this.carouselItems?.forEach((el: ElementRef, idx) => {
      const nativeEl = el.nativeElement;
      if (nativeEl.classList.contains('active')) {
        foundActive = true;
        this.activeIndex = idx;
      }
    });
    const first = this.carouselItems?.get(0)?.nativeElement;
    if (!foundActive) {
      this.render.addClass(first, 'active');
      this.activeIndex = 0;
    }
  }

  slideTo(newActiveEl: ElementRef, previousEl: ElementRef, direction: string) {
    //set Class For Active
    this.removeUnusedClassesFromElement(newActiveEl);
    this.render.addClass(newActiveEl, `active-${direction}`);
    // setClassForPrevious
    this.removeUnusedClassesFromElement(previousEl);
    this.render.addClass(previousEl, `out-${direction}`);
  }

  getSlideDirection(previousIndx: number): string {
    if (this.wrapping && this.movementDir) {
      const mvdir = this.movementDir;
      this.movementDir = '';
      return mvdir;
    }
    if (previousIndx < this.activeIndex) {
      return 'right';
    } else if (previousIndx > this.activeIndex) {
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
    this.movementDir = 'left';
    this.ableToSlide() && this.selectSlide(this.activeIndex - 1);
  }

  nextSlide(): void {
    this.movementDir = 'right';
    this.ableToSlide() && this.selectSlide(this.activeIndex + 1);
  }
  pause(): void {}

  removeUnusedClassesFromElement(element: ElementRef) {
    this.render.removeClass(element, 'hidden');
    this.render.removeClass(element, 'active');
    this.render.removeClass(element, 'active-right');
    this.render.removeClass(element, 'active-left');
    this.render.removeClass(element, 'out-left');
    this.render.removeClass(element, 'out-right');
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
        if (index > itemsMaxIndex) {
          return 0;
        }
        if (index < 0) {
          return itemsMaxIndex;
        }
      }
    }
    return index;
  }

  selectSlide(selectedIndex: number): void {
    if (selectedIndex == this.activeIndex) return;
    const previousIndex = this.activeIndex;
    this.activeIndex = this.getNewActiveIndex(selectedIndex);

    const activeEl = this.carouselItems?.get(this.activeIndex)?.nativeElement;
    const previousEl = this.carouselItems?.get(previousIndex)?.nativeElement;
    const slideDir = this.getSlideDirection(previousIndex);
    this.setElementDirection(slideDir, activeEl, previousEl);
  }

  setElementDirection(
    slideDir: string,
    newActiveEl: ElementRef,
    previousEl: ElementRef
  ): void {
    this.itemArray = new Array(this.carouselItems?.length);
    this.carouselItems?.forEach((el, idx) => {
      if (newActiveEl && previousEl) {
        if (slideDir) {
          this.slideTo(newActiveEl, previousEl, slideDir);
        }
      }
    });
  }

  togglePlay() {
    if (this.playing){
      this.stopSlideTimer();
    } else {
      this.startSlideTimer();
      this.selectSlide(this.activeIndex + 1);
    }
  }
}
