import { Sidebar } from './Sidebar'
import { Toolbar } from './Toolbar'
import { useState } from 'react'

interface WorkspaceProps {
    children: React.ReactNode;
    activeTab: string;
    onTabChange: (tab: string) => void;
    slideCount: number;
    mode: 'slides' | 'review';
    onModeChange: (mode: 'slides' | 'review') => void;
    onFormat: () => void;
    onExportPptx: () => void;
    editorSlot?: React.ReactNode;
}

export function Workspace({
    children,
    activeTab,
    onTabChange,
    slideCount,
    mode,
    onModeChange,
    onFormat,
    onExportPptx,
    editorSlot
}: WorkspaceProps) {
    return (
        <div className="h-screen flex flex-col overflow-hidden bg-background">
            <Toolbar
                slideCount={slideCount}
                mode={mode}
                onModeChange={onModeChange}
                onFormat={onFormat}
                onExportPptx={onExportPptx}
            />
            <div className="flex-1 flex overflow-hidden">
                <Sidebar
                    activeTab={activeTab}
                    onTabChange={onTabChange}
                    editorSlot={editorSlot}
                />
                <main className="flex-1 overflow-y-auto relative bg-[#0a1219]">
                    {children}
                </main>
            </div>
        </div>
    );
}
