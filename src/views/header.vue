<template lang="jade">
	header.header-main.clearfix
		.hidden-md-up.sidebar-show
			button.btn.btn-outline-secondary()
				span {{{':hamburger:' | emojify}}}
		slot
</template>

<script>
	module.exports = {
		data: function () {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>