import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginatorComponent implements OnChanges{
@Input() totalCount: number;
@Input() currentPageNum: number;
@Output() pageChanged = new EventEmitter<number>();
  pagesArray: number[];
  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    let array = [];
    let left = this.currentPageNum - 3;
    let right = this.currentPageNum + 3;
    let isLeftSpaceInsert = false;
    let isRightSpaceInsert = false;
    for (let i = 0; i < this.totalCount; i++) {

      if (i !== 0 && i < left) {
        if (!isLeftSpaceInsert) {
          array.push(-1);
          isLeftSpaceInsert = true;
        }
      } else if (i !== this.totalCount - 1 && i > right) {
        if (!isRightSpaceInsert) {
          array.push(-1);
          isRightSpaceInsert = true;
        }
      } else {
        array.push(i);
      }
    }
    this.pagesArray = array;
  }

  setPage(num: number) {
    if(num === -1) {
      return;
    }
    this.pageChanged.emit(num);
  }

  nextPage() {
    if(this.currentPageNum === this.totalCount-1){
      return;
    }
    this.pageChanged.emit(this.currentPageNum + 1);
  }

  prevPage() {
    if(this.currentPageNum === 0){
      return;
    }
    this.pageChanged.emit(this.currentPageNum - 1);
  }

}
