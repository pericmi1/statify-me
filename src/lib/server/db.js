import { MongoClient } from "mongodb";
import { DB_URI } from "$env/static/private";

const client = new MongoClient(DB_URI);
await client.connect();
console.log("DB Verbindung: " + client);
const db = client.db("statify-me");

//Metrics
async function getAllMetrics() {
    let metrics = [];
    try {
        const metricsCol = db.collection("metrics");
        metrics = await metricsCol.find({}).toArray();
        metrics.forEach(metric => {
            metric._id = metric._id.toString();
        });
    } catch (error) {
        console.error("Fehler beim Abrufen der Metrics:", error);
    }
    console.log("Gefundene Metrics:", metrics.length);
    return metrics;
}

async function getMetricById(id) {
    let metric = null;
    try {
        const metricsCol = db.collection("metrics");
        metric = await metricsCol.findOne({ _id: parseInt(id) });
        if (metric) {
            metric._id = metric._id.toString();
        }
    } catch (error) {
        console.error("Fehler beim Abrufen der Metric: ", error);
    }
    return metric;
}

async function createMetric({ title, description, unit, tagIds }) {
    try {
        const metricsCol = db.collection("metrics");

        const last = await metricsCol.find().sort({ _id: -1 }).limit(1).toArray();
        const newId = last.length > 0 ? last[0]._id + 1 : 1;

        const newMetric = {
            _id: newId,
            title,
            description,
            unit,
            tagIds
        };

        await metricsCol.insertOne(newMetric);
        console.log("Neue Metric erstellt:", newMetric);
        return newMetric;
    } catch (error) {
        console.error("Fehler beim Erstellen der Metric:", error);
        throw error;
    }
}

async function updateMetric(id, update) {
    try {
        const metricsCol = db.collection("metrics");
        await metricsCol.updateOne({ _id: parseInt(id) }, { $set: update });
    } catch (error) {
        console.error("Error beim Update der Mertric: ", error);
    }
}

async function deleteMetricById(id) {
    try {
        const metricsCol = db.collection("metrics");
        const datapointsCol = db.collection("datapoints");

        await metricsCol.deleteOne({ _id: parseInt(id) });
        await datapointsCol.deleteMany({ metricId: id });

        console.log("Metric ${id} und zugehörige Datapoints wurden gelöscht.");
    } catch (error) {
        console.error("Metric konnte nicht gelöscht werden: ", error);
    }
}

//Tags
async function getAllTags() {
    try {
        const tagsCol = db.collection("tags");
        const tags = await tagsCol.find().toArray();
        return tags.map(tag => ({ ...tag, _id: tag._id.toString() }));
    } catch (error) {
        console.error("Fehler beim Abrufen der Tags: ", error)
    }
}

async function getTagsByIds(ids) {
    let tags = [];
    try {
        const tagsCol = db.collection("tags");
        tags = await tagsCol.find({ _id: { $in: ids } }).toArray();
        tags.forEach(tag => {
            tag._id = tag._id.toString();
        });
    } catch (error) {
        console.error("Fehler beim Abrufen der Tags:", error);
    }
    return tags;
}

//Datapoints
async function getAllDatapoints() {
    try {
        const col = db.collection("datapoints");
        const datapoints = await col.find().sort({ date: -1 }).toArray();
        return datapoints;
    } catch (error) {
        console.error("Fehler beim Abrufen der Datapoints: ", error);
    }
}

async function getDatapointsByMetricId(metricId) {
    let datapoints = [];
    try {
        const datapointsCol = db.collection("datapoints");
        datapoints = await datapointsCol
            .find({ metricId: parseInt(metricId) })
            .sort({ date: -1 })
            .toArray();
    } catch (error) {
        console.error("Fehler beim Abrufen der Datapoints:", error);
    }
    return datapoints;
}

async function getAllDates() {
    try {
        const col = db.collection("datapoints");
        const result = await col.aggregate([
            { $group: { _id: "$date" } },
            { $sort: { _id: -1 } }
        ]).toArray();
        return result.map(d => d._id);
    } catch (error) {
        console.error("Fehler beim Abrufen der Daten: ", error);
    }
}

async function addDatapoint({ metricId, date, value }) {
    try {
        const datapointsCol = db.collection("datapoints");

        const last = await datapointsCol.find({ _id: { $type: "int" } }).sort({ _id: -1 }).limit(1).toArray();
        const newId = last.length ? last[0]._id + 1 : 1;

        const newDatapoint = {
            _id: newId,
            metricId,
            date,
            value
        };

        await datapointsCol.insertOne(newDatapoint);
        console.log("Neuer Datapoint gespeichert:", newDatapoint);
        return newDatapoint;
    } catch (error) {
        console.error("Fehler beim erstellen eines Datapoints: ", error);
    }
}

async function deleteDatapointById(id) {
    try {
        const datapointsCol = db.collection("datapoints");
        await datapointsCol.deleteOne({ _id: parseInt(id) });
        console.log("Datapoint gelöscht:", id);
    } catch (error) {
        console.error("Fehler bei löschen des Datapoints: ", error);
    }
}


export default {
    getAllMetrics,
    getMetricById,
    createMetric,
    updateMetric,
    deleteMetricById,
    getAllTags,
    getTagsByIds,
    getAllDatapoints,
    getDatapointsByMetricId,
    getAllDates,
    addDatapoint,
    deleteDatapointById
};