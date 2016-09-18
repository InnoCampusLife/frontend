<template>
    <section shop>
        <section product v-for="item in items" v-link="{ name: 'item', params: { item: item.id } }">
            <h4>{{ item.title }} : {{ item.price }}</h4>
            <img :src="item.image_link">
            <p v-text="item.category.title"></p>
            <hr>
        </section>
    </section>
</template>

<script>
    module.exports = {
        data() {
            return {
                items: []
            }
        },
        route : {
            data : function (transition) {
                this.$router.app.user.innopoints.api.shop.getItems(0, 10000, 'title', 'ASC', (result) => {
                    transition.next({
                        items: result
                    });
                });
            } 
        }
    }
</script>