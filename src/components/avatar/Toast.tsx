export default function Toast({ message }: { message: string }) {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-20 flex justify-center">
      <div className="rounded-full bg-espresso px-4 py-2 text-xs font-medium text-cream shadow-lg">
        {message}
      </div>
    </div>
  );
}
