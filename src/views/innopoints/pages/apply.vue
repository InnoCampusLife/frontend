<style lang="scss" scoped>
</style>

<template lang="pug">
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
										md-option(v-for='c in categories', :key="c.id", :value="c.id") {{ c.title | startCase }}

					md-card-content
						.md-title(v-if='participants.length > 1') Participants
						.md-title(v-else) Participant

						md-card.participant.my-2(v-for='(part, index) of participants', :key="index")
							md-card-content

								md-input-container(:class="{ 'md-input-invalid': $v.participants.$each[index].username.$error }")
									md-icon account_circle
									label(:for="'username_' + index") Username
									md-input(
										required,
										type='text',
										:id="'username_' + index",
										:name="'username_' + index",
										:value="part.username",
										@input="debouncedUpdateUsername(index, $event)",
									)
									span.md-error(v-if="!$v.participants.$each[index].username.required")
										span Required
									span.md-error(v-else-if="!$v.participants.$each[index].username.minLength")
										span Too short
									span.md-error(v-else-if="!$v.participants.$each[index].username.maxLength")
										span Too long
									span.md-error(v-else-if="!$v.participants.$each[index].username.exists")
										span Ivalid or does not exist
									span.md-error(v-else-if="!$v.participants.$each[index].username.doesNotRepeat")
										span Cannot repeat
									span.md-error(v-else-if="!$v.participants.$each[index].username.isAuthorPresent")
										span Author must be present

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
										md-option(v-for='a in activities', :key="a.id", :value="a.id") {{ a.title }}
									span.md-error(v-if="!$v.participants.$each[index].activity_id.required")
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
									span.md-error(v-if="!$v.participants.$each[index].hours.required")
										span Required
									span.md-error(v-if="!$v.participants.$each[index].hours.between")
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
						md-input-container(:class="{ 'md-input-invalid': $v.filesStr.$error }")
							md-icon insert_drive_file
							label(for="upload") Files
							md-file#upload(
								multiple,
								v-model='filesStr',
								name="upload",
								@input="$v.filesStr.$touch()",
							)
							span.md-error(v-if="!$v.filesStr.areNotTooBig")
								span Files cannot exceed 10MB

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
	import { throttle, debounce } from 'lodash'
	import { required, minLength, maxLength, between } from 'vuelidate/lib/validators'
	import { Account } from 'Modules/accounts/accounts-api'
	import { Category, Activity, Application, ApplicationFile } from 'Modules/innopoints/innopoints-api'
	import { mapGetters, mapState } from 'vuex'

	export default {
		name: 'innopoints-apply',

		data () {
			return {
				isLoading: false,

				categories: [],
				activities: [],

				category_id: null,
				filesStr: '',
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

						doesNotRepeat (username) {
							return !(this.participants.filter((p) => p.username === username).length > 1)
						},

						async exists (username) {
							if (/^\w{3,16}$/.test(username)) {
								try {
									return await Account.exists({ username })
								} catch (err) {
									console.error('Failed to check username:', err)
								}
							}
							return false
						},

						isAuthorPresent (username) {
							if (!this.isModerator) {
								return this.participants.map((p) => p.username).includes(this.username)
							}
							return true
						},
					},

					activity_id: {
						required,
					},

					hours: {
						between (hours, parentVm) {
							if (this.isHourlyActivity(parentVm.activity_id)) return between(1, 10000)(hours)
							return true
						},

						required (hours, parentVm) {
							if (this.isHourlyActivity(parentVm.activity_id)) return required(hours)
							return true
						},
					},
				},
			},

			filesStr: {
				areNotTooBig () {
					const input = document.querySelector('input[type="file"]')
					const fileList = input ? input.files : []
					for (let i = 0; i < fileList.length; i++) { if ((fileList[i].size / 1000000) > 10) return false }
					return true
				},
			},
		},

		created () {
			this.fetchData()
		},

		// watch: {
		// 	$route: 'fetchData',
		// },

		activated () {
			this.fetchData()
		},

		computed: {
			...mapState('accounts', [
				'username',
			]),

			...mapGetters('accounts', [
				'isModerator',
			]),
		},

		methods: {
			fetchData () {
				this.isLoading = true

				this.updateAcivities()

				Category.many()
					.then((categories = []) => {
						console.log('Got categories:', categories)
						this.categories = categories
						this.isLoading = false
					})
					.catch((err) => {
						console.error('Failed to get categories:', err)
					})
			},

			updateUsername (index, value) {
				this.participants[index].username = value
				this.$v.participants.$each[index].username.$touch()
			},

			debouncedUpdateUsername: debounce(function (index, value) { return this.updateUsername(index, value) }, 250),

			innopoints (id, hours) {
				const activity = this.activities.find(a => a.id === id);
				if (activity) {
					if (this.isHourlyActivity(id) && hours > 0) {
						return activity.price * hours
					}
					return activity.price
				}
				return null
			},

			isHourlyActivity (id) {
				return !!this.activities
					.filter((a) => a.type === 'hourly')
					.find((a) => a.id === id);
			},

			addParticipant () {
				this.participants.push({
					username: '',
					activity_id: null,
					hours: 1,
				})
			},

			removeParticipant () {
				this.participants.pop()
			},

			updateAcivities (value) {
				Activity.many({ category_id: value })
					.then((activities = []) => {
						console.log('Updated activities:', activities)

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

			async submit () {
				console.log('Valid:', !this.$v.$invalid)

				if (this.$v.$invalid) {
					this.$v.$touch()
					return
				}

				let fileIds = []
				let work = []

				const fileList = document.querySelector('input[type="file"]').files

				if (fileList.length > 0) {
					try {
						const files = []

						for(let i = 0; i < fileList.length; i++) { files.push(fileList[i]) }

						fileIds = await Promise.all(files.map((f) => {
							const formData = new FormData()
							formData.append(f.name, f)
							return ApplicationFile.create({ body: formData })
						}))
					} catch (err) {
						console.error('Failed to upliad files:', err)
					}
				}

				try {
					work = await Promise.all(this.participants.map(async (p) => {
						const actor = (await Account.one({ username: p.username })).id
						const amount = this.isHourlyActivity(p.activity_id) ? p.hours : null
						const activity_id = p.activity_id
						return { actor, amount, activity_id }
					}))
				} catch (err) {
					console.error('Failed to get IDs:', err)
				}

				Application.create({
					body: {
						application: {
							work,
							comment: this.comment,
							type: this.isModerator ? 'group' : work.length > 1 ? 'group' : 'personal',
							files: fileIds.map((ids) => ids[0].id),
						}
					}
				})
				.then((result) => {
					console.log('Application sumitted:', result)
				})
				.then(() => {
					this.category_id = null
					this.filesStr = ''
					this.comment = ''
					this.participants = [
						{
							username: '',
							activity_id: null,
							hours: 1,
						},
					]

					this.$v.$reset()
				})
				.then(() => {
					this.$router.push({ name: 'applications' })
				})
				.catch((err) => {
					console.error('Failed to submit application:', err)
				})
			},

			throttledSubmit: throttle(function () { return this.submit() }, 500),
		},
	}
</script>
