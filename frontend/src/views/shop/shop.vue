<template>
    <div v-for="item in items">
        <div v-link="{ name: 'item', params: { item: item.id } }" style="cursor: pointer;">
            <h4>{{ item.title }} : {{ item.price }}</h4>
            <img :src="item.image_link">
            <p v-text="item.category.title"></p>
        </div>
        <hr>
    </div>
</template>

<script>
    var api = require('./../../api.js');

    module.exports = {
        data() {
            return {
                items: []
            }
        },
        route : {
            data : function (transition) {
                api.innopoints.shop.getItems(0, 10000, 'title', 'ASC', (result) => {
                    transition.next({
                        items: result
                    });
                });
            } 
        }
    }
</script>