import * as types from './mutations-types'

export default {
  [types.TOGGLE_BAR](state) {
    state.bar = !state.bar
  },
  [types.SHOW_LIST_PANEL](state) {
    state.list_panel = !state.list_panel
  },
  [types.SHOW_FONT_PANEL](state) {
    state.font_panel = !state.font_panel
  },
  [types.FZ_SIZE_ADD](state) {
    state.fz_size++
    if (state.fz_size >= 24) {
      state.fz_size = 24
    }
  },
  [types.FZ_SIZE_SUB](state) {
    state.fz_size--
    if (state.fz_size <= 14) {
      state.fz_size = 14
    }
  },
  [types.SWITCH_NIGHT](state) {
    state.bg_night = !state.bg_night
  },
  [types.PREV_CHAPTER](state) {
    if (state.curChapter <= 1) {
      return false
    }
    state.curChapter--
  },
  [types.NEXT_CHAPTER](state, maxChapter) {
    if (state.curChapter >= maxChapter) {
      return false
    }
    state.curChapter++
  },
  [types.CHOOSE_BOOK](state, id) {
    state.curBookDetailId = id
  },
  [types.SHOW_BOOK_DETAIL] (state, obj) {
    state.bookDetail = obj
  },
  [types.CUR_CHAPTER](state, num) {
    state.curChapter = num
  }
}
