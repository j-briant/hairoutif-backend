//const Router = require('koa-router')
const Router = require('koa-joi-router');
const database = require('./database');
const cache = require('./cache');
const joi = Router.Joi; //require('joi')
const validate = require('koa-joi-validate');
const KoaBody = require('koa-bodyparser')


const router = new Router();

// Body parser
router.use(KoaBody())

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

// Get regions route
regionsGeomRoute = {
	method: 'get',
	path: '/regions',
	handler: async ctx => {
		const result = await database.queryRegions()
		if (result.length === 0) {ctx.throw(404)}

		// Add row metadata as geojson properties
		const areas = result.map((row) => {
			let region = JSON.parse(row.st_asgeojson)
			region.properties = {name: row.nom, id: row.id, loc: row.loc}
			return region
		})
		
		ctx.body = areas
	}
}

// Get location  route
quoifeurGeomRoute = {
	method: 'get',
	path: '/locations',
	handler: async ctx => {
		const result = await database.queryLocations()
		if (result.length === 0) {ctx.throw(404)}

		// Add row metadata as geojson properties
		const markers = result.map((row) => {
			let mark = JSON.parse(row.st_asgeojson)
			mark.properties = {name: row.name, id: row.fid}
			return mark
		})
		
		ctx.body = markers
	}
}

// Get surface time series route
descRoute = {
	method: 'get',
	path: '/locations/desc/:id',
	validate: idValidator,
	handler: async ctx => {
		const id = ctx.params.id
		const result = await database.queryDescription(id)
		if (!result) {ctx.throw(404)}

		ctx.body = result
		}
}

// Get top names
topRoute = {
	method: 'get',
	path: '/top/:id',
	validate: idValidator,
	handler: async ctx => {
		const id = ctx.params.id
		const result = await database.queryTopNames(id)
		if (!result) {ctx.throw(404)}

		ctx.body = result
		}
}

// Get distribution
distrRoute = {
	method: 'get',
	path: '/distr/:id',
	validate: idValidator,
	handler: async ctx => {
		const id = ctx.params.id
		const result = await database.queryDistribution(id)
		if (!result) {ctx.throw(404)}

		ctx.body = result
		}
}

// Form answer 
formRoute = {
	method: 'post',
	path: '/form',
	type: 'json',
	handler: async ctx => {
		const data = ctx.request.body.d
		const result = await database.formReception(data.name, data.mail, data.msg)
			.then(ctx.status = 200)
			.catch( error => ctx.throw(500))
	}
}

router.route([quoifeurGeomRoute, regionsGeomRoute, descRoute, topRoute, distrRoute, formRoute])

module.exports = router
