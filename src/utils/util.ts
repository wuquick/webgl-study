import { IOrthographicParam } from "./type";

export function initGl(): {gl: WebGL2RenderingContext, canvas: HTMLCanvasElement} {
  const canvas = document.querySelector('#canvas') as HTMLCanvasElement;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const gl = canvas.getContext('webgl2') as WebGL2RenderingContext;
  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);
  return { gl, canvas };
}
function loadShader(gl: WebGL2RenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) {
    throw new Error('init shader failed');
  }
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  return shader;
}
export function initShaders(gl: WebGL2RenderingContext, vs: string, fs: string) {
  const program = gl.createProgram();
  if (!program) {
    throw new Error('init program failed');
  }
  const vsShader = loadShader(gl, gl.VERTEX_SHADER, vs);
  const fsShader = loadShader(gl, gl.FRAGMENT_SHADER, fs);
  gl.attachShader(program, vsShader);
  gl.attachShader(program, fsShader);
  gl.linkProgram(program);
  gl.useProgram(program);
  return program;
}
export function getPosInWebGL(event: MouseEvent, canvas: HTMLCanvasElement) {
  const { clientX, clientY } = event;
  const { left, top, width, height } = canvas.getBoundingClientRect();
  const [halfWidth, halfHeight] = [width / 2, height / 2];
  const x = (clientX - left - halfWidth) / halfWidth;
  const y = -(clientY - top - halfHeight) / halfHeight;
  return { x, y };
}
export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
      img.src = src;
      img.onload = () => {
        resolve(img);
      }
  });
}
function loadVideo(src: string): Promise<HTMLVideoElement> {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.src = src;
    video.muted = true;
    video.loop = true;
    video.play();
    video.addEventListener('playing', () => {
      resolve(video);
    })
  })
}
function bindGLTextureInner() {
  let textureIndex = 0;
  return async (gl: WebGL2RenderingContext, program: WebGLProgram, src: string, samplerLocation: string, type: 'video' | 'image' = 'image') => {
    const image = type === 'image' ? await loadImage(src) : await loadVideo(src);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
    gl.activeTexture(gl[`TEXTURE${textureIndex}`]);
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    const u_Sampler = gl.getUniformLocation(program, samplerLocation);
    gl.uniform1i(u_Sampler, textureIndex++);
    return image;
  }
}
const bindGLTextureOutter = bindGLTextureInner();
export async function bindGLTexture(gl: WebGL2RenderingContext, program: WebGLProgram, src: string, samplerLocation: string, type: 'video' | 'image' = 'image') {
  return bindGLTextureOutter(gl, program, src, samplerLocation, type);
}
export function makeOrthographic(params: IOrthographicParam) {
  const { top, bottom, left, right, near, far } = params;
  const w = 1.0 / (right - left);
  const h = 1.0 / (top - bottom);
  const p = 1.0 / (far - near);
  const x = (right + left) * w;
  const y = (top + bottom) * h;
  const z = (far + near) * p;

  return [
    2 * w, 0, 0, 0,
    0, 2 * h, 0, 0,
    0, 0, -2 * p, 0,
    -x, -y, -z, 1
  ]
}
export function getOrthographicMatrix(canvas: HTMLCanvasElement) {
  // 正交投影矩阵
  const halfH = 4;
  const ratio = canvas.width / canvas.height;
  const halfW = halfH * ratio;
  const projectMatrix = makeOrthographic({
    top: halfH,
    bottom: -halfH,
    left: -halfW,
    right: halfW,
    near: 0,
    far: 4
  });
  return projectMatrix;
}
