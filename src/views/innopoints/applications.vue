<style lang="scss">
</style>

<template lang="pug">
	layout
		template(slot="app-bar")
			.row
				.col
					h1.md-title
						span.hidden-xs-down Innopoints
						span.hidden-xs-down &ensp;&ndash;&ensp;
						span Applications
				.col.col-auto
					.search.hidden-sm-down
						md-button.md-icon-button
							md-icon search
						md-input-container(md-inline)
							label(for="search") Search
							md-input#search(name="search", type="search", v-model="search")
		template(slot="content")
			.container.pt-0
				.row.align-items-end
					.col-12.col-sm-auto
							md-input-container
								md-icon filter_list
								md-select#filter(name="filter", v-model="status")
									md-option(value="") All
									md-option(value="in_process") In&nbsp;process
									md-option(value="rejected") Rejected
									md-option(value="rework") In&nbsp;rework
									md-option(value="approved") Approved
					.col(v-show="filteredApps.length >= 50 && search === ''")
						.text-center.text-sm-left.mb-4
							span Showing only the first 50 applications.
				.row
					.col-12
						template(v-if="isLoading")
							.text-center
								md-spinner(md-indeterminate, :md-size="100")
						template(v-else-if="filteredApps.length <= 0")
							.text-center
								p.md-display-1 Empty
						template(v-else)
							transition-group.application-list(name="application-list" tag="div")
								application.application.my-2(
									v-for="app in filterBy(filteredApps, search, 'comment', 'status', 'id', 'type', 'author.username', 'creation_date', 'work')",
									@deleteApp="openDeleteConfirm",
									:application="app",
									:user="user",
									:success="action_success",
									:key="app.id",
								)
							md-dialog-confirm(
								:md-title="`Delete application #${currentApp.id}?`",
								md-content="This cannot be undone."
								md-ok-text="Delete",
								md-cancel-text="Cancel",
								@close="confirmDelete"
								ref='deleteConfirm',
							)
			router-link.md-fab.md-fab-bottom-right(
				tag="md-button",
				:to="{ name: 'apply' }",
			)
				md-icon add
</template>

<script>
	import _ from 'lodash'

	export default {
		name: 'innopoints-applications',

		data() {
			return {
				isLoading: false,
				user: this.$root.user,
				applications: [],
				status: '',
				search: '',
				currentApp: {},
			}
		},

		components: {
			application: require('./components/application.vue'),
			layout: require('./../layout.vue'),
		},

		computed: {
			filteredApps() {
				return this.applications
					.filter((app) => {
						if (this.status === '') return true
						if (this.status === app.status) return true
						return false
					})
					.sort((a, b) => b.timestamp - a.timestamp)
			},
		},

		created() {
			this.fetchData()
		},

		filters: {
			startCase: require('lodash').startCase,
		},

		watch: {
			'$route': 'fetchData',
		},

		methods: {
			fetchData() {
				this.isLoading = true
				this.$root.api.innopoints.applications.many({ limit: 50 })
					.then((json) => {
						this.isLoading = false
						console.log('Fetched applications:', json.result)
						json.result.applications.forEach((app) => {
							app.timestamp = app.creation_date
							app.creation_date = new Date(app.creation_date * 1000).toDateString()
						})
						this.applications = json.result.applications
					})
					.catch((err) => console.log('Couldn\'t fetch applications:', err))
			},

			openDeleteConfirm(app) {
				this.currentApp = app
				this.$refs['deleteConfirm'].open()
			},

			updateApplications() {
				this.$root.api.innopoints.applications.many({ limit: 50 })
					.then((json) => {
						console.log('Fetched applications:', json.result)
						json.result.applications.forEach((app) => {
							app.timestamp = app.creation_date
							app.creation_date = new Date(app.creation_date * 1000).toDateString()
						})
						this.applications = json.result.applications
					})
					.catch((err) => console.log('Couldn\'t fetch applications:', err))
			},

			confirmDelete(type) {
				if (type === 'ok') {
					this.$root.api.innopoints.applications.delete({ application_id: this.currentApp.id })
						.then((json) => {
							this.applications.splice(this.applications.indexOf(this.currentApp), 1)
							console.log('Deleted application:', json)
							this.currentApp = {}
							this.updateApplications()
						})
						.catch((err) => {
							console.error('Failed to delete application:', err)
							this.currentApp = {}
						})
				}
			},

			action_success(id, new_status) {
				const apps = this.applications
				const app = this.applications.find(a => a.id == id)
				console.log(app)
				if (this.$route.params.filter === 'all' || this.$route.params.filter == null) {
					app.status = new_status;
				} else {
					apps.splice(apps.indexOf(app), 1)
				}
			},
		},
	}
</script>