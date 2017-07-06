<template>
    <div class="similar">
      <div class="similar-img">
        <img :src="bookDetail.images" alt="">
      </div>
        <p>{{bookDetail.name}}</p>
    </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  import {mapState} from 'vuex'
  import api from '@/assets/js/api'

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
    mounted() {
      this.$nextTick(() => {
        this.getBookDetail(this.like)
      })
    },
    methods: {
      getBookDetail(id) {
        axios.get(`${api}/booklist?id=${id}`).then((res) => {
            this.bookDetail = res.data
        })
      }
    },
    filters: {},
  }
</script>

<style lang="less" type="text/less">
  .similar {
    width: 110px;
    height:165px;
    .similar-img {
      height:140px;
    }
    img {
      width: 100%;
      height:100%;
      &[src=""] {
        opacity:0;
      }
    }
  }
</style>
