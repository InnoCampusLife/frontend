<style lang="scss">
</style>

<template lang="pug">
	md-card(:status="application.status", :id="'card-' + application.id")
		md-card-area
			md-card-content
				.row.align-items-center
					.col
						.md-title
							span(:class="'text-' + styleBasedOnStatus") {{ application.status | startCase }}
					.col-12.col-sm-auto
						.md-subhead
							span {{ creationDateStr }}
			span
		md-card-area
			md-card-header
				.row.align-items-center
					.col
						.md-title
							span.text-muted  {{ '#' + application.id }}
							span  {{ application.type | startCase }}
					.col-12.col-sm-auto
						.md-subhead
							span by <a :href="'/account/' + application.author.username" :title="application.author.username">{{ application.author.username }}</a>
			md-card-content
				md-table
					md-table-header
						md-table-row
							md-table-head(md-numeric) #
							md-table-head Username
							md-table-head Category
							md-table-head Activity
							md-table-head(md-numeric) Hours
							md-table-head(md-numeric) IUP
					md-table-body
						md-table-row(v-for="(work, index) in application.work", :key="index")
							md-table-cell(md-numeric) {{ index + 1 }}
							md-table-cell
								// FIXME: Use router-link
								a(:href="'/account/' + work.actor.username") {{ work.actor.username }}
							md-table-cell {{ work.activity.category.title }}
							md-table-cell {{ work.activity.title }}
							md-table-cell(md-numeric)
								span(v-if="work.amount") {{ work.amount }}
								span(v-else) —
							md-table-cell(md-numeric) {{ work.total_price }}

				// template(v-if="application.files.length > 0")
				// 	h5
				// 		span(v-if="application.files.length > 1") Files
				// 		span(v-else) File
				// 	.table-responsive
				// 		table.table.table-striped.table-bordered.table-sm
				// 			thead
				// 				tr
				// 					th.text-xs-center #
				// 					th.text-xs-center Name
				// 					th.text-xs-center Type
				// 			tbody
				// 				tr(v-for='(f, index) in application.files')
				// 					th(scope='row') {{ index + 1 }}
				// 					td {{ f.filename }}
				// 					td {{ f.type }}

			md-card-content(v-if="application.comment && application.comment.length")
				// h5.md-title Comment
				p(v-for="para in paras") {{ para }}
		md-card-area
			md-card-actions(v-if="application.status === ('in_process' || 'rework')")
				md-button.md-warn(@click="deleteApp") Delete

			// md-card-actions(v-if="user.innopoints.data.isAdmin && application.status=='in_process'")
			// 	button.btn.btn-block.btn-outline-success(:data-id="application.id", @click="approve") Approve
			// 	button.btn.btn-block.btn-outline-warning(:data-id="application.id", @click="toRework") To rework
			// 	button.btn.btn-block.btn-outline-danger(:data-id="application.id", @click="reject") Reject

			// md-card-actions(v-if="!user.innopoints.data.isAdmin && application.status!='approved'")
			// 	button.btn.btn-block.btn-primary(:data-id="application.id", @click="resend", v-show="(application.status=='rework')") Resend

</template>

<script>
	export default {
		name: 'innopoints-application-component',

		props: ['application', 'user'],

		computed: {
			styleBasedOnStatus() {
				switch(this.application.status) {
					case 'in_process': return 'primary'
					case 'rejected':   return 'danger'
					case 'rework':     return 'warning'
					case 'approved':   return 'success'
					default: return 'secondary'
				}
			},

			paras() {
				return this.application.comment.split('\n')
			},

			creationDateStr() {
				return new Date(this.application.creation_date * 1000).toDateString()
			}
		},

		methods: {
			deleteApp() {
				this.$emit('deleteApp', this.application);
			},

			// approve(e) {
			// 	this.user.innopoints.api.user.application.approve(e.target.dataset.id, (result) => {
			// 		this.success(e.target.dataset.id, 'approved');
			// 	}, console.log);
			// },

			// reject(e) {
			// 	this.user.innopoints.api.user.application.reject(e.target.dataset.id, (result) => {
			// 		this.success(e.target.dataset.id, 'rejected');
			// 	}, console.log);
			// },

			// // FIXME: api method doesn't work
			// toRework(e) {
			// 	this.user.innopoints.api.user.application.to_rework({ appl_id: e.target.dataset.id }, (result) => {
			// 		this.success(e.target.dataset.id, 'rework');
			// 	}, console.log);
			// },

			// resend(e) {
			// 	this.user.innopoints.api.user.application.send(e.target.dataset.id, (result) => {
			// 		this.success(e.target.dataset.id, 'resend');
			// 	}, console.log);
			// },
		}
	}
</script>
