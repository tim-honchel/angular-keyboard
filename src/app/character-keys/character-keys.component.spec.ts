import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterKeysComponent } from './character-keys.component';

describe('CharacterKeysComponent', () => {
  let component: CharacterKeysComponent;
  let fixture: ComponentFixture<CharacterKeysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharacterKeysComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterKeysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
