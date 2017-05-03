import * as URI from 'urijs'

import config from './../../config'
import storage from './../../storage'

const INVALID_PARAMS_ERR = 'INVALID_PARAMS_ERR'
const NETWORK_ERR = 'NETWORK_ERR'
const JSON_PARSING_ERR = 'JSON_PARSING_ERR'
const RESPONSE_IS_NOT_OK_ERR = 'RESPONSE_IS_NOT_OK_ERR'
const BAD_REQUEST_ERR = 'BAD_REQUEST_ERR'

const url = config.server.apiURL + 'v1/points'
const token = () => storage.getItem(config.tokenName)

function makeReq (input: string, init: RequestInit = {}): Promise<any> {
	const { mode = 'cors', method = 'GET' }: RequestInit = init
	return fetch(input, { mode, method, ...init })
		.catch(() => {
			console.error(NETWORK_ERR)
			return Promise.reject(NETWORK_ERR)
		})
		.then(async (res) => {
			// FIXME: Headers not set for successful responses
			if (res.ok || res.status === 400) {
				return res.json()
					.then((json) => {
						if (res.ok) return Promise.resolve(json.result)
						console.error(BAD_REQUEST_ERR)
						return Promise.reject(json.error)
					}, (err) => {
						console.error(JSON_PARSING_ERR)
						return Promise.reject(JSON_PARSING_ERR)
					})
			}
			console.error(RESPONSE_IS_NOT_OK_ERR)
			return Promise.reject(res.statusText)
		})
}

function makeGetReq (input: string): Promise<any> {
	return makeReq(input)
}

function makePostReq (input: string, init: RequestInit = {}): Promise<any> {
	const {
		method = 'POST',
		headers = { 'Content-Type': 'application/json' },
		body = {},
	}: RequestInit = init
	return makeReq(input, { method, headers, ...init, body: JSON.stringify(body) })
}

function makePutReq (input: string, init: RequestInit = {}): Promise<any> {
	const {
		method = 'PUT',
		headers = { 'Content-Type': 'application/json' },
		body = {},
	}: RequestInit = init
	return makeReq(input, { method, headers, ...init, body: JSON.stringify(body) })
}

function makeDeletetReq (input: string): Promise<any> {
	return makeReq(input, { method: 'DELETE' })
}

export abstract class Activity {
	static many ({ category_id = null, skip = null, limit = null } = {}) {
		// TODO: Add check for limit and skip params
		const input = URI(`${url}/activities` + (category_id ? `/${category_id}` : ''))
			.query({ skip, limit }).toString()
		return makeGetReq(input)
	}
}

export abstract class Category {
	static many ({ skip = null, limit = null } = {}) {
		// TODO: Add check for limit and skip params
		const input = URI(`${url}/categories`).query({ skip, limit }).toString()
		return makeGetReq(input)
	}
}

export abstract class Account {
	static self () {
		const input = `${url}/accounts/${token()}`
		return makeGetReq(input)
	}

	static create () {
		const input = `${url}/accounts/${token()}`
		return makePostReq(input, {})
	}
}

export abstract class Application {
	static one ({ application_id }) {
		if (!application_id) return Promise.reject(INVALID_PARAMS_ERR)
		const input = `${url}/accounts/${token()}/applications/${application_id}`
		return makeGetReq(input)
	}

	static many ({ status = null, skip = null, limit = null } = {}) {
		const input = URI(`${url}/accounts/${token()}/applications`).query({ status, skip, limit }).toString()
		return makeGetReq(input)
	}

	static create ({ body }) {
		if (!body) return Promise.reject(INVALID_PARAMS_ERR)
		const input = `${url}/accounts/${token()}/applications`
		const init: RequestInit = { body }
		return makePostReq(input, init)
	}

	static update ({ application_id, body }) {
		if (!application_id || !body) return Promise.reject(INVALID_PARAMS_ERR)
		const input = `${url}/accounts/${token()}/applications/${application_id}`
		const init: RequestInit = { body }
		return makePutReq(input, init)
	}

	static submit ({ application_id }) {
		if (!application_id) return Promise.reject(INVALID_PARAMS_ERR)
		const input = `${url}/accounts/${token()}/applications/${application_id}/approve`
		return makePutReq(input, {})
	}

	static delete ({ application_id }) {
		if (!application_id) return Promise.reject(INVALID_PARAMS_ERR)
		const input = `${url}/accounts/${token()}/applications/${application_id}`
		return makeDeletetReq(input)
	}
}

export abstract class ApplicationFile {
	static create ({ body }) {
		if (!body) return Promise.reject(INVALID_PARAMS_ERR)
		const input = `${url}/accounts/${token()}/files`
		const init: RequestInit = {
			body,
			headers: { 'Content-Type': 'multipart/form-data' },
		}
		return makePostReq(input, init)
	}

	static one ({ file_id }) {
		if (!file_id) return Promise.reject(INVALID_PARAMS_ERR)
		const input = `${url}/accounts/${token()}/files/${file_id}`
		return makeGetReq(input)
	}

