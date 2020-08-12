// TODO: should take in scene
export const draw = (ctx: CanvasRenderingContext2D, rect: Rect) => {
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

