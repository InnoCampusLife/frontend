<template lang="jade">
	
	.card(status="{{ application.status }}" id="card-{{ application.id }}")
		.card-block
			span.float-xs-right {{ application.creation_date }}
			h2.card-title.clearfix
				span.tag.tag-default.tag-success.float-xs-left(status="{{ application.status }}") {{ application.status.split('_').join(' ') | capitalize }}
				span.float-xs-left.mx-1 {{ application.type | capitalize }}
			h5.card-subtitle {{(application._id = '#' + application.id)}} by {{application.author.username}}
		
		.card-block(v-show="application.work && application.type == 'group'")
			div(v-for="work in application.work")
				a(href="http://uis.university.innopolis.ru:8770/profile/{{ work.actor.username }}") {{ work.actor.username }} -
					span {{ work.activity.title }}[{{ work.activity.price }}]
			div(v-show="application.comment")
				h4 Comment
				template(v-if="application.comment && application.comment.length")
					p(v-for="comment in application.comment.split('\n')" track-by="$index") {{ comment }}
		
		div(v-show="application.files.length > 0")
			h4 Files
			p(v-for="file of application.files") {{ file | json }}
		
		footer(v-if="user.innopoints.data.isAdmin && application.status=='in_process'")
			button(data-id="{{ application.id }}" @click="approve") Approve
			button(data-id="{{ application.id }}" @click="reject") Reject
			button(data-id="{{ application.id }}" @click="toRework") To rework
		
		footer(v-if="!user.innopoints.data.isAdmin && application.status!='approved'")
			button(data-id="{{application.id}}" @click="_delete" v-show="(application.status=='in_process' || application.status=='rework')") Delete
			button(data-id="{{application.id}}" @click="resend" v-show="(application.status=='rework')") Resend
</template>

<script>

	module.exports = {
		props: ['application', 'user', 'success'],
		methods: {
			approve: function(e) {
				var _appls = this.applications;
				var success = this.success;
				this.user.innopoints.api.user.application.approve(e.target.dataset.id, function(result) {
					success(e.target.dataset.id, 'approved', _appls);
				}, console.log);
			},
			reject: function(e) {
				var _appls = this.applications;
				var success = this.success;
				this.user.innopoints.api.user.application.reject(e.target.dataset.id, function(result) {
					success(e.target.dataset.id, 'rejected', _appls);
				}, console.log);
			},
			toRework: function(e) {
				var _appls = this.applications;
				var success = this.success;
				this.user.innopoints.api.user.application.dismiss(e.target.dataset.id, function(result) {
					success(e.target.dataset.id, 'rework', _appls);
				}, console.log);
			},
			_delete: function(e) {
				var _appls = this.applications;
				this.user.innopoints.api.user.application.delete(e.target.dataset.id, function(result) {
					console.log(result);
					document.getElementById('card'+e.target.dataset.id).remove();
				}, console.log);
			},
			resend: function(e) {
				var _appls = this.applications;
				var success = this.success;
				this.user.innopoints.api.user.application.send(e.target.dataset.id, function(result) {
					success(e.target.dataset.id, 'resend', _appls);
				}, console.log);
			}
		}
	}
</script>
