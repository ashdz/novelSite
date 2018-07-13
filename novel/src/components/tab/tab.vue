<template>
  <div class="tab-wrapper">
    <ul class="tab border-top-1px">
      <router-link tag="li" v-for="tab in tabs" :key="tab.id" :to="tab.toPath"> 
        <span class="tab-icon" :class="tab.class"></span>
        {{tab.title}}
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tabs: [
        {
          title: '书架',
          toPath: '/bookrack',
          class: 'icon-bookrack'
        },
        {
          title: '书城',
          toPath: '/bookmall',
          class: 'icon-bookmall'
        },
        {
          title: '发现',
          toPath: '/discover',
          class: 'icon-discover'
        }
      ]
    }
  },
  created() {
    
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin';
@import '../../common/style.css';

.tab-wrapper
  width 100%
  position fixed
  left 0px
  bottom 0px
  background-color #fff;
  z-index: 999;
  .tab
    display flex
    height 50px
    line-height 12px
    font-size 12px
    border-top-1px(rgba(7,17,27,0.1))
    li
      flex 1
      text-align center
      &.router-link-active
        color #d80000
        .tab-icon:before
          color #d80000
      .tab-icon
        display block
        width 32px
        height 32px
        line-height 32px
        margin auto
</style>
