import { render, screen } from '@testing-library/react';
import ImageAnnotator from '.';

// 使用 Base64 编码的图像数据
const base64Image =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==';

describe('ParentComponent', () => {
  test('renders image&canvas', () => {
    render(<ImageAnnotator imgUrl={base64Image} />);
    const img = screen.getByAltText('image-display') as HTMLImageElement;
    const canvas = screen.getByTestId('canvas-test') as HTMLCanvasElement;
    expect(img).toBeInTheDocument();
    expect(canvas).toBeInTheDocument();
    expect(img.src).toBe(base64Image);
  });
});
