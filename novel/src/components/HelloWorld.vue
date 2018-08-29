<template>
  <div class="tab-wrapper">
    <ul></ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      tab: [
        {
          title: '书架',
          iconImg: '',
          activeIconImg: ''
        },
        {
          title: '书城',
          iconImg: '',
          activeIconImg: ''
        },
        {
          title: '发现',
          iconImg: '',
          activeIconImg: ''
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

</style>
