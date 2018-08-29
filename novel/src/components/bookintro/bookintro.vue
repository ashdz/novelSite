<template>
	<transition name="slide">
		<div class="bookintro-wrapper">
			<header class="header-wrapper">
				<div class="top-nav">
					<div class="nav-content">
						<span @click="back" class="back"></span>
					</div>
				</div>
				<div class="header-content">
					<div class="book-cover">
						<img v-if="bookintro.coverUrl" :src="bookintro.coverUrl" alt="">
					</div>
					<div class="book-detail">
						<h3 class="book-name">{{bookintro.bookName}}</h3>
						<p class="book-info">
							<span>{{bookintro.author}}</span>
							<span>{{bookintro.categoryName}}</span>
							<span>{{bookintro.status}}</span>
						</p>
						<p class="book-info">{{bookintro.updateTime | formatDate}}</p>
					</div>
				</div>
			</header>
			<div class="book-desc">
				<p>{{desc}}</p>
			</div>
			<div class="catalogue">
				<div class="catalogue-title">
					<strong>目录</strong>共{{catalogue.total}}章<span class="sort" @click="orderWay">{{order.text}}</span>
				</div>
				<div class="catalogue-detail">
					<div class="new">
						<div class="new-txt">
							<p v-if="bookintro.lastChapter">{{bookintro.lastChapter.name}}</p>
							<i class="new-tag">最新</i>
						</div>
						<span class="new-time">{{bookintro.updateTime | newDate}}</span>
					</div>
					<ul class="list">
						<li v-for="item in catalogue.items">
							{{item.name}}
							<span class="tag">{{item.isFree ? '免费' : '付费'}}</span>
						</li>
					</ul>
					<div class="page">
						<span :class="{noclick : currentPage === 1 }" @click="firstPage">首页</span>
						<span :class="{noclick : currentPage === 1 }" @click="prePage">上一页</span>
						<div class="select">
							<select v-model="currentPage">
								<option v-for="item in catalogue.totalPages" :key="item.id" :value="item">{{item === currentPage ? `${currentPage}/${catalogue.totalPages}` : item}}</option>
							</select>
						</div>
						<span :class="{noclick : currentPage === catalogue.totalPages }" @click="nextPage">下一页</span>
						<span :class="{noclick : currentPage === catalogue.totalPages }" @click="lastPage">尾页</span>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script type="text/ecmascript-6">
	import {getCatalogue} from '@/api/catalogue';
	import {getBookIntro} from '@/api/bookintro';
	import {getValue} from '@/common/js/util';
	import {formatDate} from '@/common/js/date';

	export default {
		data () {
			return {
				bookintro: {},
				catalogue: {},
				book: {},
				order:{
					mode: 'asc',	//asc:顺序;desc:倒序
					text: '倒序'
				},
				currentPage: 1
			}
		},
		filters: {
			formatDate (time) {
				let date = new Date(time);
				return formatDate(date, 'yyyy-MM-dd');
			},
			newDate (time) {
				let date = new Date(time);
				return formatDate(date, 'MM-dd hh:mm');
			}
		},
		computed: {

		},
		created () {
			this.book.p = this.currentPage;
			this.book.bkey = getValue('bkey');
			this.book.mode = this.order.mode
			this._getCatalogue(this.book);
			// 解码
			this.desc = decodeURIComponent(getValue('desc'));
		},
		mounted () {

		},
		methods: {
			back () {
				this.$router.go(-1);
			},
			orderWay () {
				if (this.order.mode === 'asc') {
					this.book.mode = this.order.mode = 'desc';
					this.order.text = '顺序';

				}else{
					this.book.mode = this.order.mode = 'asc';
					this.order.text = '倒序';
				}
			},
			firstPage () {
				if (this.currentPage === 1) {
					return;
				}
				this.currentPage = 1;
			},
			lastPage () {
				if (this.currentPage === this.catalogue.totalPages) {
					return;
				}
				this.currentPage = this.catalogue.totalPages;
			},
			prePage () {
				if (this.currentPage === 1) {
					return;
				}
				this.currentPage--;
			},
			nextPage () {
				if (this.currentPage === this.catalogue.totalPages) {
					return;
				}
				this.currentPage++;
			},
			_getCatalogue (params) {
				getCatalogue(params).then((response) => {
					if (response.status === 'succ') {
						this.catalogue = response.list;
						this.book.ckey = this.catalogue.items[0].ckey
						this._getBookIntro(this.book);
					}
				}).catch((error) => {
					console.log('getCatalogue error');
				});
			},
			_getBookIntro (params) {
				getBookIntro(params).then((response) => {
					if (response.status === 'succ') {
						if (response.status === 'succ') {
							let book = response.shelfBook.book;
							this.bookintro = book;
							console.log(this.bookintro.lastChapter.name)
						}
						console.log(this.bookintro)
					}
				}).catch((error) => {
					console.log('getBookIntro error');
				});
			}
		},
		watch: {
			currentPage (newCurrentPage) {
				this.book.p = this.currentPage;
				this._getCatalogue(this.book);
			},
			'order.mode': function () {
				this._getCatalogue(this.book);
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.bookintro-wrapper
		position relative
		top 0
		bottom 0
		left 0
		right 0
		background-color #fff
		z-index 1000
	.slide-enter-active, .slide-leave-active
		transition all 0.3s
	.slide-enter, .slide-leave-to
		transform translate3d(100%, 0, 0)
	.header-wrapper
		position relative
		padding-top 59px
		color #fff
		overflow hidden
		background-color rgba(17,17,19,0.6)
		.top-nav
			position absolute
			top 0
			left 0
			width 100%
			background-color transparent
			.nav-content
				text-align center
				font-size 18px
				position relative
				height 44px
				line-height 44px
				.back
					position absolute
					left 0
					top 0
					bottom 0
					width 40px
					&:after
						display block
						content ''
						width 13px
						height 13px
						position absolute
						top 0
						bottom 0
						left 18px
						margin auto
						border-top 1px solid #fff
						border-left 1px solid #fff
						transform rotate(-45deg)
		.header-content
			position relative
			display flex
			padding 0 15px
			.book-cover
				position relative
				width 95px
				flex 0 0 95px
				height 129px
				margin-right 15px
				box-shadow 0 0 7px 0 rgba(0,0,0,0.24)
				img
					position absolute
					left 0
					top 0
					width 100%
					height 100%
					object-fit cover
					object-position left top
			.book-detail
				flex 1
				min-width 0
				padding-top 8px
				line-height 23px
				font-size 13px
				text-align left
				.book-name
					line-height 22px
					max-height 44px
					margin-bottom 9px
					overflow hidden
					text-overflow ellipsis
					word-wrap normal
					-webkit-line-clamp 2
					-webkit-box-orient vertical
					display block
					display -webkit-box
					font-size 19px
					font-weight normal
				.book-info
					margin-top 1px
					span:after
						content '\3000'
						display inline-block
						width 1px
						height 10px
						background-color rgba(255,255,255,0.2)
						vertical-align -6px
						margin 0 5px
					span:last-child:after
						display none
	.book-desc
		padding 0 15px
		margin 17px 0 18px
		width 100%
		max-height 92px
		line-height 23px
		font-size 14px
		text-align left
		overflow auto
		box-sizing border-box
	.book-desc::-webkit-scrollbar
		display none
	.catalogue
		text-align left
		.catalogue-title
			position relative
			line-height 35px
			margin 0 15px
			border-bottom 1px solid #f4f4f4
			font-weight normal
			font-size 13px
			color #999
			strong
				font-size 18px
				color #262626
				margin-right 8px
				font-weight normal
			.sort
				position absolute
				right 0
				top 50%
				transform translateY(-50%)
		.catalogue-detail
			line-height 40px
			.new
				margin 7px 15px 0
				display flex
				box-align center
				align-items center
			.new-txt
				flex 1
				min-width 0
				display flex
				box-align center
				align-items center
				p
					overflow hidden
					text-overflow ellipsis
					word-wrap normal
					white-space nowrap
					display block
				.new-tag
					display block
					flex none
					width 31.5px
					height 14.5px
					margin-left 5px
					line-height 15px
					text-align center
					border-radius 14px 14px 14px 0
					background-image linear-gradient(90deg,#ff6041 0,#ff754a 100%)
					font-size 10px
					font-style normal
					color #fff
			.new-time
				flex none
				float none
				margin-left 12px
				font-size 12px
				color #b9b9b9
			.list
				margin 0 15px 7px
				li
					font-size 15px
					color #222
					overflow hidden
					text-overflow ellipsis
					word-wrap normal
					white-space nowrap
					display block
					.tag
						font-size 12px
						color #b9b9b9
						float right
			.page
				display flex
				border-top 1px solid #f4f4f4
				color #333
				line-height 48px
				margin 0 15px
				text-align center
				font-size 14px
				span
					position relative
					display block
					flex 1
				span.noclick
					color #999
				.select
					flex 2
					select
						font 14px sans-serif
						background-color #fff
						z-index 99999
						border none
						appearance none
					&:after
						content ''
						display inline-block
						border-top 4px solid #333
						border-right 4px solid transparent
						border-left 4px solid transparent
						width 0
						height 0
						vertical-align 3px
						
</style>