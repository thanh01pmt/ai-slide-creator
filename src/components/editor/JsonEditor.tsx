import { Button } from "@/components/ui/Button";
import { FileCode } from 'lucide-react';


interface JsonEditorProps {
    value: string;
    onChange: (value: string) => void;
    error: string | null;
    onFormat: () => void;
}

export function JsonEditor({ value, onChange, error, onFormat }: JsonEditorProps) {
    return (
        <div className="flex flex-col h-full gap-4">
            <div className="flex items-center justify-between">
                <h3 className="font-heading font-bold text-primary flex items-center gap-2">
                    <FileCode className="h-5 w-5" /> Slide JSON
                </h3>
                <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={onFormat} className="text-[10px] h-7 px-3">
                        Format
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => onChange('[]')} className="text-[10px] h-7 px-3">
                        Clear
                    </Button>
                </div>
            </div>

            <div className="flex-1 relative min-h-0">
                <textarea
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    spellCheck={false}
                    className={`w-full h-full p-4 bg-white border-2 rounded-xl font-mono text-sm resize-none focus:outline-none focus:border-primary transition-colors
            ${error ? 'border-red-300' : 'border-primary/10'}`}
                    placeholder='[{"type":"HERO","data":{...}}, ...]'
                />
            </div>

            <div className={`text-[11px] font-medium p-2 rounded-lg 
        ${error ? 'bg-red-50 text-red-500' : 'bg-cta/5 text-cta'}`}>
                {error ? `✗ ${error}` : '✓ JSON is valid'}
            </div>
        </div>
    );
}
