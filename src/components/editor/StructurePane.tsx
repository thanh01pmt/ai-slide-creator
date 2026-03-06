import { SquareSlash, Plus } from 'lucide-react';

interface StructurePaneProps {
    onInsert: (type: string, data: any) => void;
}

const STRUCT_TYPES = [
    { type: 'HERO', color: '#EB8FD8', desc: 'Slide mở đầu — tiêu đề lớn + code snippet' },
    { type: 'TITLE', color: '#EB8FD8', desc: 'Tiêu đề có label & subtitle' },
    { type: 'PERSON_INTRO', color: '#BA94E9', desc: 'Giới thiệu người — code block + ảnh phải' },
    { type: 'SECTION', color: '#BA94E9', desc: 'Phân mục với số thứ tự nổi bật' },
    { type: 'GRID_6', color: '#BA94E9', desc: 'Lưới 6 thẻ nội dung đánh số' },
    { type: 'CODE_QUESTION', color: '#0097A7', desc: 'Câu hỏi thảo luận dạng code' },
    { type: 'TWO_COL', color: '#0097A7', desc: 'Hai cột: văn bản trái, danh sách phải' },
    { type: 'STAT_CARDS', color: '#FFBC3E', desc: '3 thẻ số liệu nổi bật' },
    { type: 'IMAGE_TEXT', color: '#B9D4B4', desc: 'Văn bản trái + ảnh placeholder phải' },
    { type: 'QUOTE', color: '#B9D4B4', desc: 'Trích dẫn nổi bật' },
    { type: 'CONCEPT', color: '#FFBC3E', desc: 'Analogy + 2 định nghĩa/khái niệm' },
    { type: 'DEMO', color: '#1CC549', desc: 'Code demo từng dòng + output' },
    { type: 'ACTIVITY', color: '#0097A7', desc: 'Hoạt động thực hành — thời gian + bước' },
    { type: 'CHECKPOINT', color: '#0097A7', desc: 'Câu hỏi kiểm tra nhanh' },
    { type: 'SUMMARY', color: '#BA94E9', desc: 'Tóm tắt bài học — checklist 4 điểm' },
    { type: 'NEXT_LESSON', color: '#1CC549', desc: 'Teaser bài tiếp theo' },
    { type: 'TEAM_3', color: '#EB8FD8', desc: 'Giới thiệu 3 thành viên' },
    { type: 'THANK_YOU', color: '#1CC549', desc: 'Slide kết + thông tin liên hệ' },
    { type: 'PREVIEW', color: '#1CC549', desc: 'Câu hỏi dẫn dắt / teaser' },
];

const SAMPLES: Record<string, any> = {
    HERO: { title: "REACT REFACTOR", code: "const App = () => <Slide />" },
    TITLE: { label: "Session 1", title: "Introduction", subtitle: "Getting started with React" },
    GRID_6: { heading: "Agenda", items: ["Setup", "Components", "Props", "State", "Hooks", "Deploy"] },
};

export function StructurePane({ onInsert }: StructurePaneProps) {
    return (
        <div className="flex flex-col h-full gap-4">
            <h3 className="font-heading font-bold text-primary flex items-center gap-2">
                <SquareSlash className="h-5 w-5" /> Slide Library
            </h3>
            <div className="flex-1 overflow-y-auto space-y-2 pr-2">
                {STRUCT_TYPES.map((t) => (
                    <div
                        key={t.type}
                        onClick={() => onInsert(t.type, SAMPLES[t.type] || { title: `Sample ${t.type}` })}
                        className="group flex flex-col p-3 rounded-xl border border-primary/5 bg-white hover:border-primary/40 hover:shadow-md transition-all cursor-pointer"
                    >
                        <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-bold px-2.5 py-1 rounded" style={{ backgroundColor: `${t.color}20`, color: t.color }}>
                                {t.type}
                            </span>
                            <div className="opacity-0 group-hover:opacity-100 text-xs font-bold text-primary flex items-center gap-1">
                                <Plus className="h-4 w-4" /> INSERT
                            </div>
                        </div>
                        <div className="text-xs text-text/60 line-clamp-1">{t.desc}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
