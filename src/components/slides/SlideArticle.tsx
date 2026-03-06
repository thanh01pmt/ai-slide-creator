import { cn } from "@/lib/utils";

interface SlideArticleProps {
    type: string;
    index: number;
    children: React.ReactNode;
    accentColor?: string;
}

const TYPE_ACCENTS: Record<string, string> = {
    HERO: '#EB8FD8',
    TITLE: '#EB8FD8',
    SECTION: '#BA94E9',
    CONCEPT: '#FFBC3E',
    ACTIVITY: '#0097A7',
    SUMMARY: '#BA94E9',
    NEXT_LESSON: '#1CC549',
    // ... more mapping if needed
};

export function SlideArticle({ type, index, children, accentColor }: SlideArticleProps) {
    const accent = accentColor || TYPE_ACCENTS[type] || '#BA94E9';

    return (
        <article className="bg-white rounded-2xl border border-primary/10 overflow-hidden shadow-sm hover:shadow-md transition-shadow mb-6">
            <div className="h-1" style={{ backgroundColor: accent }} />
            <div className="p-4 flex items-center justify-between text-[10px] font-bold text-text/30 uppercase tracking-widest border-b border-primary/5">
                <div className="flex items-center gap-2">
                    <span className="bg-primary/5 px-2 py-0.5 rounded italic">Slide {index}</span>
                    <span className="bg-primary/10 text-primary px-2 py-0.5 rounded">{type}</span>
                </div>
            </div>
            <div className="p-6">
                {children}
            </div>
        </article>
    );
}
