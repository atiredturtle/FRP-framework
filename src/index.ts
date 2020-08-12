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
