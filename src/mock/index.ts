// mock.ts
import { faker } from '@faker-js/faker';
import { BoundingBox, Coordinate } from '../types';

function generateRandomCoordinate(): Coordinate {
  return [
    parseFloat(faker.datatype.number({ min: 0, max: 1, precision: 0.01 }).toFixed(2)),
    parseFloat(faker.datatype.number({ min: 0, max: 1, precision: 0.01 }).toFixed(2)),
  ];
}

function generateRandomBoundingBox(): BoundingBox {
  const topLeft = generateRandomCoordinate();
  let bottomRight: Coordinate;

  do {
    bottomRight = generateRandomCoordinate();
  } while (bottomRight[0] <= topLeft[0] || bottomRight[1] <= topLeft[1]);

  return [topLeft, bottomRight];
}

export function generateMockBoundingBoxs(count: number): BoundingBox[] {
  const BoundingBoxs: BoundingBox[] = [];
  for (let i = 0; i < count; i++) {
    BoundingBoxs.push(generateRandomBoundingBox());
  }
  return BoundingBoxs;
}

// const mockBoundingBoxs = generateMockBoundingBoxs(10); // 生成 10 个矩形
// console.log(mockBoundingBoxs);
