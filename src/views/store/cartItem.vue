<template>
	<span block>{{ item.title }}: {{ item.option }}: {{ item.price }} x {{ item.amount }}</span>
</template>

<script>
	module.exports = {
		props: ['item']
	}
</script>
