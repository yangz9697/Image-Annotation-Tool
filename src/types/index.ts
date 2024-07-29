export enum ToolType {
  ROTATE = 'rotate',
  UNDO = 'undo',
  CLEAR = 'clear',
  DRAW_BOX = 'draw_box',
  LOAD_BOXES = 'load_boxes'
}

export type Coordinate = [number, number];

export type BoundingBox = [Coordinate, Coordinate];

export type BoundingBoxes = BoundingBox[];