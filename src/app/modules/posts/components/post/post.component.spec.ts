import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostComponent } from './post.component';
import { RouterTestingModule } from "@angular/router/testing";
import { DataService } from "../../../../services/data.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import {
  HttpClient,
  HttpHandler
} from "@angular/common/http";

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostComponent ],
      imports:[RouterTestingModule],
      providers: [
        DataService,
        HttpClientTestingModule,
        HttpClient,
        HttpHandler,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
