<template>
    <div id="toTop" class="icono-caretUpCircle" v-on:touchstart="toTopFn">
    </div>
</template>

<script>
    export default {
        name: 'toTop',
        methods: {
            toTopFn: function () {
                document.documentElement.scrollTop = 0;
                document.body.scrollTop = 0;
            }
        }
    }

</script>

<style scoped>
    #toTop {
        width: 50px;
        height: 50px;
        border-radius: 5px;
        position: fixed;
        bottom: 10px;
        right: 10px;
        background-color: white;
        cursor: pointer;
        opacity: 0.7;
    }

    #toTop:before,
    #toTop:after {
        left: 16px;
    }
</style>