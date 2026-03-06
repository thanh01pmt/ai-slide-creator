import { Download, FileDown, Layers, LayoutGrid, Monitor, Play } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface ToolbarProps {
    slideCount: number;
    mode: 'slides' | 'review';
    onModeChange: (mode: 'slides' | 'review') => void;
    onFormat: () => void;
    onExportPptx: () => void;
}

export function Toolbar({ slideCount, mode, onModeChange, onFormat, onExportPptx }: ToolbarProps) {
    return (
        <header className="h-[60px] bg-white border-b border-primary/10 flex items-center justify-between px-6 z-50">
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-heading font-bold">S</div>
                    <span className="font-heading font-bold text-lg text-primary">Slide Studio</span>
                    <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold">JSON → PPTX</span>
                </div>
                <div className="w-[1px] h-6 bg-primary/10 mx-2" />
                <div className="flex items-center gap-2 text-text/60 text-sm font-medium">
                    <Layers className="h-4 w-4" />
                    <span>{slideCount} slides</span>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <div className="bg-background rounded-xl p-1 flex gap-1 mr-4">
                    <button
                        onClick={() => onModeChange('slides')}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all
              ${mode === 'slides' ? 'bg-white text-primary shadow-sm' : 'text-text/40 hover:text-text/60'}`}
                    >
                        <Monitor className="h-3.5 w-3.5" />
                        Slides
                    </button>
                    <button
                        onClick={() => onModeChange('review')}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all
              ${mode === 'review' ? 'bg-white text-primary shadow-sm' : 'text-text/40 hover:text-text/60'}`}
                    >
                        <LayoutGrid className="h-3.5 w-3.5" />
                        Review
                    </button>
                </div>

                <Button variant="ghost" size="sm" onClick={onFormat} className="text-primary hover:bg-primary/5">
                    Format
                </Button>
                <Button variant="secondary" size="sm" onClick={onExportPptx} className="flex gap-2">
                    <FileDown className="h-4 w-4" />
                    PPTX
                </Button>
                <Button variant="primary" size="sm" className="flex gap-2 bg-cta hover:bg-cta/90">
                    <Play className="h-4 w-4" />
                    Present
                </Button>
            </div>
        </header>
    );
}
