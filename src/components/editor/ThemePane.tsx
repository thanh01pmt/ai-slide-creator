import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Palette, Paintbrush } from 'lucide-react';

interface ThemePaneProps { }

const ACCENT_COLORS = [
    { id: 'pink', label: 'Pink', hex: '#EB8FD8' },
    { id: 'purple', label: 'Purple', hex: '#BA94E9' },
    { id: 'sage', label: 'Sage', hex: '#B9D4B4' },
    { id: 'coral', label: 'Coral', hex: '#F46659' },
    { id: 'amber', label: 'Amber', hex: '#FFBC3E' },
    { id: 'green', label: 'Green', hex: '#1CC549' },
    { id: 'cyan', label: 'Cyan', hex: '#0097A7' },
];

export function ThemePane() {
    const [colors, setColors] = useState(ACCENT_COLORS);

    const updateColor = (id: string, hex: string) => {
        setColors(prev => prev.map(c => c.id === id ? { ...c, hex } : c));
        document.documentElement.style.setProperty(`--color-${id}`, hex);
    };

    return (
        <div className="flex flex-col h-full gap-4">
            <h3 className="font-heading font-bold text-primary flex items-center gap-2">
                <Palette className="h-5 w-5" /> Theme Config
            </h3>

            <div className="bg-primary/5 p-4 rounded-xl border border-primary/10 mb-2">
                <p className="text-[11px] text-text/60 leading-relaxed italic">
                    LearnWell Light Mode: Khóa màu nền #EEF2FF và màu chữ Indigo. Bạn chỉ có thể tùy chỉnh các màu nhấn (Accent) bên dưới.
                </p>
            </div>

            <div className="space-y-3">
                {colors.map((c) => (
                    <div key={c.id} className="flex items-center gap-4 bg-white p-3 rounded-xl border border-primary/5 shadow-sm">
                        <div
                            className="w-10 h-10 rounded-lg shadow-inner shrink-0 border border-black/5"
                            style={{ backgroundColor: c.hex }}
                        />
                        <div className="flex-1">
                            <div className="text-[10px] font-bold text-text/40 uppercase tracking-widest">{c.label}</div>
                            <input
                                type="text"
                                value={c.hex}
                                onChange={(e) => updateColor(c.id, e.target.value)}
                                className="w-full text-xs font-mono font-bold text-primary focus:outline-none bg-transparent"
                            />
                        </div>
                        <div className="relative">
                            <input
                                type="color"
                                value={c.hex}
                                onChange={(e) => updateColor(c.id, e.target.value)}
                                className="w-8 h-8 rounded cursor-pointer opacity-0 absolute inset-0 z-10"
                            />
                            <div className="w-8 h-8 rounded border border-primary/10 flex items-center justify-center text-[10px] cursor-pointer hover:bg-black/5">
                                <Paintbrush className="h-3.5 w-3.5 text-primary/60" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <Button variant="ghost" className="w-full text-xs mt-4 opacity-40 hover:opacity-100">
                Reset to Defaults
            </Button>
        </div>
    );
}
