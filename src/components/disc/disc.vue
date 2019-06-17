<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>
<script>
import MusicList from '../music-list/music-list'
import { mapGetters } from 'vuex'
import { getSongList } from '../../api/recommend'
import { ERR_OK } from '../../api/config'
import { createRecomSong } from '../../common/js/song'
import { getSongVkey } from '../../api/song'
export default {
  data() {
    return {
      songs: []
    }
  },
  computed: {
    title() {
      return this.disc.dissname
    },
    bgImage() {
      return this.disc.imgurl
    },
    ...mapGetters(['disc'])
  },
  created() {
    this._getSongList()
  },
  methods: {
    _getSongList() {
      if (!this.disc.dissid) {
        this.$router.push('/recommend')
      }
      getSongList(this.disc.dissid).then(res => {
        if (res.code === ERR_OK) {
          this.songs = this._normalizeSongs(res.cdlist[0].songlist)
        }
      })
    },
    _normalizeSongs(list) {
      let ret = []
      list.forEach(musicData => {
        console.log(musicData)
        console.log(musicData.mid)
        getSongVkey(musicData.mid).then(res => {
          const songVkey = res.data.items[0].vkey
          if (musicData.id && musicData.album.id) {
            ret.push(createRecomSong(musicData, songVkey))
          }
        })
      })
      return ret
    }
  },

  components: {
    MusicList
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
