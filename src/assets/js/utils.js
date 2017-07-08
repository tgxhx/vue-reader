/**
 * Created by 12 on 2017/7/6.
 */
export default {
  install(Vue, options) {
    Vue.prototype.common = {
      defaultImage(e) {
        e.target.src = 'http://www.zwdu.com/files/article/image/20/20962/20962s.jpg'
      },
      api: 'http://39.108.14.248:3333'
    }
  }
}


