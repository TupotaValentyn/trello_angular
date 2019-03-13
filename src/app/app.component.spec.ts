import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {MatInputModule} from '@angular/material/input';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatCheckboxModule,
        DragDropModule,
        ScrollingModule,
        CdkStepperModule,
        CdkTableModule,
        CdkTreeModule,
        MatInputModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to trello!');
  });

  it('should render table in a div tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('div'));
  })

  it('tableIndex must be assigned  ', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    app.onMouseMove(1);
    expect(app.tableIndex).toEqual(1);
  });

  it('ItemIndex must be assigned', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const value = 1;
    app.onMouseMoveItem(value);
    expect(app.itemIndex).toEqual(value);
  });

  it('item must by added to array', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const length = app.trello[1].data.length;
    const value = 'string';
    app.addForArray(1, value);
    expect(app.trello[1].data.length > length).toBeTruthy();
  });

  it('delete item from array', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const length = app.trello[1].data.length;
    app.deleteItem(1, 1);
    expect(app.trello[1].data.length < length).toBeTruthy();
  });
});
