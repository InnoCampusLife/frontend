<template>
	<div>
		<pre v-show="$loadingRouteData">Loading...</pre>

		<pre v-show="!applications.length && !$loadingRouteData">Empty</pre>

		<div card 
			v-if="applications.length"
			v-for="appl in applications | filterBy $router.app.query in 'type' 'id' 'comment' 'creation_date'"
			:status="appl.status"
			:id="'card' + appl.id"
		>
			<header flex>
				<section left>
					<span>{{appl.type | capitalize}}</span> <span misc style="font-size:inherit">#{{appl.id}}</span>
					<span block misc>Status: <span :status="appl.status">{{appl.status.split('_').join(' ')}}</span></span>
				</section>
				<section right>
					<span misc v-text="appl.creation_date"></span>
				</section>
			</header><!-- header -->
			<section content v-show="appl.work">
				<div block>
					<h4 v-show="appl.type=='group'">Participants:</h4>
					<div>
						<div block v-for="work in appl.work">
							<a :href="'http://uis.university.innopolis.ru:8770/profile/' + work.actor.username">{{work.actor.username}}</a> - <span>{{ work.activity.title }}[{{ work.activity.price }}]</span>
						</div>						
					</div>
				</div>
			</section>
			<section content v-show="appl.comment">
				<div block>
				<h4>Comment: </h4>
				<p>{{appl.comment}}</p>
				</div>
			</section>			
			<footer v-if="user.innopoints.data.isAdmin && appl.status=='in_process'">
				<div block controls>
					<button item success data-id="{{appl.id}}" @click="approve">Approve</button>
					<button item error data-id="{{appl.id}}" @click="reject">Reject</button>
					<button item warning data-id="{{appl.id}}" @click="toRework">To rework</button>
				</div>
			</footer>
			<footer v-if="!user.innopoints.data.isAdmin">
				<div block controls>
					<button item error data-id="{{appl.id}}" @click="_delete" v-show="(appl.status=='in_process' || appl.status=='rework')">Delete</button>
					<button item success data-id="{{appl.id}}" @click="resend" v-show="(appl.status=='rework')">Resend</button>
				</div>
			</footer>
		</div>
	</div>
</template>

<script>
	module.exports =  {
		data : function () {
			return {
				user : this.$router.app.user,
				query : this.$router.app.query,
				applications: []
			}
		},
		methods : {
			approve : function(e) {
				var _appls = this.applications;
				var appl_action_success = this.appl_action_success;
				this.user.innopoints.api.admin.application.approve(e.target.dataset.id, function(result) {
					appl_action_success(e.target.dataset.id, 'approved', _appls);
				}, console.log);
			},
			reject : function(e) {
				var _appls = this.applications;
				var appl_action_success = this.appl_action_success;
				this.user.innopoints.api.admin.application.reject(e.target.dataset.id, function(result) {
					appl_action_success(e.target.dataset.id, 'rejected', _appls);
				}, console.log);
			},
			toRework : function(e) {
				var _appls = this.applications;
				var appl_action_success = this.appl_action_success;
				this.user.innopoints.api.admin.application.dismiss(e.target.dataset.id, function(result) {
					appl_action_success(e.target.dataset.id, 'rework', _appls);
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
				var appl_action_success = this.appl_action_success;
				this.user.innopoints.api.user.application.send(e.target.dataset.id, function(result) {
					appl_action_success(e.target.dataset.id, 'resend', _appls);
				}, console.log);
			},
			appl_action_success : function(id, new_status, array) {
				if (this.$route.params.filter==='all')
					array.find(x => x.id == id).status = new_status;
				else
					document.getElementById('card'+id).remove();
			}
			// For vue 2.0
		// 	filter_appls() {
		// 		var query = this.query;
		// 		console.log(query);
		// 		if (query) {
		// 			var id = this.applications.find(x => x.id.includes(query));
		// 			var type = this.applications.find(x => x.type.includes(query));
		// 			var comment = this.applications.find(x => x.comment.includes(query));
		// 		}
		// 		else return this.applications;
		// 	}
		},
		route : {
			data : function (transition) {
				this.applications = [];
				var route = this.$route;
				var user = this.user;
				var request = function(result) {
					if (!result.length) transition.next();
					console.log(result);
					console.log("called appl get");
					var _length = result.length;
					result.forEach(function(res, _index) {
						res.creation_date = new Date(res.creation_date * 1000).toDateString();
						if (res.work) res.work.forEach(function(work, index) {
								if ((_index == (_length - 1)) && (index == (res.work.length - 1))) {
									transition.next({
										applications: result
									});
								}
							});
						else {
							if (_index == (_length - 1)) {
									transition.next({
										applications: result
									});
								}
						}
					});
				}
				user.innopoints.api.user.get(function(result) {
					console.log("called user get");
					if (result.type == "admin") {
						if (route.params.filter==='all')
							user.innopoints.api.admin.applications.get(request);
						else
							user.innopoints.api.admin.applications.getWithStatus(route.params.filter, 0, 1000, request);
					}
					else {
						if (route.params.filter==='all')
							user.innopoints.api.user.applications.get(0, 1000, request);
						else
							user.innopoints.api.user.applications.getWithStatus(route.params.filter, 0, 1000, request);
					}
				});
			}
		}
	}
</script>