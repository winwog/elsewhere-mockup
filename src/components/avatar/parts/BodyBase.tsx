export default function BodyBase() {
  return (
    <svg viewBox="0 0 200 240" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet">
      {/* neck + torso */}
      <rect x="85" y="95" width="30" height="30" fill="#D9D9D9" />
      <rect x="60" y="115" width="80" height="90" rx="16" fill="#D9D9D9" />
      {/* head */}
      <circle cx="100" cy="65" r="42" fill="#D9D9D9" />
    </svg>
  );
}
