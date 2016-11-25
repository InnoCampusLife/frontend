<template>
	<div cart floating id="cart" :amount="cart.length">
		<button open class="pe-7s-cart" @click="open"></button>
		<div items style="overflow:hidden">
	    	<item v-for="item in cart | orderBy 'index' -1" :item="item"></item>
	    </div>
    </div>
</template>

<script>
	module.exports = {
		props: ["cart"],
		components: {
			item: require('./cartItem.vue')
		},
		methods: {
			open: function(e) {
				var par = e.target.parentElement;
			    if (par.hasAttribute("opened")) {
			    	e.target.classList.remove("pe-7s-close-circle");
			    	e.target.classList.add("pe-7s-cart");
			        par.removeAttribute("opened");
			    }
			    else {
			    	e.target.classList.add("pe-7s-close-circle");
			    	e.target.classList.remove("pe-7s-cart");
			        par.setAttribute("opened", "");
			    }
			}
		}
	}
</script>