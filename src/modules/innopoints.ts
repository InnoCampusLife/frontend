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

const url = config.server.apiURL + 'v1/points'
const token = () => storage.getItem(config.tokenName)

function receiveJson(input: RequestInfo, init?: RequestInit): Promise<any> {
	if (!init) init = new GETRequestInit()
	return fetch(input, init)
		.then((res) => {
			if (res.ok) return res.json()
			else return Promise.reject(new ResponseError(res))
		})
		.catch((err) => {
			return err
		})
}

export const store: Vuex.StoreOptions<any> = {
	state: {
		id: null,
		type: '',
		points_amount: 0,
		owner: {
			id: '',
			username: '',
		},
	},

	getters: {
		isStudent({ role }) {
			return role === 'student'
		},

		isAdmin({ role }) {
			return role === 'admin'
		},
	},

	mutations: {
		setState (state, {
			id,
			type,
			points_amount,
			owner: {
				username,
				id: ownerId,
			},
		}) {
			if (id) state.id = id
			if (type) state.type = type
			if (points_amount) state.points_amount = points_amount
			if (username) state.owner.username = username
			if (ownerId) state.owner.id = ownerId
		},

		clear (state) {
			state.id = null
			state.type = ''
			state.points_amount = 0
			state.owner.username = ''
			state.owner.id = ''
		},

		increaseAmount (state, { amount = 0 }) {
			state.points_amount += amount
		},

		decreaseAmount (state, { amount = 0 }) {
			state.points_amount -= amount
		},
	},

	actions: {
		update ({ commit }) {
			return api.accounts.self()
				.then((json) => {
					const { id, type, points_amount, owner: { username, id: ownerId } } = json.result
					commit('setState', { id, type, points_amount, owner: { username, id: ownerId } })
					return Promise.resolve(json.result)
				})
				.catch((err) => {
					return Promise.reject(new StateUpdateError(err))
				})
		},
	},
}

