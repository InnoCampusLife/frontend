<template>
	<div>
		<p><span>{{ user.username }} ({{ user.role | capitalize }})</span>: <span>{{ user.firstName + " " + user.lastName | capitalize}}</span>: <span>@{{ user.tgId }}</span>;</p>
		<select name="role_select" id="a{{ user.id }}" @change="selectChanged">
			<option value="ghost" :selected="user.role == 'ghost'">Ghost</option>
			<option value="student" :selected="user.role == 'student'">Student</option>
		</select>
	</div>
</template>

<script>
	module.exports = {
		data: function () {
			return {

			}
		},
		props: ['user', 'roleChanged'],
		methods: {
			selectChanged: function (e) {
				this.roleChanged(e);
			}
		}
	}
</script>