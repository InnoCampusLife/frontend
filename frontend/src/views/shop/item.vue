<template>
    <pre> {{ item | json 4 }} </pre>
</template>

<script>
    var api = require('./../../api.js');

    module.exports = {
        data () {
            return {
                item: {}
            }
        },
        route : {
            data (transition) {
                console.log(this.$route.params.item);
                
                api.innopoints.shop.getItem(this.$route.params.item, (result) => {
                    transition.next({
                        item: result
                    });
                });
            }
        }
    }
</script>