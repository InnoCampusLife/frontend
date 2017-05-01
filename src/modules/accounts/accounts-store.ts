import * as Vuex from 'vuex'
import { Account } from './accounts-api'

const STATE_UPDATE_ERR = 'STATE_UPDATE_ERR'

export const store: Vuex.StoreOptions<any> = {
	state: {
		id: '',
		firstName: '',
		lastName: '',
		username: '',
		email: '',
		role: '',
		tgId: '',
	},

	getters: {
		fullName ({ firstName, lastName }) {
			return firstName + (firstName ? ' ' + lastName : lastName)
		},

		isStudent ({ role }) {
			return role === 'student'
		},

		isModerator ({ role }) {
			return role === 'moderator'
		},

		isGhost ({ role }) {
			return role === 'ghost'
		},
	},

	mutations: {
		setState (state, { id, firstName, lastName, username, email, role, tgId }) {
			state.id = id
			state.firstName = firstName
			state.lastName = lastName
			state.username = username
			state.email = email
			state.role = role
			state.tgId = tgId
		},

		clear (state) {
			state.id = ''
			state.firstName = ''
			state.lastName = ''
			state.username = ''
			state.email = ''
			state.role = ''
			state.tgId = ''
		},
	},

	actions: {
		update ({ commit }) {
			return Account.self()
				.then((account) => {
					const { id, firstName, lastName, username, email, role, tgId } = account
					commit('setState', { id, firstName, lastName, username, email, role, tgId })
					return Promise.resolve(account)
				})
		},
	},
}

export default store