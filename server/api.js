//const Router = require('koa-router')
const Router = require('koa-joi-router');
const database = require('./database');
const cache = require('./cache');
const joi = Router.Joi; //require('joi')
const validate = require('koa-joi-validate');


const router = new Router();

// Check cache before continuing to any endpoint handlers
router.use(cache.checkResponseCache)

// Insert response into cache once handlers have finished
router.use(cache.addResponseToCache)


// Check that id param is valid number
const idValidator = {
	params: { id: joi.number().integer().min(0).required() }
}

// Hello World Test Endpoint
router.get('/hello', async ctx => {
	ctx.body = 'Hello World'
})

// Get time from DB
router.get('/time', async ctx => {
	const result = await database.queryTime()
	ctx.body = result
})

// Get AOI geometry by id route
quoifeurGeomRoute = 
{
	method: 'get',
	path: '/locations',
	handler: async ctx => {
		const result = await database.queryLocations()
		if (result.length === 0) {ctx.throw(404)}

		// Add row metadata as geojson properties
		const markers = result.map((row) => {
			let mark = JSON.parse(row.st_asgeojson)
			mark.properties = {name: row.name, id: row.id}
			return mark
		})
		
		ctx.body = markers
	}
}

// Get surface time series route
adressRoute = 
{
	method: 'get',
	path: '/locations/:id',
	validate: idValidator,
	handler: async ctx => {
		const id = ctx.params.id
		const result = await database.queryAdress(id)
		if (result.length === 0) {ctx.throw(404)}

		ctx.body = result
		}
}

//Get AOI centroids route
centroidsRoute = 
{
	method: 'get',
	path: '/aoi/centroids',
	handler: async ctx => {
		const results = await database.queryCentroid()
		if (results.length === 0) {ctx.throw(404)}

		// Add row metadata as geojson properties
		const centroids = results.map((row) => {
			let geojson = JSON.parse(row.st_asgeojson)
			geojson.properties = {name: row.name, id: row.id}
			return geojson
		})

		ctx.body = centroids
	}
}

/**
// Get AOI geometry by id

router.get('/aoi/geom/:id', idValidator, async ctx =>{
	const id = ctx.params.id
	const result = await database.queryAOI(id)
	if (result.length === 0) {ctx.throw(404)}

	// Add row metadata as geojson properties
	let boundaries = JSON.parse(result.st_asgeojson)
	boundaries.properties = {name: result.name, id: result.id}
	
	ctx.body = boundaries
})

// Get AOI centroids
router.get('/aoi/centroids', async ctx => {
	const results = await database.queryCentroid()
	if (results.length === 0) {ctx.throw(404)}

	// Add row metadata as geojson properties
	const centroids = results.map((row) => {
		let geojson = JSON.parse(row.st_asgeojson)
		geojson.properties = {name: row.name, id: row.id}
		return geojson
	})

	ctx.body = centroids
})

// Get surface time series
router.get('/aoi/surfaces/:id', idValidator, async ctx => {
	const id = ctx.params.id
	const result = await database.queryTimeSeries(id)
	console.log(result)
	if (result.length === 0) {ctx.throw(404)}


	ctx.body = result ? result : ctw.throw(404)
})

*/

router.route([quoifeurGeomRoute, adressRoute])

module.exports = router
