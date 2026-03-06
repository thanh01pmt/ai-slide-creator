import { cn } from "@/lib/utils";
import { Lightbulb, CheckCircle2, Clock, User, HelpCircle, Image as ImageIcon, Code2, Flag, ArrowRight, Users } from 'lucide-react';

/**
 * Slide components following LearnWell Design System (Light Mode)
 */

export function HeroSlide({ data }: { data: any }) {
    return (
        <div className="space-y-6">
            <h1 className="text-4xl lg:text-5xl font-slide-heading font-black text-[var(--s-white)] leading-tight">
                {data.title}
            </h1>
            {data.code && (
                <div className="bg-[var(--s-dark)] text-[var(--s-green)] p-6 rounded-xl font-slide-mono text-sm border-l-4 border-[var(--s-green)] shadow-xl overflow-x-auto">
                    <pre>{data.code}</pre>
                </div>
            )}
        </div>
    );
}

export function SectionSlide({ data }: { data: any }) {
    return (
        <div className="flex gap-8 items-start">
            <div className="text-7xl font-slide-heading font-black text-[var(--s-purple)] opacity-40 shrink-0">
                {data.number || '01'}
            </div>
            <div className="space-y-4">
                <h2 className="text-3xl font-slide-heading font-bold text-[var(--s-white)]">
                    {data.title}
                </h2>
                {data.title_2 && (
                    <h3 className="text-2xl font-slide-heading font-semibold text-[var(--s-green)]">
                        {data.title_2}
                    </h3>
                )}
                {data.description && (
                    <div className="bg-[var(--s-pink)]/5 p-4 rounded-lg font-slide-mono text-xs text-[var(--s-pink)]/60 italic border-l-2 border-[var(--s-pink)]/20">
                        {data.description}
                    </div>
                )}
            </div>
        </div>
    );
}

