<template>
  <div class="top-nav-pannel font-container" id="font-container" v-show="font_panel">
    <div class="child-mod">
      <span>字号</span>
      <button id="large-font" class="spe-button" @click="add">
        大
      </button>
      <button id="small-font" class="spe-button" @click="sub" style="margin-left:10px;">
        小
      </button>
    </div>
    <div class="child-mod" id="bk-container">
      <span>背景</span>
      <div class="bk-container" :class="{'bk-container-current': i==now_color}" v-for="(n,i) in 6">
        <div class="color_btn" @click="changeColor(i)"></div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {mapState} from 'vuex'
  import localEvent from '../../store/local'

  export default {
    data() {
      return {
        now_color: 0
      }
    },
    computed: {
      ...mapState([
        'font_panel', 'bg_color'
      ])
    },
    methods: {
      //点击修改bg_color，父组件可根据bg_color的值更改自定义属性bg_color，达到修改背景色的目的
      changeColor(index) {
        this.now_color = index
        this.$store.state.bg_color = index + 1
        localEvent.StorageSetter('bg_color', index + 1)
      },
      //加减字体需要直接操作dom元素的字体大小，在子组件不好操作，所以在父组件监听fz_size的值再更改
      add() {
        this.$store.dispatch('fzSizeAdd')
      },
      sub() {
        this.$store.dispatch('fzSizeSub')
      }
    }
  }
</script>

<style lang="less" type="text/less">
  .top-nav-pannel {
    position: fixed;
    bottom: 70px;
    height: 135px;
    background: none;
    width: 100%;
    color: #fff;
    font-size: 14px;
    z-index: 10004;
    button {
      background: none;
      border: 1px #8c8c8c solid;
      padding: 5px 40px;
      color: #fff;
      display: inline-block;
      border-radius: 16px;
      &:focus {
        outline:none;
      }
    }
    .child-mod {
      padding: 5px 20px;
      margin-top: 15px;
      & > span:first-child {
        margin-right: 20px;
      }
    }
    .bk-container {
      position: relative;
      height: 30px;
      width: 30px;
      background: #fff;
      border-radius: 15px;
      display: inline-block;
      vertical-align: -14px;
      margin-left: 10px;
      .color_btn {
        height: 30px;
        width: 30px;
        border-radius: 15px;
      }
    }
    .bk-container-current {
      height: 31px;
      width: 32px;
      border-radius: 16px;
      border: 1px #ff7800 solid;
    }
    .bac(@color) {
      background-color: @color;
    }
    .bk-container:nth-child(2) .color_btn {
      .bac(#e9dfc7);
    }
    .bk-container:nth-child(3) .color_btn {
      .bac(#e7eee5);
    }
    .bk-container:nth-child(4) .color_btn {
      .bac(#a4a4a4);
    }
    .bk-container:nth-child(5) .color_btn {
      .bac(#cdefcd);
    }
    .bk-container:nth-child(6) .color_btn {
      .bac(#283548);
    }
    .bk-container:nth-child(7) .color_btn {
      .bac(#0f1410);
    }
  }
</style>
