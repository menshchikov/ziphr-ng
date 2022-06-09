import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotosComponent } from './photos.component';
import { RouterTestingModule } from "@angular/router/testing";
import { DataService } from "../../../../services/data.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { UtilsModule } from "../../../utils/utils.module";
import { provideMockStore } from "@ngrx/store/testing";
import { initialState } from "../../store/photos.reducer";

describe('PhotosComponent', () => {
  let component: PhotosComponent;
  let fixture: ComponentFixture<PhotosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PhotosComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        UtilsModule,
      ],
      providers: [
        DataService,
        provideMockStore({ initialState: initialState }),
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
