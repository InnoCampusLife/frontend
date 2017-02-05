<style lang="scss" scoped>
</style>

<template lang="pug">
	layout

		template(slot="app-bar")
			.row
				.col
					h1.md-title
						span.hidden-xs-down Innopoints
						span.hidden-xs-down &ensp;&ndash;&ensp;
						span Apply
				.col.col-auto
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
											md-icon filter_list
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
											md-icon account_circle
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
											span(v-else-if="!$v.participants.$each[index].username.doesNotRepeat", class="md-error")
												span Cannot repeat

										md-input-container(:class="{ 'md-input-invalid': $v.participants.$each[index].activity_id.$error }")
											md-icon work
											label(:for="'activity_' + index") Activity
											md-select(
												required,
												placeholder="Select Activity",
												:id="'activity_' + index",
												:name="'activity_' + index",
												v-model="part.activity_id",
												@change="$v.participants.$each[index].activity_id.$touch()"
											)
												md-option(v-for='a in activities', :value="a.id") {{ a.title }}
											span(v-if="!$v.participants.$each[index].activity_id.required", class="md-error")
												span Required

										md-input-container(
											v-show="isHourlyActivity(part.activity_id)",
											:class="{ 'md-input-invalid': $v.participants.$each[index].hours.$error }",
										)
											md-icon timer
											label(:for="'hours_' + index") Hours
											md-input(
												required,
												:disabled='!isHourlyActivity(part.activity_id)',
												:id="'hours_' + index",
												:name="'hours_' + index",
												type='number',
												min='1',
												max='10000',
												step="1",
												v-model='part.hours',
												@input="$v.participants.$each[index].hours.$touch()"
											)
											span(v-if="!$v.participants.$each[index].hours.required", class="md-error")
												span Required
											span(v-if="!$v.participants.$each[index].hours.between", class="md-error")
												span Too little or too much

										md-input-container(v-show="!$v.participants.$each[index].activity_id.$invalid")
											md-icon info
											label(:for="'innopoints_' + index") Innopoints
											md-input(
												readonly,
												placeholder="IUP 0.00",
												:id="'innopoints_' + index",
												:name="'innopoints_' + index",
												type='text',
												:value="innopoints(part.activity_id, part.hours) | currency('IUP ')"
											)

								md-button.md-raised.ml-0.mr-3(type='button', @click='addParticipant')
									span Add
								md-button.md-warn.ml-0(
									type='button',
									@click='removeParticipant',
									v-if='participants.length > 1'
								)
									span Remove

							span
							md-card-content
								md-input-container
									md-icon insert_drive_file
									label(for="upload") Files
									md-file#upload(v-model='files', name="upload", multiple)

							md-card-content
								md-input-container
									md-icon comment
									label Comment
									md-textarea(v-model='comment')

							md-card-content
								md-button.md-raised.md-primary.mx-0.mb-0(type='button', @click="throttledSubmit")
									span Submit
</template>

<script>
	import _ from 'lodash'
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
						hours: 1,
					},
				],
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

						doesNotRepeat(username) {
							return !(this.participants.filter((p) => p.username === username).length > 1)
						},

						async exists(username) {
							if (/^\w{3,16}$/.test(username)) {
								try {
									return (await this.$root.api.accounts.exists({ username })).result
								} catch (err) {
									console.error('Failed to check username:', err)
								}
							}
							return false
						},
					},

					activity_id: {
						required,
					},

					hours: {
						between(hours, parentVm) {
							if (this.isHourlyActivity(parentVm.activity_id)) return between(1, 10000)(hours)
							else return true
						},

						required(hours, parentVm) {
							if (this.isHourlyActivity(parentVm.activity_id)) return required(hours)
							else return true
						},
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
					if (this.isHourlyActivity(id) && hours > 0) {
						return activity.price * hours
					}
					return activity.price
				}
				return null
			},

			isHourlyActivity(id) {
				return !!this.activities
					.filter((a) => a.type === 'hourly')
					.find((a) => a.id === id);
			},

			addParticipant() {
				this.participants.push({
					username: '',
					activity_id: null,
					hours: 1,
				})
			},

			removeParticipant() {
				this.participants.pop()
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

			async submit() {
				console.log('Valid:', !this.$v.$invalid)

				if (this.$v.$invalid) {
					this.$v.$touch()
					return
				}

				const work = await Promise.all(this.participants.map(async (p) => {
					const actor = (await this.$root.api.accounts.bio.one({ username: p.username })).result.id
					const amount = this.isHourlyActivity(p.activity_id) ? p.hours : null
					const activity_id = p.activity_id
					return { actor, amount, activity_id }
				}))

				const throttledCreate = _.throttle(this.$root.api.innopoints.applications.create, 5000)

				throttledCreate({
					body: {
						application: {
							comment: this.comment,
							type: work.length > 1 ? 'group' : 'personal',
							work: await Promise.all(this.participants.map(async (p) => {
								const actor = (await this.$root.api.accounts.bio.one({ username: p.username })).result.id
								const amount = this.isHourlyActivity(p.activity_id) ? p.hours : null
								const activity_id = p.activity_id
								return { actor, amount, activity_id }
							})),
						}
					}
				}).then((json) => {
					console.log(json.result)
				}).catch((err) => {
					console.log('Failed to submit application:', err)
				})
			},

			throttledSubmit: _.throttle(function () { this.submit() }, 250),
		},
	}
</script>