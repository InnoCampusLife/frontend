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
							span by
							router-link(
								:to="{ name: 'profile', params: { id: application.author.id } }"
							)
								span  {{ application.author.username }}
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
								router-link(:to="{ name: 'profile', params: { id: work.actor.id } }") {{ work.actor.username }}
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
				md-button.md-primary(v-if="isReview", @click="approveApp") Approve
				md-button.md-warn(v-if="isReview", @click="rejectApp") Reject
				md-button.md-warn(v-if="!isReview", @click="deleteApp") Delete
</template>

<script>
	export default {
		name: 'innopoints-application-component',

		props: ['application', 'isReview'],

		computed: {
			styleBasedOnStatus () {
				switch (this.application.status) {
					case 'in_process': return 'primary'
					case 'rejected':   return 'danger'
					case 'rework':     return 'warning'
					case 'approved':   return 'success'
					default: return 'secondary'
				}
			},

			paras () {
				return this.application.comment.split('\n')
			},

			creationDateStr () {
				return new Date(this.application.creation_date * 1000).toDateString()
			},
		},

		methods: {
			deleteApp () {
				this.$emit('deleteApp', this.application);
			},

			approveApp () {
				this.$emit('approveApp', this.application);
			},

			rejectApp () {
				this.$emit('rejectApp', this.application);
			},
		}
	}
</script>
