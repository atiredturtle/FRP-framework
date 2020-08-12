import { Behavior, Time } from "./types";
import { timeB } from "./behavior";
import { Scene, draw } from "./drawing";

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

// draw sandbox
// take in Behavior<Scene>
// sets up a canvas and renders the Scene
// also sets up the pause buttons etc to control time
const CANVAS_WIDTH = 700;
const CANVAS_HEIGHT = 500;
const MAX_TIME = 1000;
export const drawSandbox = (animation: Behavior<Scene>) => {
  // ======CREATES DOM ELEMENTS======
  // set up canvas
  const canvas = document.createElement("canvas");

  // set up buttons
  const playButton = document.createElement("button");
  playButton.appendChild(document.createTextNode("Play"));

  const pauseButton = document.createElement("button");
  pauseButton.appendChild(document.createTextNode("Pause"));

  const restartButton = document.createElement("button");
  restartButton.appendChild(document.createTextNode("restart"));

  // set up time counter
  const timeCounter = document.createElement("div");

  // set up pause status
  const pauseStatus = document.createElement("div");

  // set up slider
  const slider = document.createElement("input");
  slider.type = "range";
  slider.max = `${MAX_TIME}`;
  // slider.style["width"] = `${CANVAS_WIDTH}px`;
  slider.style["flexGrow"] = "1";

  // ======ARRANGES DOM ELEMENTS======
  const sandboxDiv = document.createElement("div");
  sandboxDiv.setAttribute("id", "sandbox");
  const controlsDiv = document.createElement("div");

  // add controls to control div
  controlsDiv.append(playButton, pauseButton, restartButton, slider);
  controlsDiv.style["width"] = `${CANVAS_WIDTH}px`;
  controlsDiv.style["display"] = "flex";

  // add all elements to main div
  sandboxDiv.append(canvas, controlsDiv, timeCounter, pauseStatus);

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

  const { play, pause, restart, setTime, isPaused } = mainSandbox(
    getState,
    (state: State) => {
      const { time, scene } = state;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw Error("no ctx found");
      scene.forEach((r) => draw(ctx, r));
      // draw time
      timeCounter.innerText = `time: ${time}`;
      // modify time slider value
      slider.value = `${time}`;
      // draw pause status
      pauseStatus.innerText = isPaused() ? "paused" : "playing";
    }
  );

  // adds time control callbacks to buttons
  playButton.addEventListener("click", () => {
    console.log("play");
    play();
  });
  pauseButton.addEventListener("click", () => {
    console.log("pause");
    pause();
  });
  restartButton.addEventListener("click", () => {
    console.log("restart");
    restart();
  });

  // slider to change time value
  slider.addEventListener("input", () => {
    console.log("slider change", slider.value);
    const wasPaused = isPaused();
    pause();
    setTime(Number(slider.value));
    // resume playing if wasn't paused before
    if (!wasPaused) {
      play();
    }
  });
};

interface MainSandbox {
  play: () => void;
  pause: () => void;
  restart: () => void;
  setTime: (t: Time) => void;
  isPaused: () => boolean;
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

  // time control callbacks
  const play = () => {
    paused = false;
  };
  const pause = () => {
    paused = true;
  };
  const restart = () => {
    time = 0;
  };
  const setTime = (t: Time) => {
    time = t;
  };
  const isPaused = () => paused;

  return {
    play,
    pause,
    restart,
    setTime,
    isPaused,
  };
};
