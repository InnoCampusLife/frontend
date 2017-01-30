<style lang="scss">
	.md-title {
		flex: 1;
	}

	// FIXME
	.md-icon + .md-select {
		margin-left: 12px;
	}
</style>

<template lang="jade">
	layout

		template(slot="app-bar")
			h1.md-title
				span Innopoints
				span &ensp;&ndash;&ensp;
				span Applications

			router-link.md-raised(
				tag="md-button",
				:to="{ name: 'apply' }",
			)
				span Apply

			.search
				md-button.md-icon-button
					md-icon search

				md-input-container(md-inline)
					label Search
					md-input(type="text", v-model="search")

			// md-theme(md-name="dark")
			// 	md-input-container.search-input-container
			// 		// label(for="search") Search
			// 		md-input#search(
			// 			type="search",
			// 			name="search",
			// 			placeholder="Search",
			// 			v-model="search")

		template(slot="content")

			.container
				.row
					.col-12.col-sm-auto
							md-input-container
								md-icon filter_list
									md-tooltip Filter
								md-select#filter(name="filter", v-model="status", @change="fetchData")
									md-option(value="") All
									md-option(value="in_process") In&nbsp;process
									md-option(value="rejected") Rejected
									md-option(value="rework") In&nbsp;rework
									md-option(value="approved") Approved
				.row
					.col-12
						template(v-if="isLoading")
							.text-center
								md-spinner(md-indeterminate, :md-size="100")
						template(v-else-if="applications.length <= 0")
							.text-center
								.md-title Empty :(
						template(v-else)
							application(v-for="app in applications", :application="app", :user="user", :success="action_success")
							// application(
							// 	v-for="app in applications | filterBy $root.query in 'type' 'id' 'comment' 'creation_date' 'author.username' | orderBy 'creation_time' -1",
							// 	:application="app",
							// 	:user="user",
							// 	:success="action_success"
							// )
</template>

<script>
	import innopoints from './../../modules/innopoints'

	export default {
		name: 'innopoints-applications',

		data() {
			return {
				isLoading: false,
				user: this.$root.user,
				applications: [],
				status: '',
				search: '',
			}
		},

		components: {
			application: require('./components/application.vue'),
			layout: require('./../layout'),
		},

		// created() {
		// 	this.fetchData()
		// },

		filters: {
			startCase: require('lodash').startCase,
		},

		watch: {
			'$route': 'fetchData',
		},

		methods: {

			fetchData() {
				this.isLoading = true

				innopoints.applications.many({ status: this.status })
					.then((json) => {
						console.log('Fetched applications:', json.result)
						json.result.applications.forEach((res) => {
							const timestamp = res.creation_date * 1000
							res.creation_time = new Date(timestamp).toLocaleTimeString('ru')
							res.creation_date = new Date(timestamp).toLocaleDateString('ru')
						})
						this.applications = json.result.applications
						this.isLoading = false
					})
					.catch((err) => console.log('Couldn\'t fetch applications:', err))
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