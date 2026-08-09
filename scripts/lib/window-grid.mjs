export function windowGrid(planes, pick, random, lightFromLeft) {
  const host = planes[planes.length - Math.round(pick(1, 2))] ?? planes[planes.length - 1];
  const windows = [];
  if (host) {
    const cols = Math.round(pick(4, 8));
    const rows = Math.round(pick(5, 10));
    const insetX = host.w * pick(0.1, 0.18);
    const insetY = host.h * pick(0.08, 0.16);
    const cellW = (host.w - insetX * 2) / cols;
    const cellH = (host.h - insetY * 2) / rows;

    for (let c = 0; c < cols; c += 1) {
      for (let r = 0; r < rows; r += 1) {
        if (random() < 0.12) continue;
        const across = cols > 1 ? c / (cols - 1) : 0;
        const t = lightFromLeft ? across : 1 - across;
        windows.push({
          x: host.x + insetX + c * cellW + cellW * 0.18,
          y: host.y + insetY + r * cellH + cellH * 0.16,
          w: cellW * 0.64,
          h: cellH * 0.62,
          tone: host.shade - 34 + t * 40 + pick(-8, 8),
        });
      }
    }
  }
  return windows;
}
