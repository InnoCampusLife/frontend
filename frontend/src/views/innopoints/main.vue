<template>
	<pre v-if="$loadingRouteData">Loading...</pre>

	<div v-for="appl in applications">
		<br>
		<h4 v-text="appl.type"></h4>
		<div v-if="appl.personal">
			
		</div>
		<div v-if="appl.group">
			
		</div>
		<hr>
	</div>
</template>

<script>
	var api = require( './../../api.js');
	var user = require( './../../models/user.js');

	module.exports =  {
		data () {
			return {
				user : user,
				applications: []
			}
		},
		route : {
			data (transition) {
				user.innopoints.applications.get(null, (result) => {
					var res = [],
					index = 0;

					for (appl of result) {
						user.innopoints.application.get(appl.id, (_result) => {
							res[index] = _result;
						});
						index++;
					}
					transition.next({
						applications: res
					});
				});
			}
		}
	}
</script>