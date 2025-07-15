import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'howell-container-zoom',
  imports: [CommonModule],
  templateUrl: './container-zoom.component.html',
  styleUrl: './container-zoom.component.less',
})
export class ContainerZoomComponent implements OnChanges {
  @Input() reset = false;
  @Input() fullable = false;
  @Output() resetChange = new EventEmitter<boolean>();
  @Output() full = new EventEmitter<void>();
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['reset'] && !changes['reset'].firstChange) {
      this.onReset();
    }
  }
  scale = 1;
  translateX = 0;
  translateY = 0;

  isDragging = false;
  startX = 0;
  startY = 0;
  lastX = 0;
  lastY = 0;

  // 鼠标滚轮缩放
  @HostListener('wheel', ['$event'])
  onWheel(event: WheelEvent) {
    this.reset = false;
    this.resetChange.emit(this.reset);
    event.preventDefault();
    const zoomFactor = 0.1;
    if (event.deltaY < 0) {
      this.scale += zoomFactor;
    } else {
      this.scale = Math.max(0.1, this.scale - zoomFactor);
    }
  }

  onDoubleClick(event: MouseEvent) {
    this.onReset();
  }

  onMouseDown(event: MouseEvent) {
    this.reset = false;
    this.resetChange.emit(this.reset);
    this.isDragging = true;
    this.startX = event.clientX;
    this.startY = event.clientY;
  }

  onMouseMove(event: MouseEvent) {
    this.reset = false;
    this.resetChange.emit(this.reset);
    if (!this.isDragging) return;
    const dx = (event.clientX - this.startX) / this.scale;
    const dy = (event.clientY - this.startY) / this.scale;
    this.translateX = this.lastX + dx;
    this.translateY = this.lastY + dy;
  }

  onMouseUp() {
    this.reset = false;
    this.resetChange.emit(this.reset);
    this.isDragging = false;
    this.lastX = this.translateX;
    this.lastY = this.translateY;
  }

  onReset() {
    this.scale = 1;
    this.translateX = 0;
    this.translateY = 0;
    this.lastX = 0;
    this.lastY = 0;
  }

  onfull() {
    this.full.emit();
  }
}
