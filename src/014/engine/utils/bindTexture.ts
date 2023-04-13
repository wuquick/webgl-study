function loadImage(src: string): Promise<HTMLImageElement> {
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
  return async (gl: WebGL2RenderingContext, program: WebGLProgram, src: string, samplerLocation: WebGLUniformLocation, type: 'video' | 'image' = 'image') => {
    const image = type === 'image' ? await loadImage(src) : await loadVideo(src);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
    gl.activeTexture(gl[`TEXTURE${textureIndex}`]);
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.uniform1i(samplerLocation, textureIndex++);
    return image;
  }
}
const bindGLTextureOutter = bindGLTextureInner();
export async function bindGLTexture(gl: WebGL2RenderingContext, program: WebGLProgram, src: string, samplerLocation: WebGLUniformLocation, type: 'video' | 'image' = 'image') {
  return bindGLTextureOutter(gl, program, src, samplerLocation, type);
}