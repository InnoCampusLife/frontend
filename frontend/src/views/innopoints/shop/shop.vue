<template>
    <section shop>
        <section product v-for="item in items | filterBy $router.app.query in 'title' 'price' 'category.title' " v-link="{ name: 'item', params: { item: item.id } }">
            <h4>{{ item.title }} : {{ item.price }}</h3>
            <img :src="item.image_link">
            <h4 v-text="item.category_title"></h4>
            <p v-show="item.possible_joint_purchase">This item can be bought by a group of {{ item.max_buyers }}!</p>
            <div v-for="option in item.options" style="display: block">
                <select name="option.title" :id="option.title">
                    <option value="">Choose {{option.title}}</option>
                    <option v-for="value in option.values" :value="value">{{ value }}</option>
                </select>
            </div>
        </section>
    </section>
</template>

<script>
    module.exports = {
        data : function () {
            return {
                items: []
            }
        },
        route : {
            data : function (transition) {
                this.$router.app.user.innopoints.api.shop.getItems(0, 10000, 'title', 'ASC', function(result) {
                    console.log(result);
                    transition.next({
                        items: result
                    });
                });
            } 
        }
    }
</script>