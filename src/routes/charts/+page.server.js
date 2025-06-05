import db from '$lib/server/db.js';

export async function load() {
  const metrics = await db.getAllMetrics();
  const datapoints = await db.getAllDatapoints();

  return {
    metrics,
    datapoints
  };
}