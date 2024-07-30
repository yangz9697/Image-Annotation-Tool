import { BoundingBox } from "../types";

// Function to convert percentage coordinates to pixel coordinates
export function convertToPixelCoordinates(box: BoundingBox, canvasWidth: number, canvasHeight: number) {
  const [topLeft, bottomRight] = box;
  return [
    [
      topLeft[0] * canvasWidth,
      topLeft[1] * canvasHeight
    ],
    [
      bottomRight[0] * canvasWidth,
      bottomRight[1] * canvasHeight
    ]
  ];
}