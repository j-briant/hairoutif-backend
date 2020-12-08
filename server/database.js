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

	/** Query the geometry of each region */
	queryRegions: async () => {
	const regionsQuery = `
		SELECT ST_AsGeoJSON(ST_SimplifyPreserveTopology(geom, 0.03)), nom, id, loc
		FROM regions;`
	const result = await client.query(regionsQuery)
	return result.rows
	},

	/** Query the geometry of each AOI */
	queryLocations: async () => {
	const locationQuery = `
		SELECT ST_AsGeoJSON(way), name, fid
		FROM locations;`
	const result = await client.query(locationQuery)
	return result.rows
	},

	/** Query the centroid of each polygon */
	queryDescription: async (id) => {
	const adressQuery = `
		SELECT fid, name, "addr:street", "addr:postcode", "addr:city"
		FROM locations
		WHERE fid = $1;`
	const result = await client.query(adressQuery, [id])
	return result.rows[0]
	},

	/** Query most common names */
	queryTopNames: async (id) => {
		const topQuery = `
			WITH reg (geom) AS ( 	
				SELECT geom 	
				FROM regions 	
				WHERE id = $1
				) 
			SELECT DISTINCT locations.name, COUNT(*) AS n 
			FROM locations, reg 
			WHERE ST_Within(locations.way, reg.geom) = True
			GROUP BY locations.name
			ORDER BY n DESC
			LIMIT 10;`
		const result = await client.query(topQuery, [id])
		return result.rows
	},

	queryDistribution: async (id) => {
		const distrQuery = `
			WITH reg (geom) AS ( 	
				SELECT geom 	
				FROM regions 	
				WHERE id = $1
				) 
			SELECT
				SUM(CASE WHEN LOWER(NAME) LIKE '%'||'tif'||'%' THEN 1 ELSE 0 END) AS tifCount,
				SUM(CASE WHEN LOWER(NAME) LIKE '%'||'hair'||'%' THEN 1 ELSE 0 END) AS hairCount
			FROM locations, reg
			WHERE ST_Within(locations.way, reg.geom) = True;`
		const result = await client.query(distrQuery, [id])
		return result.rows[0]
	},

	formReception: async (mail, name, message) => {
		const appendMessageQuery = `
			INSERT INTO messages(name, mail, msg)
			VALUES ($1, $2, $3)`
		const result = await client.query(appendMessageQuery, [mail, name, message])
		return result.rows[0]
	}
}
