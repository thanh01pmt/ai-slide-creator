import { useState } from "react";

const STRUCT_TYPES = [
	{
		type: "HERO",
		desc: "Slide mở đầu — tiêu đề lớn + code snippet",
		fields: "title, code?",
	},
	{
		type: "TITLE",
		desc: "Tiêu đề có label & subtitle",
		fields: "label?, title, subtitle?",
	},
	{
		type: "PERSON_INTRO",
		desc: "Giới thiệu người — code block + ảnh phải",
		fields: "heading, heading_highlight, body_code",
	},
	{
		type: "SECTION",
		desc: "Phân mục với số thứ tự nổi bật",
		fields: "number, title, title_2?, description?",
	},
	{
		type: "GRID_6",
		desc: "Lưới 6 thẻ nội dung đánh số",
		fields: "heading, heading_highlight?, items[6]",
	},
	{
		type: "CODE_QUESTION",
		desc: "Câu hỏi thảo luận dạng code",
		fields: "heading, heading_highlight?, body",
	},
	{
		type: "TWO_COL",
		desc: "Hai cột: văn bản trái, danh sách phải",
		fields: "heading, left_content, right_items[]",
	},
	{
		type: "STAT_CARDS",
		desc: "3 thẻ số liệu nổi bật",
		fields: "heading, stats[]{value,label,color}",
	},
	{
		type: "IMAGE_TEXT",
		desc: "Văn bản trái + ảnh placeholder phải",
		fields: "heading, body, link?",
	},
	{ type: "QUOTE", desc: "Trích dẫn nổi bật", fields: "quote, author?" },
	{
		type: "CONCEPT",
		desc: "Analogy + 2 định nghĩa/khái niệm",
		fields: "heading, analogy{label,body}, points[]{term,desc}",
	},
	{
		type: "DEMO",
		desc: "Code demo từng dòng + output",
		fields: "heading, code[]{line,comment?}, output?",
	},
	{
		type: "ACTIVITY",
		desc: "Hoạt động thực hành — thời gian + bước",
		fields: "heading, mode, duration, target, steps[]",
	},
	{
		type: "CHECKPOINT",
		desc: "Câu hỏi kiểm tra nhanh",
		fields: "questions[]",
	},
	{
		type: "SUMMARY",
		desc: "Tóm tắt bài học — checklist 4 điểm",
		fields: "heading, items[4], next?",
	},
	{
		type: "NEXT_LESSON",
		desc: "Teaser bài tiếp theo",
		fields: "label?, heading, heading_highlight?, body?",
	},
	{
		type: "TEAM_3",
		desc: "Giới thiệu 3 thành viên",
		fields: "heading, members[]{name,bio}",
	},
	{
		type: "THANK_YOU",
		desc: "Slide kết + thông tin liên hệ",
		fields: "question?, org?, website?",
	},
	{
		type: "PREVIEW",
		desc: "Câu hỏi dẫn dắt / teaser",
		fields: "teaser?, question, hint?",
	},
];

function getSystemPrompt() {
	const typeList = STRUCT_TYPES.map(
		(t) => `- ${t.type}: ${t.desc} | {${t.fields}}`,
	).join("\n");
	return `Bạn là AI chuyên chuyển nội dung giáo án thành JSON slides cho Slide Studio.

OUTPUT: Chỉ xuất JSON array thuần túy. Không giải thích, không markdown fence.
Mỗi phần tử: {"type":"TYPE","data":{...}}

CÁC SLIDE TYPES:
${typeList}

QUY TẮC:
Bài giảng: HERO → SECTION/GRID_6 → CONCEPT/DEMO/ACTIVITY/CHECKPOINT → SUMMARY → NEXT_LESSON
Workshop: HERO → ACTIVITY blocks → CHECKPOINT → SUMMARY
Thuyết trình: HERO → GRID_6 → nội dung → QUOTE → THANK_YOU
Ôn tập: TITLE → CHECKPOINT → CONCEPT → SUMMARY → PREVIEW

KỸ THUẬT:
- DEMO.code = [{line, comment?}]
- ACTIVITY.mode: code|unplugged|discussion
- STAT_CARDS.stats[].color: pink|purple|sage|coral|amber|green|cyan
- Heading ngắn <8 từ, CAPS cho heading chính
- Tối đa 20 slides
- Giữ nguyên ngôn ngữ đầu vào`;
}

export function useAiConvert() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const convert = async (source: string, style: string) => {
		setLoading(true);
		setError(null);

		const labels: Record<string, string> = {
			lesson: "bài giảng",
			workshop: "workshop",
			presentation: "thuyết trình",
			review: "ôn tập",
		};

		const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;

		if (!apiKey) {
			setLoading(false);
			setError("Missing Anthropic API Key (VITE_ANTHROPIC_API_KEY).");
			return null;
		}

		try {
			const response = await fetch(
				"https://api.anthropic.com/v1/messages",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						"x-api-key": apiKey,
						"anthropic-version": "2023-06-01",
						"dangerously-allow-browser": "true",
					},
					body: JSON.stringify({
						model: "claude-3-5-sonnet-20241022",
						max_tokens: 8000,
						system: getSystemPrompt(),
						messages: [
							{
								role: "user",
								content: `Phong cách: ${labels[style] || style}\n\nNội dung:\n\n${source}`,
							},
						],
					}),
				},
			);

			if (!response.ok) {
				const errorData = await response.json().catch(() => ({}));
				throw new Error(
					errorData?.error?.message || `HTTP ${response.status}`,
				);
			}

			const data = await response.json();
			const raw = data.content
				.filter((b: any) => b.type === "text")
				.map((b: any) => b.text)
				.join("")
				.trim();
			const clean = raw
				.replace(/^```[a-z]*\n?/, "")
				.replace(/\n?```$/, "")
				.trim();
			const parsed = JSON.parse(clean);

			if (!Array.isArray(parsed)) {
				throw new Error("AI returned invalid format (not an array).");
			}

			return parsed;
		} catch (err: any) {
			console.error("AI Convert Error:", err);
			setError(err.message || "Lỗi xử lý AI");
			return null;
		} finally {
			setLoading(false);
		}
	};

	return { convert, loading, error };
}
