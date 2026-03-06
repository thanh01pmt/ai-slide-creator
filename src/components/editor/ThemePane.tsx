import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Palette, Paintbrush, Undo2 } from 'lucide-react';

const THEME_DEFAULTS = {
    bg: '#16242F', surface: '#1F3240', surface2: '#243B4D', surface3: '#2A3F52',
    dark: '#0E1C28', white: '#E8EDF2', muted: '#6B8A9E',
    pink: '#EB8FD8', purple: '#BA94E9', sage: '#B9D4B4', coral: '#F46659',
    amber: '#FFBC3E', green: '#1CC549', cyan: '#0097A7',
};

const FONT_OPTIONS = [
    { label: 'Syne (Legacy Heading)', value: "Syne, sans-serif" },
    { label: 'DM Sans (Legacy Body)', value: "DM Sans, sans-serif" },
    { label: 'Inter (Modern)', value: "Inter, sans-serif" },
    { label: 'Lexend (Readable)', value: "Lexend, sans-serif" },
    { label: 'Outfit (Premium)', value: "Outfit, sans-serif" },
    { label: 'Montserrat (Geometric)', value: "Montserrat, sans-serif" },
    { label: 'Poppins (Geometric)', value: "Poppins, sans-serif" },
    { label: 'JetBrains Mono (Code)', value: "JetBrains Mono, monospace" },
];

const THEME_GROUPS = [
    { label: 'Background & Surface', keys: ['bg', 'surface', 'surface2', 'surface3', 'dark'] },
    { label: 'Accent Colors', keys: ['pink', 'purple', 'sage', 'coral', 'amber', 'green', 'cyan'] },
    { label: 'UI & Text', keys: ['white', 'muted'] },
];

const THEME_LABELS: Record<string, string> = {
    bg: 'Canvas BG', surface: 'Card L1', surface2: 'Card L2', surface3: 'Border', dark: 'Deep BG',
    pink: 'Pink', purple: 'Purple', sage: 'Sage', coral: 'Coral', amber: 'Amber', green: 'Green', cyan: 'Cyan',
    white: 'Main Text', muted: 'Muted Text',
};

export function ThemePane() {
    const [theme, setTheme] = useState(THEME_DEFAULTS);
    const [fonts, setFonts] = useState({
        heading: "Syne, sans-serif",
        body: "DM Sans, sans-serif"
    });

    const updateColor = (key: string, hex: string) => {
        if (!/^#[0-9a-fA-F]{6}$/.test(hex) && hex.length === 7) return;
        setTheme(prev => ({ ...prev, [key]: hex }));
        document.documentElement.style.setProperty(`--s-${key}`, hex);
    };

    const updateFont = (type: 'heading' | 'body', value: string) => {
        setFonts(prev => ({ ...prev, [type]: value }));
        document.documentElement.style.setProperty(`--s-font-${type}`, value);
    };

    const resetTheme = () => {
        setTheme(THEME_DEFAULTS);
        setFonts({ heading: "Syne, sans-serif", body: "DM Sans, sans-serif" });
        Object.entries(THEME_DEFAULTS).forEach(([key, val]) => {
            document.documentElement.style.setProperty(`--s-${key}`, val);
        });
        document.documentElement.style.setProperty('--s-font-heading', "Syne, sans-serif");
        document.documentElement.style.setProperty('--s-font-body', "DM Sans, sans-serif");
    };

    return (
        <div className="flex flex-col h-full gap-4 overflow-hidden">
            <h3 className="font-heading font-bold text-primary flex items-center gap-2 px-1">
                <Palette className="h-5 w-5" /> Slide Theme
            </h3>

            <div className="flex-1 overflow-y-auto pr-2 space-y-6">
                {/* Font Group */}
                <div className="space-y-3">
                    <div className="text-xs font-bold text-text/40 uppercase tracking-[2px] px-1">Typography</div>
                    <div className="grid grid-cols-1 gap-2">
                        {['heading', 'body'].map((type) => (
                            <div key={type} className="bg-white p-3 rounded-xl border border-primary/5 shadow-sm space-y-1.5">
                                <div className="text-[11px] font-bold text-text/40 uppercase leading-none">
                                    {type === 'heading' ? 'Heading Font' : 'Body Font'}
                                </div>
                                <select
                                    value={(fonts as any)[type]}
                                    onChange={(e) => updateFont(type as any, e.target.value)}
                                    className="w-full text-xs font-bold text-primary bg-transparent focus:outline-none cursor-pointer"
                                >
                                    {FONT_OPTIONS.map(opt => (
                                        <option key={opt.label} value={opt.value}>{opt.label}</option>
                                    ))}
                                </select>
                            </div>
                        ))}
                    </div>
                </div>

                {THEME_GROUPS.map((group) => (
                    <div key={group.label} className="space-y-3">
                        <div className="text-xs font-bold text-text/40 uppercase tracking-[2px] px-1">{group.label}</div>
                        <div className="space-y-2">
                            {group.keys.map((key) => {
                                const hex = (theme as any)[key];
                                return (
                                    <div key={key} className="flex items-center gap-3 bg-white p-2.5 rounded-xl border border-primary/5 shadow-sm">
                                        <div
                                            className="w-8 h-8 rounded-lg shadow-inner shrink-0 border border-black/5"
                                            style={{ backgroundColor: hex }}
                                        />
                                        <div className="flex-1">
                                            <div className="text-[11px] font-bold text-text/40 uppercase mb-0.5">{THEME_LABELS[key] || key}</div>
                                            <input
                                                type="text"
                                                value={hex}
                                                onChange={(e) => updateColor(key, e.target.value)}
                                                className="w-full text-xs font-mono font-bold text-primary focus:outline-none bg-transparent"
                                            />
                                        </div>
                                        <div className="relative">
                                            <input
                                                type="color"
                                                value={hex}
                                                onChange={(e) => updateColor(key, e.target.value)}
                                                className="w-8 h-8 rounded cursor-pointer opacity-0 absolute inset-0 z-10"
                                            />
                                            <div className="w-8 h-8 rounded border border-primary/10 flex items-center justify-center text-xs cursor-pointer hover:bg-black/5">
                                                <Paintbrush className="h-4 w-4 text-primary/60" />
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            <div className="pt-2">
                <Button
                    variant="ghost"
                    onClick={resetTheme}
                    className="w-full text-xs flex gap-2 opacity-50 hover:opacity-100"
                >
                    <Undo2 className="h-3.5 w-3.5" />
                    Reset to Defaults
                </Button>
            </div>
        </div>
    );
}
