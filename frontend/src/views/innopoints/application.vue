<template>
	<div card
			:status="application.status"
			:id="'card' + application.id">
		<header flex>
			<section left>
				<span>{{application.type | capitalize}}</span> <span misc style="font-size:inherit">{{(application._id = '#' + application.id)}} by {{application.author.username}}</span>
				<span block misc>Status: <span :status="application.status">{{application.status.split('_').join(' ')}}</span></span>
			</section>
			<section right>
				<span misc v-text="application.creation_date"></span>
			</section>
		</header><!-- header -->
		<section content v-show="application.work">
			<div block>
				<h4 v-show="application.type=='group'">Participants:</h4>
				<div>
					<div block v-for="work in application.work">
						<a :href="'http://uis.university.innopolis.ru:8770/profile/' + work.actor.username">{{work.actor.username}}</a> - <span>{{ work.activity.title }}[{{ work.activity.price }}]</span>
					</div>						
				</div>
			</div>
		</section>
		<section content v-show="application.comment">
			<div block>
				<h4>Comment: </h4>
				<p v-for="comment in application.comment.split('\n')">{{comment}}</p>
			</div>
		</section>
		<section content v-show="application.files.length > 0">
			<div block>
			<h4>files: </h4>
			<p v-for="file of application.files">{{file | json}}</p>
			</div>
		</section>	
		<footer v-if="user.innopoints.data.isAdmin && application.status=='in_process'">
			<div block controls>
				<button item success data-id="{{application.id}}" @click="approve">Approve</button>
				<button item error data-id="{{application.id}}" @click="reject">Reject</button>
				<button item warning data-id="{{application.id}}" @click="toRework">To rework</button>
			</div>
		</footer>
		<footer v-if="!user.innopoints.data.isAdmin">
			<div block controls>
				<button item error data-id="{{application.id}}" @click="_delete" v-show="(application.status=='in_process' || application.status=='rework')">Delete</button>
				<button item success data-id="{{application.id}}" @click="resend" v-show="(application.status=='rework')">Resend</span></button>
			</div>
		</footer>
	</div>
</template>

<script>
	module.exports = {
		props: ['application', 'user', 'success'],
		methods: {
			approve : function(e) {
				var _appls = this.applications;
				var appl_action_success = this.appl_action_success;
				this.user.innopoints.api.user.application.approve(e.target.dataset.id, function(result) {
					success(e.target.dataset.id, 'approved', _appls);
				}, console.log);
			},
			reject : function(e) {
				var _appls = this.applications;
				var success = this.success;
				this.user.innopoints.api.user.application.reject(e.target.dataset.id, function(result) {
					success(e.target.dataset.id, 'rejected', _appls);
				}, console.log);
			},
			toRework : function(e) {
				var _appls = this.applications;
				var success = this.success;
				this.user.innopoints.api.user.application.dismiss(e.target.dataset.id, function(result) {
					success(e.target.dataset.id, 'rework', _appls);
				}, console.log);
			},
			_delete : function(e) {
				var _appls = this.applications;
				this.user.innopoints.api.user.application.delete(e.target.dataset.id, function(result) {
					console.log(result);
					document.getElementById('card'+e.target.dataset.id).remove();
				}, console.log);
			},
			resend : function(e) {
				var _appls = this.applications;
				var success = this.success;
				this.user.innopoints.api.user.application.send(e.target.dataset.id, function(result) {
					success(e.target.dataset.id, 'resend', _appls);
				}, console.log);
			}
		}
	}
</script>