<template>
	<span block style="height:2rem;line-height:2rem">{{ item.title }} : {{ item.option }} : {{ item.price }} x {{ item.amount }}</span>
</template>

<script>
	module.exports = {
		props: ['item']
	}
</script>