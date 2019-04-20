<template>
  <div class="list-panel" @touchmove:prevent>
    <div class="list">
      <div class="list-nav">
        <i class="back" @click="hideListPanel"></i>
        <h3>目录</h3>
      </div>
      <div class="list-content" @touchmove:prevent>
        <ul>
          <li v-for="(item,index) in chapterList" @click="jumpTo(index)">· {{index+1}}. {{item}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  import {mapState} from  'vuex'

  export default {
    data() {
      return {
        chapterList: []
      }
    },
    props: {
      bookId: {
        type:String,
        required: true
      }
    },
    created() {
      this.getList()
    },
    methods: {
      jumpTo(index) {
          if (index >= 50) {
              index = 50
          }
        this.$store.dispatch('curChapter',index + 1)
        this.hideListPanel()
        this.$store.state.bar = false
        document.body.scrollTop = 0
      },
      hideListPanel() {
        this.$store.state.list_panel = false
      },
      getList() {
        axios.get(`${this.common.api}/titles?id=${this.bookId}`).then(res => {
          this.chapterList = res.data.titles.split('-')
        })
      }
    }
  }
</script>

<style lang="less" type="text/less">
  .list-panel {
    position: fixed;
    transition: all .3s;
    left: 0;
    top: 0;
    bottom: 0;
    right: 50px;
    z-index: 10;
    overflow: auto;
    transform: translateX(-100%);
    &.show {
      transform: translateX(0);
    }
    .list {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width:100%;
      background-color: #fff;
      opacity: 1;
      .list-nav {
        position: fixed;
        height: 50px;
        line-height: 50px;
        text-align: center;
        top: 0;
        left: 0;
        right: 50px;
        color: #ed424b;
        background-color: #fff;
        border-bottom: 1px solid #ed424b;
        .back {
          position: absolute;
          left: 10px;
          top: 10px;
          width: 30px;
          height: 30px;
          background: url("../../assets/images/back.png") no-repeat;
        }
        h3 {
          margin: 0;
        }
      }
      .list-content {
        background-color: #fff;
        margin-top: 50px;
        ul {
          padding: 0 15px;
        }
        li {
          color: #333;
          height: 50px;
          line-height: 50px;
          border-bottom: 1px solid #ccc;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }
</style>
