import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SetorPage } from './setor.page';

describe('SetorPage', () => {
  let component: SetorPage;
  let fixture: ComponentFixture<SetorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SetorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
