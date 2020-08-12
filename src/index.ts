export type Time = number;
export type Behavior<A> = (t: Time) => A;

// identity function
export const timeB: Behavior<Time> = (t: Time) => t;

// constant function
export const constB = <A>(a: A): Behavior<A> => (_: Time) => a;

// lift function (to compose behaviors)
export function lift<A, B>(f: (a: A) => B, a: Behavior<A>): Behavior<B>;
export function lift<A, B, C>(
  f: (a: A, b: B) => C,
  a: Behavior<A>,
  b: Behavior<B>
): Behavior<C>;
export function lift<A, B, C, D>(
  f: (a: A, b: B, c: C) => D,
  a: Behavior<A>,
  b: Behavior<B>,
  c: Behavior<C>
): Behavior<D>;
export function lift<A>(
  f: (...args: any[]) => A,
  ...behaviors: Behavior<any>[]
): Behavior<A> {
  return (t) => f(...behaviors.map((b) => b(t)));
}

// main function to run behaviors and provide time
// main :: Behavior<A> -> (A -> void) -> Effect
export const main = <A>(b: Behavior<A>, cb: (a: A) => void): void => {
  let time = 0;
  // runs interval to provide time
  setInterval(() => {
    // console.log(`time: ${time}`);
    const value = b(time);
    cb(value);

    // increment time
    time++;
  }, 10);
};

// TODO: should take in scene
const draw = (ctx: CanvasRenderingContext2D, rect: Rect) => {
  const oldFillStyle = ctx.fillStyle;
  const { x, y, color, width, height } = rect;
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);

  // restore old fillStyle
  ctx.fillStyle = oldFillStyle;
};

export type Rect = {
  x: number;
  y: number;
  color: string;
  width: number;
  height: number;
};
export type Shapes = Rect;
export type Scene = Shapes[];

// draw sandbox
// take in Behavior<Scene>
// sets up a canvas and renders the Scene
// also sets up the pause buttons etc to control time

const CANVAS_WIDTH = 700;
const CANVAS_HEIGHT = 500;
export const drawSandbox = (animation: Behavior<Scene>) => {
  // ======CREATES DOM ELEMENTS======
  const sandboxDiv = document.createElement("div");
  sandboxDiv.setAttribute("id", "sandbox");

  // set up canvas
  const canvas = document.createElement("canvas");
  // set up buttons
  const playButton = document.createElement("button");
  playButton.appendChild(document.createTextNode("Play"));

  const pauseButton = document.createElement("button");
  pauseButton.appendChild(document.createTextNode("Pause"));

  // set up time counter
  const timeCounter = document.createElement("div");

  // set up slider
  sandboxDiv.append(canvas, playButton, pauseButton, timeCounter);

  // add the newly created element and its content into the DOM
  document.body.appendChild(sandboxDiv);

  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;

  // draw scene
  type State = {
    time: Time;
    scene: Scene;
  };
  const getState = (t: Time): State => ({
    time: timeB(t),
    scene: animation(t),
  });
  const { play, pause } = mainSandbox(getState, (state: State) => {
    const { time, scene } = state;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw Error("no ctx found");
    scene.forEach((r) => draw(ctx, r));
    console.log("time", time);
    // draw time
    timeCounter.innerText = `time: ${time}`;
  });

  // adds play + pause callbacks to buttons
  playButton.addEventListener("click", () => {
    console.log("play");
    play();
  });
  pauseButton.addEventListener("click", () => {
    console.log("pause");
    pause();
  });
};

interface MainSandbox {
  play: () => void;
  pause: () => void;
}
export const mainSandbox = <A>(
  b: Behavior<A>,
  cb: (a: A) => void
): MainSandbox => {
  let time = 0;
  let paused = true;
  // runs interval to provide time
  setInterval(() => {
    // console.log(`time: ${time}`);
    const value = b(time);
    cb(value);

    // increment time
    if (!paused) {
      time++;
    }
  }, 10);

  // controls time
  const play = () => {
    paused = false;
  };
  const pause = () => {
    paused = true;
  };

  return {
    play,
    pause,
  };
};
