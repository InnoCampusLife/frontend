<style lang="less">

</style>

<template lang="jade">

	.card.card-block(status="{{ application.status }}", id="card-{{ application.id }}")

			h2.card-title
				span.tag.tag-default.float-xs-left.mr-1(class="tag-{{ styleBasedOnStatus }}")
					span {{ application.status.split('_').join(' ') | capitalize }}
				span.text-muted  {{ '#' + application.id }} in
				span  {{ application.work[0].activity.category.title }}
				small.text-muted  by <a href="/profile/{{ application.author.username }}" title="{{ application.author.username }}">{{ application.author.username }}</a>
					small.text-muted  on {{ application.creation_date }} at {{ application.creation_time }}

			h5
				span(v-if="application.work.length > 1") Participants
				span(v-else) Participant
			.table-responsive
				table.table.table-striped.table-bordered.table-sm
					thead
						tr
							th.text-xs-center #
							th.text-xs-center Username
							th.text-xs-center Activity
							th.text-xs-center Amount
					tbody
						tr(v-for="work in application.work")
							th(scope='row') {{ $index + 1 }}
							td
								a(href="/profile/{{ work.actor.username }}") {{ work.actor.username }}
							td {{  work.activity.title }}
							td {{  work.activity.price }}

			template(v-if="application.files.length > 0")
				h5
					span(v-if="application.files.length > 1") Files
					span(v-else) File
				.table-responsive
					table.table.table-striped.table-bordered.table-sm
						thead
							tr
								th.text-xs-center #
								th.text-xs-center Name
								th.text-xs-center Type
						tbody
							tr(v-for='f in application.files')
								th(scope='row') {{ $index + 1 }}
								td {{ f.filename }}
								td {{ f.type }}

			template(v-if="application.comment && application.comment.length")
				h5 Comment
				p {{ application.comment }}

			.templatek(v-if="user.innopoints.data.isAdmin && application.status=='in_process'")
				.row
					.col-sm
						p
							button.btn.btn-block.btn-outline-success(data-id="{{ application.id }}" @click="approve") Approve
					.col-sm
						p
							button.btn.btn-block.btn-outline-warning(data-id="{{ application.id }}" @click="toRework") To rework
					.col-sm
						p
							button.btn.btn-block.btn-outline-danger(data-id="{{ application.id }}" @click="reject") Reject

			template(v-if="!user.innopoints.data.isAdmin && application.status!='approved'")
				.row
					.col-sm
						p
							button.btn.btn-block.btn-outline-danger(data-id="{{application.id}}" @click="_delete" v-show="(application.status=='in_process' || application.status=='rework')") Delete
					.col-sm
						p
							button.btn.btn-block.btn-primary(data-id="{{application.id}}" @click="resend" v-show="(application.status=='rework')") Resend
</template>

<script>

	export default {

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
