<style lang="scss" scoped>

	input[readonly] {
		color: hsla(0, 0%, 0%, 0.87);
		background: hsl(0, 0%, 100%);
		border-color: hsl(0, 0%, 100%);
	}

</style>

<template lang="jade">
	layout

		template(slot="app-bar")
			h1.md-title
				span Innopoints
				span.hidden-xs-down &ensp;&mdash;&ensp;
				span.hidden-xs-down Apply
			router-link(
				tag="md-button",
				:to="{ name: 'applications' }")
				span Applications

		template(slot="content")
			.container
				template(v-if="isLoading")
					.text-center
						md-spinner(md-indeterminate, :md-size="100")
				template(v-else)
					md-card
						form(novalidate)#ip_request
							md-card-content
								.md-title New Application
							md-card-content
								.row
									.col-12.col-sm-auto
										md-input-container
											label(for='category') Category
											md-select#category(
												placeholder="Select Category",
												name='category',
												v-model='category_id',
												@change='updateAcivities',
											)
												md-option(value="") All
												md-option(v-for='c in categories', :value="c.id") {{ c.title | startCase }}

							md-card-content
								.md-title(v-if='participants.length > 1') Participants
								.md-title(v-else) Participant

								md-card.my-3(v-for='(part, index) of participants')
									md-card-content

										md-input-container(:class="{ 'md-input-invalid': $v.participants.$each[index].username.$error }")
											label(:for="'username_' + index") Username
											md-input(
												required,
												type='text',
												:id="'username_' + index",
												:name="'username_' + index",
												v-model.trim="part.username",
												@input="$v.participants.$each[index].username.$touch()"
											)
											span(v-if="!$v.participants.$each[index].username.required", class="md-error")
												span Required
											span(v-else-if="!$v.participants.$each[index].username.minLength", class="md-error")
												span Too short
											span(v-else-if="!$v.participants.$each[index].username.maxLength", class="md-error")
												span Too long
											span(v-else-if="!$v.participants.$each[index].username.isValid", class="md-error")
												span Invalid
											span(v-else-if="!$v.participants.$each[index].username.exists", class="md-error")
												span Incorrect

										md-input-container(:class="{ 'md-input-invalid': $v.participants.$each[index].activity_id.$error }")
											label(:for="'activity_' + index") Activity
											md-select(
												required,
												placeholder="Select Activity",
												:id="'activity_' + index",
												:name="'activity_' + index",
												v-model="part.activity_id",
												@change="$v.participants.$each[index].activity_id.$touch()"
											)
												md-option(v-for='a in activities', :value="a.id") {{ a.title | startCase }}
											span(v-if="!$v.participants.$each[index].activity_id.required", class="md-error")
												span Required

										md-input-container(
											v-show="isTemporaryActivity(part.activity_id)",
											:class="{ 'md-input-invalid': $v.participants.$each[index].hours.$error }",
										)
											label(:for="'hours_' + index") Hours
											md-input(
												required,
												:disabled='!isTemporaryActivity(part.activity_id)',
												:id="'hours_' + index",
												:name="'hours_' + index",
												type='number',
												min='0.5',
												max='10000',
												step="0.5",
												v-model='part.hours',
												@input="$v.participants.$each[index].hours.$touch()"
											)
											span(v-if="!$v.participants.$each[index].hours.required", class="md-error")
												span Required
											span(v-if="!$v.participants.$each[index].hours.between", class="md-error")
												span Too little or too much


										md-input-container
											label(:for="'innopoints_' + index") Innopoints
											md-input(
												readonly,
												:id="'innopoints_' + index",
												:name="'innopoints_' + index",
												type='number',
												:value='part.innopoints',
											)

									md-card-actions(v-show='participants.length > 1')
										md-button.md-warn(type='button', @click='removeParticipant(index)')
											span Remove

								md-button.md-raised.ml-0.mr-3(type='button', @click='addParticipant') Add a Participant
								md-button.md-warn(
									type='button',
									@click='clearParticipants',
									v-if='participants.length > 1'
								)
									span Clear

							span
							md-card-content
								md-input-container
									label(for="upload") Files
									md-file#upload(v-model='files', name="upload", multiple)

							md-card-content
								md-input-container
									label Comment
									md-textarea(v-model='comment')

							md-card-content
								md-button.md-raised.md-primary.mx-0(type='button', @click="send")
									span Send
									md-tooltip(md-direction="right", v-if='!isCategorySelected') Select Category
									md-tooltip(md-direction="right", v-else-if='!isActivitySelected') Select Activities
</template>

