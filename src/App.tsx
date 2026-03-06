import { useState } from 'react';
import { Workspace } from '@/components/layout/Workspace';
import { JsonEditor } from '@/components/editor/JsonEditor';
import { AiConvertPane } from '@/components/editor/AiConvertPane';
import { ThemePane } from '@/components/editor/ThemePane';
import { StructurePane } from '@/components/editor/StructurePane';
import { ReviewGrid } from '@/components/preview/ReviewGrid';
import { SlidesGrid } from '@/components/preview/SlidesGrid';
import { useSlideState } from '@/hooks/useSlideState';
import { exportToPptx } from '@/lib/pptx-export';
import { FileJson, Sparkles, Monitor, LayoutGrid } from 'lucide-react';

const EXAMPLE_SLIDES = [
    {
        "type": "HERO",
        "data": {
            "title": "CHÀO MỪNG ĐẾN VỚI\nSLIDE STUDIO V3",
            "code": "print(\"Hello LearnWell!\")"
        }
    },
    {
        "type": "SECTION",
        "data": {
            "number": "01",
            "title": "KHỞI ĐỘNG",
            "title_2": "KHÁM PHÁ THẾ GIỚI MỚI",
            "description": "Slide demo cho React refactor"
        }
    }
];

function App() {
    const [activeTab, setActiveTab] = useState('json');
    const [mode, setMode] = useState<'slides' | 'review'>('slides');
    const { slides, rawJson, error, slideCount, updateJson, formatJson, setSlides } = useSlideState(EXAMPLE_SLIDES);

    const handleExport = async () => {
        if (slides.length === 0) return;
        try {
            await exportToPptx(slides);
        } catch (err) {
            console.error('Export failed:', err);
        }
    };

    const insertSlide = (type: string, data: any) => {
        const newSlides = [...slides, { type, data }];
        setSlides(newSlides);
        updateJson(JSON.stringify(newSlides, null, 2));
    };

    return (
        <Workspace
            activeTab={activeTab}
            onTabChange={setActiveTab}
            slideCount={slideCount}
            mode={mode}
            onModeChange={setMode}
            onFormat={formatJson}
            onExportPptx={handleExport}
        >
            <div className="h-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="h-full flex flex-col min-h-0 bg-white rounded-2xl shadow-sm border border-primary/5 p-6">
                    {activeTab === 'json' && (
                        <JsonEditor
                            value={rawJson}
                            onChange={updateJson}
                            error={error}
                            onFormat={formatJson}
                        />
                    )}
                    {activeTab === 'ai' && (
                        <AiConvertPane onSuccess={setSlides} />
                    )}
                    {activeTab === 'theme' && (
                        <ThemePane />
                    )}
                    {activeTab === 'struct' && (
                        <StructurePane onInsert={insertSlide} />
                    )}
                </div>

                <div className="h-full flex flex-col min-h-0">
                    <div className="flex items-center justify-between mb-2 px-2">
                        <div className="flex items-center gap-2 text-primary font-heading font-bold">
                            {mode === 'slides' ? <Monitor className="h-4 w-4" /> : <LayoutGrid className="h-4 w-4" />}
                            <span>{mode === 'slides' ? 'Slide View' : 'Review View'}</span>
                        </div>
                        <div className="text-[10px] font-bold text-text/30 uppercase tracking-widest">{slideCount} slides</div>
                    </div>
                    <div className="flex-1 bg-background/50 rounded-2xl border-2 border-primary/5 shadow-inner overflow-y-auto px-6">
                        {mode === 'slides' ? (
                            <div className="py-8">
                                <SlidesGrid slides={slides} />
                            </div>
                        ) : (
                            <ReviewGrid slides={slides} />
                        )}
                    </div>
                </div>
            </div>
        </Workspace>
    );
}

export default App;
