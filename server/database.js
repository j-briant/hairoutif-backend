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
	queryLocations: async () => {
	const locationQuery = `
		SELECT ST_AsGeoJSON(way), name, osm_id
		FROM planet_osm_point;`
	const result = await client.query(locationQuery)
	return result.rows
	},


	/** Query the centroid of each polygon */
	queryDescription: async (id) => {
	const adressQuery = `
		SELECT osm_id, name, "addr:street", "addr:postcode", "addr:city"
		FROM planet_osm_point
		WHERE osm_id = $1;`
	const result = await client.query(adressQuery, [id])
	return result.rows[0]
	},

}
