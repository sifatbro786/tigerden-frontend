const checkItems = [
    "Luctus risusd diam eget",
    "Donec enim congue magna",
    "Blandit sit amet non magna",
];

const CheckIcon = () => (
    <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
    >
        <circle cx="11" cy="11" r="11" fill="#22c55e" />
        <path
            d="M6.5 11.5L9.5 14.5L15.5 8"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

export default function TravelGuideline() {
    return (
        <section className="w-full bg-white py-16 px-16 font-sans overflow-hidden">
            <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-8">
                {/* ── Left: Text Content ─────────────────────────── */}
                <div className="flex-1 max-w-lg">
                    {/* Eyebrow */}
                    <p className="text-xs font-semibold tracking-[0.2em] text-gray-500 uppercase mb-4">
                        Take a Tour
                    </p>

                    {/* Heading */}
                    <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
                        Discover Our Travel Guideline
                    </h2>

                    {/* Body text */}
                    <p className="text-gray-500 text-base leading-relaxed mb-8">
                        An enim nullam tempor gravida donec enim congue magna at pretium purus
                        pretium ligula rutrum luctus risusd diam eget risus varius blandit sit amet
                        non magna.
                    </p>

                    {/* Checklist */}
                    <ul className="space-y-4 mb-10">
                        {checkItems.map((item) => (
                            <li key={item} className="flex items-center gap-3">
                                <CheckIcon />
                                <span className="text-gray-700 text-sm font-medium">{item}</span>
                            </li>
                        ))}
                    </ul>

                    {/* CTA Button */}
                    <button className="bg-green-500 hover:bg-green-600 active:scale-95 text-white font-semibold text-sm px-8 py-3.5 rounded-full transition-all duration-200 cursor-pointer border-0 shadow-md hover:shadow-lg">
                        Learn more
                    </button>
                </div>

                {/* ── Right: Illustration ────────────────────────── */}
                <div className="flex-1 flex items-center justify-center relative min-h-[380px] lg:min-h-[480px]">
                    {/* Glow blob behind */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-full bg-blue-50 blur-3xl opacity-60" />
                    </div>

                    {/* Window frame */}
                    <div className="relative z-10 w-64 h-80 lg:w-80 lg:h-[26rem] rounded-[50%] overflow-hidden border-[14px] border-gray-200 shadow-2xl">
                        <img
                            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=700&q=85"
                            alt="Beach view through airplane window"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Airplane — top right breakout */}
                    <div className="absolute -top-4 right-0 lg:-top-6 lg:-right-6 z-20 w-48 lg:w-64 drop-shadow-2xl">
                        <img
                            src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=500&q=80"
                            alt="Airplane"
                            className="w-full h-32 lg:h-40 object-cover rounded-xl opacity-0"
                        />
                        {/* SVG airplane illustration */}
                        <svg
                            viewBox="0 0 200 100"
                            xmlns="http://www.w3.org/2000/svg"
                            className="absolute inset-0 w-full h-full"
                        >
                            {/* Body */}
                            <ellipse cx="100" cy="52" rx="72" ry="18" fill="#e2e8f0" />
                            {/* Nose */}
                            <ellipse cx="168" cy="52" rx="16" ry="12" fill="#cbd5e1" />
                            {/* Tail fin */}
                            <path d="M30 52 Q20 20 50 30 L60 52Z" fill="#cbd5e1" />
                            {/* Main wing */}
                            <path d="M110 52 Q130 20 160 28 L150 52Z" fill="#94a3b8" />
                            {/* Small rear wing */}
                            <path d="M48 52 Q52 38 68 42 L65 52Z" fill="#94a3b8" />
                            {/* Engine 1 */}
                            <ellipse cx="135" cy="60" rx="12" ry="7" fill="#64748b" />
                            <ellipse cx="135" cy="60" rx="8" ry="4" fill="#475569" />
                            {/* Engine 2 */}
                            <ellipse cx="115" cy="62" rx="10" ry="6" fill="#64748b" />
                            <ellipse cx="115" cy="62" rx="6" ry="3" fill="#475569" />
                            {/* Windows */}
                            <circle cx="140" cy="48" r="3" fill="#bfdbfe" />
                            <circle cx="128" cy="47" r="3" fill="#bfdbfe" />
                            <circle cx="116" cy="47" r="3" fill="#bfdbfe" />
                            <circle cx="104" cy="47" r="3" fill="#bfdbfe" />
                        </svg>
                    </div>

                    {/* Cloud bottom-left */}
                    <div className="absolute bottom-4 -left-6 z-20 pointer-events-none">
                        <svg
                            width="140"
                            height="70"
                            viewBox="0 0 140 70"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <ellipse cx="70" cy="50" rx="60" ry="22" fill="white" />
                            <ellipse cx="50" cy="42" rx="36" ry="24" fill="white" />
                            <ellipse cx="90" cy="38" rx="32" ry="22" fill="white" />
                            <ellipse cx="70" cy="34" rx="28" ry="20" fill="white" />
                        </svg>
                    </div>

                    {/* Cloud bottom-right */}
                    <div className="absolute bottom-0 -right-4 z-20 pointer-events-none">
                        <svg
                            width="120"
                            height="60"
                            viewBox="0 0 120 60"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <ellipse cx="60" cy="44" rx="52" ry="18" fill="#f1f5f9" />
                            <ellipse cx="40" cy="36" rx="30" ry="20" fill="#f1f5f9" />
                            <ellipse cx="80" cy="32" rx="28" ry="18" fill="#f1f5f9" />
                        </svg>
                    </div>
                </div>
            </div>
        </section>
    );
}
