class GlobalEvent {
  private hasAutoResize: boolean;
  constructor() {
    this.hasAutoResize = false;
  }
  autoResize() {
    if (this.hasAutoResize) {
      return;
    }
    this.hasAutoResize = true;
    window.addEventListener('resize', () => {
      const canvas = document.querySelector('#canvas') as HTMLCanvasElement;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  }
}
const globalEvent = new GlobalEvent();

export function autoResize() {
  return globalEvent.autoResize();
}