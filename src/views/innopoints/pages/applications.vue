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
								md-option(value="") All
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
							p.md-title.text-muted Empty
					template(v-else)
						transition-group.application-list(name="application-list" tag="div")
							applicationCard.application.my-2(
								v-for="app in filterBy(filteredApps, search, ['comment', 'status', 'id', 'type', 'author.username', 'work'])",
								:application="app",
								:key="app.id",
								:isReview="false",
								@deleteApp="openDeleteConfirm",
							)
		md-dialog-confirm(
			:md-title="`Delete application #${currApp ? currApp.id : ''}?`",
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
				currApp: null,

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
				Application.many()
					.then((result) => {
						console.log('Fetched applications:', result)
						this.applications = result.applications
					})
					.catch((err) => console.log('Failed to fetch applications:', err))
			},

			openDeleteConfirm (app) {
				this.currApp = app
				this.$refs['deleteConfirm'].open()
			},

			confirmDelete (type) {
				if (type === 'ok') {
					Application.delete({ application_id: this.currApp.id })
						.then((result) => {
							this.applications.splice(this.applications.indexOf(this.currApp), 1)
							console.log('Deleted application:', result)
							this.currApp = null
							this.fetchData()
						})
						.catch((err) => {
							console.error('Failed to delete application:', err)
							this.currApp = null
						})
				}
			},
		},
	}
</script>