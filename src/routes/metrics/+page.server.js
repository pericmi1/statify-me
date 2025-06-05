import db from '$lib/server/db.js'

export async function load() {
    const metrics = await db.getAllMetrics();

    for (const metric of metrics) {
        if (metric.tagIds && Array.isArray(metric.tagIds)) {
            const tags = await db.getTagsByIds(metric.tagIds);
            metric.tagNames = tags.map(t => t.name);
        }
    }

    return { metrics };
}