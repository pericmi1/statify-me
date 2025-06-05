import db from '$lib/server/db.js';
import { redirect } from '@sveltejs/kit';


export async function load({ params }) {
    const id = parseInt(params.id);

    const metric = await db.getMetricById(id);

    if (metric.tagIds && Array.isArray(metric.tagIds)) {
        const tags = await db.getTagsByIds(metric.tagIds);
        metric.tagNames = tags.map(t => t.name);
    }

    const datapoints = (await db.getDatapointsByMetricId(id)).map(dp => ({
        ...dp,
        _id: dp._id.toString()
    }));

    return {
        metric,
        datapoints
    };
}

export const actions = {
    update: async ({ request, params }) => {
        const formData = await request.formData();
        const title = formData.get("title");
        const description = formData.get("description");
        const id = parseInt(params.id);

        if (!title) {
            return { success: false, message: "Titel darf nicht leer sein." };
        }

        await db.updateMetric(id, { title, description });
        return { success: true };
    },

    delete: async ({ params }) => {
        await db.deleteMetricById(parseInt(params.id));
        throw redirect(303, "/metrics");
    },

    add: async ({ request, params }) => {
        const formData = await request.formData();
        const date = formData.get('date');
        const value = parseFloat(formData.get('value'));
        if (!date || isNaN(value)) return { success: false };
        await db.addDatapoint({
            metricId: parseInt(params.id),
            date,
            value
        });
        return { success: true };
    },
    deleteDatapoint: async ({ request }) => {
        const formData = await request.formData();
        const datapointId = formData.get("datapointId");

        if (!datapointId) return { success: false };

        await db.deleteDatapointById(datapointId);
        return { success: true };
    }

};