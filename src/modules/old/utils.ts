class GeneralRequestInit implements RequestInit {
	constructor(init?: RequestInit) {
		Object.assign(this, init)
	}
	mode: RequestMode = 'cors'
	// credentials = 'include'
}

export class GETRequestInit extends GeneralRequestInit {}

export class POSTRequestInit extends GeneralRequestInit {
	constructor({
		body = null,
		headers = { 'Content-Type': 'application/json' },
		...init,
	} = {}) {
		super({
			...init,
			headers: body ? headers : null,
			method: 'POST',
			body: body ? JSON.stringify(body) : body,
		})
	}
}

export class PUTRequestInit extends GeneralRequestInit {
	constructor({
		body = null,
		headers = { 'Content-Type': 'application/json' },
		...init,
	} = {}) {
		super({
			...init,
			headers: body ? headers : null,
			method: 'PUT',
			body: body ? JSON.stringify(body) : body,
		})
	}
}

export class DELETERequestInit extends GeneralRequestInit {
	constructor() {
		super({
			method: 'DELETE',
		})
	}
}