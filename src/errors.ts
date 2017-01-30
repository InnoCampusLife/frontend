// TODO: handle erros based on response status
export class ResponseError extends Error {
	constructor(res?: Response) {
		super(`${res.url} ${res.status} (${res.statusText})`)
		// FIXME
		res.json()
			.then((json) => {
				console.error(`Response error:`, json.error)
			})
			.catch((err) => {
				console.error(`JSON parsing error:`, err)
			})
	}
}

export class PermissionError extends Error {
	constructor(msg?: string) {
		super(msg ? msg : 'Permission denied.')
	}
}

export class InvalidParamsError extends Error {
	constructor(msg?: string) {
		super(msg ? msg : 'Invalid parameters.')
	}
}

export class StateUpdateError extends Error {
	constructor(msg?: string) {
		super(msg ? msg : 'State update error.')
	}
}