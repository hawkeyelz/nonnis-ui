import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NavComponent } from './nav.component';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('nav should create', () => {
    expect(component).toBeTruthy();
  });
  it('nav should have div', () =>  {
    const div:HTMLElement = fixture.nativeElement.querySelector('div');
    expect(div).toBeTruthy();
  });
  it('nav should have a ul', ()=>{
    const ul:HTMLUListElement = fixture.nativeElement.querySelector('ul');
    expect(ul.innerHTML).not.toBeNull();
    expect(ul).toBeTruthy();

  });

  it ('nav should have at least 1 nav-item', () => {
    const listItems = fixture.debugElement.queryAll(By.css('.nav-item'));
    expect(listItems.length).toBeGreaterThanOrEqual(1);
  });

  it ('nav should have at least 1 nav-link', () => {
    const navLink = fixture.debugElement.queryAll(By.css('.nav-link'));
    expect(navLink.length).toBeGreaterThanOrEqual(1);
  });

  it ('nav should have only 1 nav-brand item', ()=>{
    const navBrand = fixture.debugElement.queryAll(By.css('.nav-brand'));
    expect(navBrand.length).toEqual(1);
  });
});


