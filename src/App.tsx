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
import { Monitor, LayoutGrid } from 'lucide-react';

const EXAMPLE_SLIDES = [
    { "type": "HERO", "data": { "title": "HELLO iOS WORLD...", "code": "print(\"Công nghệ lập trình App\")" } },
    { "type": "PERSON_INTRO", "data": { "heading": "HELLO!", "heading_highlight": "I'm…", "body_code": "print(\"\"\"\nXin chào! Tôi tên Thành,\nhay Tony bụng bự!\n\"\"\")" } },
    { "type": "GRID_6", "data": { "heading": "BẢNG", "heading_highlight": "NỘI DUNG", "items": ["Chào mừng đến với khóa học.", "Giới thiệu và làm quen.", "Cần gì để học tốt!", "Các tài nguyên học tập sẽ sử dụng.", "Các công cụ học tập sẽ sử dụng.", "Thiết lập & khởi động."] } },
    { "type": "SECTION", "data": { "number": "01", "title": "CHÀO MỪNG", "title_2": "ĐẾN VỚI KHÓA HỌC", "description": "print(\"Rất nhiều điều thú vị về thế giới ứng dụng và lập trình đang chờ bạn…\")" } },
    { "type": "CODE_QUESTION", "data": { "heading": "BẠN CÓ THỂ", "heading_highlight": "CHIA SẺ", "body": "print(\"\"\"\nThế nào là một App (Ứng dụng di động) thành công\ndưới góc nhìn của bạn?\n\"\"\")" } },
    { "type": "STAT_CARDS", "data": { "heading": "HƯỚNG ĐẾN", "heading_highlight": "MỤC TIÊU", "stats": [{ "value": "100%", "label": "Thành thạo xây dựng ứng dụng trên iOS,macOS", "color": "pink" }, { "value": "100%", "label": "Đạt được chứng nhận App Development with Swift", "color": "purple" }, { "value": "100%", "label": "Có ứng dụng cá nhân và profiles cá nhân.", "color": "sage" }] } },
    { "type": "QUOTE", "data": { "quote": "KHÔNG AI THÀNH CÔNG MÀ KHÔNG CÓ KỶ LUẬT", "author": "Jim Rohn" } },
    { "type": "TWO_COL", "data": { "heading": "BẠN CÓ", "heading_highlight": "NGẠC NHIÊN?", "left_content": "Khóa học Công Nghệ Lập Trình App đem đến cho bạn kinh nghiệm làm việc với các công cụ và kỹ thuật cần thiết để xây dựng các ứng dụng iOS và MacOS từ mức cơ bản nhất.", "right_items": ["Các khái niệm khoa học máy tính.", "Ngôn ngữ lập trình Swift và các Toolkit.", "Nguyên lý thiết kế giao diện.", "Công nghệ cùng ứng dụng và ảnh hưởng trong cuộc sống."] } },
    { "type": "CONCEPT", "data": { "heading": "import random — Mượn công cụ từ Python", "analogy": { "label": "💡 Analogy", "body": "Module = Hộp công cụ bên ngoài. import random = Mở hộp và lấy vào dùng." }, "points": [{ "term": "random.choice(seq)", "desc": "Chọn ngẫu nhiên 1 phần tử từ chuỗi/list" }, { "term": "random.shuffle(lst)", "desc": "Xáo trộn list tại chỗ — trả về None!" }] } },
    { "type": "DEMO", "data": { "heading": "🖥️ Demo — random.choice() từng bước", "code": [{ "line": "import random", "comment": "← Bước 1: import module" }, { "line": "LETTERS = \"abcdefghijklmnopqrstuvwxyz\"", "comment": "← Chuỗi ký tự" }, { "line": "char = random.choice(LETTERS)", "comment": "← Chọn ngẫu nhiên" }, { "line": "print(\"Ký tự:\", char)", "comment": "← In kết quả" }], "output": "Ký tự: m     ← mỗi lần chạy có thể khác nhau" } },
    { "type": "ACTIVITY", "data": { "mode": "code", "heading": "🖥️ Code-Along — Bước 1: Skeleton", "duration": "15", "target": "Chương trình hỏi được độ dài và tạo chuỗi ký tự ngẫu nhiên", "steps": ["Tạo biến LETTERS_LOWER, LETTERS_UPPER, DIGITS", "Dùng input() để hỏi người dùng độ dài mật khẩu", "Dùng int() để chuyển đổi sang số nguyên", "Chạy thử và kiểm tra kết quả"] } },
    { "type": "CHECKPOINT", "data": { "questions": ["random.shuffle() trả về giá trị gì?", "\"abc\"[1] cho kết quả gì?", "Muốn chọn ngẫu nhiên 1 ký tự từ chuỗi, dùng hàm nào?"] } },
    { "type": "SUMMARY", "data": { "heading": "Hôm nay bạn đã làm được", "items": ["Phân tích bài toán trước khi code", "Dùng import random để mở rộng Python", "random.choice() và random.shuffle()", "Xây dựng skeleton Password Generator"], "next": "Buổi 8 & 9: Hoàn thiện logic + đảm bảo đủ loại ký tự + commit GitHub" } },
    { "type": "NEXT_LESSON", "data": { "label": "Buổi tới:", "heading": "Mật khẩu của bạn", "heading_highlight": "thực sự mạnh chưa?", "body": "Làm sao đảm bảo mật khẩu luôn có đủ chữ hoa, thường, số và ký tự đặc biệt?" } },
    { "type": "TEAM_3", "data": { "heading": "THẦY CÔ", "heading_highlight": "ĐỒNG HÀNH CÙNG BẠN", "members": [{ "name": "Erika V.", "bio": "Giảng viên chính, 5 năm kinh nghiệm lập trình iOS." }, { "name": "John S.", "bio": "Trợ giảng, chuyên gia SwiftUI và UIKit." }, { "name": "Marie M.", "bio": "Mentor dự án, ex-engineer tại Apple." }] } },
    { "type": "THANK_YOU", "data": { "question": "Do you have any questions?", "org": "Học viện Công nghệ sáng tạo trẻ Teky", "website": "https://teky.edu.vn" } }
];

