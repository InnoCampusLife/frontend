import * as Vuex from 'vuex'

import config from './../config'
import storage from './../storage'

import {
	ResponseError,
	PermissionError,
	StateUpdateError,
	InvalidParamsError,
} from './../errors'

import {
	GETRequestInit,
	POSTRequestInit,
	PUTRequestInit,
	DELETERequestInit,
} from './../utils'

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

export const api = {
	self () {
		const input: RequestInfo = `${url}/${token()}`
		return receiveJson(input)
	},

	exists ({ id, username }) {
		// TODO: add params' properties and values check
		if (!id && !username) return Promise.reject(new InvalidParamsError())
		const paramsStr = id ? 'id=' + id : 'username=' + username
		const input: RequestInfo = `${url}/${token()}/exists?${paramsStr}`
		return receiveJson(input)
	},

	create ({ username, password, firstName, lastName, email }) {
		// TODO: add params' properties and values check
		if (!username || !password || !firstName || !lastName || !email) {
			return Promise.reject(new InvalidParamsError())
		}
		const input: RequestInfo = `${url}/`
		const init: RequestInit =
			new POSTRequestInit({ body: { username, password, firstName, lastName, email } })
		return receiveJson(input, init)
	},

	update ({ accountId, newRole }) {
		if (!accountId || !newRole) return Promise.reject(new InvalidParamsError())
		// TODO: Add permission check
		// if (store.state.role !== 'moderator') return Promise.reject(new PermissionError())
		const input: RequestInfo = `${url}/${token()}/updateRole`
		const init: RequestInit = new PUTRequestInit ({ body: { accountId, newRole } })
		return receiveJson(input, init)
	},

	auth ({ username, password }) {
		if (!username || !password) return Promise.reject(new InvalidParamsError())
		const input: RequestInfo = `${url}/auth`
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
			const input: RequestInfo = `${url}/${token()}/getBio?${paramsStr}`
			return receiveJson(input)
		},

		many () {
			// TODO: Add permission check
			// if (store.state.role !== 'moderator') return Promise.reject(new PermissionError())
			const input: RequestInfo = `${url}/${token()}/listAccounts`
			return receiveJson(input)
		},
	},
}

export default api
