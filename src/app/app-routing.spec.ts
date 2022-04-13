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

describe('AppRouting', () => {
  let router:Router;
  let location:Location;

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
  });
  it('/dashboard', waitForAsync(() => {
    router.navigate(["/dashboard"]).then(() => {
      console.log(location.path());
      expect(location.path()).toBe("/dashboard");
    });
  }));
  it('/any notFound', waitForAsync(() => {
    router.navigate(["/any"]).then(() => {
      const notFound = getNotFoundComponent();
      expect(notFound).toBeDefined();
      expect(location.path()).toBe("/any");
    });
  }));

  function getNotFoundComponent() {
    let fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const componentElement = fixture.nativeElement as HTMLElement;
    let notFound = componentElement.querySelector('.notfound') as HTMLElement;
    return notFound;
  }

  it('/dashboard/any notFound', waitForAsync(() => {
    router.navigate(["/dashboard/any"]).then(() => {
      const notFound = getNotFoundComponent();
      expect(notFound).toBeDefined();
      expect(location.path()).toBe("/dashboard/any");
    });
  }));
  it('/ to /dashboard', waitForAsync(() => {
    router.navigate(["/"]).then(() => {
      expect(location.path()).toBe("/dashboard");
    });
  }));
  it('/posts', waitForAsync(() => {
    router.navigate(["/posts"]).then(() => {
      expect(location.path()).toBe("/posts");
    });
  }));
  it('/posts/5', waitForAsync(() => {
    router.navigate(["/posts/5"]).then(() => {
      console.log(location.path());
      expect(location.path()).toBe("/posts/5");
    });
  }));
  it('/posts/5/any notFound', waitForAsync(() => {
    router.navigate(["/posts/5/any"]).then(() => {
      const notFound = getNotFoundComponent();
      expect(notFound).toBeDefined();
      expect(location.path()).toBe("/posts/5/any");
    });
  }));
  it('/albums', waitForAsync(() => {
    router.navigate(["/albums"]).then(() => {
      console.log(location.path());
      expect(location.path()).toBe("/albums");
    });
  }));
  it('/albums/5', waitForAsync(() => {
    router.navigate(["/albums/5"]).then(() => {
      console.log(location.path());
      expect(location.path()).toBe("/albums/5");
    });
  }));
  it('/albums/5/any notFound', waitForAsync(() => {
    router.navigate(["/albums/5/any"]).then(() => {
      const notFound = getNotFoundComponent();
      expect(notFound).toBeDefined();
      expect(location.path()).toBe("/albums/5/any");
    });
  }));
  it('/photos', waitForAsync(() => {
    router.navigate(["/photos"]).then(() => {
      expect(location.path()).toBe("/photos");
    });
  }));
  it('/photos/5', waitForAsync(() => {
    router.navigate(["/photos/5"]).then(() => {
      expect(location.path()).toBe("/photos/5");
    });
  }));
  it('/photos/5/any notFound', waitForAsync(() => {
    router.navigate(["/photos/5/any"]).then(() => {
      const notFound = getNotFoundComponent();
      expect(notFound).toBeDefined();
      expect(location.path()).toBe("/photos/5/any");
    });
  }));
  it('/users/5', waitForAsync(() => {
    router.navigate(["/users/5"]).then(() => {
      console.log(location.path());
      expect(location.path()).toBe("/users/5");
    });
  }));
  it('/users/5/any notFound', waitForAsync(() => {
    router.navigate(["/users/5/any"]).then(() => {
      const notFound = getNotFoundComponent();
      expect(notFound).toBeDefined();
      expect(location.path()).toBe("/users/5/any");
    });
  }));
  it('/users notFound', waitForAsync(() => {
    router.navigate(["/users"]).then(() => {
      const notFound = getNotFoundComponent();
      expect(notFound).toBeDefined();
      expect(location.path()).toBe("/users");
    });
  }));

});