	static delete ({ file_id }) {
		if (!file_id) return Promise.reject(INVALID_PARAMS_ERR)
		const input = `${url}/accounts/${token()}/files/${file_id}`
		return makeDeletetReq(input)
	}
}

export abstract class Item {
	static many ({ category_id = null, fields = null, order = null, skip = null, limit = null } = {}) {
		const input = URI(`${url}/shop/items` + (category_id ? '/category/' + category_id : ''))
			.query({ fields, order, skip, limit }).toString()
		return makeGetReq(input)
	}

	static one ({ item_id }) {
		if (!item_id) Promise.reject(INVALID_PARAMS_ERR)
		const input = `${url}/shop/items/${item_id}`
		return makeGetReq(input)
	}
}

export abstract class Order {
	static one ({ order_id }) {
		if (!order_id) Promise.reject(INVALID_PARAMS_ERR)
		const input = `${url}/accounts/${token()}/orders/${order_id}`
		return makeGetReq(input)
	}

	static many ({ status = null } = {}) {
		const input = `${url}/accounts/${token()}/orders` + (status ? '/' + status : '')
		return makeGetReq(input)
	}

	static create ({ body }) {
		if (!body) return Promise.reject(INVALID_PARAMS_ERR)
		const input = `${url}/accounts/${token()}/orders`
		const init: RequestInit = { body }
		return makePostReq(input, init)
	}

	static update ({ order_id, action }) {
		if (!order_id || !action) return Promise.reject(INVALID_PARAMS_ERR)
		const input = `${url}/accounts/${token()}/orders/${order_id}/contributors/${action}`
		return makePostReq(input, {})
	}

	static delete ({ order_id }) {
		if (!order_id) return Promise.reject(INVALID_PARAMS_ERR)
		const input = `${url}/accounts/${token()}/orders/${order_id}`
		return makeDeletetReq(input)
	}
}

export namespace Admin {
	export abstract class Account {
		static one ({ account_id }) {
			if (!account_id) return Promise.reject(INVALID_PARAMS_ERR)
			const input = `${url}/admin/${token()}/accounts/${account_id}`
			return makeGetReq(input)
		}

		static many ({ skip = null, limit = null } = {}) {
			const input = URI(`${url}/admin/${token()}/accounts`).query({ skip, limit }).toString()
			return makeGetReq(input)
		}

		static update ({ account_id, body }) {
			if (!account_id || !body) return Promise.reject(INVALID_PARAMS_ERR)
			const input = `${url}/admin/${token()}/accounts/${account_id}`
			const init: RequestInit = { body }
			return makePutReq(input, init)
		}
	}

	export namespace Account {
		export abstract class Application {
			static many ({ account_id, skip = null, limit = null }) {
				if (!account_id) return Promise.reject(INVALID_PARAMS_ERR)
				const input = URI(`${url}/admin/${token()}/accounts/${account_id}/applications`)
					.query({ skip, limit }).toString()
				return makeGetReq(input)
			}
		}

		export abstract class Order {
			static many ({ account_id, skip = null, limit = null }) {
				if (!account_id) return Promise.reject(INVALID_PARAMS_ERR)
				const input = URI(`${url}/admin/${token()}/accounts/${account_id}/applications`)
					.query({ skip, limit }).toString()
				return makeGetReq(input)
			}
		}
	}

	export abstract class Application {
		static many ({ status }) {
			if (!status) return Promise.reject(INVALID_PARAMS_ERR)
			const input = `${url}/admin/${token()}/applications/${status}`
			return makeGetReq(input)
		}

		static one ({ application_id }) {
			if (!application_id) return Promise.reject(INVALID_PARAMS_ERR)
			const input = `${url}/admin/${token()}/applications/${application_id}`
			return makeGetReq(input)
		}

		static create ({ body }) {
			if (!body) return Promise.reject(INVALID_PARAMS_ERR)
			const input = `${url}/admin/${token()}/applications`
			const init: RequestInit = { body }
			return makePostReq(input, init)
		}

		static update ({ application_id, body }) {
			if (!application_id || !body) return Promise.reject(INVALID_PARAMS_ERR)
			const input = `${url}/admin/${token()}/applications/${application_id}`
			const init: RequestInit = { body }
			return makePutReq(input, init)
		}

		static review ({ application_id, action }) {
			if (!application_id || !action) return Promise.reject(INVALID_PARAMS_ERR)
			const input = `${url}/admin/${token()}/applications/${application_id}/${action}`
			return makePutReq(input, {})
		}
	}

	export abstract class Order {
		static many ({ status }) {
			if (!status) return Promise.reject(INVALID_PARAMS_ERR)
			const input = `${url}/admin/${token()}/orders/${status}`
			return makeGetReq(input)
		}

		static one ({ order_id }) {
			if (!order_id) return Promise.reject(INVALID_PARAMS_ERR)
			const input = `${url}/admin/${token()}/orders/${order_id}`
			return makeGetReq(input)
		}

		static review ({ order_id, action }) {
			if (!order_id || !action) return Promise.reject(INVALID_PARAMS_ERR)
			const input = `${url}/admin/${token()}/orders/${order_id}/${action}`
			return makePutReq(input, {})
		}
	}
}
