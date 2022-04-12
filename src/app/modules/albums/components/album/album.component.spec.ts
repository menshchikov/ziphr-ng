import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumComponent } from './album.component';
import { RouterTestingModule } from "@angular/router/testing";
import { DataService } from "../../../../services/data.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import {
  HttpClient,
  HttpHandler
} from "@angular/common/http";

describe('AlbumComponent', () => {
  let component: AlbumComponent;
  let fixture: ComponentFixture<AlbumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlbumComponent ],
      imports: [RouterTestingModule],
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
    fixture = TestBed.createComponent(AlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
