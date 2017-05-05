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
								@change="fetchApps",
							)
								md-option(value="in_process") In&nbsp;process
								md-option(value="rejected") Rejected
								md-option(value="approved") Approved
								//- md-option(value="rework") In&nbsp;rework
				.col
			.row
				.col-12
					template(v-if="!apps")
						.text-center
							md-spinner(md-indeterminate, :md-size="100")
					template(v-else-if="apps.length <= 0")
						.text-center
							p.md-title.text-muted Empty
					template(v-else)
						applicationCard.application.my-3(
							v-for="app in filterBy(apps, search, ['comment', 'status', 'id', 'type', 'author.username', 'work'])",
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
				apps: null,
				currApp: null,

				status: 'in_process',
			}
		},

		components: {
			applicationCard,
		},

		// created () {
		// 	this.fetchApps()
		// },

		// watch: {
		// 	$route: 'fetchApps',
		// },

		activated () {
			this.fetchApps()
		},

		methods: {
			fetchApps () {
				Admin.Application.many({ status: this.status })
					.then((result) => {
						console.log('Fetched applications:', result)
						this.apps = result.applications
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
					Admin.Application.review({ application_id: this.currApp.id, action: 'approve' })
						.then((result) => {
							this.apps.splice(this.apps.indexOf(this.currApp), 1)
							console.log('Approved application:', result)
							this.currApp = null
							this.fetchApps()
						})
						.catch((err) => {
							console.error('Failed to approve application:', err)
							this.currApp = null
						})
				}
			},

			confirmReject (type) {
				if (type === 'ok') {
					Admin.Application.review({ application_id: this.currApp.id, action: 'reject' })
						.then((result) => {
							this.apps.splice(this.apps.indexOf(this.currApp), 1)
							console.log('Rejected application:', result)
							this.currApp = null
							this.fetchApps()
						})
						.catch((err) => {
							console.error('Failed to reject application:', err)
							this.currApp = null
						})
				}
			},
		},
	}
</script>