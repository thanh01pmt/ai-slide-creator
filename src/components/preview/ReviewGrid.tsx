import { SlideArticle } from '../slides/SlideArticle';
import {
    HeroSlide, SectionSlide, ConceptSlide, ActivitySlide,
    Grid6Slide, TwoColSlide, StatCardsSlide, QuoteSlide,
    TitleSlide, SummarySlide, ThankYouSlide,
    PersonIntroSlide, CodeQuestionSlide, ImageTextSlide,
    DemoSlide, CheckpointSlide, NextLessonSlide,
    Team3Slide, PreviewSlide
} from '../slides/SlideTypes';

interface SlideData {
    type: string;
    data: any;
}

interface ReviewGridProps {
    slides: SlideData[];
}

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

export function ReviewGrid({ slides }: ReviewGridProps) {
    return (
        <div className="max-w-3xl mx-auto py-8">
            {slides.map((slide, i) => {
                const SlideComp = COMPONENTS[slide.type];
                return (
                    <SlideArticle key={i} type={slide.type} index={i + 1}>
                        {SlideComp ? (
                            <SlideComp data={slide.data} />
                        ) : (
                            <div className="text-text/40 italic p-10 border-2 border-dashed border-primary/10 rounded-2xl text-center">
                                Component "{slide.type}" đang được phát triển...
                            </div>
                        )}
                    </SlideArticle>
                );
            })}
        </div>
    );
}
