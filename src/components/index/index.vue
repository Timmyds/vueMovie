<template>


	<div id="index">
		<div id="mainSearch">
			<canvas id="mainSearchCanvas"></canvas>
			<div id="mainSearchBox" class="row container col-xs-12 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3">
				<input v-model="searchData.inputText" v-on:keyup.enter="searchFn" id="mainSearchInput" type="text" placeholder="搜索电影" />
				<i id="mainSearchBtn" class="icono-search"></i>
				<button v-on:click="searchFn"></button>
			</div>
		</div>
		<transition name="slideDown">
			<div v-show="searchResult.length" id="searchResult" class="contentBox container row" v-bind:class="{ hideTitle: !this.global.isMobile }">
				<h1><span>搜索结果</span></h1>
				<contentList v-bind:list="searchResultComputed[0]"></contentList>
				<contentList v-bind:list="searchResultComputed[1]"></contentList>
				<contentList v-if="waterFallColNum>=3" v-bind:list="searchResultComputed[2]"></contentList>
				<contentList v-if="waterFallColNum>=4" v-bind:list="searchResultComputed[3]"></contentList>
				<contentList v-if="waterFallColNum>=5" v-bind:list="searchResultComputed[4]"></contentList>
				<contentList v-if="waterFallColNum>=6" v-bind:list="searchResultComputed[5]"></contentList>
			</div>
		</transition>
		<div id="newMovie" class="contentBox container row" v-bind:class="{ hideTitle: !this.global.isMobile }">
			<h1><span>最新电影</span></h1>
			<contentList v-bind:list="newMovieComputed[0]"></contentList>
			<contentList v-bind:list="newMovieComputed[1]"></contentList>
			<contentList v-if="waterFallColNum>=3" v-bind:list="newMovieComputed[2]"></contentList>
			<contentList v-if="waterFallColNum>=4" v-bind:list="newMovieComputed[3]"></contentList>
			<contentList v-if="waterFallColNum>=5" v-bind:list="newMovieComputed[4]"></contentList>
			<contentList v-if="waterFallColNum==6" v-bind:list="newMovieComputed[5]"></contentList>
		</div>
	</div>

</template>

