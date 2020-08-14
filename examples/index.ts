import {
  Time,
  World,
  stepper,
  mapStream,
  filterStream,
  Rect,
  drawSandbox,
  constB,
  timeB,
  lift,
  slowTime,
  main,
  Scene,
  Behavior,
} from "../src";

const WIDTH = 700;
const HEIGHT = 500;

const getSlowCharacterPos = lift(
  (t) => ({ x: t, y: 50 + Math.sin((1 / 2) * t) * 10 }),
  slowTime(3),
  timeB
);

const getCharacterPos = lift((t) => ({ x: t, y: 200 }), timeB);

const canvasBackground: Rect = {
  x: 0,
  y: 0,
  color: "black",
  width: WIDTH,
  height: HEIGHT,
};
// const moveCharacters: Behavior<Scene> = (t: Time) => {
//   const { x, y } = getCharacterPos(t);
//   const slow = getSlowCharacterPos(t);
//   const characterRect: Rect = { x, y, color: "red", width: 50, height: 100 };
//   const slowCharacterRect: Rect = {
//     x: slow.x,
//     y: slow.y,
//     color: "green",
//     width: 50,
//     height: 100,
//   };
//
//   return [canvasBackground, characterRect, slowCharacterRect];
// };

const makeRect = (x, y): Rect => {
  const dim = 50;
  return {
    x: x - dim / 2,
    y: y - dim / 2,
    color: "red",
    width: dim,
    height: dim,
  };
};
// drawSandbox(moveCharacters);
function animation4(world: World): Behavior<Scene> {
  return lift(
    (rect: Rect): Scene => [canvasBackground, rect],
    stepper(
      makeRect(10, 10),
      mapStream(({ x, y }) => makeRect(x, y), world.click)
    )
  );
}

drawSandbox(animation4);

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
