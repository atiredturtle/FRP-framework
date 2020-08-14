export type Time = number;
export type Behavior<A> = (t: Time) => A;

export type Occurrence<A> = { time: Time; value: A };
export type Stream<A> = Occurrence<A>[];
