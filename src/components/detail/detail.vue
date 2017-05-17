<template>

    <div id="main" class="container row">
        <div id="mainL" class="col-xs-12">
            <div id="movieDetail">
                <div class="row">
                    <h1 id="movieTitle" class="">{{movieData.title}}</h1>
                </div>
                <div class="row">
                    <div id="movieImg" class="col-xs-10 col-xs-offset-1 col-sm-3 col-sm-offset-0">
                        <img v-bind:src="movieData.img" alt="" />
                    </div>
                    <div id="movieInfo" class="col-xs-12 col-sm-7">
                        <ul>
                            <li>
                                <span>导演:</span>
                                <span>{{movieData.director?movieData.director:'暂无'}}</span>
                            </li>
                            <li>
                                <span>编剧:</span>
                                <span>{{movieData.writer?movieData.writer:'暂无'}}</span>
                            </li>
                            <li>
                                <span>主演:</span>
                                <span>{{movieData.actors?movieData.actors:'暂无'}}</span>
                            </li>
                            <li>
                                <span>类型:</span>
                                <span>{{movieData.type?movieData.type:'暂无'}}</span>
                            </li>
                            <li>
                                <span>制片国家/地区:</span>
                                <span>{{movieData.location?movieData.location:'暂无'}}</span>
                            </li>
                            <li>
                                <span>语言:</span>
                                <span>{{movieData.language?movieData.language:'暂无'}}</span>
                            </li>
                            <li>
                                <span>上映日期:</span>
                                <span>{{movieData.up_time?movieData.up_time:'暂无'}}</span>
                            </li>
                            <li>
                                <span>片长:</span>
                                <span>{{movieData.length?movieData.length+'分钟':'暂无'}}</span>
                            </li>
                            <li>
                                <span>又名:</span>
                                <span>{{movieData.other_title?movieData.other_title:'暂无'}}</span>
                            </li>
                            <li>
                                <span>IMDb:</span>
                                <span>{{'暂无'}}</span>
                            </li>
                        </ul>
                    </div>
                    <div id="movieScore" class="col-xs-12 col-sm-2">
                        <h1>评分</h1>
                        <h2>{{movieData.score?movieData.score:'暂无'}}</h2>
                        <div id="movieScoreStarBox">
                            <div id="movieScoreStar" class="row" v-bind:style="'background-size:'+movieData.score*10+'% 100%'">
                                <div class="star-five"></div>
                                <div class="star-five"></div>
                                <div class="star-five"></div>
                                <div class="star-five"></div>
                                <div class="star-five"></div>
                            </div>
                        </div>

                    </div>
                </div>
                

            </div>
        </div>
        <!-- 右侧预留 -->
        <!-- <div id="mainR" class="col-xs-12"></div> -->
    </div>

</template>

<script>
    export default {
        name:'detail',
        props: ['global'],
        data: function () {
            return {
                movieData: {
                    actors: '',
                    desc: '',
                    director: '',
                    img: '',
                    language: '',
                    length: '',
                    location: '',
                    other_title: '',
                    score: null,
                    title: '',
                    type: '',
                    up_time: null,
                    writer: '',
                    bts:[]
                }
            }
        },
        created: function () {
            this.$http.get(this.global.url + '/movie/' + this.$route.params.uuid).then(function (d) {
                this.movieData=d.data.data;

            })
        }
    }

</script>

<style scoped>
    #main {
        margin-top: 20px;
        margin-bottom: 20px;
        padding-top: 10px;
        padding-bottom: 10px;
        background-color: white;
        border: 1px solid #e3e3e3;
    }

    #movieTitle {
        line-height: 40px;
        font-size: 24px;
        text-align: center;
    }

    #movieInfo {
        margin-top: 20px;
        line-height: 20px;
        color: gray;
    }

    #movieInfo>ul>li+li {
        margin-top: 4px;
    }

    #movieInfo>ul>li>span+span {
        color: black;
    }

    #movieScore {
        text-align: center;
        padding: 0;
    }

    #movieScore>h1 {
        font-size: 22px;
        line-height: 50px;
    }

    #movieScore>h2 {
        font-size: 26px;
        margin-bottom: 10px;
    }

    #movieScoreStar {
        width: 100px;
        margin: 0 auto;
        background: url(./yellow.png) no-repeat 0 0;
        background-size: 0 100%;
    }

    .star-five {
        width: 20px;
        height: 20px;
        float: left;
        background: url(./star-five.png) no-repeat 0 0/100% 100%;
    }





    #movieDownloadBox {
        margin-top: 20px;
    }

    #movieDownloadTitle {
        background-color: #f3f3f3;
    }

    #movieDownloadTitle>h1 {
        line-height: 50px;
        font-size: 26px;
        text-align: center;
    }

    #movieDownload li {
        border-bottom: 1px dotted #dcdcdc;
        line-height: 50px;
        font-size: 20px;
    }

    #movieDownload li>a {
        color: black;
    }
</style>