<script>
	import { getElementTop } from '@/assets/js/common.js';
	import contentList from '@/components/contentList/contentList';
	export default {
		name: 'index',
		components: {
			contentList
		},
		props: ['global'],
		data: function () {
			return {
				waterFallColNum: 6,
				searchData: {
					inputText: ''
				},
				searchResult: [],
				newMovie: [],
				newMovieCount: {
					maxNum: null,
					apiOnOff: true//防止重复请求
				},
				coordinate: {
					scrollListener: 0,
					windowScroll: 0
				}
			}
		},
		computed: {
			searchResultComputed: function () {
				var arr = [[], [], [], [], [], []];
				var i = 0;
				if (parseInt(this.searchResult.length / this.waterFallColNum) === this.searchResult.length / this.waterFallColNum) {
					var loop = this.searchResult.length / this.waterFallColNum;
				} else {
					var loop = this.searchResult.length / this.waterFallColNum + 1;
				}

				for (let index = 0; index < loop; index++) {

					for (let j = 0; j < this.waterFallColNum; j++) {
						if (this.searchResult[i]) {
							arr[j].push(this.searchResult[i]);
							i++;
						} else {
							break;
						}

					}
				}
				return arr;
			},
			newMovieComputed: function () {
				var arr = [[], [], [], [], [], []];
				var i = 0;
				if (parseInt(this.newMovie.length / this.waterFallColNum) === this.newMovie.length / this.waterFallColNum) {
					var loop = this.newMovie.length / this.waterFallColNum;
				} else {
					var loop = this.newMovie.length / this.waterFallColNum + 1;
				}

				for (let index = 0; index < loop; index++) {

					for (let j = 0; j < this.waterFallColNum; j++) {
						if (this.newMovie[i]) {
							arr[j].push(this.newMovie[i]);
							i++;
						} else {
							break;
						}

					}
				}
				return arr;
			},
			waterFallColHeight: function () {
				var arr = [];
				this.newMovieComputed;//增加监听依赖
				for (var index = 0; index < this.waterFallColNum; index++) {
					arr.push(document.getElementById('newMovie').getElementsByClassName('contentList')[index].offsetHeight + getElementTop(document.getElementById('newMovie').getElementsByClassName('contentList')[0]));
				}
				arr.sort(function (x, y) {
					if (x > y) {
						return 1;
					} else {
						return -1;
					}
				});

				return arr[0];
			}
		},
		methods: {
			searchFn: function (e) {
				if (this.searchData.inputText == '') {
					swal({   title: "请输入", timer: 1000,   showConfirmButton: false });
					return;
				}
				this.searchResult = [{}];
				this.$http.get(this.global.url + '/search?q=' + this.searchData.inputText + '&page=1').then(function (d) {
					if (!d.data.data.length) {
						this.searchResult = [];
						swal({   title: "抱歉，没有您需要查找的电影信息", timer: 1000,   showConfirmButton: false });
						return;
					}
					var arr = [];
					for (var index = 0; index < d.data.data.length; index++) {
						arr.push({
							imgSrc: d.data.data[index].img,
							title: d.data.data[index].clean_title,
							uuid: d.data.data[index].douban_id ? d.data.data[index].douban_id : d.data.data[index].uuid,
							imgOnload: false
						})
					};
					this.searchResult = arr;

				})
			},
			getNewMovie: function (that, doneCb, errorCb) {//获取newMovie Api
				if (!this.newMovieCount.apiOnOff) {
					doneCb && doneCb();
					return;
				}
				this.newMovieCount.apiOnOff = false;//api通道关闭
				var maxNum;
				if (that.newMovieCount.maxNum !== null) {
					maxNum = '?maxNum=' + that.newMovieCount.maxNum;
				} else {
					maxNum = '';
				}
				for (var index = 0; index < 10; index++) {
					that.newMovie.push({});
				}

				that.$http.get(that.global.url + '/recent' + maxNum).then(function (d) {
					for (var index = 0; index < d.data.data.length; index++) {
						that.newMovie.splice(-(10 - index), 1, {
							imgSrc: d.data.data[index].img,
							title: d.data.data[index].clean_title,
							uuid: d.data.data[index].douban_id ? d.data.data[index].douban_id : d.data.data[index].uuid,
							imgOnload: false
						});
					};

					that.newMovieCount.maxNum = d.data.data[d.data.data.length - 1].id - 1;
					that.newMovieCount.apiOnOff = true;//请求完毕 api通道打开
					doneCb && doneCb();
				}, function () {
					errorCb && errorCb();
				});
			},
			pushFullWindow: function () {
				var that=this
				setTimeout(function () {
					if (document.body.offsetHeight <= window.innerHeight) {
						that.getNewMovie(that, that.pushFullWindow);
					}
				}, 100);
			}
		},
		watch: {
			waterFallColNum: function () {
				this.pushFullWindow();
			}
		},

		created: function () {
			this.getNewMovie(this);

			var that = this;
			var waterFallCol = {
				timer: null,
				fn: function () {
					var ww = window.innerWidth;
					switch (true) {
						case ww >= 1200:
							that.waterFallColNum = 6;
							break;
						case ww >= 992:
							that.waterFallColNum = 4;
							break;
						case ww >= 768:
							that.waterFallColNum = 3;
							break;
						default:
							that.waterFallColNum = 2;
							break;
					}
				}
			};
			waterFallCol.fn();
			window.addEventListener('resize', function () {
				clearInterval(waterFallCol.timer);
				waterFallCol.timer = setTimeout(waterFallCol.fn, 100);
			});
			window.addEventListener('scroll', function () {

				if (that.coordinate.scrollListener) {
					that.coordinate.windowScroll = document.body.scrollTop === 0 ? document.documentElement.scrollTop : document.body.scrollTop;
					if (that.waterFallColHeight - window.innerHeight - that.coordinate.windowScroll <= 100) {
						that.getNewMovie(that);
					}
				}

			});

		},
		mounted: function () {
			
			this.pushFullWindow();
		},
		activated: function () {
			document.documentElement.scrollTop = this.coordinate.windowScroll;
			document.body.scrollTop = this.coordinate.windowScroll;
			this.coordinate.scrollListener = true;

		},
		deactivated: function () {
			this.coordinate.scrollListener = false;
		}

	}

</script>

<style>
	#mainSearch {
		background: url(./searchBackground.jpg) no-repeat center center;
		height: 100px;
		position: relative;
		z-index: 1;
	}

	#mainSearchCanvas {
		display: none;
	}

	#mainSearchBox {
		position: absolute;
		height: 40px;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		margin: auto;
	}

	#mainSearchInput {
		width: 100%;
		height: 40px;
		line-height: 40px;
		border-color: #dcdcdc;
		border-radius: 5px;
		text-indent: 1em;
		font-size: 18px;
		color: #424242;
		font-family: "Lucida Grande", 'Lucida Sans Unicode', "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
	}

	#mainSearchBox>button {
		position: absolute;
		top: 1px;
		right: 16px;
		width: 40px;
		height: 40px;
		border: 0;
		background-color: transparent;
		cursor: pointer;
	}

	#mainSearchBox>i {
		position: absolute;
		top: 3px;
		right: 21px;
	}

	.contentBox {
		background-color: white;
		border: 1px solid #e3e3e3;
		padding: 20px 0 0 0;
	}

	#searchResult {
		margin-bottom: 20px;
	}

	#searchResult>h1,
	#newMovie>h1 {
		font-size: 26px;
		line-height: 40px;
		text-align: center;
		padding-bottom: 20px;
	}

	#searchResult>h1>span,
	#newMovie>h1>span {
		padding-bottom: 5px;
		border-bottom: 2px solid #E40505;
	}




	.hideTitle>div>div:hover h1 {
		display: block;
	}

	.hideTitle>div h1 {
		display: none;
	}
</style>