<script>
	import { required, minLength, maxLength, between } from 'vuelidate/lib/validators'

	export default {
		name: 'innopoints-apply',

		data() {
			return {
				isLoading: false,

				categories: [],
				activities: [],

				category_id: null,
				files: '',
				comment: '',
				participants: [
					{
						username: '',
						activity_id: null,
						hours: null,
						innopoints: null,
					},
				],

				// application: {
				// 	type: '', // 'personal' || 'group'
				// 	work: [
				// 		{
				// 			actor: '57c197fc636b0300057ddad2', // ID of user in accounts. ID of user with :token if type is personal
				// 			activity_id: null, // id of activity
				// 			amount: 0, // null for permanent activities
				// 		},
				// 	],
				// 	comment: '',
				// },
			}
		},

		validations: {
			participants: {
				$each: {
					username: {
						required,
						minLength: minLength(3),
						maxLength: maxLength(16),

						isValid(username) {
							return /^\w{3,16}$/.test(username)
						},

						async exists(username) {
							if (username.length < 3 || username.length > 16 || /^\w$/.test(username)) {
								return false
							}
							try {
								const json = await this.$root.api.accounts.exists({ username })
								return json.result
							} catch (excep) {
								console.error('Failed to check username:', excep)
								return false
							}
						},
					},

					activity_id: {
						required,
					},

					hours: {
						required,
						between: between(.5, 10000),
					},
				},
			},
		},

		components: {
			layout: require('./../layout.vue'),
		},

		filters: {
			startCase: require('lodash').startCase,
		},

		created() {
			this.fetchData()
		},

		watch: {
			'$route': 'fetchData'
		},

		computed: {
			isCategorySelected() {
				return !!this.category_id
			},

			isActivitySelected(index) {
				if (this.participants[index]) {
					return !!this.participants[index].activity_id
				}
				return false
			},
		},

		methods: {
			fetchData() {
				this.isLoading = true

				this.updateAcivities()

				this.$root.api.innopoints.categories.get()
					.then(({ result: categories = [] } = {}) => {
						console.log('Got categories:', { categories })
						this.categories = categories
						this.isLoading = false
					})
					.catch((err) => {
						console.error('Failed to get categories:', err)
					})
			},

			innopoints(id, hours) {
				const activity = this.activities.find(a => a.id === id);
				if (activity) {
					if (this.isTemporaryActivity(id) && hours > 0) {
						return activity.price * hours
					}
					return activity.price
				}
				return null
			},

			isTemporaryActivity(id) {
				return !!this.activities
					.filter((a) => a.type !== 'permanent')
					.find((a) => a.id === id);
			},

			addParticipant() {
				this.participants.push({
					username: '',
					id: '',
					usernameValidationError: '',
					activity_id: null,
					hours: null,
					innopoints: null,
				})
			},

			removeParticipant(index) {
				console.log(index)
				this.participants.splice(index, 1)
				console.log(this.participants)
			},

			clearParticipants() {
				this.participants.splice(1, this.participants.length - 1)
			},

			updateAcivities(value) {
				this.$root.api.innopoints.activities.get({ category_id: value })
					.then(({ result: activities = [] } = {}) => {
						console.log('Updated activities:', { activities })

						// Reset selected actvities if they are not in select category
						this.participants
							.filter((p) => !activities.find((a) => a.id == p.activity_id))
							.forEach((p) => p.activity_id = null)

						this.activities = activities
					})
					.catch((err) => {
						console.log('Couldn\'t get activities:', err)
					})
			},

			send(e) {
				// console.log(this.current)

				// // send.textContent = "Sending...";
				// this.current.application.type = this.current.isPersonal ? "personal" : "group";
				// // TODO - catch bugs and exceptions
				// this.current.application.work = [];

				// var that = this;

				// this.current.users.some(cur_user => {
				// 	var activity_id = that.activities.find(x => x.id == cur_user.activity_id).id,
				// 		amount = parseInt(cur_user.amount) || null;

				// 	that.current.application.work.push({
				// 		activity_id: activity_id,
				// 		amount: this.isTemporaryActivity(activity_id) ? amount : null,
				// 		actor: cur_user.user_id
				// 	});

				// 	if (that.current.isPersonal) return true;
				// });

				// this.current.application.comment = this.current.comment;
				// this.current.application.files = this.current.files;

				// this.user.innopoints.api.user.application.create(
				// 	this.current.application,
				// 	this.sendSuccess,
				// 	this.error)
			},

			// sendSuccess(result) {
			// 	send.textContent = "Sent";
			// 	this.$router.push('/innopoints/' + this.$root.user.account.username + '/applications/in_process')
			// },

			// error(error) {
			// 	alert('Unsuccessful: ' + error);
			// 	send.textContent = "Failed to Send";
			// },
		},
	}
</script>