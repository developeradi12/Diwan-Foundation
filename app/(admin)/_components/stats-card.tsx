// ─── Stat Card ───────────────────────────────────────────────────────────────

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}

export function StatCard({ icon, label, value }: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl px-5 py-4 shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
      <div className="p-3 rounded-xl bg-gray-100 text-primary">{icon}</div>
      <div>
        <p className="text-xs uppercase tracking-wide font-medium text-gray-400">
          {label}
        </p>
        <p className="text-2xl font-bold mt-0.5 text-primary">{value}</p>
      </div>
    </div>
  );
}