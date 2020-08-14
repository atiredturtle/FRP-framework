import { Behavior, Time } from "./types";

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

export const slowTime = (delta: number): Behavior<Time> => (t: Time) =>
  t / delta;
