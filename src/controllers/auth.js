const express = require('express')
const router = express.Router()
const request = require('request')
const querystring = require('querystring')

router.get('/login', (req,res) => {
	res.render('auth/login')
})

router.get('/callback', async (req,res) => {
	const { code } = req.query
	await request({
		uri: 'https://github.com/login/oauth/access_token',
		qs: {
			client_id: 'f2654a86ce4959d77cec',
			client_secret: '5d07bfc8e760737e2e02f317fb4826dee97a332b',
			code
		}
	}, async (error, response, body) => {
		const { access_token } = querystring.parse(body)
		req.session.access_token = access_token
		res.redirect('/')
	})
})

module.exports = router