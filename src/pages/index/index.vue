<template>
    <view class="content">
        <!-- 1.自定义导航 -->
        <Navbar> </Navbar>
        <scroll-view scroll-y class="main" @scrolltolower="scrolltolower" refresher-enabled
            @refresherrefresh="refresherrefresh" :refresher-triggered="refresherTriggered">
            <!-- 2.轮播图 -->
            <Carousel :banners="banners" height="280rpx"></Carousel>
            <!-- 3.分类栏目 -->
            <CateScroll :categoryHeadMutli="categoryHeadMutli"></CateScroll>
            <!-- 4.人气推荐 -->
            <view class="panel recommend">
                <view class="item" v-for="item in hotMutli" :key="item.id">
                    <view class="title">
                        {{ item.title }}<text>{{ item.alt }}</text>
                    </view>
                    <navigator hover-class="none" :url="`/pages/recommend/index?type=${item.type}`" class="cards">
                        <image mode="aspectFit" v-for="img in item.pictures" :key="img" :src="img"></image>
                    </navigator>
                </view>
            </view>
            <!-- 5.新鲜好物 -->
            <view class="panel fresh">
                <view class="title">
                    新鲜好物
                    <navigator hover-class="none" class="more" url="/pages/recommend/index?type=5">更多</navigator>
                </view>
                <view class="cards">
                    <navigator hover-class="none" :url="`/pages/goods/index?id=${item.id}`" v-for="item in homeNew"
                        :key="item.id">
                        <image mode="aspectFit" :src="item.picture"></image>
                        <view class="name">{{ item.name }}</view>
                        <view class="price">
                            <text class="small">¥</text>{{ item.price }}
                        </view>
                    </navigator>
                </view>
            </view>
            <!-- 6.热门品牌 -->
            <view class="panel brands">
                <view class="title">
                    热门品牌
                    <navigator hover-class="none" class="more" url="/pages/list/index">更多</navigator>
                </view>
                <view class="cards">
                    <navigator hover-class="none" url="/pages/goods/index">
                        <image mode="aspectFit" src="http://static.botue.com/erabbit/static/uploads/brand_logo_1.jpg">
                        </image>
                        <view class="name">小米</view>
                        <view class="price">99元起</view>
                    </navigator>
                    <navigator hover-class="none" url="/pages/goods/index">
                        <image mode="aspectFit" src="http://static.botue.com/erabbit/static/uploads/brand_logo_2.jpg">
                        </image>
                        <view class="name">TCL</view>
                        <view class="price">199起</view>
                    </navigator>
                    <navigator hover-class="none" url="/pages/goods/index">
                        <image mode="aspectFit" src="http://static.botue.com/erabbit/static/uploads/brand_logo_3.jpg">
                        </image>
                        <view class="name">饭小宝</view>
                        <view class="price">9.9起</view>
                    </navigator>
                    <navigator hover-class="none" url="/pages/goods/index">
                        <image mode="aspectFit" src="http://static.botue.com/erabbit/static/uploads/brand_logo_4.jpg">
                        </image>
                        <view class="name">鳄鱼</view>
                        <view class="price">299起</view>
                    </navigator>
                </view>
            </view>
            <!-- 猜你喜欢 -->
            <Guess :homeGoodsGuessLike="homeGoodsGuessLike"></Guess>
        </scroll-view>

    </view>

</template>

