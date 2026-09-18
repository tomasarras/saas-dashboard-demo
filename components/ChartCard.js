export default function ChartCard({ title, legend, children, className = "" }) {
  return (
    <div className={`rounded-xl border border-white/10 bg-white/[0.03] p-4 ${className}`}>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-200">{title}</h2>
        {legend}
      </div>
      {children}
    </div>
  );
}
