<template>
  <transition name="slider">
    <music-list :title="title" :bg-image="bgImage"></music-list>
  </transition>
</template>
<script>
import MusicList from '../music-list/music-list'
import { mapGetters } from 'vuex'
export default {
  components: {
    MusicList
  },
  computed: {
    title() {
      console.log(this.topList)
      return this.topList.topTitle
    },
    bgImage() {
      return this.topList.picUrl
    },
    ...mapGetters([
      'topList'
    ])
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
