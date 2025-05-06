import { Injectable } from '@angular/core';
import { PromiseValue } from '../../../../../../common/view-models/value.promise';
import { PictureCanvasController } from './picture-canvas.controller';
import { PictureImageController } from './picture-image.controller';

@Injectable()
export class PictureController {
  image = new PromiseValue<PictureImageController>();
  canvas = new PromiseValue<PictureCanvasController>();
}
