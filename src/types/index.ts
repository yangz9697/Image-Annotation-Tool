export enum ToolType {
  ROTATE_CLOCKWISE = 'rotate_clockwise',
  ROTATE_COUNTER_CLOCKWISE = 'rotate_counter_clockwise',
  UNDO = 'undo',
  CLEAR = 'clear',
  LOAD_RANDOM_BOXES = 'load_boxes',
  DRAW_FIXED_BOX = 'draw_fixed_box'
}

export type Coordinate = [number, number];

export type BoundingBox = [Coordinate, Coordinate];

export type BoundingBoxes = BoundingBox[];