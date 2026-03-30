// Section wrapper component
export function FormSection({
    title,
    icon: Icon,
    children,
}: {
    title: string
    icon: React.ElementType
    children: React.ReactNode
}) {
    return (
        <div className="bg-white rounded-md shadow-sm border border-gray-100 overflow-hidden">
            {/* Section Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3 bg-gray-50" >
                <div
                    className="p-2 rounded-lg"
                    style={{ background: "color-mix(in oklch, var(--color-primary) 10%, white)" }}
                >
                    <Icon size={16} />
                </div>
                <p className="text-sm font-semibold" style={{ color: "var(--color-primary)" }}>
                    {title}
                </p>
            </div>
            <div className="p-6">{children}</div>
        </div>
    )
}