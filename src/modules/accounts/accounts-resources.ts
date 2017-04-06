import URI from 'urijs'
import _ from 'lodash'

import config from './../../config'
import storage from './../../storage'

import {
	ResponseError,
	PermissionError,
	StateUpdateError,
	InvalidParamsError,
} from './../../errors'

class GeneralRequestInit implements RequestInit {

	constructor (init?: RequestInit) {
		Object.assign(init, this)
		return init
	}

	method?: string
	headers?: any
	body?: any
	referrer?: string
	referrerPolicy?: string
	credentials?: string
	cache?: string
	redirect?: string
	integrity?: string
	keepalive?: boolean
	window?: any

	mode?: string = 'cors'
}


class GETRequestInit extends GeneralRequestInit {
	method = 'GET'
}

class POSTRequestInit extends GeneralRequestInit {

	// constructor (init?: RequestInit) {
	// 	super(init)
	// }

	method = 'POST'
	headers? = { 'Content-Type': 'application/json' }
}

class PUTRequestInit extends GeneralRequestInit {
	method = 'PUT'
	headers? = { 'Content-Type': 'application/json' }
}

class DELETERequestInit extends GeneralRequestInit {
	method = 'DELETE'
}

const req = new POSTRequestInit({ mode: 'no-cors', headers: 'blalala' })

console.log('Req:', req)

const url = config.server.apiURL + 'v1/accounts'
const token = () => storage.getItem(config.tokenName)

function receiveJson (input: RequestInfo, init?: RequestInit): Promise<any> {
	if (!init) init = new GETRequestInit()
	return fetch(input, init)
		.then((res) => {
			if (res.ok) return res.json()
			else return Promise.reject(new ResponseError(res))
		})
		.catch((err) => {
			return Promise.reject(err)
		})
}

function get (input: RequestInfo, init?: RequestInit): Promise<any> {
	if (!init) init = new GETRequestInit()
	return fetch(input, init)
		.then((res) => {
			if (res.ok) return res.json()
			else return Promise.reject(new ResponseError(res))
		})
		.catch((err) => {
			return Promise.reject(err)
		})
}

export const api = {
	self () {
		const input = `${url}/${token()}`
		return receiveJson(input)
	},

	exists ({ id, username }) {
		// TODO: add params' properties and values check
		if (!id && !username) return Promise.reject(new InvalidParamsError())
		const paramsStr = id ? 'id=' + id : 'username=' + username
		const input = `${url}/${token()}/exists?${paramsStr}`
		return receiveJson(input)
	},

	create ({ username, password, firstName, lastName, email }) {
		// TODO: add params' properties and values check
		if (!username || !password || !firstName || !lastName || !email) {
			return Promise.reject(new InvalidParamsError())
		}
		const input = `${url}/`
		const init: RequestInit =
			new POSTRequestInit({ body: { username, password, firstName, lastName, email } })
		return receiveJson(input, init)
	},

	update ({ accountId, newRole }) {
		if (!accountId || !newRole) return Promise.reject(new InvalidParamsError())
		// TODO: Add permission check
		// if (store.state.role !== 'moderator') return Promise.reject(new PermissionError())
		const input = `${url}/${token()}/updateRole`
		const init: RequestInit = new PUTRequestInit ({ body: { accountId, newRole } })
		return receiveJson(input, init)
	},

	auth ({ username, password }) {
		if (!username || !password) return Promise.reject(new InvalidParamsError())
		const input = `${url}/auth`
		const init: RequestInit = new POSTRequestInit({ body: { username, password } })
		return receiveJson(input, init)
	},

	bio: {
		one ({ id, username }) {
			if (!id && !username) return Promise.reject(new InvalidParamsError())
			// TODO: Add permission check
			// if (store.state.role !== 'student' && store.state.role !== 'moderator') {
			// 	return Promise.reject(new PermissionError())
			// }
			const paramsStr = id ? 'id=' + id : 'username=' + username
			const input = `${url}/${token()}/getBio?${paramsStr}`
			return receiveJson(input)
		},

		many () {
			// TODO: Add permission check
			// if (store.state.role !== 'moderator') return Promise.reject(new PermissionError())
			const input = `${url}/${token()}/listAccounts`
			return receiveJson(input)
		},
	},
}

export default api
