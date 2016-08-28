<template>
	<div style="margin: 42px;">
		<pre v-if="$loadingRouteData">Loading...</pre>

		<div v-for="appl in applications">
			<br>
			<h4 v-text="appl.type"></h4>
			<div>
				<pre>{{ appl | json 4 }}</pre>
			</div>
			<hr>
		</div>
	</div>
</template>

<script>
	var api = require( './../../../api.js');
	var user = require( './../../../models/user.js');

	module.exports =  {
		data () {
			return {
				user : user,
				applications: []
			}
		},
		route : {
			data (transition) {
				console.log('called get applications: ' + user.roles['uis']);
				
				user.innopoints.applications.get(null, (result) => {
					console.log('got applications');
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
				},
				(error) => {
					console.log('haven\'t got applications: ' + error);
				});
			}
		}
	}
</script>