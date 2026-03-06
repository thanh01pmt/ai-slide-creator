import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Sparkles, Wand2 } from 'lucide-react';
import { useAiConvert } from '@/hooks/useAiConvert';

interface AiConvertPaneProps {
    onSuccess: (slides: any[]) => void;
}

export function AiConvertPane({ onSuccess }: AiConvertPaneProps) {
    const [source, setSource] = useState('');
    const [style, setStyle] = useState('lesson');
    const [status, setStatus] = useState<{ type: 'idle' | 'thinking' | 'done' | 'err', msg: string }>({ type: 'idle', msg: '' });
    const { convert, loading, error: aiError } = useAiConvert();

    const runAI = async () => {
        if (!source.trim()) {
            setStatus({ type: 'err', msg: '⚠ Vui lòng nhập nội dung' });
            return;
        }

        setStatus({ type: 'thinking', msg: '✨ AI đang xử lý...' });
        const result = await convert(source, style);

        if (result) {
            onSuccess(result);
            setStatus({ type: 'done', msg: `✓ Tạo ${result.length} slides thành công` });
        } else if (aiError) {
            setStatus({ type: 'err', msg: `✗ ${aiError}` });
        }
    };

    return (
        <div className="flex flex-col h-full gap-4">
            <h3 className="font-heading font-bold text-primary flex items-center gap-2">
                <Sparkles className="h-5 w-5" /> AI Convert
            </h3>

            <div className="space-y-4 flex-1 flex flex-col min-h-0">
                <div className="flex gap-4">
                    <select
                        value={style}
                        onChange={(e) => setStyle(e.target.value)}
                        className="flex-1 bg-white border border-primary/10 rounded-lg px-3 py-2 text-sm font-medium focus:border-primary outline-none"
                    >
                        <option value="lesson">Bài giảng</option>
                        <option value="workshop">Workshop</option>
                        <option value="presentation">Thuyết trình</option>
                        <option value="review">Ôn tập</option>
                    </select>
                    <Button onClick={runAI} disabled={loading} className="px-6 h-10 flex gap-2">
                        <Wand2 className="h-4 w-4" />
                        {loading ? '⏳...' : 'Tạo Slide'}
                    </Button>
                </div>

                <textarea
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                    placeholder="Dán nội dung giáo án, bài viết hoặc kịch bản vào đây..."
                    className="flex-1 w-full p-4 bg-white border-2 border-primary/10 rounded-xl text-sm resize-none focus:border-primary outline-none transition-colors"
                />

                <div className={`p-3 rounded-xl text-sm font-bold shadow-sm transition-all
          ${status.type === 'err' ? 'bg-red-50 text-red-500' :
                        status.type === 'thinking' ? 'bg-amber-50 text-amber-600 animate-pulse' :
                            status.type === 'done' ? 'bg-cta/10 text-cta' : 'bg-primary/5 text-primary/40'}`}>
                    {status.msg || 'Sẵn sàng xử lý nội dung...'}
                </div>
            </div>
        </div>
    );
}
