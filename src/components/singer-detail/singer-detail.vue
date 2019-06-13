<template>
  <transition name="slide">
    <music-list :songs="songs" :title="title" :bg-image="bgImage"></music-list>
  </transition>
</template>
<script>
import { mapGetters } from 'vuex'
import { getSingerDetail } from '../../api/singer'
import { getSongVkey } from '../../api/recommend'
import { ERR_OK } from '../../api/config'
import { createSong } from '../../common/js/song'
import MusicList from '../music-list/music-list'
export default {
  data() {
    return {
      songs: []
    }
  },
  components: {
    MusicList
  },
  computed: {
    ...mapGetters(['singer']),
    title() {
      return this.singer.name
    },
    bgImage() {
      return this.singer.avatar
    }
  },
  created() {
    this._getSingerDetail()
  },
  methods: {
    _getSingerDetail() {
      if (!this.singer.id) {
        this.$router.push('/singer')
        return
      }
      getSingerDetail(this.singer.id).then(res => {
        if (res.code === ERR_OK) {
          this.songs = this._normalizeSongs(res.data.list)
        }
      })
    },
    _normalizeSongs(list) {
      let ret = []
      list.forEach(item => {
        let { musicData } = item
        if (musicData.songid && musicData.albummid) {
          getSongVkey(musicData.songmid).then(res => {
            if (res.code === ERR_OK) {
              const sVkey = res.req_0.data.midurlinfo[0]
              const songVkey = sVkey.vkey
              const newSong = createSong(musicData, songVkey)
              console.log(newSong)
              ret.push(newSong)
            }
          })
        }
      })
      return ret
    }
  }
}
</script>
<style lang="stylus"></style>