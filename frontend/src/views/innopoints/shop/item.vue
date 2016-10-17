<template>
    <div>
        <h3>{{ item.title }} : {{ item.price }}</h3>
        <img :src="item.image_link">
        <h4 v-text="item.category_title"></h4>
        <p v-show="item.possible_joint_purchase">This item can be bought by a group of {{ item.max_buyers }}!</p>
        <div v-for="option in item.options" style="display: block">
            <select name="option.title" :id="option.title">
                <option value="">Choose {{option.title}}</option>
                <option v-for="value in option.values" :value="value">{{ value }}</option>
            </select>
        </div>
    </div>
</template>

<script>
    module.exports = {
        data : function () {
            return {
                item: {}
            }
        },
        route : {
            data  : function (transition) {           
                var $route = this.$route;
                this.$router.app.user.innopoints.api.shop.getItem(this.$route.params.item, function(result) {
                    transition.next({
                        item: result
                    });
                });
            }
        }
    }
</script>