function App() {
    const [activeTab, setActiveTab] = useState('json');
    const [mode, setMode] = useState<'slides' | 'review'>('slides');
    const { slides, rawJson, error, slideCount, updateJson, formatJson, setSlides } = useSlideState(EXAMPLE_SLIDES);

    const handleJsonChange = (val: string) => {
        if (val === 'EXAMPLE') {
            const json = JSON.stringify(EXAMPLE_SLIDES, null, 2);
            updateJson(json);
            return;
        }
        updateJson(val);
    };

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
            editorSlot={
                <>
                    {activeTab === 'json' && (
                        <JsonEditor
                            value={rawJson}
                            onChange={handleJsonChange}
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
                </>
            }
        >
            <div className="h-full flex flex-col min-h-0 py-8 px-12 max-w-[1600px] mx-auto">
                <div className="flex items-center justify-between mb-6 px-2">
                    <div className="flex items-center gap-3 text-[var(--s-pink)] font-heading font-bold uppercase tracking-widest text-xs">
                        {mode === 'slides' ? <Monitor className="h-4 w-4" /> : <LayoutGrid className="h-4 w-4" />}
                        <span>{mode === 'slides' ? 'Slide Library' : 'Review Flow'}</span>
                    </div>
                </div>

                <div className="flex-1 min-h-0">
                    {mode === 'slides' ? (
                        <SlidesGrid slides={slides} />
                    ) : (
                        <div className="max-w-4xl mx-auto">
                            <ReviewGrid slides={slides} />
                        </div>
                    )}
                </div>
            </div>
        </Workspace>
    );
}

export default App;