export function ConceptSlide({ data }: { data: any }) {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-slide-heading font-bold text-[var(--s-white)]">{data.heading}</h2>

            {data.analogy && (
                <div className="bg-[var(--s-surface)] border-l-4 border-[var(--s-amber)] p-5 rounded-r-xl shadow-lg">
                    <div className="text-xs font-bold text-[var(--s-amber)] mb-1 uppercase tracking-wider flex items-center gap-2">
                        <Lightbulb className="h-4 w-4" /> {data.analogy.label || 'Analogy'}
                    </div>
                    <p className="text-[var(--s-white)]/80 text-sm leading-relaxed">{data.analogy.body}</p>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(data.points || []).map((pt: any, i: number) => (
                    <div key={i} className={cn(
                        "p-5 rounded-2xl border-l-4 shadow-md",
                        i === 0 ? "bg-[var(--s-surface2)] border-[var(--s-cyan)]" : "bg-[var(--s-surface2)] border-[var(--s-pink)]"
                    )}>
                        <div className={cn(
                            "font-slide-mono text-sm font-bold mb-2",
                            i === 0 ? "text-[var(--s-cyan)]" : "text-[var(--s-pink)]"
                        )}>
                            {pt.term}
                        </div>
                        <p className="text-[var(--s-white)]/70 text-sm leading-relaxed">{pt.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function ActivitySlide({ data }: { data: any }) {
    const modeColors: Record<string, string> = {
        code: 'bg-[var(--s-cyan)]',
        unplugged: 'bg-[var(--s-pink)]',
        discussion: 'bg-[var(--s-amber)]'
    };
    const color = modeColors[data.mode] || 'bg-[var(--s-cyan)]';

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-slide-heading font-bold text-[var(--s-white)]">{data.heading}</h2>
                {data.duration && (
                    <div className={cn("text-[var(--s-white)] text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-sm", color)}>
                        <Clock className="h-3 w-3" /> {data.duration} PHÚT
                    </div>
                )}
            </div>

            {data.target && (
                <div className="bg-[var(--s-green)]/10 text-[var(--s-green)] p-4 rounded-xl text-sm font-semibold flex items-center gap-2 border border-[var(--s-green)]/20">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>{data.target}</span>
                </div>
            )}

            <div className="space-y-4">
                {(data.steps || []).map((step: string, i: number) => (
                    <div key={i} className="flex gap-4 items-start group">
                        <div className={cn("w-7 h-7 rounded-full flex items-center justify-center text-[var(--s-bg)] font-bold text-xs shrink-0 mt-1 shadow-sm transition-transform group-hover:scale-110", color)}>
                            {i + 1}
                        </div>
                        <p className="text-[var(--s-white)]/90 leading-relaxed pt-1.5">{step}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function Grid6Slide({ data }: { data: any }) {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-slide-heading font-bold text-[var(--s-pink)]">
                {data.heading} {data.heading_highlight && <span className="text-[var(--s-green)]">{data.heading_highlight}</span>}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {(data.items || []).map((item: string, i: number) => (
                    <div key={i} className="bg-[var(--s-surface)] border border-white/5 p-4 rounded-xl shadow-lg hover:border-white/20 transition-colors">
                        <div className="text-[10px] font-slide-mono font-bold text-[var(--s-purple)] mb-2 tracking-widest">{String(i + 1).padStart(2, '0')}</div>
                        <p className="text-sm text-[var(--s-white)]/80 font-medium leading-normal">{item}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function TwoColSlide({ data }: { data: any }) {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-slide-heading font-bold text-[var(--s-white)]">
                {data.heading} {data.heading_highlight && <span className="text-[var(--s-green)]">{data.heading_highlight}</span>}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="text-[var(--s-white)]/70 text-sm leading-relaxed bg-[var(--s-surface)] p-6 rounded-2xl border border-white/5">
                    {data.left_content}
                </div>
                <ul className="space-y-3">
                    {(data.right_items || []).map((item: string, i: number) => (
                        <li key={i} className="flex items-start gap-3 bg-[var(--s-surface)] p-3 rounded-lg border-l-4 border-[var(--s-cyan)]">
                            <span className="text-[var(--s-cyan)] font-bold">→</span>
                            <span className="text-sm text-[var(--s-white)]/80 font-medium">{item}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export function StatCardsSlide({ data }: { data: any }) {
    const colors: Record<string, string> = {
        pink: 'bg-[var(--s-surface)] text-[var(--s-pink)] border-[var(--s-pink)]/30',
        purple: 'bg-[var(--s-surface)] text-[var(--s-purple)] border-[var(--s-purple)]/30',
        sage: 'bg-[var(--s-surface)] text-[var(--s-sage)] border-[var(--s-sage)]/30',
        coral: 'bg-[var(--s-surface)] text-[var(--s-coral)] border-[var(--s-coral)]/30',
        amber: 'bg-[var(--s-surface)] text-[var(--s-amber)] border-[var(--s-amber)]/30',
        green: 'bg-[var(--s-surface)] text-[var(--s-green)] border-[var(--s-green)]/30',
        cyan: 'bg-[var(--s-surface)] text-[var(--s-cyan)] border-[var(--s-cyan)]/30',
    };

    return (
        <div className="space-y-6 text-center">
            <h2 className="text-2xl font-slide-heading font-bold text-[var(--s-white)] mb-2">
                {data.heading} {data.heading_highlight && <span className="text-[var(--s-green)]">{data.heading_highlight}</span>}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {(data.stats || []).map((stat: any, i: number) => (
                    <div key={i} className={cn(
                        "p-6 rounded-2xl border-t-4 text-center shadow-sm",
                        colors[stat.color] || colors.pink
                    )}>
                        <div className="text-4xl font-slide-heading font-black mb-2">{stat.value}</div>
                        <div className="text-xs font-bold uppercase tracking-wider opacity-60 leading-tight">{stat.label}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function QuoteSlide({ data }: { data: any }) {
    return (
        <div className="py-8 text-center space-y-4">
            <div className="text-6xl text-[var(--s-white)]/5 font-serif leading-none italic">“</div>
            <h2 className="text-3xl font-slide-heading font-black text-[var(--s-white)] italic leading-tight px-10">
                {data.quote}
            </h2>
            {data.author && (
                <div className="font-slide-mono text-sm text-[var(--s-green)] font-bold tracking-widest uppercase text-center">
                    — {data.author}
                </div>
            )}
        </div>
    );
}

export function TitleSlide({ data }: { data: any }) {
    return (
        <div className="space-y-4 py-6">
            {data.label && (
                <div className="text-[10px] font-bold text-[var(--s-purple)] uppercase tracking-[0.2em]">{data.label}</div>
            )}
            <h1 className="text-5xl font-slide-heading font-black text-[var(--s-white)] leading-none uppercase">
                {data.title}
            </h1>
            {data.subtitle && (
                <div className="text-lg font-slide-heading font-semibold text-[var(--s-pink)] italic">
                    {data.subtitle}
                </div>
            )}
        </div>
    );
}

export function SummarySlide({ data }: { data: any }) {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-slide-heading font-bold text-[var(--s-white)]">{data.heading}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(data.items || []).map((item: string, i: number) => (
                    <div key={i} className="flex gap-3 items-center bg-[var(--s-surface)] p-4 rounded-xl border border-white/5">
                        <div className={cn("w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold", i === 0 ? "bg-[var(--s-pink)]" : i === 1 ? "bg-[var(--s-purple)]" : i === 2 ? "bg-[var(--s-cyan)]" : "bg-[var(--s-green)]")}>✓</div>
                        <span className="text-sm font-medium text-[var(--s-white)]/80">{item}</span>
                    </div>
                ))}
            </div>
            {data.next && (
                <div className="mt-6 border-t border-white/10 pt-6">
                    <div className="text-[10px] font-bold text-[var(--s-white)]/40 mb-2 uppercase tracking-widest">Tiếp theo:</div>
                    <div className="bg-[var(--s-surface)] p-4 rounded-xl text-[var(--s-white)] font-bold flex items-center gap-3">
                        <span className="text-[var(--s-purple)]">🎯</span> {data.next}
                    </div>
                </div>
            )}
        </div>
    );
}

export function ThankYouSlide({ data }: { data: any }) {
    return (
        <div className="text-center py-12 space-y-8">
            <h1 className="text-7xl font-slide-heading font-black text-[var(--s-white)] leading-none">
                THANK <span className="text-[var(--s-green)]">YOU!</span>
            </h1>
            {data.question && (
                <div className="text-xl font-slide-heading font-bold text-[var(--s-white)] italic">
                    {data.question}
                </div>
            )}
            <div className="pt-8 space-y-2">
                {data.org && <div className="font-slide-mono text-xs font-bold text-[var(--s-white)]/40 uppercase tracking-widest">{data.org}</div>}
                {data.website && <div className="font-slide-mono text-sm text-[var(--s-cyan)] font-bold underline underline-offset-4">{data.website}</div>}
            </div>
        </div>
    );
}

export function PersonIntroSlide({ data }: { data: any }) {
    return (
        <div className="flex gap-8 items-center">
            <div className="flex-1 space-y-4">
                <h2 className="text-3xl font-slide-heading font-black text-[var(--s-white)] uppercase">
                    {data.heading} <span className="text-[var(--s-pink)] italic">{data.heading_highlight}</span>
                </h2>
                <div className="bg-[var(--s-dark)] text-[var(--s-cyan)] p-6 rounded-xl font-slide-mono text-sm border-l-4 border-[var(--s-cyan)] shadow-xl overflow-x-auto">
                    <pre>{data.body_code}</pre>
                </div>
            </div>
            <div className="w-40 h-40 rounded-full bg-[var(--s-surface)] border-4 border-white/10 shadow-2xl flex items-center justify-center text-4xl grayscale overflow-hidden">
                <User className="h-24 w-24 text-[var(--s-white)]/20" />
            </div>
        </div>
    );
}

export function CodeQuestionSlide({ data }: { data: any }) {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-slide-heading font-bold text-[var(--s-white)]">
                {data.heading} <span className="text-[var(--s-purple)]">{data.heading_highlight}</span>
            </h2>
            <div className="bg-[var(--s-dark)] text-[var(--s-purple)] opacity-80 p-8 rounded-2xl font-slide-mono text-base shadow-inner relative overflow-hidden border border-white/5">
                <HelpCircle className="absolute top-0 right-0 p-4 opacity-5 h-48 w-48 -mr-12 -mt-12 text-[var(--s-white)]" />
                <pre className="relative z-10">{data.body}</pre>
            </div>
        </div>
    );
}

export function ImageTextSlide({ data }: { data: any }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4 text-left">
                <h2 className="text-2xl font-slide-heading font-bold text-[var(--s-white)]">{data.heading}</h2>
                <p className="text-[var(--s-white)]/70 leading-relaxed text-sm">{data.body}</p>
                {data.link && <div className="text-xs font-slide-mono text-[var(--s-cyan)] font-bold underline">{data.link}</div>}
            </div>
            <div className="aspect-video bg-[var(--s-surface)] rounded-2xl border-2 border-dashed border-white/10 flex items-center justify-center text-[var(--s-white)]/10 shadow-inner">
                <ImageIcon className="h-16 w-16" />
            </div>
        </div>
    );
}

export function DemoSlide({ data }: { data: any }) {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3">
                <Code2 className="h-6 w-6 text-[var(--s-green)]" />
                <h2 className="text-2xl font-slide-heading font-bold text-[var(--s-white)]">{data.heading}</h2>
            </div>
            <div className="space-y-1 bg-[var(--s-dark)] p-6 rounded-2xl shadow-xl border-l-[6px] border-[var(--s-green)] overflow-x-auto">
                {(data.code || []).map((line: any, i: number) => (
                    <div key={i} className="flex gap-4 font-slide-mono text-sm leading-relaxed">
                        <span className="text-[var(--s-white)]/10 select-none w-6 text-right">{i + 1}</span>
                        <span className="text-[var(--s-white)] whitespace-pre">{line.line}</span>
                        {line.comment && <span className="text-[var(--s-green)]/60 italic ml-4">{line.comment}</span>}
                    </div>
                ))}
            </div>
            {data.output && (
                <div className="bg-black/40 text-[var(--s-green)] p-4 rounded-xl font-slide-mono text-xs flex gap-3 border border-[var(--s-green)]/30 shadow-inner">
                    <span className="opacity-40">▶</span> {data.output}
                </div>
            )}
        </div>
    );
}

export function CheckpointSlide({ data }: { data: any }) {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-slide-heading font-black text-[var(--s-amber)] flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[var(--s-amber)]/10 flex items-center justify-center shadow-inner">
                    <Flag className="h-6 w-6" />
                </div>
                CHECKPOINT
            </h2>
            <div className="space-y-3">
                {(data.questions || []).map((q: string, i: number) => (
                    <div key={i} className="flex gap-5 items-center bg-[var(--s-surface)] p-5 rounded-2xl border border-white/5 shadow-lg group hover:border-[var(--s-amber)]/40 transition-all">
                        <div className="w-8 h-8 rounded-lg bg-white/5 text-[var(--s-white)] flex items-center justify-center font-slide-mono text-xs font-bold group-hover:bg-[var(--s-amber)] group-hover:text-[var(--s-bg)] transition-all">{i + 1}</div>
                        <p className="text-base font-medium text-[var(--s-white)]/90">{q}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function NextLessonSlide({ data }: { data: any }) {
    return (
        <div className="space-y-6 border border-white/10 p-12 rounded-[40px] bg-[var(--s-surface)] shadow-2xl relative overflow-hidden">
            <ArrowRight className="absolute -right-12 -bottom-12 h-48 w-48 opacity-5 text-[var(--s-white)] rotate-45" />
            <div className="text-[10px] font-bold text-[var(--s-cyan)] uppercase tracking-[0.4em] mb-2">{data.label || 'Coming up next'}</div>
            <h2 className="text-4xl font-slide-heading font-black text-[var(--s-white)] leading-tight">
                {data.heading} <span className="text-[var(--s-purple)]">{data.heading_highlight}</span>
            </h2>
            {data.body && <p className="text-[var(--s-white)]/50 leading-relaxed italic text-lg">{data.body}</p>}
        </div>
    );
}

export function Team3Slide({ data }: { data: any }) {
    return (
        <div className="space-y-10">
            <h2 className="text-2xl font-slide-heading font-bold text-[var(--s-white)] flex items-center gap-4">
                <Users className="h-8 w-8 text-[var(--s-pink)]" /> {data.heading} <span className="text-[var(--s-pink)]">{data.heading_highlight}</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {(data.members || []).map((m: any, i: number) => (
                    <div key={i} className="bg-[var(--s-surface)] border border-white/5 p-8 rounded-[32px] text-center flex flex-col items-center gap-5 hover:shadow-2xl transition-all group hover:scale-[1.02]">
                        <div className="w-24 h-24 rounded-full bg-white/5 border-2 border-white/10 flex items-center justify-center text-4xl group-hover:border-[var(--s-pink)]/40 transition-all">
                            <User className="h-12 w-12 text-[var(--s-white)]/20 group-hover:text-[var(--s-pink)] transition-colors" />
                        </div>
                        <div>
                            <div className="font-bold text-[var(--s-white)] text-lg">{m.name}</div>
                            <p className="text-sm text-[var(--s-white)]/50 leading-relaxed mt-2">{m.bio}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function PreviewSlide({ data }: { data: any }) {
    return (
        <div className="space-y-12 text-center py-8 relative">
            {data.teaser && (
                <div className="text-[11px] font-slide-mono font-bold text-[var(--s-cyan)] uppercase tracking-[0.3em] bg-[var(--s-cyan)]/10 inline-block px-6 py-2 rounded-full border border-[var(--s-cyan)]/20">
                    {data.teaser}
                </div>
            )}
            <div className="flex flex-col items-center gap-6 relative z-10">
                <HelpCircle className="h-16 w-16 text-[var(--s-white)]/10" />
                <h2 className="text-4xl font-heading font-black text-[var(--s-white)] leading-tight px-12 italic">
                    {data.question}
                </h2>
            </div>
            {data.hint && (
                <div className="text-base text-[var(--s-white)]/30 italic font-medium mt-8">
                    💡 Gợi ý: {data.hint}
                </div>
            )}
        </div>
    );
}
