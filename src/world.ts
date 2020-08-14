import { Stream, Time, Occurrence } from "./types";

export type World = {
  click: Stream<MouseEvent>;
};
export const createWorld = (node: HTMLElement) => {
  let time: Time = 0;

  const world: World = {
    click: [],
  };

  const concatStreams = (key: keyof World, stream: World[typeof key]) => {
    world[key] = [...world[key], ...stream];
    world[key].sort((a: Occurrence<any>, b: Occurrence<any>) => {
      return a.time - b.time;
    });
  };

  // register events
  node.addEventListener("click", (e) => {
    concatStreams("click", [
      {
        time,
        value: e,
      },
    ]);
    console.log("new world", world);
  });

  const setTime = (t: Time) => {
    time = t;
  };
  return {
    setWorldTime: setTime,
    world,
  };
};
