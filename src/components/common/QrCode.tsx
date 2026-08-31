// A fake QR-code look-alike for mockup purposes — not a real scannable code.
const PATTERN = [
  "1111111001011111111",
  "1000001011010000001",
  "1011101010111101101",
  "1011101001011101101",
  "1011101011011101101",
  "1000001010010000001",
  "1111111010101111111",
  "0000000011000000000",
  "1101100100111011010",
  "0010011010001101101",
  "1101011100110010010",
  "0000000101101101101",
  "1111111001010001100",
  "1000001011011011010",
  "1011101010011101101",
  "1011101001101000110",
  "1011101011010110101",
  "1000001010101001010",
  "1111111011010010101",
];

export default function QrCode({ value, size = 120 }: { value: string; size?: number }) {
  const cells = PATTERN.length;
  const cellSize = size / cells;

  return (
    <div
      role="img"
      aria-label={`QR code สำหรับ ${value}`}
      className="rounded-lg bg-white p-2"
      style={{ width: size + 16, height: size + 16 }}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {PATTERN.flatMap((row, y) =>
          row.split("").map((cell, x) =>
            cell === "1" ? (
              <rect
                key={`${x}-${y}`}
                x={x * cellSize}
                y={y * cellSize}
                width={cellSize}
                height={cellSize}
                fill="#1A1A1A"
              />
            ) : null,
          ),
        )}
      </svg>
    </div>
  );
}
