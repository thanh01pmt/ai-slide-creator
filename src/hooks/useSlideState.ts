import { useState, useCallback, useMemo } from "react";

export interface SlideData {
	type: string;
	data: any;
}

export function useSlideState(initialSlides: SlideData[] = []) {
	const [slides, setSlides] = useState<SlideData[]>(initialSlides);
	const [rawJson, setRawJson] = useState(
		JSON.stringify(initialSlides, null, 2),
	);
	const [error, setError] = useState<string | null>(null);

	const updateJson = useCallback((json: string) => {
		setRawJson(json);
		try {
			const parsed = JSON.parse(json);
			if (Array.isArray(parsed)) {
				setSlides(parsed);
				setError(null);
			} else {
				setError("JSON must be an array of slides");
			}
		} catch (e: any) {
			setError(e.message);
		}
	}, []);

	const formatJson = useCallback(() => {
		try {
			const formatted = JSON.stringify(JSON.parse(rawJson), null, 2);
			setRawJson(formatted);
		} catch (e) {}
	}, [rawJson]);

	const slideCount = useMemo(() => slides.length, [slides]);

	return {
		slides,
		rawJson,
		error,
		slideCount,
		updateJson,
		formatJson,
		setSlides,
	};
}
