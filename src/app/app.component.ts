import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material';
import { ModalComponent } from './modal/modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor (public dialog: MatDialog) {

  }

  ngOnInit () {

  }

  curentTable: number;
  input: string;
  tableIndex: number;
  itemIndex: number;
  value = 'Clear me';
  trello = [
    {
      name: 'todo',
      value: '',
      data: [
        'Get to work',
        'Pick up groceries',
        'Go home',
        'Fall asleep'
      ]
    }, {
      name: 'done',
      value: '',
      data: [
        'Get up',
        'Brush teeth',
        'Take a shower',
        'Check e-mail',
        'Walk dog'
      ]
    }, {
      name: 'todo 2',
      value: '',
      data: [
        'Fall asleep',
        'Go home',
        'Get to work',
        'Pick up groceries'
      ]
    }
  ];

  todo = [
    'Get to work',
    'Pick up groceries',
    'Go home',
    'Fall asleep'
  ];

  done = [
    'Get up',
    'Brush teeth',
    'Take a shower',
    'Check e-mail',
    'Walk dog'
  ];

  addColumn() {
    this.trello.push({
      name: 'new name',
      value: '',
      data: []
    });
  }

  onMouseMove(event: Event, id: number) {
    this.tableIndex = id;
  }

  onMouseMoveItem(index: number) {
    this.itemIndex = index;
  }

  onTableClick(num: number) {
    this.curentTable = num;
  }

  addForArray(index: number, value: string) {
    if (value) {
      this.trello[index].data.push(value);
    }
    return true;
  }


  openDialogName(name: string, index: number) {
    this.input = name;
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '250px',
      data: {input: this.input}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.input = result || this.input;
      this.trello[index].name = this.input;
    });
  }

  openDialog(text: string, tindex: number, iindex: number): void {
    this.input = text;

    const dialogRef = this.dialog.open(ModalComponent, {
      width: '250px',
      data: {input: this.input}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.input = result || this.input;

      this.trello[tindex].data[iindex] = this.input;
    });
  }

  deleteItem(ind: number, i: number) {
    this.trello[ind].data.splice(i, 1);
  }

  superDrop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(this.trello[0].data,
                        this.trello[this.tableIndex].data,
                        0,
                        this.itemIndex);
    }
  }

  swap(event: CdkDragDrop<string[]>, ctindex: number) {
    if (ctindex === this.tableIndex) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      return 'change array';
    } else {
      this.trello[this.tableIndex].data.splice(this.itemIndex, 0, this.trello[ctindex].data[event.currentIndex]);
      this.trello[ctindex].data.splice(event.currentIndex, 1);
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    if (!(event.previousContainer === event.container)) {
      moveItemInArray(event.container.data, this.curentTable, this.tableIndex);
      return 'change array';
    }
  }
}
