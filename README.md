# Task Analysis
## Orignal Requirement
Minimal task
- Write a component for showing the image
- You can rotate the file
- Have 2 buttons outside of the custom component:
  - Clear-up any drawings
  - When this button clicked, a rectangle appears over the image

Additional points:
- Assume that from the backend you get array of bounding box coordinates (left-top and right-bottom points). The width and height of a file are assumed to be 1, coordinates are a proportion of that. Draw those bounding boxes on the image. You are free to choose a format for the coordinates.
- Possibility of Drawing and highlighting of the image with mouse
- Add a “Step back” button (aka cmd-z)

## List of Functions
1. Image Viewing
- Basic: view and rotate
2. Image Annotator
- Basic: Outside Buttons(Clear All, Draw Rectangle)
- Optioanl: Drawing and highlighting of the image with mouse
- Optional: 'Step Back'
- Optional: Bounding Boxs from mock data.

# Tech Research
## Related technologies
1. Image Types: Bitmap(JPEG、PNG、GIF), Vector Graphics(svg, pdf)
2. Show Images: 
   - ~~`<img>`~~
   - ~~`<div> + {background-image: url}`~~
   - `<svg>`: Allows for complex editing.
   - `load image in <canvas>`: Allows for complex editing.
3. Rotate Images: `{transform: rotate(45)}` 
4. Draw on Images(with mouse):
   - `<canvas>`
   - `<svg>`
5. Clear Drawing、Back: `stack` structure of strokes or boxs.
## SVG or Canvas
### SVG DEMO
```
const svg = document.getElementById('mySVG');
let drawing = false;
let paths = []; // array to store paths
let currentPath = [];

svg.addEventListener('mousedown', (e) => {
  drawing = true;
  const x = e.offsetX;
  const y = e.offsetY;
  currentPath = [`M${x},${y}`]; // starting point
});

svg.addEventListener('mousemove', (e) => {
  if (drawing) {
    const x = e.offsetX;
    const y = e.offsetY;
    currentPath.push(`L${x},${y}`); // path
    drawPath(currentPath.join(' '));
  }
});

svg.addEventListener('mouseup', () => {
  drawing = false;
  paths.push(currentPath.join(' ')); // save path
  currentPath = [];
});

function drawPath(d) {
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', d);
  path.setAttribute('class', 'annotation');
  svg.appendChild(path);
}

function undo() {
  if (paths.length > 0) {
    svg.removeChild(svg.lastChild); // remove last path
    paths.pop(); // remove last operation
  }
}

function clearSVG() {
  while (svg.firstChild) {
    svg.removeChild(svg.firstChild); // clear paths
  }
  paths = []; // clear operations
}
```
### Canvas Demo
```
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
let drawing = false;
let operations = []; // operation stack

canvas.addEventListener('mousedown', (e) => {
  drawing = true;
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
});

canvas.addEventListener('mousemove', (e) => {
  if (drawing) {
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
  }
});

canvas.addEventListener('mouseup', () => {
  drawing = false;
  operations.push(canvas.toDataURL());
});

function undo() {
  if (operations.length > 0) {
    const lastOperation = operations.pop();
    const img = new Image();
    img.src = lastOperation;
    img.onload = () => ctx.drawImage(img, 0, 0);
  }
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  operations = [];
}
```
### Conclusion
#### Assumption
Not necessary to precisely control each stroke or shape.
#### Decision
Base on assumptions above, **Canvas** would be a better choice because it seems to performs better when dealing with frequent repainting. But in order to provide flexibility to move to SVG-based solutoin and further compare the performance, the implementation of operations like drawing, undo and clear should have an **abstraction layer** that allows us to use either technology interchangeably without major code changes.
## Canvas Framework
- [ ] Potential increasement in development efficiency.

# Component Design
## Visual Struture
![Component](/src/assets/image.png "Component")
Container: limit max viewing area.
Canvas Container: resize if canvas was rotated.
Canvas: embed image, show paths.
Operation Panel: Undo, Clear, Rotate, Add Shape(Rect), Load Shapes
## Components
```
<ImageAnnotator imgUrl={imgUrl}>
  const rotationAngle;
  const annotatorRef;
  const MAX_WIDTH, MAX_HEIGHT;

  function handleOperation; // use annotatorRef to draw on canvas.

  <ImageContainer 
    rotationAngle={rotationAngle} 
    annotatorRef={annotatorRef} 
    imgUrl={imgUrl}
    maxWidth={MAX_WIDTH}
    maxHeight={MAX_HEIGHT}
  >
    const scaledW, scaledH;
    function scaleImage; // onMounted

    <ImageView imgUrl={imgUrl} width={scaledW} height={scaledH}/>
    <AnnotationLayer annotatorRef={annotatorRef} width={scaledW} height={scaledH}>
      function clearCanvas;
      function undo;
      function drawBox; 
      function loadBoxes;
    </AnnotationLayer>
  </ImageContainer>
  <ToolBar handleOperation={handleOperation} />  // Tools like Rotate, Undo, Clear etc.
</ImageAnnotator>
```
