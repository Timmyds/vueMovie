<template>
	<div id="app">
		<div id="header">
			<div class="container row">
				<div href="" id="headerLogo" class="col-xs-4"></div>
				<div href="" id="headerMovie" class="headerNav col-xs-4 text-center"><span v-bind:class="{headerNavActive:this.global.type==='movie'}">电影</span></div>
				<div href="" id="headerGame" class="headerNav col-xs-4 col-lg-2 text-center"><span v-bind:class="{headerNavActive:this.global.type==='game'}" v-on:click="switchTo">游戏</span></div>
			</div>
		</div>


		
		<keep-alive include="index">
			<router-view v-bind:global="global"></router-view>
		</keep-alive>

		<div id="footer"></div>
	</div>
</template>

<script>
	export default {
		data: function () {
			return {
				global: {
					url: 'http://121.196.214.248/v1',
					type: 'movie',
					isMobile: false
				}
			}
		},
		methods:{
			switchTo:function(){
				alert('开发中');
			}
		},
		created: function () {
			this.global.isMobile = (function browserRedirect() {
				var sUserAgent = navigator.userAgent.toLowerCase();
				var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
				var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
				var bIsMidp = sUserAgent.match(/midp/i) == "midp";
				var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
				var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
				var bIsAndroid = sUserAgent.match(/android/i) == "android";
				var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
				var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
				if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
					return true;
				} else {
					return false;
				}
			})();
		}
	}

</script>

<style>
	body {
		background-color: #f5f5f8;
	}

	#header {
		background-color: white;
		padding: 10px 0;
		border-bottom: 1px solid #e3e3e3;
	}

	#headerLogo {
		height: 50px;
		background: url(./logo.png) no-repeat center/100% auto;
	}

	#headerMovie {
		color: #E40505;
	}

	.headerNav {
		font-size: 20px;
		height: 50px;
		line-height: 50px;
	}

	.headerNav>span {
		display: inline-block;
		height: 40px;
		line-height: 40px;
		border-bottom: 3px solid #dcdcdc;
		cursor:pointer;
	}
	.headerNavActive{
		border-bottom: 3px solid #E40505!important;
	}

	#headerSearchBox {
		margin-top: 13px;
		position: relative;
	}

	#headerSearchBox>input {
		line-height: 30px;
		border-color: #dcdcdc;
		border-radius: 5px;
	}

	#headerSearchBox>button {
		position: absolute;
		top: 1px;
		right: 16px;
		width: 30px;
		height: 30px;
		border: 0;
		background-color: transparent;
		cursor: pointer;
	}

	#headerSearchBox>i {
		position: absolute;
		top: -1px;
		right: 16px;
	}
	@media screen and (min-width:768px) {
		/* sm */
		#mainSearch {
			height: 400px!important;
		}
		/*#mainSearchCanvas {
			display: block;
		}*/
		#headerLogo {
			background: url(./logo.png) no-repeat center/auto 100%;
		}
	}

	@media screen and (min-width:992px) {
		/* md */
		
	}

	@media screen and (min-width:1200px) {
		/* lg */
	}
</style>