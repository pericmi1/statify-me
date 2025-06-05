import db from '$lib/server/db.js';
import { redirect } from '@sveltejs/kit'; 

/** Lade alle Tags beim Seitenaufbau */
export async function load() {
    const tags = await db.getAllTags();
    return {
        availableTags: tags
    };
}

/** Verarbeite das Absenden des Formulars */
export const actions = {
    default: async ({ request }) => {
        const formData = await request.formData();
        const title = formData.get('title');
        const description = formData.get('description');
        const unit = formData.get('unit');

        const tagIds = formData.getAll('tags').map(id => parseInt(id, 10));

        if (!title || !unit) {
            return { success: false, message: "Titel und Einheit sind Pflichtfelder." };
        }

        await db.createMetric({
            title,
            description,
            unit,
            tagIds
        });

        // ✅ Weiterleitung nach erfolgreichem Speichern
        throw redirect(303, '/metrics');
    }
};