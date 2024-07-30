import {
  FC,
  Ref,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

export interface AnnotatorRef {
  clear: () => void;
  undo: () => void;
  drawFixedBox: () => void;
  loadBoxes: () => void;
}
interface Props {
  annotatorRef: Ref<AnnotatorRef>;
  width: number;
  height: number;
}
const AnnotationLayer: FC<Props> = ({ annotatorRef, width, height }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
  const [ctx, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [snapShots, SetSnapshots] = useState<string[]>([]);

  const clear = () => {
    if (canvas?.width && canvas?.height) {
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
      SetSnapshots([]);
    }
  };
  const undo = () => {
    if (!canvas || !snapShots.length) return;

    SetSnapshots((prev) => {
      return prev.slice(0, snapShots.length - 1);
    });

    if (snapShots.length > 1) {
      const img = new Image();
      img.src = snapShots[snapShots.length - 2];
      img.onload = () => {
        ctx?.clearRect(0, 0, canvas.width, canvas.height);
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
      };
    } else {
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
    }
  };
  const drawFixedBox = () => {
    if (!canvas || !ctx) return;
    ctx.strokeRect(250, 50, 100, 150);
    SetSnapshots((prev) => {
      return [...prev, canvas.toDataURL()];
    });
  };
  const loadBoxes = () => {
    if (!canvas || !ctx) return;

    for (let i = 0; i < 10; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const width = Math.random() * 100;
      const height = Math.random() * 100;

      ctx.strokeStyle = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${
        Math.random() * 255
      })`;

      ctx.strokeRect(x, y, width, height);
    }
    SetSnapshots((prev) => {
      return [...prev, canvas.toDataURL()];
    });
  };

  const onMouseDown = ({ nativeEvent: e }: { nativeEvent: MouseEvent }) => {
    setIsDrawing(true);
    ctx?.beginPath();
    ctx?.moveTo(e.offsetX, e.offsetY);
  };

  const onMouseMove = ({ nativeEvent: e }: { nativeEvent: MouseEvent }) => {
    if (isDrawing) {
      ctx?.lineTo(e.offsetX, e.offsetY);
      ctx?.stroke();
    }
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    if (canvas?.toDataURL()) {
      SetSnapshots((prev) => {
        return [...prev, canvas.toDataURL()];
      });
    }
    setIsDrawing(false);
  };

  useEffect(() => {
    if (canvasRef.current) {
      setCanvas(canvasRef.current);
      setContext(canvasRef.current.getContext('2d'));
    } else {
      setCanvas(null);
      setContext(null);
    }
  }, [canvasRef]);

  useImperativeHandle(annotatorRef, () => ({
    clear,
    undo,
    drawFixedBox,
    loadBoxes,
  }));

  return (
    <canvas
      ref={canvasRef}
      data-testid="canvas-test"
      width={width}
      height={height}
      style={{ position: 'absolute', left: 0, top: 0 }}
      onMouseMove={onMouseMove}
      onMouseDown={onMouseDown}
      onMouseUp={stopDrawing}
      onMouseLeave={stopDrawing}
    />
  );
};
export default AnnotationLayer;
