import { bindGLTexture, initGl, initShaders, loadImage } from "../utils/util";
import vs from './vs.glsl?raw';
import fs from './fs.glsl?raw';
import bird1URL from './bird-2.jfif';
import bird2URL from './bird-3.jfif';
import videoURL from './test.mp4';
import { IImageParam } from "./type";

export async function main() {
  const { gl } = initGl();
  const program = initShaders(gl, vs, fs);

  const rect = new Float32Array([
    -0.5, 0.5, 0, 0, 1,
    -0.5, -0.5, 0, 0, 0,
    0.5, 0.5, 0, 1, 1,
    0.5, -0.5, 0, 1, 0
  ]);

  const vBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, rect, gl.STATIC_DRAW);
  
  const a_Position = gl.getAttribLocation(program, 'a_Position');
  const a_Pin = gl.getAttribLocation(program, 'a_Pin');
  gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 20, 0);
  gl.vertexAttribPointer(a_Pin, 2, gl.FLOAT, false, 20, 12);
  gl.enableVertexAttribArray(a_Position);
  gl.enableVertexAttribArray(a_Pin);

  const params: IImageParam[] = [
    { img: videoURL, location: 'u_Sampler', type: 'video'},
    { img: bird2URL, location: 'u_Pattern'}
  ]
  const [ret] = await Promise.all(params.map(v => bindGLTexture(gl, program, v.img, v.location, v.type)));


  // gl.clear(gl.COLOR_BUFFER_BIT);
  // gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

  function anim() {
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, ret);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    requestAnimationFrame(anim);
  }
  anim();


}