<style lang="less">

</style>

<template lang="jade">
	
	.card.card-block(status="{{ application.status }}", id="card-{{ application.id }}")
		
		span.float-xs-right {{ application.creation_date }}
		h2.card-title.clearfix
			span.tag.tag-default.tag-success.float-xs-left(status="{{ application.status }}") {{ application.status.split('_').join(' ') | capitalize }}
			span.float-xs-left.mx-1 {{(application._id = '#' + application.id)}} {{ application.type | capitalize }}
				small.text-muted  by {{application.author.username}}
		
		template(v-if="application.work && application.type == 'group'")
			h4
				template(v-if="application.work > 0") Participants
				template(v-else) Participant
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
		
		template(v-if="application.comment && application.comment.length")
			h4 Comment
			p.card-text {{ application.comment }}
		
		template(v-if="application.files.length > 0")
			h4 Files
			.table-responsive
				table.table.table-striped.table-bordered
					thead
						tr
							th.text-xs-center #
							th.text-xs-center Name
							th.text-xs-center Type
							th.text-xs-center Size
					tbody
						tr(v-for='f in application.files')
							th(scope='row') {{ $index + 1 }}
							td {{ f.name }}
							td {{ f.type }}
							td.text-xs-right {{ f.size }} KB
		
		.templatek(v-if="user.innopoints.data.isAdmin && application.status=='in_process'")
			.row
				.col-sm
					button.btn.btn-block.btn-outline-success(data-id="{{ application.id }}" @click="approve") Approve
				.col-sm
					button.btn.btn-block.btn-outline-warning(data-id="{{ application.id }}" @click="toRework") To rework
				.col-sm
					button.btn.btn-block.btn-outline-danger(data-id="{{ application.id }}" @click="reject") Reject
			
		template(v-if="!user.innopoints.data.isAdmin && application.status!='approved'")
			.row
				.col-sm
					button.btn.btn-block.btn-outline-danger(data-id="{{application.id}}" @click="_delete" v-show="(application.status=='in_process' || application.status=='rework')") Delete
				.col-sm
					button.btn.btn-block.btn-primary(data-id="{{application.id}}" @click="resend" v-show="(application.status=='rework')") Resend
</template>

<script>

	export default {
		
		props: ['application', 'user', 'success'],
		
		methods: {
			approve(e) {
				var _appls = this.applications;
				var success = this.success;
				this.user.innopoints.api.user.application.approve(e.target.dataset.id, (result) => {
					success(e.target.dataset.id, 'approved');
				}, console.log);
			},
			
			reject(e) {
				let _appls = this.applications;
				let success = this.success;
				let self = this
				this.user.innopoints.api.user.application.reject(e.target.dataset.id, (result) => {
					success(e.target.dataset.id, 'rejected');
				}, console.log);
			},
			
			// FIXME: api method doesn't work
			toRework(e) {
				var _appls = this.applications;
				var success = this.success;
				this.user.innopoints.api.user.application.dismiss(e.target.dataset.id, (result) => {
					success(e.target.dataset.id, 'rework');
				}, console.log);
			},
			
			_delete(e) {
				var _appls = this.applications;
				this.user.innopoints.api.user.application.delete(e.target.dataset.id, (result) => {
					console.log(result);
					document.getElementById('card' + e.target.dataset.id).remove();
				}, console.log);
			},
			
			resend(e) {
				var _appls = this.applications;
				var success = this.success;
				this.user.innopoints.api.user.application.send(e.target.dataset.id, (result) => {
					success(e.target.dataset.id, 'resend');
				}, console.log);
			},

			action_success(id, new_status) {
				let apps = this.applications
				let app = this.applications.filter(a => a.id == id)
				console.log(app)
				if (this.$route.params.filter === 'all' || this.$route.params.filter == null)
					app.status = new_status;
				else
					apps.splice(apps.indexOf(app), 1)
			},
		}
	}
</script>
