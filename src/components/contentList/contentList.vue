<template>
    <div class="contentList col-xs-6 col-sm-4 col-md-3 col-lg-2">
        <div v-for="(items,index) in list">
            <router-link v-bind:to="'detail/'+items.uuid">
                <transition name="slideUp">
                    <img v-if="items.imgSrc" v-show="items.imgOnload" v-bind:src="items.imgSrc" v-on:error="imgError" v-on:load="imgLoad" alt="" v-bind:data-index="index">
                </transition>
                <img v-show="!items.imgOnload" src="./wait.gif" alt="">
                <h1>{{items.title}}</h1>
            </router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'contentList',
        props: ['list'],
        methods: {
            imgLoad: function (e) {
                this.list[e.target.dataset.index].imgOnload = true;

            },
            imgError: function (e) {
                e.target.src = require('./noImg.png');
            }
        }
    }

</script>

<style scoped>
    .contentList {}

    .contentList>div {
        position: relative;
        margin-bottom: 20px;
    }



    .contentList h1 {
        line-height: 24px;
        font-size: 14px;
        position: absolute;
        bottom: 0;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.4);
        color: white;
        padding: 0 4px;
        text-align: center;
    }
</style>