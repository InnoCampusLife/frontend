<style lang="scss">
</style>

<template lang="pug">
	div
		.container.pt-0
			.row.align-items-end
				.col.col-auto
						md-input-container
							md-icon filter_list
							md-select(
								id="filter",
								name="filter",
								v-model="status",
								@change="fetchData",
							)
								md-option(value="in_process") In&nbsp;process
								md-option(value="rejected") Rejected
								//- md-option(value="rework") In&nbsp;rework
								md-option(value="approved") Approved
				.col
				//- .col.col-auto
				//- 	.mb-3
				//- 		md-button.md-icon-button.md-raised(
				//- 			@click="prevPage",
				//- 			:disabled="currPage <= 1",
				//- 		)
				//- 			md-icon keyboard_arrow_left
				//- 		md-button.md-icon-button.md-raised(
				//- 			@click="nextPage",
				//- 			:disabled="currPage >= totalPages",
				//- 		)
				//- 			md-icon keyboard_arrow_right
			.row
				.col-12
					template(v-if="!filteredApps")
						.text-center
							md-spinner(md-indeterminate, :md-size="100")
					template(v-else-if="filteredApps.length <= 0")
						.text-center
							p.md-display-1 Empty
					template(v-else)
						applicationCard.application.my-2(
							v-for="app in filterBy(filteredApps, search, ['comment', 'status', 'id', 'type', 'author.username', 'work'])",
							:application="app",
							:key="app.id",
							:isReview="true"
							@approveApp="openApproveConfirm",
							@rejectApp="openRejectConfirm",
						)
		md-dialog-confirm(
			:md-title="`Approve application #${currApp ? currApp.id : ''}?`",
			md-content="This cannot be undone.",
			md-ok-text="Approve",
			md-cancel-text="Cancel",
			@close="confirmApprove",
			ref='approveConfirm',
		)
		md-dialog-confirm(
			:md-title="`Reject application #${currApp ? currApp.id : ''}?`",
			md-content="This cannot be undone.",
			md-ok-text="Reject",
			md-cancel-text="Cancel",
			@close="confirmReject",
			ref='rejectConfirm',
		)
</template>

<script>
	import applicationCard from './../components/application-card'
	import { Admin } from 'Modules/innopoints/innopoints-api'

	export default {
		name: 'innopoints-applications',

		props: ['search'],

		data () {
			return {
				applications: [],
				currApp: null,

				status: 'in_process',
				statuses: ['in_process', 'rework', 'rejected', 'approved'],
			}
		},

		components: {
			applicationCard,
		},

		computed: {
			normStatus() {
				return this.statuses.includes(this.status) ? this.status : ''
			},

			filteredApps() {
				return this.applications
					.filter((app) => {
						if (this.status === '') return true
						if (this.status === app.status) return true
						return false
					})
					.sort((a, b) => b.creation_date - a.creation_date)
			},
		},

		// created () {
		// 	this.fetchData()
		// },

		// watch: {
		// 	$route: 'fetchData',
		// },

		// activated () {
		// 	this.fetchData()
		// },

		methods: {
			fetchData () {
				Admin.Application.many({ status: this.status })
					.then((result) => {
						console.log('Fetched applications:', result)
						this.applications = result.applications
					})
					.catch((err) => console.log('Couldn\'t fetch applications:', err))
			},

			openApproveConfirm (app) {
				this.currApp = app
				this.$refs['approveConfirm'].open()
			},

			openRejectConfirm (app) {
				this.currApp = app
				this.$refs['rejectConfirm'].open()
			},

			confirmApprove (type) {
				if (type === 'ok') {
					Admin.Application.review({
						account_id: this.currApp.author.id,
						application_id: this.currApp.id,
						action: 'approve',
					})
						.then((result) => {
							this.applications.splice(this.applications.indexOf(this.currApp), 1)
							console.log('Approved application:', result)
							this.currApp = null
							this.fetchData()
						})
						.catch((err) => {
							console.error('Failed to approve application:', err)
							this.currApp = null
						})
				}
			},

			confirmReject (type) {
				if (type === 'ok') {
					Admin.Application.review({
						account_id: this.currApp.author.id,
						application_id: this.currApp.id,
						action: 'reject',
					})
						.then((result) => {
							this.applications.splice(this.applications.indexOf(this.currApp), 1)
							console.log('Rejected application:', result)
							this.currApp = null
							this.fetchData()
						})
						.catch((err) => {
							console.error('Failed to reject application:', err)
							this.currApp = null
						})
				}
			}
		},
	}
</script>