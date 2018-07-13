<template>
	<div class="scroll-wrapper" ref="scrollWrapper">
		<slot></slot>
	</div>
</template>

<script type="text/ecmascript-6">
	import BScroll from 'better-scroll';

	export default {
		props: {
			scrollX: {
				type: Boolean,
				default: false
			},
			scrollY: {
				type: Boolean,
				default: false
			}
		},
		data () {
			return {
				mallList: false
			}
		},
		created () {
			this.mallList = this.scrollY;
		},
		mounted () {
			this.$nextTick(() => {
				this._initBScroll();
				// 排行榜页则刷新scroll
				if (!this.mallList) {
					return;
				}
				setTimeout(() => {
					this.refresh();
				}, 100);
			});
			
		},
		methods: {
			scrollTo () {
				// apply方法this.scroll替换母函数this，arguments传参，数组类型，为一个参数列表
      	this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
			},
	    refresh () {
	      this.scroll && this.scroll.refresh();
	    },
			_initBScroll () {
				if (!this.$refs.scrollWrapper) {
		      return;
		    }
				this.scroll = new BScroll(this.$refs.scrollWrapper, {
					click: true,
					scrollY: this.scrollY,
					scrollX: this.scrollX
				});
			}
		},
	  watch: {
	    data () {
	      this.$nextTick(() => {
	        this.refresh();
	      });
	    }
	  }
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.scroll-wrapper
		height 100%;
		// overflow hidden
</style>