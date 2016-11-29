<template>
    <section shop>
        <section product v-for="item in items | filterBy $router.app.query in 'title' 'price' 'category.title' ">
            <item :item="item">
                <div>
                    <button @click="buy(item)">add to cart!</button>
                </div>
            </item>
        </section>
    </section>
    <!-- <cart :cart="cartItems" :onselect=""></cart> -->
</template>

<script>
    var storage = require('./../../storage.js');

    module.exports = {
        data : function () {
            return {
                items: [],
                // cartItems: [],
                storage: storage
            }
        },
        components: {
            item: require('./item.vue'),
            // cart: require('./cart.vue')
        },
        route : {
            data : function (transition) {
                var _cart = JSON.parse(storage.get('cart'));
                this.$router.app.user.innopoints.api.shop.getItems({
                    successCallback: result => {
                        console.log(result);
                        transition.next({
                            items: result,
                            // cartItems: _cart || []
                        });
                    }
                });
            } 
        },
        methods : {
            buy : function(item) {
            	// if (!item.selected && item.combinations) {
            	// 	alert("Select options!");
            	// 	return;
            	// }

                // var i = this.cartItems.indexOf(item);
                // if (i != -1) {
                //     this.cartItems[i].amount++;
                // }
                // else {
                //     item.amount = 1;
                //     item.index = this.cartItems.length;
                //     this.cartItems.push(item);
                // }

                // this.storage.set('cart', JSON.stringify(this.cartItems));
            },
            // onselect : function(item, e) {
            // 	if (!item.selected)
	           //      item.selected = {
	           //          title: item.title,
	           //          price: item.price
	           //      };

            //     if (!item.selected.option)
            //         item.selected.option = {};
                    	
            //     item.selected.option[e.target.name] = e.target.value;
            // }
        }
    }
</script>