export const api = {
	activities: {
		many ({ category_id = null, skip = 0, limit = 0 } = {}) {
			// TODO: add check for limit and skip params
			const paramsStr = (skip ? 'skip=' + skip : '') + (limit ? 'limit=' + limit : '')
			const input = `${url}/activities` +
					(category_id ? '/' + category_id : '') + (paramsStr ? '?' + paramsStr : '')
			return receiveJson(input)
		},
	},

	categories: {
		many ({ skip = 0, limit = 0 } = {}) {
			// TODO: add check for limit and skip params
			const paramsStr = (skip ? 'skip=' + skip : '') + (limit ? 'limit=' + limit : '')
			const input = `${url}/categories` + (paramsStr ? '?' + paramsStr : '')
			return receiveJson(input)
		},
	},

	accounts: {
		self () {
			const input = `${url}/accounts/${token()}`
			return receiveJson(input)
		},

		create () {
			const input = `${url}/accounts/${token()}`
			const init: RequestInit = new POSTRequestInit({})
			return receiveJson(input, init)
		},
	},

	applications: {
		one ({ application_id }) {
			if (!application_id) return Promise.reject(new InvalidParamsError())
			const input = `${url}/accounts/${token()}/applications/${application_id}`
			return receiveJson(input)
		},

		many ({ status = '', skip = 0, limit = 0 } = {}) {
			const paramsStr = (skip ? 'skip=' + skip : '') + (limit ? 'limit=' + limit : '')
			const input = `${url}/accounts/${token()}/applications` +
					(status ? '/' + status : '') + (paramsStr ? '?' + paramsStr : '')
			return receiveJson(input)
		},

		create ({ body }) {
			if (!body) return Promise.reject(new InvalidParamsError())
			const input = `${url}/accounts/${token()}/applications`
			const init: RequestInit = new POSTRequestInit({ body })
			return receiveJson(input, init)
		},

		update ({ application_id, body }) {
			if (!application_id || !body) return Promise.reject(new InvalidParamsError())
			const input = `${url}/accounts/${token()}/applications/${application_id}`
			const init: RequestInit = new PUTRequestInit({ body })
			return receiveJson(input, init)
		},

		submit ({ application_id }) {
			if (!application_id) return Promise.reject(new InvalidParamsError())
			const input = `${url}/accounts/${token()}/applications/${application_id}/approve`
			const init: RequestInit = new PUTRequestInit()
			return receiveJson(input, init)
		},

		delete ({ application_id }) {
			if (!application_id) return Promise.reject(new InvalidParamsError())
			const input = `${url}/accounts/${token()}/applications/${application_id}`
			const init: RequestInit = new DELETERequestInit()
			return receiveJson(input, init)
		},

		files: {
			create ({ body }) {
				if (!body) return Promise.reject(new InvalidParamsError())
				const input = `${url}/accounts/${token()}/files`
				const init: RequestInit = new POSTRequestInit({ body })
				return receiveJson(input, init)
			},

			one ({ file_id }) {
				if (!file_id) return Promise.reject(new InvalidParamsError())
				const input = `${url}/accounts/${token()}/files/${file_id}`
				return receiveJson(input)
			},

			delete ({ file_id }) {
				if (!file_id) return Promise.reject(new InvalidParamsError())
				const input = `${url}/accounts/${token()}/files/${file_id}`
				const init: RequestInit = new DELETERequestInit()
				return receiveJson(input, init)
			},
		},
	},

	items: {
		many ({ category_id = null, fields = '', order = '', skip = 0, limit = 0 } = {}) {
			const paramsStr =
				(skip ? 'skip=' + skip : '') +
				(limit ? 'limit=' + limit : '') +
				(fields ? 'fields=' + fields : '') +
				(order ? 'order=' + order : '')
			const input = `${url}/shop/items` + (category_id ? '/category/' + category_id : '') + paramsStr
			return receiveJson(input)
		},

		one ({ item_id }) {
			if (!item_id) Promise.reject(new InvalidParamsError())
			const input = `${url}/shop/items/${item_id}`
			return receiveJson(input)
		},
	},

	orders: {
		one ({ order_id }) {
			if (!order_id) Promise.reject(new InvalidParamsError())
			const input = `${url}/accounts/${token()}/orders/${order_id}`
			return receiveJson(input)
		},

		many ({ status = '' } = {}) {
			const input = `${url}/accounts/${token()}/orders` + (status ? '/' + status : '')
			return receiveJson(input)
		},

		create ({ body }) {
			if (!body) return Promise.reject(new InvalidParamsError())
			const input = `${url}/accounts/${token()}/orders`
			const init: RequestInit = new POSTRequestInit({ body })
			return receiveJson(input, init)
		},

		update ({ order_id, action }) {
			if (!order_id || !action) return Promise.reject(new InvalidParamsError())
			const input = `${url}/accounts/${token()}/orders/${order_id}/contributors/${action}`
			const init: RequestInit = new POSTRequestInit()
			return receiveJson(input, init)
		},

		delete ({ order_id }) {
			if (!order_id) return Promise.reject(new InvalidParamsError())
			const input = `${url}/accounts/${token()}/orders/${order_id}`
			const init = new DELETERequestInit()
			return receiveJson(input, init)
		},
	},

	admin: {
		accounts: {
			one ({ account_id }) {
				if (!account_id) return Promise.reject(new InvalidParamsError())
				const input = `${url}/admin/${token()}/accounts/${account_id}`
				return receiveJson(input)
			},

			many ({ skip = 0, limit = 0} = {}) {
				const paramsStr = (skip ? 'skip=' + skip : '') + (limit ? 'limit=' + limit : '')
				const input = `${url}/admin/${token()}/accounts` + (paramsStr ? '?' + paramsStr : '')
				return receiveJson(input)
			},

			update ({ account_id, body }) {
				if (!account_id || !body) return Promise.reject(new InvalidParamsError())
				const input = `${url}/admin/${token()}/accounts/${account_id}`
				const init: RequestInit = new PUTRequestInit({ body })
				return receiveJson(input, init)
			},

			applications: {
				many ({ account_id, skip = 0, limit = 0 }) {
					if (!account_id) return Promise.reject(new InvalidParamsError())
					const paramsStr = (skip ? 'skip=' + skip : '') + (limit ? 'limit=' + limit : '')
					const input = `${url}/admin/${token()}/accounts/${account_id}/applications` +
							(paramsStr ? '?' + paramsStr : '')
					return receiveJson(input)
				},
			},

			orders: {
				many ({ account_id, skip = 0, limit = 0 }) {
					if (!account_id) return Promise.reject(new InvalidParamsError())
					const paramsStr = (skip ? 'skip=' + skip : '') + (limit ? 'limit=' + limit : '')
					const input = `${url}/admin/${token()}/accounts/${account_id}/orders` +
							(paramsStr ? '?' + paramsStr : '')
					return receiveJson(input)
				},
			},
		},

		applications: {
			many ({ status }) {
				if (!status) return Promise.reject(new InvalidParamsError())
				const input = `${url}/admin/${token()}/applications/${status}`
				return receiveJson(input)
			},

			one ({ account_id, application_id }) {
				if (!account_id || !application_id) return Promise.reject(new InvalidParamsError())
				const input = `${url}/admin/${token()}/accounts/${account_id}/applications/${application_id}`
				return receiveJson(input)
			},

			create ({ body }) {
				if (!body) return Promise.reject(new InvalidParamsError())
				const input = `${url}/admin/${token()}/applications`
				const init: RequestInit = new POSTRequestInit({ body })
				return receiveJson(input, init)
			},

			update ({ account_id, application_id, body }) {
				if (!account_id || !application_id || !body) return Promise.reject(new InvalidParamsError())
				const input = `${url}/admin/${token()}/accounts/${account_id}/applications/${application_id}`
				const init: RequestInit = new PUTRequestInit({ body })
				return receiveJson(input, init)
			},

			review ({ account_id, application_id, action }) {
				if (!account_id || !application_id || !action) return Promise.reject(new InvalidParamsError())
				const input = `${url}/admin/${token()}/accounts/${account_id}/applications/${application_id}/${action}`
				const init: RequestInit = new PUTRequestInit()
				return receiveJson(input, init)
			},
		},

		orders: {
			many ({ status }) {
				if (!status) return Promise.reject(new InvalidParamsError())
				const input = `${url}/admin/${token()}/orders/${status}`
				return receiveJson(input)
			},

			one ({ order_id }) {
				if (!order_id) return Promise.reject(new InvalidParamsError())
				const input = `${url}/admin/${token()}/orders/${order_id}`
				return receiveJson(input)
			},

			update ({ order_id, action }) {
				if (!order_id || !action) return Promise.reject(new InvalidParamsError())
				const input = `${url}/admin/${token()}/orders/${order_id}/${action}`
				const init = new PUTRequestInit()
				return receiveJson(input, init)
			},
		},
	},
}

export default api
