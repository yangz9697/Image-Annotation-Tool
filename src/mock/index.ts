import { BoundingBox, BoundingBoxes } from "../types";

// Function to generate a random number between 0 and 1
function getRandomCoordinate(): number {
  return Math.random(); // Returns a number between 0 and 1
}

// Function to create a single BoundingBox
function generateBoundingBox(): BoundingBox {
  return [
    [getRandomCoordinate(), getRandomCoordinate()],
    [getRandomCoordinate(), getRandomCoordinate()]
  ];
}

// Function to create an array of BoundingBoxes
export function generateBoundingBoxes(count: number): BoundingBoxes {
  const boundingBoxes: BoundingBoxes = [];
  for (let i = 0; i < count; i++) {
    boundingBoxes.push(generateBoundingBox());
  }
  return boundingBoxes;
}
