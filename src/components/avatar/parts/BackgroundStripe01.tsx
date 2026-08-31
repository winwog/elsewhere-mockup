export default function BackgroundStripe01() {
  return (
    <svg viewBox="0 0 200 240" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet">
      <rect width="200" height="240" fill="#FFFFFF" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect key={i} x={i * 40 - 20} y="0" width="20" height="240" fill="#CCCCCC" />
      ))}
    </svg>
  );
}
