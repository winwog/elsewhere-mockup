export default function PointsBalance({ points }: { points: number }) {
  return (
    <div className="text-center">
      <p className="text-sm text-espresso/50">แต้มสะสมของคุณ</p>
      <p className="text-5xl font-bold tracking-tight text-espresso">
        {points.toLocaleString("th-TH")}
      </p>
      <p className="text-xs text-espresso/40">แต้ม</p>
    </div>
  );
}
