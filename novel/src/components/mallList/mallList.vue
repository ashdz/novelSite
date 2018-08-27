<template>
	<v-scroll @touchend="touchendFn" v-if="data.length > 0" ref="scroll" :scrollY="scrollY" :listenTouchend="listenTouchend" class="mall-wrapper">
		<v-ranking :data="data" v-if="data.length > 0"></v-ranking>
	</v-scroll>
	<div v-else>
		<v-loading></v-loading>
	</div>
</template>

<script type="text/ecmascript-6">
	import Scroll from '@/base/scroll/scroll';
	import RankingList from '@/base/rankingList/rankingList';
	import Loading from '@/base/loading/loading';

	export default {
		props: {
			navListName: {
				type: String,
				default: '默认'
			},
			data: {
				type: Array,
				default: function (){
					return [];
				}
			}
		},
		data () {
			return {
				scrollY: true,
				listenTouchend: true,
				page: 1,
				pullUp: true,
				pullDown: true
			}
		},
		computed: {
			
		},
		components: {
			'v-scroll': Scroll,
			'v-ranking': RankingList,
			'v-loading': Loading
		},
		created () {

		},
		mounted () {
			
		},
		methods: {
			refresh () {
				this.$refs.scroll && this.$refs.scroll.refresh();
			},
			touchendFn (pos) {
				const currentUlHeight = this.$refs.scroll.$refs.scrollWrapper.childNodes[0].clientHeight;
				const containerHeight = this.$refs.scroll.$refs.scrollWrapper.clientHeight;
				const dY = currentUlHeight - containerHeight - Math.abs(pos.y);
				
				// 上拉加载
				if (this.pullUp && pos.y < 0 && dY < -50) {
					this.pullUp = false;
					this.pullDown = false;
					this.page++;
					// 下拉刷新
				} else if (this.pullDown && pos.y > 50) {
					this.pullDown = false;
					this.pullUp = false;
					this.page = 1;
					this.$parent.getNextRanking(this.page);
				}
			}
		},
		watch: {
			page (newPage) {
				this.$parent.getNextRanking(newPage);
			},
			data () {
				setTimeout(() => {
					this.refresh();
					this.pullDown = true;
					this.pullUp = true;
				},200);
			}
		}
	}
</script>	

<style lang="stylus" rel="stylesheet/stylus">
	.mall-wrapper
		width 100%;
		.ranking-wrapper
			padding 15px
			width 100%
			box-sizing border-box
			li
				margin-bottom 10px
				display flex
				background-color #fff
				.cover
					flex 1
					img
						width 100%
				.text
					vertical-align middle
					padding-left 10px
					padding-top 5px
					padding-bottom 5px
					flex 3
					height 100%
					text-align left
					box-sizing border-box
					overflow hidden
					h2
						line-height 1
						font-size 16px
						color #333
					span
						margin-top 6px
						font-size 8px
						line-height 24px
						color #666
					p
						margin-top 4px
						font-size 13px
						line-height 19px
						color #a3a3a3
			li:last-child
				margin-bottom 0
</style>
