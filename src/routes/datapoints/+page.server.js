import db from '$lib/server/db.js';

import db from '$lib/server/db.js';

export async function load() {
    const metrics = await db.getAllMetrics();
    const datapoints = await db.getAllDatapoints();
    const tags = await db.getAllTags();
    const dates = await db.getAllDates(); 

    const formattedMetrics = metrics.map((m) => {
        const tagNames = (m.tagIds || [])
            .map(id => tags.find(t => t._id === id.toString()))
            .filter(Boolean)
            .map(t => t.name);

        return { ...m, tagNames };
    });

    return {
        metrics: formattedMetrics,
        datapoints,
        availableTags: tags,
        availableDates: dates
    };
}

export const actions = {
    delete: async ({ request }) => {
        const formData = await request.formData();
        const id = formData.get("id");
        await db.deleteDatapointById(id);
        return { success: true };
    }
};