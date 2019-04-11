<template>
  <div id="reader">
    <top-nav></top-nav>
    <div class="read-container" :bg="bg_color" :night="bg_night" ref="fz_size">
      <h4>{{title}}</h4>
      <div class="chapterContent" v-show="!loading">
        <p v-for="(c,i) in content" :key="i">{{c}}</p>
      </div>
      <div class="btn-bar" v-show="!loading">
        <ul class="btn-tab">
          <li class="prev-btn" @click="prevChapter">上一章</li>
          <li class="next-btn" @click="nextChapter">下一章</li>
        </ul>
      </div>
    </div>
    <div class="page-up" @click="pageUp()"></div>
    <div class="click-mask" @click="clickBar"></div>
    <div class="page-down" @click="pageDown()"></div>
    <div class="top-nav-pannel-bk font-container" v-show="font_panel"></div>
    <font-nav></font-nav>
    <bottom-nav></bottom-nav>
    <!--<transition name="fade">-->
    <cover :class="{hide:!list_panel}"></cover>
    <list-panel :class="{show: list_panel}" :bookId="$route.params.id"></list-panel>
    <loading v-show="loading"></loading>
    <!--</transition>-->
  </div>
</template>

<script type="text/ecmascript-6">
import Vue from 'vue';
import { mapState } from 'vuex';
import axios from 'axios';
import localEvent from '../store/local';
import TopNav from './TopNav/TopNav';
import BottomNav from './BottomNav/BottomNav';
import FontNav from './FontNav/FontNav';
import ListPanel from './ListPanel/ListPanel';
import Cover from './Cover';
import Loading from './Loading/Loading';

export default {
  data() {
    return {
      bar: false,
      timer: null,
      title: '',
      content: [],
      loading: false,
      showList: false,
      booksReadInfo: {},
    };
  },
  components: {
    TopNav,
    BottomNav,
    FontNav,
    ListPanel,
    Cover,
    Loading,
  },
  created() {
    //判断本地是否存储了阅读器文字大小
    if (localEvent.StorageGetter('fz_size')) {
      this.$store.state.fz_size = localEvent.StorageGetter('fz_size');
    }
    //判断本地是否存储了阅读器主题色
    if (localEvent.StorageGetter('bg_color')) {
      this.$store.state.bg_color = localEvent.StorageGetter('bg_color');
    }

    //加载时从localStorage中回去所有数据阅读进度
    const localBookReaderInfo = localEvent.StorageGetter('bookreaderinfo');
    let id = this.$route.params.id;

    //当前书籍以前读过并有阅读进度
    if (localBookReaderInfo && localBookReaderInfo[id]) {
      this.booksReadInfo = localEvent.StorageGetter('bookreaderinfo');
      this.getData(id, this.booksReadInfo[id].chapter);
      this.$store.dispatch('curChapter', this.booksReadInfo[id].chapter);
    } else {
      //当前书籍没有读过但是localStorage保存了其他书籍进度
      if (localBookReaderInfo) {
        this.booksReadInfo = localBookReaderInfo;
        this.getData(id, 1);
        this.$store.dispatch('curChapter', 1);
      } else {
        //第一次进入阅读
        this.booksReadInfo[id] = {
          book: id,
          chapter: 1,
        };
        this.getData(id, 1);
        this.$store.dispatch('curChapter', 1);
      }
    }
  },
  mounted() {
    //因为要获取dom元素，所以不能放到created中
    this.$refs.fz_size.style.fontSize = this.fz_size + 'px';
  },
  methods: {
    //切换上下工具栏，如果字体面板显示点击也关闭
    clickBar() {
      this.$store.dispatch('toggleBar');
      this.$store.state.font_panel = false;
    },
    //向上翻页
    pageUp() {
      let target = document.body.scrollTop - window.screen.height - 80;
      this.startScroll(target, -20);
    },
    //向下翻页
    pageDown() {
      let target = document.body.scrollTop + window.screen.height - 80;
      this.startScroll(target, 20);
    },
    startScroll(target, speed) {
      let times = null;
      times = setInterval(function() {
        if (speed > 0) {
          if (document.body.scrollTop <= target) {
            document.body.scrollTop += speed;
          }
          if (
            document.body.scrollTop > target ||
            document.body.scrollTop + window.screen.height >=
              document.body.scrollHeight
          ) {
            clearInterval(times);
          }
        } else {
          if (document.body.scrollTop >= target) {
            document.body.scrollTop += speed;
          }
          if (
            document.body.scrollTop < target ||
            document.body.scrollTop <= 0
          ) {
            clearInterval(times);
          }
        }
      }, 1);
    },
    getData(id, chapter) {
      this.loading = true;
      axios
        .get(`${this.common.api}/book?book=${id}&id=${chapter}`)
        .then(data => {
          this.loading = false; //获取完毕后隐藏动画
          this.title = data.data.title;
          this.content = data.data.content.split('-');
        });
      this.$store.state.windowHeight = window.screen.height;
    },
    prevChapter() {
      this.$store.dispatch('prevChapter');
      this.saveBooksInfo();
      setTimeout(() => {
        document.body.scrollTop = 0;
      }, 300);
    },
    //更换章节时保存阅读进度到localStorage
    nextChapter() {
      this.$store.dispatch('nextChapter', 50);
      this.saveBooksInfo();
      setTimeout(() => {
        document.body.scrollTop = 0;
      }, 300);
    },
    saveBooksInfo() {
      //可用localStorage保存每本小说阅读进度
      let id = this.$route.params.id;
      this.booksReadInfo[id] = {
        book: id,
        chapter: this.curChapter,
      };
      localEvent.StorageSetter('bookreaderinfo', this.booksReadInfo);
    },
    page(e) {
      if (e.keyCode === 39) {
        console.log(this.nextChapter);
        this.nextChapter();
      } else if (e.keyCode === 37) {
        this.prevChapter();
      }
    },
  },
  computed: {
    ...mapState([
      'font_panel',
      'bg_color',
      'fz_size',
      'bg_night',
      'curChapter',
      'windowHeight',
      'list_panel',
    ]),
  },
  watch: {
    //监听fz_size的值更改背景色
    fz_size(val, oldVal) {
      this.$refs.fz_size.style.fontSize = val + 'px';
      localEvent.StorageSetter('fz_size', val);
    },
    //监听当前章节的改变，保存到本地并获取数据
    curChapter(val, oldVal) {
      localEvent.StorageSetter('cur_chapter', val);
      this.saveBooksInfo();
      this.getData(this.$route.params.id, val);
    },
  },
};
</script>

