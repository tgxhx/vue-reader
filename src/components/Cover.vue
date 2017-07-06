<template>
    <div class="bg-cover" @touchmove:prevent @click="hideListPanel">
    </div>
</template>

<script type="text/ecmascript-6">
  export default {
    methods: {
      hideListPanel() {
        this.$store.state.list_panel = false
      }
    }
  }
</script>

<style lang="less" type="text/less">
    .bg-cover {
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      opacity: 1;
      z-index: 10;
      background-color: rgba(0,0,0,.5);
      transition: all .5s;
      &.hide {
        position: static;
        opacity:0;
      }
    }
</style>
