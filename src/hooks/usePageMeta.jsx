import { useState, useEffect } from "react";

export const usePageMeta = (pageSlug) => {
    const [pageMeta, setPageMeta] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPageMeta = async () => {
            if (!pageSlug) {
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError(null);

                // console.log('🔄 Fetching page meta for slug:', pageSlug);

                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/page-meta/all`);
                const data = await response.json();

                // console.log("📥 Full API Response:", data);

                if (data.success && Array.isArray(data.data)) {
                    // console.log("📊 Total pages in response:", data.data.length);
                    // console.log(
                    //     "🔍 All available pageSlugs:",
                    //     data.data.map((p: PageMeta) => p.pageSlug),
                    // );

                    const foundMeta = data.data.find((meta) => {
                        // console.log(`🔎 Checking: "${meta.pageSlug}" vs "${pageSlug}"`);

                        // Exact match first
                        if (meta.pageSlug === pageSlug) {
                            // console.log("✅ Exact pageSlug match found!");
                            return true;
                        }

                        // Case insensitive match
                        if (meta.pageSlug?.toLowerCase() === pageSlug.toLowerCase()) {
                            // console.log("✅ Case-insensitive match found!");
                            return true;
                        }

                        // Page name match
                        if (meta.pageName?.toLowerCase() === pageSlug.toLowerCase()) {
                            // console.log("✅ Page name match found!");
                            return true;
                        }

                        return false;
                    });

                    // console.log("🎯 Final found meta:", foundMeta);
                    setPageMeta(foundMeta || null);
                } else {
                    console.error("❌ API response format error");
                    setError("Invalid API response format");
                }
            } catch (err) {
                console.error("💥 Fetch error:", err);
                setError(err instanceof Error ? err.message : "An error occurred");
            } finally {
                setLoading(false);
            }
        };

        fetchPageMeta();
    }, [pageSlug]);

    return { pageMeta, loading, error };
};
