<template>
    <div>
        <h4>{{ item.title }} : {{ item.price }}</h3>
        <img :src="item.image_link">
        <h4 v-text="item.category_title"></h4>
        <p v-show="item.possible_joint_purchase">This item can be bought by a group of {{ item.max_buyers }}!</p>
        <div v-for="option in item.options" style="display: block">
            <select name="option.title" :id="option.title" @select="onselect(item, $event)">
                <option value="">Choose {{option.title}}</option>
                <option v-for="value in option.values" :value="value">{{ value }}</option>
            </select>
        </div>
        <div controls>
            <slot></slot>
        </div>
    </div>
</template>

<script>
    module.exports = {
        props: ['item', 'onselect']
    }
</script>