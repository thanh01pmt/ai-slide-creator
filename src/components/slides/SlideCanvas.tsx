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

export function SlideCanvas({ type, data, index }: SlideCanvasProps) {
    const SlideComp = COMPONENTS[type];

    return (
        <div className="group relative w-full aspect-video bg-white rounded-xl shadow-sm border border-primary/5 overflow-hidden hover:border-primary/40 transition-all cursor-pointer">
            {/* 960x540 internal container, scaled to fit parent width */}
            <div className="absolute top-0 left-0 w-[960px] h-[540px] origin-top-left overflow-hidden bg-white"
                style={{ transform: `scale(calc(100% / 960))` }}>
                <div className="p-10 h-full flex flex-col justify-center">
                    {SlideComp ? (
                        <SlideComp data={data} />
                    ) : (
                        <div className="flex items-center justify-center h-full text-text/20 font-heading text-4xl font-bold uppercase tracking-tighter italic">
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
