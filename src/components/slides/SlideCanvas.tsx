import { cn } from "@/lib/utils";

interface SlideCanvasProps {
    type: string;
    data: any;
    index: number;
}

/**
 * SlideCanvas: Renders the 960x540 scaled preview box for thumbnails.
 * We use the same Slide components but scaled down.
 */

import {
    HeroSlide, SectionSlide, ConceptSlide, ActivitySlide,
    Grid6Slide, TwoColSlide, StatCardsSlide, QuoteSlide,
    TitleSlide, SummarySlide, ThankYouSlide,
    PersonIntroSlide, CodeQuestionSlide, ImageTextSlide,
    DemoSlide, CheckpointSlide, NextLessonSlide,
    Team3Slide, PreviewSlide
} from './SlideTypes';

const COMPONENTS: Record<string, React.FC<{ data: any }>> = {
    HERO: HeroSlide,
    SECTION: SectionSlide,
    CONCEPT: ConceptSlide,
    ACTIVITY: ActivitySlide,
    GRID_6: Grid6Slide,
    TWO_COL: TwoColSlide,
    STAT_CARDS: StatCardsSlide,
    QUOTE: QuoteSlide,
    TITLE: TitleSlide,
    SUMMARY: SummarySlide,
    THANK_YOU: ThankYouSlide,
    PERSON_INTRO: PersonIntroSlide,
    CODE_QUESTION: CodeQuestionSlide,
    IMAGE_TEXT: ImageTextSlide,
    DEMO: DemoSlide,
    CHECKPOINT: CheckpointSlide,
    NEXT_LESSON: NextLessonSlide,
    TEAM_3: Team3Slide,
    PREVIEW: PreviewSlide,
};

import { useEffect, useRef, useState } from 'react';

export function SlideCanvas({ type, data, index }: SlideCanvasProps) {
    const SlideComp = COMPONENTS[type];
    const containerRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(0.3); // Default small scale

    useEffect(() => {
        const updateScale = () => {
            if (containerRef.current) {
                const width = containerRef.current.offsetWidth;
                setScale(width / 960);
            }
        };

        updateScale();
        window.addEventListener('resize', updateScale);

        // Also observe the element itself since parents might change size
        const observer = new ResizeObserver(updateScale);
        if (containerRef.current) observer.observe(containerRef.current);

        return () => {
            window.removeEventListener('resize', updateScale);
            observer.disconnect();
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="group relative w-full aspect-video bg-[var(--s-bg)] rounded-xl shadow-2xl border border-white/5 overflow-hidden hover:border-primary/40 transition-all cursor-pointer"
        >
            {/* 960x540 internal container, scaled to fit parent width */}
            <div
                className="absolute top-0 left-0 w-[960px] h-[540px] origin-top-left overflow-hidden bg-[var(--s-bg)] text-[var(--s-white)] font-slide-body"
                style={{ transform: `scale(${scale})` }}
            >
                {/* Glow Effects (Wow factor) */}
                <div className="absolute top-[-100px] right-[-100px] w-[600px] h-[600px] bg-[var(--s-primary)] opacity-10 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-[-100px] left-[-100px] w-[400px] h-[400px] bg-[var(--s-secondary)] opacity-10 rounded-full blur-[100px] pointer-events-none" />

                <div className="p-12 h-full flex flex-col justify-center relative z-10">
                    {SlideComp ? (
                        <SlideComp data={data} />
                    ) : (
                        <div className="flex items-center justify-center h-full text-white/5 font-slide-heading text-8xl font-black uppercase italic">
                            {type}
                        </div>
                    )}
                </div>
            </div>

            {/* Overlay info */}
            <div className="absolute bottom-2 right-3 text-[10px] font-mono font-bold text-text/20 group-hover:text-primary transition-colors">
                {String(index).padStart(2, '0')}
            </div>
        </div>
    );
}
