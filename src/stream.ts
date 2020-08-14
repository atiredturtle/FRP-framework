import { Behavior, Stream, Time, Occurrence } from "./types";

export function mapStream<A, B>(f: (a: A) => B, stream: Stream<A>): Stream<B> {
  return stream.map(({ time, value }) => ({ time, value: f(value) }));
}

export function filterStream<A>(
  predicate: (a: A) => boolean,
  stream: Stream<A>
): Stream<A> {
  return stream.filter(({ value }) => predicate(value));
}

export function findOccurence<V>(
  t: Time,
  stream: Stream<V>
): Occurrence<V> | undefined {
  return stream.reduce(
    (prev: Occurrence<V> | undefined, occ: Occurrence<V>) =>
      occ.time < t ? occ : prev,
    undefined
  );
}

export function stepper<V>(initialValue: V, stream: Stream<V>): Behavior<V> {
  return (t) => {
    const occ = findOccurence(t, stream);
    return occ !== undefined ? occ.value : initialValue;
  };
}
