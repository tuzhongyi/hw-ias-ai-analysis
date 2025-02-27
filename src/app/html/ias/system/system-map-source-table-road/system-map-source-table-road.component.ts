import { CommonModule } from '@angular/common';
import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Road } from '../../../../common/data-core/models/arm/analysis/road.model';

@Component({
  selector: 'ias-system-map-source-table-road',
  imports: [CommonModule],
  templateUrl: './system-map-source-table-road.component.html',
  styleUrl: './system-map-source-table-road.component.less',
})
export class SystemMapSourceTableRoadComponent implements AfterViewChecked {
  @Input('datas') datas: Road[] = [];
  @Input() selected?: Road;
  @Output() selectedChange = new EventEmitter<Road | undefined>();
  @Output() position = new EventEmitter<Road>();
  constructor(private detector: ChangeDetectorRef) {}

  widths = ['70px', 'auto', '100px', '70px'];
  @ViewChild('body') body?: ElementRef<HTMLElement>;
  itemheight = 0;

  ngAfterViewChecked(): void {
    if (this.body && this.itemheight === 0) {
      let height = this.body.nativeElement.clientHeight;
      if (height) {
        height -= 80;
        this.itemheight = height * 0.1;
        this.detector.detectChanges();
      }
    }
  }

  clicked?: NodeJS.Timeout;

  onselect(item: Road) {
    if (this.selected === item) {
      if (this.clicked) return;
      this.clicked = setTimeout(() => {
        this.clicked = undefined;
      }, 0.5 * 1000);

      this.selected = undefined;
    } else {
      this.selected = item;
    }
    this.selectedChange.emit(this.selected);
  }
  onposition(item: Road, e: MouseEvent) {
    this.position.emit(item);
    if (this.selected === item) {
      e.stopImmediatePropagation();
    }
  }
}
