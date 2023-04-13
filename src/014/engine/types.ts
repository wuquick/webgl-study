export interface IAttribute {
  locationName: string;
  size: number;
  type: number;
  normalized: boolean;
  stride: number;
  offset: number;
}

export interface IUniform {
  type: 'mat4' | 'array' | 'video' | 'image';
  locationName: string;
  value: number[] | string,
}