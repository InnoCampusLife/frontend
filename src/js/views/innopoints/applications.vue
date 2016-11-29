<template>
	<div>
		<pre v-show="$loadingRouteData">Loading...</pre>

		<pre v-show="!applications.length && !$loadingRouteData">Empty</pre>

		<application 
			v-if="applications.length"
			v-for="appl in applications | filterBy $root.query in 'type' '_id' 'comment' 'creation_date' 'author.username' | orderBy 'creation_time' -1"
			:application="appl"
			:user="user"
			:success="action_success"
		></application>
	</div>
</template>

<script>
	module.exports =  {
		data : function () {
			return {
				user : this.$root.user,
				applications: []
			}
		},
		components : {
			application : require('./application.vue')
		},
		methods : {
		//  For vue 2.0
		// 	filter_appls() {
		// 		var query = this.query;
		// 		console.log(query);
		// 		if (query) {
		// 			var _id = this.applications.find(x => x._id.includes(query));
		// 			var type = this.applications.find(x => x.type.includes(query));
		// 			var comment = this.applications.find(x => x.comment.includes(query));
		// 			var creationDate = this.applications.find(x => x.creation_date.includes(query));
		// 			return TODO
		// 		}
		// 		else return this.applications;
		// 	}
		// 	
			action_success : function(id, new_status) {
				if (this.$route.params.filter === 'all' || this.$route.params.filter == null)
					this.applications.find(function(x){ return x.id == id }).status = new_status;
				else
					document.getElementById('card'+id).remove();
			}
		},
		route : {
			data : function (transition) {
				this.applications = [];
				var params = this.$route.params;
				var user = this.user;

				if ((user.innopoints.data.isAdmin && !params.filter) || params.filter == 'all')
					params.filter = null;

				var request = function(result) {
					// if (!result.length) {
					// 	transition.next();
					// 	return;
					// }
					console.log(result);
					console.log("called appl get");
					var _length = result.length;
					result.forEach(function(res) {
						res.creation_time = res.creation_date;
						res.creation_date = new Date(res.creation_time * 1000).toDateString();
					});
					transition.next({
						applications: result
					});
				};

				user.innopoints.api.user.get({
					successCallback: function(result) {
						console.log("called user get");
						user.innopoints.api.user.applications.get({
							status: params.filter || null,
							successCallback: request
						});
					}
				});
			}
		}
	}
</script>