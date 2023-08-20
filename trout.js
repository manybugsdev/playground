export function trout(canvas) {
  const ctx = canvas.getContext("2d");
  const M = 10;
  const W = canvas.width;
  const H = canvas.height;
  return {
    pen: new (class {
      grid() {
        ctx.strokeStyle = "lightgray";
        for (let i = 0; i <= W; i += M) {
          ctx.beginPath();
          ctx.moveTo(i, 0);
          ctx.lineTo(i, H);
          ctx.closePath();
          ctx.stroke();
        }
        for (let i = 0; i <= H; i += M) {
          ctx.beginPath();
          ctx.moveTo(0, i);
          ctx.lineTo(W, i);
          ctx.closePath();
          ctx.stroke();
        }
      }
    })(),
  };
}
