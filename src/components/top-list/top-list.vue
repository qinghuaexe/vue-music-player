<template>
  <transition name="slider">
    <music-list :title="title" :bg-image="bgImage"></music-list>
  </transition>
</template>
<script>
import MusicList from '../music-list/music-list'
import { mapGetters } from 'vuex'
import { getMusicList } from '../../api/rank'
import { ERR_OK } from '../../api/config'
import { createSong } from '../../common/js/song'
import { getSongVkey } from '../../api/song'
export default {
  data() {
    return {
      songs: {}
    }
  },
  components: {
    MusicList
  },
  created() {
    this._getMusicList()
  },
  methods: {
    _getMusicList() {
      getMusicList(this.topList.id).then(res => {
        if (res.code === ERR_OK) {
          this.songs = this._normalizeSongs(res.songlist)
          console.log(this.songs)
        }
      })
    },
    _normalizeSongs(list) {
      let ret = []
      list.forEach(item => {
        const musicData = item.data
        getSongVkey(musicData.songmid).then(res => {
          const songVkey = res.data.items[0].vkey
          if (musicData.songid && musicData.albummid) {
            ret.push(createSong(musicData, songVkey))
          }
        })
      })
      return ret
    }
  },
  computed: {
    title() {
      return this.topList.topTitle
    },
    bgImage() {
      return this.topList.picUrl
    },
    ...mapGetters(['topList'])
  }
}
</script>
<style lang="stylus" scoped>
.slide-enter-active, .slide-leave-active {
  transition: all 0.3s;
}

.slide-enter, .slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>
