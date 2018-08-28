<template>
	<div class="bookmall-wrapper">
		<div class="bookmall-header">
			<div class="header">
				<div class="search">
					<span class="icon-search"></span>
					搜索书城
				</div>
				<div class="classify">分类</div>
			</div>
			<v-navigator ref="navigator" @change="change" :navList="navList" :currentTabIndex="currentTabIndex"></v-navigator>
		</div>
		<div class="bookmall-content"
			@touchstart="mallTouchStart"
			@touchmove="mallTouchMove"
			@touchend="mallTouchEnd">
			<div class="list-wrapper" ref="listWrapper" :style="{width:listWrapperWidth}">
				<v-mallList ref="mallList" class="list" v-for="list in navList" :key="list.id" :navListName="list.name" :data="list.data"></v-mallList>
			</div>
		</div>
		<router-view></router-view>
	</div>
</template>

<script type="text/ecmascript-6">
	import Scroll from '@/base/scroll/scroll';
	import Navigator from '@/components/navigator/navigator';
	import MallList from '@/components/mallList/mallList';
	import {prefixStyle} from '@/common/js/dom';
	import {getRankingList} from '@/api/mallList';

	const transform = prefixStyle('transform');
	const transitionDuration = prefixStyle('transitionDuration');

	export default {
		data () {
			return {
				scrollY: true,
				navList: [
					{
						id: 1,
						name: '免费榜',
						rankId: 3,
						data: []
					},
					{
						id: 2,
						name: '都市榜',
						rankId: 5,
						data: []
					},
					{
						id: 3,
						name: '玄幻榜',
						rankId: 6,
						data: []
					},
					{
						id: 4,
						name: '现言榜',
						rankId: 9,
						data: []
					},
					{
						id: 5,
						name: '古言榜',
						rankId: 10,
						data: []
					},
					{
						id: 6,
						name: '人气榜',
						rankId: 11,
						data: []
					},
					{
						id: 7,
						name: '潜力榜',
						rankId: 7,
						data: []
					}
				],
				currentTabIndex: 1,
				percent: 0,
				book: []
			}
		},
		computed: {
			listWrapperWidth () {
				const width = window.innerWidth;
				console.log(width)
				const listWrapperWidth = width * this.navList.length;
				return `${listWrapperWidth}px`;
			}
		},
		components:{
			'v-scroll': Scroll,
			'v-navigator': Navigator,
			'v-mallList': MallList
		},
		created () {
			this.touch = {};
			// 排行榜首屏渲染（免费榜）
			this._getRankingList({
				page: 1,
				rankId: this.navList[this.currentTabIndex - 1].rankId
			});
		},
		mounted () {

		},
		methods: {
			change (item) {
		      if (item !== undefined) {
		        this.currentTabIndex = item.id
		      }
		      // 以下部分编写点击相应的navList item时，渲染的逻辑代码
		      // this.$router.replace('/examples/nav-list/' + this.currentTabIndex + '/' + this.$i18n.locale)
		    },
		    mallTouchStart (e) {
		    	const touch = e.touches[0];
		    	this.percent = 0;

		    	this.touch.startX = touch.pageX;
		    	this.touch.startY = touch.pageY;
		    	this.touch.offsetWidth = - window.innerWidth * (this.currentTabIndex - 1);
		    },
		    mallTouchMove (e) {
		    	let offsetWidth;
		    	const touch = e.touches[0];

		    	this.touch.moveX = touch.pageX;
		    	this.touch.moveY = touch.pageY;

		    	const dealX = this.touch.moveX - this.touch.startX;
		    	const dealY = this.touch.moveY - this.touch.startY;

		    	if (Math.abs(dealY) > Math.abs(dealX)) {
		    		return;
		    	}

		    	if ((dealX > 0 && this.currentTabIndex === 1) || (dealX < 0 && this.currentTabIndex === (this.navList.length))) {
		    		return;
		    	}

		    	this.percent = dealX / window.innerWidth;
		    	offsetWidth = this.touch.offsetWidth + dealX;

		    	this.$refs.listWrapper.style[transform] = `translate3d(${offsetWidth}px, 0, 0)`;
		    	this.$refs.listWrapper.style[transitionDuration] = 0;

		    },
		    mallTouchEnd () {
		    	let time = 300;
		    	if (Math.abs(this.percent) > 0.3) {

		    		if (this.percent > 0) {
		    			this.currentTabIndex = this.currentTabIndex - 1;
		    		} else {
		    			this.currentTabIndex = this.currentTabIndex + 1;
		    		}

		    		// 调用子组件方法更改nav状态
		    		this.$refs.navigator.parentAdjust(this.currentTabIndex);
		    		return;
		    	}
		    	this._listWrapperSlide(this.currentTabIndex);
		    },
		    _listWrapperSlide (index) {
		    	const width = window.innerWidth;
		    	const offsetWidth = - width * (index - 1);
		    	const time = 300;

		    	this.$refs.listWrapper.style[transform] = `translate3d(${offsetWidth}px, 0, 0)`;
		    	this.$refs.listWrapper.style[transitionDuration] = `${time}ms`;
		    },
		    _getRankingList (params) {
		    	if(params.page <= 1) {
	    			this.navList[this.currentTabIndex - 1].data = [];
	    		}
		    	getRankingList(params).then((response) => {
		    		this.navList[this.currentTabIndex - 1].data = this.navList[this.currentTabIndex - 1].data.concat(response.list);
		    	}).catch((error) => {
		    		console.log('getRankingList error');
		    	});
		    },
		    // 获取指定页码的数据（用于上拉加载更多或下拉刷新）
		    getNextRanking (page) {
		    	this._getRankingList({
					page: page,
					rankId: this.navList[this.currentTabIndex - 1].rankId
				});
		    }
		},
		watch: {
			currentTabIndex (newIndex) {
				this._listWrapperSlide(newIndex);
				if (this.navList[newIndex - 1].data.length > 0) {
					return;
				}
				this._getRankingList({
					page: 1,
					rankId: this.navList[newIndex - 1].rankId
				});
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.bookmall-wrapper
		.bookmall-header
			position absolute
			top 0px
			left 0px
			width 100%
			height 80px
			background-color #fff
			z-index 999
			overflow hidden
			.header
				padding-top 10px
				padding-bottom 10px
				margin 0 15px
				display flex
				height 30px
				line-height 30px
			.search
				position relative
				flex 1
				height 30px
				line-height 30px
				font-size 14px
				text-align left
				color #666
				background-color #eee;
				border-radius 5px
				.icon-search
					margin-left 10px
					vertical-align middle
					font-size 16px
			.classify
				margin 0 0 0 15px
				width 50px
				flex 0 0 50px
				font-size 14px
		.bookmall-content
			width 100%
			position absolute
			top 80px
			bottom 50px
			overflow hidden
		.list-wrapper
			display flex
			height 100%
			.list
				flex 1
</style>