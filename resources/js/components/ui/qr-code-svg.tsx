type Props = { value: string; size?: number };

// Deterministic pseudo-QR for prototype purposes
export function QrCodeSvg({ value, size = 200 }: Props) {
  const n = 25;
  let h = 0;
  for (let i = 0; i < value.length; i++) h = (h * 31 + value.charCodeAt(i)) >>> 0;
  const cells: boolean[] = [];
  for (let i = 0; i < n * n; i++) {
    h = (h * 1664525 + 1013904223) >>> 0;
    cells.push((h & 1) === 1);
  }
  const isFinder = (r: number, c: number) => {
    const inBox = (br: number, bc: number) => r >= br && r < br + 7 && c >= bc && c < bc + 7;
    return inBox(0, 0) || inBox(0, n - 7) || inBox(n - 7, 0);
  };
  const finderCell = (r: number, c: number, br: number, bc: number) => {
    const rr = r - br, cc = c - bc;
    const onBorder = rr === 0 || rr === 6 || cc === 0 || cc === 6;
    const inner = rr >= 2 && rr <= 4 && cc >= 2 && cc <= 4;
    return onBorder || inner;
  };
  return (
    <svg viewBox={`0 0 ${n} ${n}`} width={size} height={size} className="rounded-md bg-white p-2">
      {Array.from({ length: n }).map((_, r) =>
        Array.from({ length: n }).map((__, c) => {
          let fill = false;
          if (isFinder(r, c)) {
            if (r < 7 && c < 7) fill = finderCell(r, c, 0, 0);
            else if (r < 7) fill = finderCell(r, c, 0, n - 7);
            else fill = finderCell(r, c, n - 7, 0);
          } else {
            fill = cells[r * n + c];
          }
          return fill ? <rect key={`${r}-${c}`} x={c} y={r} width="1" height="1" fill="oklch(0.18 0.04 250)" /> : null;
        })
      )}
    </svg>
  );
}