<script>
import { getHomeBanner, getHomeCategoryMutli, getHomeHotMutli, getHomeNewList, getHomeGoodsGuessLike } from "@/api/home";
import Navbar from './components/Navbar.vue'
export default {
    components: { Navbar },
    async onLoad() {
        this.getHomeBanner();
        this.getHomeCategoryMutli()
        this.getHomeHotMutli()
        this.getHomeNewList()
        //
        this.loading = false
        // 猜你喜欢
        this.guessPages = 1
        this.guessParams = { page: 1, pageSize: 10 };
        this.getHomeGoodsGuessLike()
    },
    data() {
        return {
            banners: [],
            categoryHeadMutli: [],
            // 人气推荐
            hotMutli: [],
            // 新鲜好物
            homeNew: [],
            // 猜你喜欢
            homeGoodsGuessLike: [],
            refresherTriggered: false
        };
    },
    computed: {
    },
    methods: {
        // 广告banner图
        async getHomeBanner() {
            const res = await getHomeBanner();
            this.banners = res.result;
        },
        // 前台分类
        async getHomeCategoryMutli() {
            const res = await getHomeCategoryMutli()
            this.categoryHeadMutli = res.result
        },
        // 热门推荐
        async getHomeHotMutli() {
            const res = await getHomeHotMutli()
            this.hotMutli = res.result
        },
        // 新鲜好物
        async getHomeNewList() {
            const res = await getHomeNewList()
            this.homeNew = res.result
        },
        // 猜你喜欢
        async getHomeGoodsGuessLike() {
            const res = await getHomeGoodsGuessLike(this.guessParams);
            this.homeGoodsGuessLike = [...this.homeGoodsGuessLike, ...res.result.items];
            this.guessPages = res.result.pages
        },
        // 滑动到底部
        async scrolltolower(e) {
            if (this.loading) {
                return
            }
            if (this.guessParams.page < this.guessPages) {
                this.loading = true
                this.guessParams.page++
                await this.getHomeGoodsGuessLike(this.guessParams);
                this.loading = false
            }
        },
        // 下拉事件
        refresherrefresh(e) {
            this.refresherTriggered = true;

            this.banners = [];
            this.categoryHeadMutli = [];
            this.hotMutli = [];
            this.homeNew = [];
            this.homeGoodsGuessLike = [];

            this.loading = false;
            this.guessPages = 1;
            this.guessParams = { page: 1, pageSize: 10 };
            Promise.all([
                this.getHomeBanner(),
                this.getHomeCategoryMutli(),
                this.getHomeHotMutli(),
                this.getHomeNewList(),
                this.getHomeGoodsGuessLike()

            ]).then(() => {
                this.refresherTriggered = false;
            });

        }
    },
};
</script>

<style lang="scss" scoped>
.content {
    height: 100vh;
    display: flex;
    flex-direction: column;
}

.main {
    flex: 1;
    overflow: hidden;
    background-color: #f7f7f8;
}

/* 公共面板 */
.panel {
    margin: 20rpx 20rpx 0;
    border-radius: 10rpx;
    background-color: #fff;

    .title {
        display: flex;
        align-items: center;
        padding: 24rpx 24rpx 0;
        font-size: 32rpx;
        color: #262626;
        position: relative;

        text {
            font-size: 24rpx;
            color: #7f7f7f;
            margin-left: 18rpx;
        }
    }

    .more {
        position: absolute;
        right: 24rpx;
        font-size: 26rpx;
        color: #7f7f7f;
    }

    .cards {
        display: flex;
    }

    .name {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
}

/* 推荐专区 */
.recommend {
    display: flex;
    flex-wrap: wrap;

    .item {
        display: flex;
        flex-direction: column;
        width: 50%;
        height: 254rpx;
        border-right: 1rpx solid #eee;
        border-top: 1rpx solid #eee;

        &:nth-child(2n) {
            border-right: 0 none;
        }

        &:nth-child(-n + 2) {
            border-top: 0 none;
        }
    }

    .cards {
        flex: 1;
        padding: 15rpx 20rpx;
        justify-content: space-between;

        image {
            width: 48%;
        }
    }
}

/* 新鲜好物 */
.fresh {
    min-height: 320rpx;

    .price {
        line-height: 1;
        text-align: left;
        font-size: 26rpx;
        color: #cf4444;
    }

    .small {
        font-size: 80%;
    }
}

.fresh .cards navigator,
.brands .cards navigator {
    width: 25%;
    padding: 15rpx 20rpx 20rpx;
    line-height: 1;
    text-align: center;
}

.fresh image,
.brands image {
    width: 126rpx;
    height: 126rpx;
}

.fresh .name,
.brands .name {
    margin: 20rpx 0 16rpx;
    font-size: 24rpx;
    color: #262626;
}

.brands {
    .price {
        font-size: 24rpx;
        color: #999;
    }
}
</style>