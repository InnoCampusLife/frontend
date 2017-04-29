import * as URI from 'urijs'

import config from './../../config'
import storage from './../../storage'

const INVALID_PARAMS_ERR = 'INVALID_PARAMS_ERR'
const NETWORK_ERR = 'NETWORK_ERR'
const JSON_PARSING_ERR = 'JSON_PARSING_ERR'
const RESPONSE_IS_NOT_OK_ERR = 'RESPONSE_IS_NOT_OK_ERR'
const BAD_REQUEST_ERR = 'BAD_REQUEST_ERR'

const url = config.server.apiURL + 'v1/accounts'
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
	const { method = 'POST', headers = { 'Content-Type': 'application/json' } }: RequestInit = init
	return makeReq(input, { method, headers, ...init })
}

function makePutReq (input: string, init: RequestInit = {}): Promise<any> {
	const { method = 'PUT', headers = { 'Content-Type': 'application/json' } }: RequestInit = init
	return makeReq(input, { method, headers, ...init })
}

function makeDeletetReq (input: string): Promise<any> {
	return makeReq(input, { method: 'DELETE' })
}

export abstract class Account {

	id: string
	role: 'ghost' | 'student' | 'moderator'
	username: string
	email: string
	firstName?: string
	lastName?: string
	studyGroup?: string
	tgId?: string

	static one ({ id = '', username = '' }): Promise<Account> {
		// TODO: Add permission check
		if (!id && !username) return Promise.reject(INVALID_PARAMS_ERR)
		const input = URI(`${url}/${token()}/getBio`).query(id ? { id } : { username }).toString()
		return makeGetReq(input)
	}

	static many (): Promise<Account[]> {
		// TODO: Add permission check
		const input = `${url}/${token()}/listAccounts`
		return makeGetReq(input)
	}

	static self (): Promise<Account> {
		const input = `${url}/${token()}`
		return makeGetReq(input)
	}

	static exists ({ id = '', username = '' }): Promise<boolean> {
		// TODO: Add params' values check
		if (!id && !username) return Promise.reject(INVALID_PARAMS_ERR)
		const input = URI(`${url}/${token()}/exists`).query(id ? { id } : { username }).toString()
		return makeGetReq(input)
	}

	static create ({ username, password, firstName, lastName, email }): Promise<any> {
		// TODO: Add params' values check
		if (!username || !password || !firstName || !lastName || !email) return Promise.reject(INVALID_PARAMS_ERR)
		const input = `${url}/`
		const init: RequestInit = { body: { username, password, firstName, lastName, email } }
		return makePostReq(input, init)
	}

	static update ({ accountId, newRole }): Promise<any> {
		// TODO: Add permission check
		if (!accountId || !newRole) return Promise.reject(INVALID_PARAMS_ERR)
		const input = `${url}/${token()}/updateRole`
		const init: RequestInit = { body: { accountId, newRole } }
		return makePutReq(input, init)
	}

	static auth ({ username, password }): Promise<any> {
		if (!username || !password) return Promise.reject(INVALID_PARAMS_ERR)
		const input = `${url}/auth`
		const init: RequestInit = { body: { username, password } }
		return makePostReq(input, init)
	}
}
