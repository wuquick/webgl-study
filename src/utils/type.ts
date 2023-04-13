export interface IOrthographicParam {
  left: number,
  right: number,
  top: number,
  bottom: number,
  near: number,
  far: number
}

export type IMat4 = [number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number];
export type IColor = [number, number, number, number];
export interface IUniformMap {
  [prop: string]: IMat4 | IColor
}