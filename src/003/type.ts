export interface IPointAttrs {
  size: number,
  position: [number, number, number],
  color: [number, number, number, number]
}

export interface IPointStar extends IPointAttrs {
  hiddenTime: number,
  visibleTime: number,
  oldColor: [number, number, number, number]
}