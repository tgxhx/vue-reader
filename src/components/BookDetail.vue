<template>
  <div class="book-detail">
    <div class="loading" v-if="loading">
      Loading...
    </div>
    <div class="detail-content" v-if="bookDetail">
      <div class="detail-linear">
        <header class="detail-top">
          <router-link :to="'Home'"><i class="back"></i>
            <h2 class="detail-title">{{bookDetail.name}}</h2>
          </router-link>
        </header>
        <div class="detail-con">
          <div class="detail-img">
            <img :src="bookDetail.images" alt="">
          </div>
          <div class="detail-main">
            <h3 class="name">{{bookDetail.name}}</h3>
            <p class="author">{{bookDetail.author}}</p>
            <p class="ratings">{{bookDetail.ratings}}</p>
            <p class="type">{{bookDetail.type}}</p>
            <p class="word-count">{{bookDetail.wordcount}}万字</p>
          </div>
        </div>
        <div class="read-btn">
          <div>
            <button @click="loadBookText">
              <router-link :to="'Reader'">开始阅读</router-link>
            </button>
          </div>
          <div>
            <button>开始阅读</button>
          </div>
        </div>
      </div>
      <div class="detail-intro">
        <p>{{bookDetail.intro}}</p>
      </div>
      <div class="detail-tag">
        <h3 class="tag">类别标签</h3>
        <ul class="tag-btn clearfix">
          <li>
            {{bookDetail.type}}
          </li>
          <li>
            东方玄幻
          </li>
        </ul>
      </div>
      <div class="detail-like">
        <h3 class="like-title">喜欢本书的人也喜欢</h3>
        <ul class="like-list">
          <li>
            <div>
              <img src="http://qidian.qpic.cn/qdbimg/349573/3347595/150" alt="">
              <p>择天记</p>
            </div>
          </li>
          <li>
            <div>
              <img src="http://qidian.qpic.cn/qdbimg/349573/3347595/150" alt="">
              <p>择天记</p>
            </div>
          </li>
          <li>
            <div>
              <img src="http://qidian.qpic.cn/qdbimg/349573/3347595/150" alt="">
              <p>择天记</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapState} from 'vuex'
  import axios from 'axios'
  const api = 'http://localhost:3333'

  export default {
    data() {
      return {
        loading: false,
        content: null,
        bookDetail: {}
      }
    },
    created() {
      this.loading = true
      this.getBookDetail(this.curBookDetailId)
    },
    methods: {
      getBookDetail(bookId) {
        axios.get(`${api}/booklist?id=${bookId}`).then((res) => {
//          console.log(this.curBookId)
//          this.$store.dispatch('showBookDetail', res.data)
          this.bookDetail = res.data
          this.loading = false
        })
      },
      loadBookText() {
        if (this.$store.state.curBookDetailId !== this.$store.state.curBookContentId) {
          this.$store.state.curChapter = 1
        }
        this.$store.state.curBookContentId = this.$store.state.curBookDetailId
        this.$store.state.bar = false
      }
    },
    computed: {
      ...mapState([
        'curBookDetailId'/*, 'bookDetail'*/
      ])
    },
    watch: {
      curBookDetailId(val, oldval) {
        this.getBookDetail(val)
      }
    }
  }
</script>

<style lang="less" type="text/less">
  .book-detail {
    padding: 0 20px;
  }

  .loading {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 999;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .detail-linear {
    background: -webkit-linear-gradient(bottom, #fff, rgba(255, 255, 255, 0) 108px) no-repeat center bottom;
    background: linear-gradient(to top, #fff, rgba(255, 255, 255, 0) 8rem) no-repeat center bottom;
    .detail-top {
      position: fixed;
      left: 0;
      top: 0;
      right: 0;
      height: 50px;
      background-color: #eee;
      i {
        position: absolute;
        left: 10px;
        top: 10px;
        width: 30px;
        height: 30px;
        background: url("../assets/images/back.png");
      }
      h2 {
        margin: 0 40px;
        font-size: 18px;
        line-height: 50px;
        color: #ed424b;
      }
    }
    .detail-con {
      display: flex;
      margin-top: 50px;
      padding: 15px 0 18px;
      .detail-img {
        width: 100px;
        margin-right: 50px;
        img {
          width: 100%;
        }
      }
      .detail-main {
        flex: 1;
        h3 {
          font-size: 18px;
          line-height: 1.5;
        }
        p {
          font-size: 14px;
          line-height: 1.8;
        }
      }
    }
    .read-btn {
      display: flex;
      > div {
        flex: 1;
        padding-bottom: 20px;
        border-bottom: 1px solid #ddd;
        button {
          display: block;
          margin: 0 auto;
          width: 90%;
          height: 33px;
          line-height: 33px;
          font-size: 15px;
          vertical-align: middle;
          border: none;
          border-radius: 3px;
        }
        &:first-of-type {
          button {
            background-color: #ed424b;
            a {
              color: #fff;
            }
          }
        }
        &:nth-child(2) {
          button {
            color: #333;
            background-color: #fff;
            border: 1px solid #ddd;
          }
        }
      }
    }
  }

  .detail-intro {
    padding: 20px 0;
    font-size: 16px;
    text-indent: 2em;
    line-height: 1.6;
    border-bottom: 1px solid #ddd;
  }

  .detail-tag {
    padding: 20px 0;
    border-bottom: 1px solid #ddd;
    h3 {
      font-size: 16px;
      margin-bottom: 10px;
    }
    ul li {
      float: left;
      padding: 3px 10px;
      margin-right: 10px;
      color: #333;
      border: 1px solid #ccc;
      border-radius: 5px;
    }
  }

  .detail-like {
    padding: 20px 0;
    h3 {
      font-size: 16px;
      margin-bottom: 20px;
    }
    .like-list {
      display: flex;
      li {
        flex: 1;
        div {
          width: 110px;
          img {
            width: 100%;
          }
        }
      }
    }
  }
</style>
