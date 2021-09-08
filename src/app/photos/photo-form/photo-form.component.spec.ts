import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoFormComponent } from './photo-form.component';
import {UserService} from '../../core/user/user.service';

describe('PhotoFormComponent', () => {
  let component: PhotoFormComponent;
  let fixture: ComponentFixture<PhotoFormComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhotoFormComponent ]
    })
    .compileComponents();
  });

});
