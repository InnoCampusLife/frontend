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
							)
								md-option(value="") All
								md-option(value="in_process") In&nbsp;process
								md-option(value="rejected") Rejected
								md-option(value="rework") In&nbsp;rework
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
						transition-group.application-list(name="application-list" tag="div")
							applicationCard.application.my-2(
								v-for="app in filterBy(filteredApps, search, ['comment', 'status', 'id', 'type', 'author.username', 'work'])",
								:application="app",
								:key="app.id",
								@deleteApplication="openDeleteConfirm",
								@approveApp="openApproveConfirm",
								@rejectApp="openRejectConfirm",
							)
		md-dialog-confirm(
			:md-title="`Delete application #${currentApp ? currentApp.id : ''}?`",
			md-content="This cannot be undone.",
			md-ok-text="Delete",
			md-cancel-text="Cancel",
			@close="confirmDelete",
			ref='deleteConfirm',
		)
		router-link.md-fab.md-fab-bottom-right(
			tag="md-button",
			:to="{ name: 'apply' }",
		)
			md-icon add
</template>

<script>
	import applicationCard from './../components/application-card'
	import { Application } from 'Modules/innopoints/innopoints-api'

	export default {
		name: 'innopoints-applications',

		props: ['search'],

		data () {
			return {
				applications: [],
				paginate: ['applications'],
				currentApp: null,

				status: '',
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

		created() {
			this.fetchData()
		},

		watch: {
			$route: 'fetchData',
		},

		methods: {
			fetchData () {
				Application.many()
					.then((result) => {
						console.log('Fetched applications:', result)
						this.applications = result.applications
					})
					.catch((err) => console.log('Couldn\'t fetch applications:', err))
			},

			openDeleteConfirm (app) {
				this.currentApp = app
				this.$refs['deleteConfirm'].open()
			},

			openApproveConfirm (app) {
				this.currentApp = app
				this.$refs['approveConfirm'].open()
			},

			openRejectConfirm (app) {
				this.currentApp = app
				this.$refs['rejectConfirm'].open()
			},

			confirmDelete (type) {
				if (type === 'ok') {
					Application.delete({ application_id: this.currentApp.id })
						.then((result) => {
							this.applications.splice(this.applications.indexOf(this.currentApp), 1)
							console.log('Deleted application:', result)
							this.currentApp = null
							this.fetchData()
						})
						.catch((err) => {
							console.error('Failed to delete application:', err)
							this.currentApp = null
						})
				}
			},
		},
	}
</script>