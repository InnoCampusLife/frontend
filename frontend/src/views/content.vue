<template>
	<main content :scroller-y-force="!user.account.preferences.fixHeader">
		<main-header>
			<slot name="header"></slot>
		</main-header>
		<div scroller-x :scroller-y="user.account.preferences.fixHeader" @scroll="scrl">
			<router-view></router-view>
		</div>
	</main>
</template>

<script>
	var mainHeader = require('./header.vue');

	module.exports = {
		data : function () {
			return {
				user: this.$root.user
			}
		},
		components: {
			mainHeader:mainHeader
		},
		methods: {
			scrl : function (e) {
				if (e.target.scrollTop > 31)
					e.target.parentElement.childNodes[1].setAttribute('scrolled', '');
				else
					e.target.parentElement.childNodes[1].removeAttribute('scrolled');
			}
		}
	}
</script>