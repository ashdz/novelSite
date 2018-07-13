<template>
	<v-scroll v-if="data.length > 0" ref="scroll" :scrollY="scrollY" class="mall-wrapper">
		<!-- <v-ranking :data="data" v-if="data.length > 0"></v-ranking> -->
		<ul class="ranking-wrapper">
			<li v-for="item in data" :key="item.id">
				<div class="cover">
					<img :src="item.cover" alt="">
				</div>
				<div class="text">
					<h2 class="name">{{item.name}}</h2>
					<span class="author">{{item.author}} | {{item.type}}</span>
					<p class="desc" :style="{height:descHeight}">{{item.descr}}</p>
				</div>
			</li>
		</ul>
	</v-scroll>
	<div v-else>没有数据</div>
</template>

<script type="text/ecmascript-6">
	import Scroll from '@/base/scroll/scroll';
	import RankingList from '@/base/rankingList/rankingList';

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
				scrollY: true
			}
		},
		computed: {
			descHeight () {
				// console.log(this.$refs.coverImg)
				const coverHeight = window.innerHeight;
				const descHeight = coverHeight > 320 ? '53px' : '32px'
				return descHeight;
			}
		},
		components: {
			'v-scroll': Scroll,
			'v-ranking': RankingList
		},
		created () {

		},
		mounted () {
			
		},
		methods: {
			refresh () {
				this.$refs.scroll && this.$refs.scroll.refresh();
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
