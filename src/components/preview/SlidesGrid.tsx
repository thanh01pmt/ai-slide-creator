import { SlideCanvas } from '../slides/SlideCanvas';

interface SlideData {
    type: string;
    data: any;
}

interface SlidesGridProps {
    slides: SlideData[];
}

export function SlidesGrid({ slides }: SlidesGridProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">
            {slides.map((slide, i) => (
                <SlideCanvas
                    key={i}
                    type={slide.type}
                    data={slide.data}
                    index={i + 1}
                />
            ))}
        </div>
    );
}