<style lang="less" type="text/less">
.read-container {
  font-size: 16px;
  color: #555;
  line-height: 31px;
  min-height: 600px;
  padding: 15px;
  h4 {
    position: fixed;
    top: 0;
    left: 15px;
    right: 15px;
    height: 50px;
    line-height: 50px;
    font-size: 20px;
    color: #736357;
    /*border-bottom: solid 1px #736357;*/
    margin: 0 0 1em 0;
    letter-spacing: 2px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  p {
    text-indent: 2em;
    margin: 0.5em 0;
    text-align: justify;
    letter-spacing: 0px;
    line-height: 1.5;
  }
  p:first-of-type {
    margin-top: 43px;
  }
  .btn-bar {
    z-index: 80;
    width: 80%;
    margin: 20px auto 0;
    max-width: 800px;
    .btn-tab {
      padding-left: 0;
      height: 34px;
      line-height: 34px;
      background-color: #000;
      border-radius: 8px;
      border: 1px solid #858382;
      font-size: 14px;
      opacity: 0.9;
      li {
        list-style-type: none;
        display: inline-block;
        width: 49%;
        text-align: center;
        color: #fff;
        &:nth-child(1) {
          border-right: 1px solid #858382;
        }
      }
    }
  }
}

.bac(@color) {
  background-color: @color;
}

.read-container[bg='1'] {
  .bac(#e9dfc7);
  h4 {
    .bac(#e9dfc7);
  }
}

.read-container[bg='2'] {
  .bac(#e7eee5);
  h4 {
    .bac(#e7eee5);
  }
}

.read-container[bg='3'] {
  .bac(#a4a4a4);
  h4 {
    .bac(#a4a4a4);
  }
}

.read-container[bg='4'] {
  .bac(#cdefcd);
  h4 {
    .bac(#cdefcd);
  }
}

.read-container[bg='5'] {
  .bac(#283548);
  h4 {
    .bac(#283548);
  }
}

.read-container[bg='6'] {
  .bac(#0f1410);
  h4 {
    .bac(#0f1410);
  }
}

.read-container[night='true'] {
  .bac(#0f1410);
  h4 {
    .bac(#0f1410);
  }
}

.page-up {
  position: fixed;
  width: 100%;
  height: 35%;
  top: 0;
  color: rgba(0, 0, 0, 0.1);
  z-index: 5;
}

.click-mask {
  position: fixed;
  width: 100%;
  height: 30%;
  top: 35%;
  color: rgba(0, 0, 0, 0.1);
}

.page-down {
  position: fixed;
  width: 100%;
  height: 35%;
  bottom: 65px;
  color: rgba(0, 0, 0, 0.1);
  z-index: 5;
}

.top-nav-pannel-bk {
  position: fixed;
  bottom: 70px;
  height: 135px;
  background: #000;
  width: 100%;
  color: #fff;
  opacity: 0.9;
  z-index: 10003;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
