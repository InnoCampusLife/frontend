<style lang="scss">
	.md-card + .md-card {
		margin-top: 16px;
	}

	.md-card-content > p:last-child {
		margin-bottom: 0;
	}
</style>

<template lang="jade">

	md-card(:status="application.status", :id="'card-' + application.id")

			md-card-area
				md-card-content
					.row.align-items-center
						.col
							.md-title
								span(:class="'text-' + styleBasedOnStatus") {{ application.status | startCase }}
						.col-12.col-sm-auto
							.md-subhead
								span {{ application.creation_time }} {{ application.creation_date }}

				span

			md-card-area
				md-card-header
					.row.align-items-center
						.col
							.md-title
								span.text-muted  {{ '#' + application.id }} in
								span  {{ application.work[0].activity.category.title | startCase }}
						.col-12.col-sm-auto
							.md-subhead
								span by <a :href="'/account/' + application.author.username" :title="application.author.username">{{ application.author.username }}</a>

				md-card-content
					// h5.md-title
					// 	span(v-if="application.work.length > 1") Participants
					// 	span(v-else) Participant
					md-table
						md-table-header
							md-table-row
								md-table-head(md-numeric) #
								md-table-head Username
								md-table-head Activity
								md-table-head(md-numeric) Amount
						md-table-body
							md-table-row(v-for="(work, index) in application.work", :key="index")
								md-table-cell(md-numeric) {{ index + 1 }}
								md-table-cell
									// FIXME: Use router-link
									a(:href="'/account/' + work.actor.username") {{ work.actor.username }}
								md-table-cell {{ work.activity.title }}
								md-table-cell(md-numeric) {{ work.activity.price }}

					// .table-responsive
					// 	table.table.table-striped.table-bordered.table-sm
					// 		thead
					// 			tr
					// 				th.text-xs-center #
					// 				th.text-xs-center Username
					// 				th.text-xs-center Activity
					// 				th.text-xs-center Amount
					// 		tbody
					// 			tr(v-for="(work, index) in application.work")
					// 				th(scope='row') {{ index + 1 }}
					// 				td
					// 					a(:href="'/account/' + work.actor.username") {{ work.actor.username }}
					// 				td {{  work.activity.title }}
					// 				td {{  work.activity.price }}

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
					p {{ application.comment }}

			md-card-actions(v-if="user.innopoints.data.isAdmin && application.status=='in_process'")
				button.btn.btn-block.btn-outline-success(:data-id="application.id", @click="approve") Approve
				button.btn.btn-block.btn-outline-warning(:data-id="application.id", @click="toRework") To rework
				button.btn.btn-block.btn-outline-danger(:data-id="application.id", @click="reject") Reject

			// md-card-actions(v-if="!user.innopoints.data.isAdmin && application.status!='approved'")
			// 	button.btn.btn-block.btn-outline-danger(:data-id="application.id", @click="_delete", v-show="(application.status=='in_process' || application.status=='rework')") Delete
			// 	button.btn.btn-block.btn-primary(:data-id="application.id", @click="resend", v-show="(application.status=='rework')") Resend

</template>

<script>
	import { startCase } from 'lodash'

	export default {
		name: 'innopoints-application',

		props: ['application', 'user', 'success'],

		computed: {
			styleBasedOnStatus() {
				switch(this.application.status) {
					case 'in_process': return 'primary'
					case 'rejected':   return 'danger'
					case 'rework':     return 'warning'
					case 'approved':   return 'success'
					default: return 'secondary'
				}
			}
		},

		filters: {
			startCase,
		},

		methods: {
			approve(e) {
				this.user.innopoints.api.user.application.approve(e.target.dataset.id, (result) => {
					this.success(e.target.dataset.id, 'approved');
				}, console.log);
			},

			reject(e) {
				this.user.innopoints.api.user.application.reject(e.target.dataset.id, (result) => {
					this.success(e.target.dataset.id, 'rejected');
				}, console.log);
			},

			// FIXME: api method doesn't work
			toRework(e) {
				this.user.innopoints.api.user.application.to_rework({ appl_id: e.target.dataset.id }, (result) => {
					this.success(e.target.dataset.id, 'rework');
				}, console.log);
			},

			// FIXME: doesn't work
			_delete(e) {
				this.user.innopoints.api.user.application.delete(e.target.dataset.id, (result) => {
					console.log(result);
					document.getElementById('card' + e.target.dataset.id).remove();
				}, console.log);
			},

			resend(e) {
				this.user.innopoints.api.user.application.send(e.target.dataset.id, (result) => {
					this.success(e.target.dataset.id, 'resend');
				}, console.log);
			},
		}
	}
</script>
