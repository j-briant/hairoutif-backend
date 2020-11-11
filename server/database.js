// Database configuration

const postgres = require('pg')
const log = require('./logger')
const connectionString = process.env.DATABASE_URL

// Initialize postgres client
const client = new postgres.Client({ connectionString })

// Connect to the DB
client.connect().then(() => {
	log.info(`Connected to ${client.database} at ${client.host}: ${client.port}`)
}).catch(log.error)


module.exports = {
	/** Query the current time */
	queryTime: async () => {
	const result = await client.query('SELECT NOW() as now')
	return result.rows[0]
	},

	/** Query the geometry of each AOI */
	queryAOI: async (aid) => {
	const AOIQuery = `
		SELECT ST_AsGeoJSON(geom), name, id
		FROM aoi
		WHERE id = $1;`
	const result = await client.query(AOIQuery, [ aid ])
	return result.rows[0]
	},


	/** Query the centroid of each polygon */
	queryCentroid: async () => {
	const centroidQuery = `
		SELECT ST_AsGeoJSON(ST_Centroid(geom)), name, id
		FROM aoi;`
	const result = await client.query(centroidQuery)
	return result.rows
	},

	/** Query the water surface of an aoi, by id */
	queryTimeSeries: async (aid) => {
	const timeSeriesQuery = `
		SELECT to_date(dates, 'DD/MM/YYYY') AS d, surface, cloud
		FROM water_surfaces
		WHERE aoi_id = $1
		ORDER BY d;`
	const result = await client.query(timeSeriesQuery, [ aid ])
	return result.rows
	},


}
