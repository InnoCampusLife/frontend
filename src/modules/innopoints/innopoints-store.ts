import * as Vuex from 'vuex'
import { Account } from './innopoints-api'

const STATE_UPDATE_ERR = 'STATE_UPDATE_ERR'

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
			return Account.self()
				.then((account) => {
					const { id, type, points_amount, owner: { username, id: ownerId } } = account
					commit('setState', { id, type, points_amount, owner: { username, id: ownerId } })
					return Promise.resolve(account)
				})
				.catch((err) => {
					return Promise.reject(STATE_UPDATE_ERR)
				})
		},
	},
}

export default store