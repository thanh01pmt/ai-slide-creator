import pptxgen from "pptxgenjs";

/**
 * PPTX Export Logic
 * Maps slide types to PptxGenJS commands
 */

export async function exportToPptx(slides: any[]) {
	const pres = new pptxgen();
	pres.layout = "LAYOUT_WIDE";

	slides.forEach((slide) => {
		const s = pres.addSlide();
		const { type, data } = slide;

		// Basic color tokens from LearnWell spec
		const COLORS = {
			primary: "4F46E5",
			cta: "22C55E",
			text: "312E81",
			accent: "EB8FD8",
			white: "FFFFFF",
		};

		switch (type) {
			case "HERO":
				s.addText(data.title || "", {
					x: 0.5,
					y: 1.5,
					w: 9,
					h: 2,
					fontSize: 48,
					fontFace: "Baloo 2",
					color: COLORS.primary,
					bold: true,
				});
				if (data.code) {
					s.addText(data.code, {
						x: 0.5,
						y: 3.5,
						w: 9,
						h: 1.5,
						fontSize: 14,
						fontFace: "Courier New",
						color: COLORS.cta,
						fill: { color: COLORS.text },
						valign: "middle",
					});
				}
				break;

			case "TITLE":
				if (data.label) {
					s.addText(data.label, {
						x: 0.5,
						y: 1.0,
						fontSize: 14,
						color: COLORS.text,
						bold: true,
					});
				}
				s.addText(data.title || "", {
					x: 0.5,
					y: 1.5,
					fontSize: 54,
					color: COLORS.primary,
					bold: true,
				});
				if (data.subtitle) {
					s.addText(data.subtitle, {
						x: 0.5,
						y: 3.0,
						fontSize: 24,
						color: COLORS.accent,
						italic: true,
					});
				}
				break;

			case "SECTION":
				s.addText(data.number || "01", {
					x: 0.5,
					y: 1.0,
					fontSize: 80,
					color: COLORS.text,
					opacity: 0.2,
					bold: true,
				});
				s.addText(data.title || "", {
					x: 1.5,
					y: 1.5,
					fontSize: 40,
					color: COLORS.primary,
					bold: true,
				});
				if (data.title_2) {
					s.addText(data.title_2, {
						x: 1.5,
						y: 2.2,
						fontSize: 28,
						color: COLORS.cta,
						bold: true,
					});
				}
				break;

			case "CONCEPT":
				s.addText(data.heading || "", {
					x: 0.5,
					y: 0.5,
					fontSize: 28,
					color: COLORS.primary,
					bold: true,
				});
				if (data.analogy) {
					s.addText(
						`${data.analogy.label || "💡 Analogy"}: ${data.analogy.body}`,
						{
							x: 0.5,
							y: 1.2,
							w: 9,
							h: 1,
							fontSize: 14,
							color: "000000",
							fill: { color: "FFFBEB" },
						},
					);
				}
				(data.points || []).forEach((p: any, i: number) => {
					s.addText(p.term, {
						x: 0.5 + i * 4.5,
						y: 2.5,
						fontSize: 18,
						color: COLORS.primary,
						bold: true,
					});
					s.addText(p.desc, {
						x: 0.5 + i * 4.5,
						y: 3.0,
						w: 4,
						fontSize: 12,
						color: COLORS.text,
					});
				});
				break;

			case "STAT_CARDS":
				s.addText(data.heading || "", {
					x: 0.5,
					y: 0.5,
					fontSize: 28,
					color: COLORS.primary,
					bold: true,
				});
				(data.stats || []).forEach((st: any, i: number) => {
					const xPos = 0.5 + i * 3.1;
					s.addShape(pres.ShapeType.rect, {
						x: xPos,
						y: 1.5,
						w: 2.8,
						h: 2.5,
						fill: { color: "F9FAFB" },
					});
					s.addText(st.value, {
						x: xPos,
						y: 2.0,
						w: 2.8,
						fontSize: 42,
						color: COLORS.primary,
						align: "center",
						bold: true,
					});
					s.addText(st.label, {
						x: xPos,
						y: 3.2,
						w: 2.8,
						fontSize: 12,
						color: COLORS.text,
						align: "center",
					});
				});
				break;

			default:
				s.addText(`Slide Type: ${type}`, {
					x: 0.5,
					y: 0.5,
					fontSize: 20,
				});
				s.addText("Coming soon in PPTX export...", {
					x: 0.5,
					y: 1.5,
					fontSize: 14,
				});
		}
	});

	const fileName = `Slide_Studio_Export_${new Date().getTime()}.pptx`;
	await pres.writeFile({ fileName });
}
