# Image Annotation Tool

## Table of Contents

- [Image Annotation Tool](#image-annotation-tool)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Scope](#scope)
  - [Technology Evaluation](#technology-evaluation)
    - [SVG or Canvas](#svg-or-canvas)
- [Component Design](#component-design)
  - [Visual Struture](#visual-struture)
  - [Component Structure](#component-structure)
- [Unit Testing Plan](#unit-testing-plan)

## Installation
Node.js (v18.x or higher)
```bash
npm install
npm run dev
```
## Scope
The scope of this project includes:
1. Image viewing and rotating(+,-90deg);
2. Image Annotation
- Clear
- Undo
- Drawing and highlighting of the image with mouse
- Load Bounding Boxs from mock data.

## Technology Evaluation
1. Show Images: Decided to go with `<img>` to isolate annotation from the actual image.
   - `<img>`
   - `<div> + {background-image: url}`
   - load image in `<canvas>` or `<svg>`
2. Rotation : `{transform: rotate(45)}` 
3. Draw on Images(with mouse):
   - `<canvas>`
   - `<svg>`
4. Clear Drawing、Undo: use an array to store operations.
### SVG or Canvas
1. image types: Bitmap(JPEG、PNG、GIF), Vector Graphics(svg, pdf)
2. `svg`: XML structure, `svg.appendChild(path); svg.removeChild(svg.lastChild)`;
   - allows for individual control on each path.
3. `canvas`: `ctx.beginPath();ctx.moveTo();ctx.lineTo();ctx.stroke();ctx.clearRect`
   1. performs better when dealing with frequent repainting
4. Choice: `canvas`, no need for individual control. But should provide flexibility to use either technology for further performance comparison.
5. Framework based on `canvas` : no framework is used yet but could have potential increasement in development efficiency.

# Component Design
## Visual Struture
ImageContainer: limit viewing area to a square to make space for rotation.
![Component](/src/assets/image.png "Component")

## Component Structure
```
<ImageAnnotator imgUrl={imgUrl}>
  const rotationAngle;
  const annotatorRef;
  const MAX_WIDTH_HEIGHT;
  const scaledW, scaledH;

  function scaleImage; // onMounted
  function handleOperation; // use annotatorRef to draw on canvas.

  <ImageContainer 
    rotationAngle={rotationAngle} 
    annotatorRef={annotatorRef} 
    imgUrl={imgUrl}
    width={scaledW}
    height={scaledH}
  >
    <img src={imgUrl} width={width} height={height} alt="image-display" />
    <AnnotationLayer annotatorRef={annotatorRef} width={width} height={height}>
      const canvas;
      function clear;
      function undo;
      function drawBox; 
      function loadBoxes;
    </AnnotationLayer>
  </ImageContainer>
  <ToolBar handleOperation={handleOperation} />  // Tools like Rotate, Undo, Clear etc.
</ImageAnnotator>
```

# Unit Testing Plan
1. Rendering: Check the rendering of each component including image and canvas.
2. Component Communication: for example, between Toolbar and Annotator.
3. Exceptions: loading error or empty image data.
4. Functionality: image scaling, undo, rotate.
