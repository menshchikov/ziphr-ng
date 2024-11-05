import {
  ComponentFixture,
  TestBed,
  waitForAsync
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { AppModule } from "./app.module";
import { routes } from "./app-routing.module";
import { Router } from "@angular/router";
import { Location } from "@angular/common";

describe('AppComponent', () => {
  let router:Router;
  let location:Location;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        AppModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);

    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'ziphr'`, () => {
    const app = fixture.componentInstance;
    expect(app.title).toEqual('ziphr');
  });

  it('should render menu brand', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.brand')?.textContent).toContain('My App');
  });

  it('should route to /dashboard', waitForAsync(() => {
    const componentElement = fixture.nativeElement as HTMLElement;
    let menuBtn = componentElement.querySelector('app-menu [href="/dashboard"]') as HTMLElement;
    expect(menuBtn.innerText).toBe("Dashboard");
    menuBtn.click();
    fixture.whenStable().then(() =>{
      fixture.detectChanges();
      let menuBtn = componentElement.querySelector('app-menu [href="/dashboard"]') as HTMLElement;
      expect(menuBtn.classList.contains('active')).toBeTrue();
      expect(location.path()).toBe("/dashboard");
    });
  }));

  it('should route to /posts', waitForAsync(() => {
    const componentElement = fixture.nativeElement as HTMLElement;
    let menuBtn = componentElement.querySelector('app-menu [href="/posts"]') as HTMLElement;
    expect(menuBtn.innerText).toBe("Posts");
    expect(menuBtn.classList.contains('active')).toBeFalse();
    menuBtn.click();
    fixture.whenStable().then(() =>{
      fixture.detectChanges();
      let menuBtn = componentElement.querySelector('app-menu [href="/posts"]') as HTMLElement;
      expect(menuBtn.classList.contains('active')).toBeTrue();
      expect(location.path()).toBe("/posts");
    });
  }));

  it('should route to /albums', waitForAsync(() => {
    const componentElement = fixture.nativeElement as HTMLElement;
    let menuBtn = componentElement.querySelector('app-menu [href="/albums"]') as HTMLElement;
    expect(menuBtn.innerText).toBe("Albums");
    expect(menuBtn.classList.contains('active')).toBeFalse();
    menuBtn.click();
    fixture.whenStable().then(() =>{
      fixture.detectChanges();
      let menuBtn = componentElement.querySelector('app-menu [href="/albums"]') as HTMLElement;
      expect(menuBtn.classList.contains('active')).toBeTrue();
      expect(location.path()).toBe("/albums");
    });
  }));

  it('should route to /photos', waitForAsync(() => {
    const componentElement = fixture.nativeElement as HTMLElement;
    let menuBtn = componentElement.querySelector('app-menu [href="/photos"]') as HTMLElement;
    expect(menuBtn.innerText).toBe("Photos");
    expect(menuBtn.classList.contains('active')).toBeFalse();
    menuBtn.click();
    fixture.whenStable().then(() =>{
      fixture.detectChanges();
      let menuBtn = componentElement.querySelector('app-menu [href="/photos"]') as HTMLElement;
      expect(menuBtn.classList.contains('active')).toBeTrue();
      expect(location.path()).toBe("/photos");
    });
  }));

});
