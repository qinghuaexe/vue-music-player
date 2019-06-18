<template>
  <scroll :data="result" :pullup="pullup" @scrollToEnd="searchMore" class="suggest">
    <ul class="suggest-list">
      <li class="suggest-item" v-for="(item, index) in result" :key="index">
        <div class="icon">
          <i :class="getIconCls(item)"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getDisplayName(item)"></p>
        </div>
      </li>
      <loading v-show="hasMore" :title="''"></loading>
    </ul>
  </scroll>
</template>
<script>
import { search } from '../../api/search'
import { ERR_OK } from '../../api/config'
import { createSong } from '../../common/js/song'
import { getSongVkey } from '../../api/song'
import Scroll from '../../base/scroll/scroll'
import Loading from '../../base/loading/loading'

const perpage = 20

const TYPE_SINGER = 'singer'
export default {
  data() {
    return {
      page: 1,
      result: [],
      pullup: true,
      hasMore: true
    }
  },
  components: {
    Scroll,
    Loading
  },
  props: {
    query: {
      type: String,
      default: ''
    },
    showSinger: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    query() {
      this.search()
    }
  },
  methods: {
    getDisplayName(item) {
      if (item.type === TYPE_SINGER) {
        return item.singername
      } else {
        return `${item.name} - ${item.singer}`
      }
    },
    getIconCls(item) {
      if (item.type === TYPE_SINGER) {
        return 'icon-mine'
      } else {
        return 'icon-music'
      }
    },
    checkMore(data) {
      const song = data.song
      if (!song.list.length || song.curnum + song.curpage * perpage > song.totalnum) {
        this.hasMore = false
      }
    },
    async searchMore() {
      if (!this.hasMore) {
        return
      }
      this.page++
      const res = await search(this.query, this.page, this.showSinger, perpage)
      if (res.code === ERR_OK) {
        const newResult = await this._genResult(res.data)
        this.result = this.result.concat(newResult)
      }
    },
    async search() {
      this.hasMore = true
      const res = await search(this.query, this.page, this.showSinger, perpage)
      if (res.code === ERR_OK) {
        this.result = await this._genResult(res.data)
        this.checkMore(res.data)
      }
    },
    async _genResult(data) {
      let ret = []
      if (data.zhida && data.zhida.singerid) {
        ret.push({ ...data.zhida, ...{ type: TYPE_SINGER } })
      }
      if (data.song) {
        ret = ret.concat(await this._normalizeList(data.song.list))
      }
      return ret
    },
    _normalizeList(list) {
      const promises = list.map(musicData => {
        return getSongVkey(musicData.songmid).then(res => {
          return musicData.songid && musicData.albumid ? createSong(musicData, res.data.items[0].vkey) : null
        })
      })
      return Promise.all(promises)
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/variable';
@import '../../common/stylus/mixin';

.suggest {
  height: 100%;
  overflow: hidden;

  .suggest-list {
    padding: 0 30px;

    .suggest-item {
      display: flex;
      align-items: center;
      padding-bottom: 20px;
    }

    .icon {
      flex: 0 0 30px;
      width: 30px;

      [class^='icon-'] {
        font-size: 14px;
        color: $color-text-d;
      }
    }

    .name {
      flex: 1;
      font-size: $font-size-medium;
      color: $color-text-d;
      overflow: hidden;

      .text {
        no-wrap();
      }
    }
  }

  .no-result-wrapper {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>