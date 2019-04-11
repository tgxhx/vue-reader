<template>
  <div class="similar" @click="toBookDetail(bookDetail.id)">
    <div class="similar-img">
      <img :src="bookDetail.images" alt="" @error="loadImage($event)">
    </div>
    <p>{{bookDetail.name}}</p>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  import {mapState} from 'vuex'

  export default {
    data() {
      return {
        bookDetail: {}
      }
    },
    props: {
      like: {
        type: String,
        required: true
      }
    },
    computed: {
      ...mapState([])
    },
    created() {
      this.getBookDetail(this.like)
    },
    methods: {
      getBookDetail(id) {
        axios.get(`${this.common.api}/booklist?id=${id}`).then((res) => {
          this.bookDetail = res.data
        })
      },
      toBookDetail(id) {
        this.$router.push({path: '/bookdetail/' + id})
        document.body.scrollTop = 0
      },
      loadImage(e) {
        this.common.defaultImage(e)
      }
    },
    filters: {},
    watch: {
      like(val, old) {
        this.getBookDetail(val)
      }
    }
  }
</script>

<style lang="less" type="text/less">
  .similar {
    width: 110px;
    height: 165px;
    .similar-img {
      height: 140px;
    }
    img {
      width: 100%;
      height: 100%;
      &[src=""] {
        opacity: 0;
      }
    }
  }
</style>
