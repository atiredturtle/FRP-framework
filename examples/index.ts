import {
  Time,
  Rect,
  drawSandbox,
  constB,
  timeB,
  lift,
  main,
  Scene,
} from "../src";

const WIDTH = 700;
const HEIGHT = 500;

const getCharacterPos = lift((t) => ({ x: t, y: 0 }), timeB);

const canvasBackground: Rect = {
  x: 0,
  y: 0,
  color: "black",
  width: WIDTH,
  height: HEIGHT,
};
drawSandbox(
  (t: Time): Scene => {
    const { x, y } = getCharacterPos(t);
    return [canvasBackground, { x, y, color: "red", width: 50, height: 100 }];
  }
);

// type State = {
//   characterPos: { x: number; y: number };
// };
// const getState = (t: Time): State => {
//   return {
//     characterPos: getCharacterPos(t),
//   };
// };
// run program
// main(getState, (state: State) => {
//   // get canvas
//   const canvas = <HTMLCanvasElement>document.getElementById("myCanvas");
//   canvas.width = WIDTH;
//   canvas.height = HEIGHT;
//   const ctx = canvas.getContext("2d");
//   if (!ctx) throw Error("no ctx found");
//   const canvasBackground: Rect = {
//     x: 0,
//     y: 0,
//     color: "black",
//     width: WIDTH,
//     height: HEIGHT,
//   };
//
//   // draw background
//   draw(ctx, canvasBackground);
//
//   // actually draw based on state
//   const { characterPos } = state;
//   // draw character
//   draw(ctx, {
//     x: characterPos.x,
//     y: characterPos.y,
//     color: "red",
//     width: 50,
//     height: 100,
//   });
// });
