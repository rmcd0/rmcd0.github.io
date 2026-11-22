/* Joran · the "rain" theme background: falling glyphs on a canvas. Paused when the tab is hidden; static with reduced motion. */
let timer = null, onResize = null;

export default function rain({ UI, reduced }, on) {
  clearInterval(timer); timer = null;
  if (onResize) { removeEventListener("resize", onResize); onResize = null; }
  const c = document.getElementById("joran-rain");
  if (!c || !on) return;
  const x = c.getContext("2d"), fs = 16;
  const glyphs = "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789" + String(UI.title || "").toUpperCase();
  let W, H, cols, drops;
  onResize = () => { W = c.width = innerWidth; H = c.height = innerHeight; cols = Math.ceil(W / fs); drops = Array.from({ length: cols }, () => (Math.random() * -H) / fs); };
  onResize();
  addEventListener("resize", onResize);
  const frame = () => {
    if (document.hidden) return;
    x.fillStyle = "rgba(2,9,4,0.09)"; x.fillRect(0, 0, W, H); x.font = `${fs}px monospace`;
    for (let i = 0; i < cols; i++) {
      const y = drops[i] * fs;
      x.fillStyle = Math.random() > 0.97 ? "#d8ffe3" : "#2bd45c";
      x.fillText(glyphs[Math.floor(Math.random() * glyphs.length)], i * fs, y);
      if (y > H && Math.random() > 0.975) drops[i] = 0;
      drops[i] += 1;
    }
  };
  if (reduced) { for (let k = 0; k < 60; k++) frame(); return; }
  timer = setInterval(frame, 55);
}
