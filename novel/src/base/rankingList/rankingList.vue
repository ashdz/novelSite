<template>
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
</template>

<script type="text/ecmascript-6">
	export default {
		props: {
			data: {
				type: Array,
				default: function (){
					return [];
				}
			}
		},
		data () {
			return {

			}
		},
		created () {
			this.$nextTick(() => {
				
			});
		},
		mounted () {
			this.$nextTick(() => {
				
			});
		},
		computed: {
			descHeight () {
				// console.log(this.$refs.coverImg)
				const coverWidth = window.innerWidth;
				const descHeight = coverWidth > 320 ? '53px' : '32px';
				return descHeight;
			}
		},
		watch: {

		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	
</style>