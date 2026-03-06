import { Layout, FileJson, Sparkles, Palette, SquareSlash } from 'lucide-react';

interface SidebarProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
    const tabs = [
        { id: 'json', icon: FileJson, label: 'JSON' },
        { id: 'ai', icon: Sparkles, label: 'AI Convert' },
        { id: 'theme', icon: Palette, label: 'Theme' },
        { id: 'struct', icon: SquareSlash, label: 'Structure' },
    ];

    return (
        <div className="w-[420px] border-r border-primary/10 flex flex-col bg-white h-full overflow-hidden shrink-0">
            <div className="flex border-b border-primary/10">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => onTabChange(tab.id)}
                        className={`flex-1 flex flex-col items-center justify-center py-4 px-2 transition-all duration-200 border-b-2
              ${activeTab === tab.id
                                ? 'border-primary text-primary bg-primary/5'
                                : 'border-transparent text-text/40 hover:text-text/60 hover:bg-black/5'}`}
                    >
                        <tab.icon className="h-5 w-5 mb-1" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">{tab.label}</span>
                    </button>
                ))}
            </div>
            <div className="flex-1 overflow-y-auto p-4 bg-background/30">
                {/* Tab content will be rendered here via Parent */}
            </div>
        </div>
    );
}
