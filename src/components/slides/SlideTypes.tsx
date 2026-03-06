import { cn } from "@/lib/utils";
import { Lightbulb, CheckCircle2, Clock, User, HelpCircle, Image as ImageIcon, Code2, Flag, ArrowRight, Users, MessageCircleQuestion } from 'lucide-react';

/**
 * Slide components following LearnWell Design System (Light Mode)
 */

export function HeroSlide({ data }: { data: any }) {
    return (
        <div className="space-y-6">
            <h1 className="text-4xl lg:text-5xl font-heading font-black text-primary leading-tight">
                {data.title}
            </h1>
            {data.code && (
                <div className="bg-text text-cta p-6 rounded-xl font-mono text-sm border-l-4 border-cta shadow-xl overflow-x-auto">
                    <pre>{data.code}</pre>
                </div>
            )}
        </div>
    );
}

export function SectionSlide({ data }: { data: any }) {
    return (
        <div className="flex gap-8 items-start">
            <div className="text-7xl font-heading font-black text-secondary/30 shrink-0">
                {data.number || '01'}
            </div>
            <div className="space-y-4">
                <h2 className="text-3xl font-heading font-bold text-primary">
                    {data.title}
                </h2>
                {data.title_2 && (
                    <h3 className="text-2xl font-heading font-semibold text-cta">
                        {data.title_2}
                    </h3>
                )}
                {data.description && (
                    <div className="bg-primary/5 p-4 rounded-lg font-mono text-xs text-primary/60 italic border-l-2 border-primary/20">
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
            <h2 className="text-2xl font-heading font-bold text-primary">{data.heading}</h2>

            {data.analogy && (
                <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-xl">
                    <div className="text-xs font-bold text-amber-600 mb-1 uppercase tracking-wider flex items-center gap-2">
                        <Lightbulb className="h-4 w-4" /> {data.analogy.label || 'Analogy'}
                    </div>
                    <p className="text-text text-sm leading-relaxed">{data.analogy.body}</p>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(data.points || []).map((pt: any, i: number) => (
                    <div key={i} className={cn(
                        "p-5 rounded-2xl border-l-4",
                        i === 0 ? "bg-cyan-50 border-cyan-400" : "bg-pink-50 border-pink-400"
                    )}>
                        <div className={cn(
                            "font-mono text-sm font-bold mb-2",
                            i === 0 ? "text-cyan-600" : "text-pink-600"
                        )}>
                            {pt.term}
                        </div>
                        <p className="text-text/70 text-sm leading-relaxed">{pt.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function ActivitySlide({ data }: { data: any }) {
    const modeColors: Record<string, string> = {
        code: 'bg-cyan-500',
        unplugged: 'bg-pink-500',
        discussion: 'bg-amber-500'
    };
    const color = modeColors[data.mode] || 'bg-cyan-500';

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-heading font-bold text-primary">{data.heading}</h2>
                {data.duration && (
                    <div className={cn("text-white text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-sm", color)}>
                        <Clock className="h-3 w-3" /> {data.duration} PHÚT
                    </div>
                )}
            </div>

            {data.target && (
                <div className="bg-cta/10 text-cta p-4 rounded-xl text-sm font-semibold flex items-center gap-2 border border-cta/20">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>{data.target}</span>
                </div>
            )}

            <div className="space-y-4">
                {(data.steps || []).map((step: string, i: number) => (
                    <div key={i} className="flex gap-4 items-start group">
                        <div className={cn("w-7 h-7 rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0 mt-1 shadow-sm transition-transform group-hover:scale-110", color)}>
                            {i + 1}
                        </div>
                        <p className="text-text leading-relaxed pt-1.5">{step}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function Grid6Slide({ data }: { data: any }) {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-heading font-bold text-primary">
                {data.heading} {data.heading_highlight && <span className="text-cta">{data.heading_highlight}</span>}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {(data.items || []).map((item: string, i: number) => (
                    <div key={i} className="bg-white border border-primary/10 p-4 rounded-xl shadow-sm hover:border-primary/30 transition-colors">
                        <div className="text-[10px] font-mono font-bold text-secondary mb-2 tracking-widest">{String(i + 1).padStart(2, '0')}</div>
                        <p className="text-sm text-text font-medium leading-normal">{item}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function TwoColSlide({ data }: { data: any }) {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-heading font-bold text-primary">
                {data.heading} {data.heading_highlight && <span className="text-cta">{data.heading_highlight}</span>}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="text-text/70 text-sm leading-relaxed">
                    {data.left_content}
                </div>
                <ul className="space-y-3">
                    {(data.right_items || []).map((item: string, i: number) => (
                        <li key={i} className="flex items-start gap-3 bg-primary/5 p-3 rounded-lg border-l-4 border-primary/40">
                            <span className="text-primary font-bold">→</span>
                            <span className="text-sm text-text font-medium">{item}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export function StatCardsSlide({ data }: { data: any }) {
    const colors: Record<string, string> = {
        pink: 'bg-pink-50 text-pink-600 border-pink-200',
        purple: 'bg-purple-50 text-purple-600 border-purple-200',
        sage: 'bg-emerald-50 text-emerald-600 border-emerald-200',
        coral: 'bg-orange-50 text-orange-600 border-orange-200',
        amber: 'bg-amber-50 text-amber-600 border-amber-200',
        green: 'bg-green-50 text-green-600 border-green-200',
        cyan: 'bg-cyan-50 text-cyan-600 border-cyan-200',
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-heading font-bold text-primary">
                {data.heading} {data.heading_highlight && <span className="text-cta">{data.heading_highlight}</span>}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {(data.stats || []).map((stat: any, i: number) => (
                    <div key={i} className={cn(
                        "p-6 rounded-2xl border-t-4 text-center shadow-sm",
                        colors[stat.color] || colors.pink
                    )}>
                        <div className="text-4xl font-heading font-black mb-2">{stat.value}</div>
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
            <div className="text-6xl text-primary/10 font-serif leading-none italic">“</div>
            <h2 className="text-3xl font-heading font-black text-primary italic leading-tight px-10">
                {data.quote}
            </h2>
            {data.author && (
                <div className="font-mono text-sm text-cta font-bold tracking-widest uppercase text-center">
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
                <div className="text-[10px] font-bold text-secondary uppercase tracking-[0.2em]">{data.label}</div>
            )}
            <h1 className="text-5xl font-heading font-black text-primary leading-none uppercase">
                {data.title}
            </h1>
            {data.subtitle && (
                <div className="text-lg font-heading font-semibold text-accent italic">
                    {data.subtitle}
                </div>
            )}
        </div>
    );
}

export function SummarySlide({ data }: { data: any }) {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-heading font-bold text-primary">{data.heading}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(data.items || []).map((item: string, i: number) => (
                    <div key={i} className="flex gap-3 items-center bg-cta/5 p-4 rounded-xl border border-cta/10">
                        <div className="w-6 h-6 rounded-full bg-cta text-white flex items-center justify-center text-[10px] font-bold">✓</div>
                        <span className="text-sm font-medium text-text">{item}</span>
                    </div>
                ))}
            </div>
            {data.next && (
                <div className="mt-6 border-t border-primary/10 pt-6">
                    <div className="text-[10px] font-bold text-text/40 mb-2 uppercase tracking-widest">Tiếp theo:</div>
                    <div className="bg-primary/5 p-4 rounded-xl text-primary font-bold">
                        {data.next}
                    </div>
                </div>
            )}
        </div>
    );
}

export function ThankYouSlide({ data }: { data: any }) {
    return (
        <div className="text-center py-12 space-y-8">
            <h1 className="text-7xl font-heading font-black text-primary leading-none">
                THANK <span className="text-cta">YOU!</span>
            </h1>
            {data.question && (
                <div className="text-xl font-heading font-bold text-accent italic">
                    {data.question}
                </div>
            )}
            <div className="pt-8 space-y-2">
                {data.org && <div className="font-mono text-xs font-bold text-text/40 uppercase tracking-widest">{data.org}</div>}
                {data.website && <div className="font-mono text-sm text-primary font-bold underline underline-offset-4">{data.website}</div>}
            </div>
        </div>
    );
}

export function PersonIntroSlide({ data }: { data: any }) {
    return (
        <div className="flex gap-8 items-center">
            <div className="flex-1 space-y-4">
                <h2 className="text-3xl font-heading font-black text-primary uppercase">
                    {data.heading} <span className="text-accent italic">{data.heading_highlight}</span>
                </h2>
                <div className="bg-text text-cta p-4 rounded-xl font-mono text-xs border-l-4 border-cta">
                    <pre>{data.body_code}</pre>
                </div>
            </div>
            <div className="w-32 h-32 rounded-full bg-primary/10 border-4 border-white shadow-lg flex items-center justify-center text-4xl grayscale overflow-hidden">
                <User className="h-20 w-20 text-primary/40" />
            </div>
        </div>
    );
}

export function CodeQuestionSlide({ data }: { data: any }) {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-heading font-bold text-primary">
                {data.heading} <span className="text-cta">{data.heading_highlight}</span>
            </h2>
            <div className="bg-slate-900 text-slate-300 p-6 rounded-2xl font-mono text-sm shadow-inner relative overflow-hidden">
                <HelpCircle className="absolute top-0 right-0 p-4 opacity-10 h-32 w-32 -mr-8 -mt-8 text-white" />
                <pre>{data.body}</pre>
            </div>
        </div>
    );
}

export function ImageTextSlide({ data }: { data: any }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
                <h2 className="text-2xl font-heading font-bold text-primary">{data.heading}</h2>
                <p className="text-text/70 leading-relaxed text-sm">{data.body}</p>
                {data.link && <div className="text-xs font-mono text-primary font-bold underline">{data.link}</div>}
            </div>
            <div className="aspect-video bg-primary/5 rounded-2xl border-2 border-dashed border-primary/20 flex items-center justify-center text-primary/20">
                <ImageIcon className="h-16 w-16" />
            </div>
        </div>
    );
}

export function DemoSlide({ data }: { data: any }) {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3">
                <Code2 className="h-6 w-6 text-cta" />
                <h2 className="text-2xl font-heading font-bold text-primary">{data.heading}</h2>
            </div>
            <div className="space-y-1 bg-text p-6 rounded-2xl shadow-xl border-l-[6px] border-cta">
                {(data.code || []).map((line: any, i: number) => (
                    <div key={i} className="flex gap-4 font-mono text-xs">
                        <span className="text-white/20 select-none w-4">{i + 1}</span>
                        <span className="text-white">{line.line}</span>
                        {line.comment && <span className="text-cta/60 italic">{line.comment}</span>}
                    </div>
                ))}
            </div>
            {data.output && (
                <div className="bg-black/80 text-cta p-3 px-4 rounded-lg font-mono text-[11px] flex gap-2 border border-cta/30">
                    <span className="opacity-40">▶</span> {data.output}
                </div>
            )}
        </div>
    );
}

export function CheckpointSlide({ data }: { data: any }) {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-heading font-black text-cta flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cta/10 flex items-center justify-center">
                    <Flag className="h-6 w-6" />
                </div>
                CHECKPOINT
            </h2>
            <div className="space-y-3">
                {(data.questions || []).map((q: string, i: number) => (
                    <div key={i} className="flex gap-4 items-center bg-white p-4 rounded-xl border-2 border-primary/5 shadow-sm group hover:border-cta/40 transition-colors">
                        <div className="w-6 h-6 rounded bg-primary/10 text-primary flex items-center justify-center font-mono text-[10px] font-bold group-hover:bg-cta group-hover:text-white transition-colors">{i + 1}</div>
                        <p className="text-sm font-semibold text-text">{q}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function NextLessonSlide({ data }: { data: any }) {
    return (
        <div className="space-y-6 border-2 border-primary/10 p-10 rounded-3xl bg-white shadow-xl relative overflow-hidden">
            <ArrowRight className="absolute -right-8 -bottom-8 h-32 w-32 opacity-5 text-primary rotate-45" />
            <div className="text-[10px] font-bold text-secondary uppercase tracking-[0.3em]">{data.label || 'Coming up next'}</div>
            <h2 className="text-4xl font-heading font-black text-primary leading-tight">
                {data.heading} <span className="text-accent">{data.heading_highlight}</span>
            </h2>
            {data.body && <p className="text-text/60 leading-relaxed italic">{data.body}</p>}
        </div>
    );
}

export function Team3Slide({ data }: { data: any }) {
    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-heading font-bold text-primary flex items-center gap-3">
                <Users className="h-6 w-6" /> {data.heading} <span className="text-accent">{data.heading_highlight}</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {(data.members || []).map((m: any, i: number) => (
                    <div key={i} className="bg-white border-2 border-primary/5 p-6 rounded-3xl text-center flex flex-col items-center gap-4 hover:shadow-lg transition-all group">
                        <div className="w-20 h-20 rounded-full bg-primary/5 border-2 border-primary/10 flex items-center justify-center text-3xl group-hover:bg-primary/10 transition-all">
                            <User className="h-10 w-10 text-primary/40 group-hover:text-primary transition-colors" />
                        </div>
                        <div>
                            <div className="font-bold text-text">{m.name}</div>
                            <p className="text-xs text-text/40 leading-relaxed mt-2">{m.bio}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function PreviewSlide({ data }: { data: any }) {
    return (
        <div className="space-y-10 text-center py-6">
            {data.teaser && (
                <div className="text-xs font-mono font-bold text-cta uppercase tracking-widest bg-cta/5 inline-block px-4 py-2 rounded-full">
                    {data.teaser}
                </div>
            )}
            <div className="flex flex-col items-center gap-4">
                <MessageCircleQuestion className="h-12 w-12 text-primary/20" />
                <h2 className="text-3xl font-heading font-black text-primary leading-tight">
                    {data.question}
                </h2>
            </div>
            {data.hint && (
                <div className="text-sm text-text/40 italic font-medium">
                    Gợi ý: {data.hint}
                </div>
            )}
        </div>
    );
}
