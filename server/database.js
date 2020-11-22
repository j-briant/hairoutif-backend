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
		SELECT ST_AsGeoJSON(geom), name, id
		FROM locations;`
	const result = await client.query(locationQuery)
	return result.rows
	},


	/** Query the centroid of each polygon */
	queryDescription: async (id) => {
	const adressQuery = `
		SELECT id, name, adresse, p_code, city, website, description
		FROM locations
		WHERE id = $1;`
	const result = await client.query(adressQuery, [id])
	return result.rows[0]
	},

}
