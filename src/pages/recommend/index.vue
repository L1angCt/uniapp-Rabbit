<template>
    <view class="viewport">
        <!-- 推荐封面 -->
        <!-- 记得把封面保存到 bannerPicture  -->
        <view class="cover">
            <image :src="bannerPicture"></image>
        </view>
        <!-- tab栏 -->
        <!-- 猜猜我哪里的数据不对  -->
        <view class="tabs">
            <text class="text" v-for="(item, index) in recommendList" :key="index"
                :class="{ active: index === activeIndex }" @tap="changeTabs(index)">
                {{ item.title }}
            </text>
        </view>
        <!-- 列表内容 -->
        <scroll-view scroll-y class="scroll-view" @scrolltolower="handleScrolltolower"
            v-for="(item, index) in recommendList" :key="index" v-show="activeIndex === index" :lower-threshold='600'>
            <view class="goods">
                <navigator hover-class="none" class="navigator" v-for="goods in item.goodsItems.items" :key="goods.id"
                    :url="`/pages/goods/index?id=${goods.id}`">
                    <image class="thumb" :src="goods.picture"></image>
                    <view class="name ellipsis">{{ goods.name }}</view>
                    <view class="price">
                        <text class="symbol">¥</text>
                        <text class="number">{{ goods.price }}</text>
                    </view>
                </navigator>
            </view>
            <view class="loading">正在加载...</view>
        </scroll-view>
    </view>
</template>

<script>
import { getHomeRecommend } from '@/api/home'
export default {
    data() {
        return {
            // 背景大图
            bannerPicture: "",
            // 当前显示的tab栏
            activeIndex: 0,
            // 列表数据
            recommendList: [],
            currentItem: [],
            bannerPicture: '',
            loading: false
        };
    },
    async onLoad({ type }) {
        const urlMap = {
            1: { title: "特惠推荐", url: "/home/preference/mutli" },
            2: { title: "爆款推荐", url: "/home/inVogue/mutli" },
            3: { title: "一站买全", url: "/home/oneStop/mutli" },
            4: { title: "领券中心", url: "/home/new/mutli" }, // 后端未提供，暂用新鲜好物url
            5: { title: "新鲜好物", url: "/home/new/mutli" },
        };
        this.currentItem = urlMap[type]
        uni.setNavigationBarTitle({ title: this.currentItem.title })
        const res = await getHomeRecommend(this.currentItem.url)
        this.bannerPicture = res.result.bannerPicture
        this.recommendList = res.result.subTypes.map((v) => ({
            id: v.id,
            title: v.title,
            goodsItems: res.result.goodsItems[v.id]
        }))
    },
    methods: {
        //切换索引
        changeTabs(index) {
            this.activeIndex = index
        },
        // 拉到底部
        async handleScrolltolower(e) {
            if (this.loading) {
                return
            }
            const currentData = this.recommendList[this.activeIndex]
            // const { page, pages } = this.recommendList.goodsItems
            let { page, pages } = currentData.goodsItems
            const { id } = currentData;
            if (page < pages) {
                this.loading = true
                page++
                const { result: { goodsItems } } = await getHomeRecommend(this.currentItem.url, {
                    subType: id,
                    pageSize: 10,
                    page: page
                })
                // console.log('recommendList', this.recommendList);
                currentData.goodsItems.items = [
                    ...currentData.goodsItems.items,
                    ...goodsItems[id].items
                ]
                // 页码更新
                currentData.goodsItems.page = goodsItems[id].page
            }
            this.loading = false
        },
    }
};
</script>

<style lang="scss">
page {
    height: 100%;
    background-color: #f4f4f4;
}

.viewport {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 180rpx 0 0;
    position: relative;
}

.cover {
    width: 750rpx;
    height: 225rpx;
    border-radius: 0 0 40rpx 40rpx;
    overflow: hidden;
    position: absolute;
    left: 0;
    top: 0;
}

.tabs {
    display: flex;
    justify-content: space-evenly;
    height: 100rpx;
    line-height: 90rpx;
    margin: 0 20rpx;
    font-size: 28rpx;
    border-radius: 10rpx;
    box-shadow: 0 4rpx 5rpx rgba(200, 200, 200, 0.3);
    color: #333;
    background-color: #fff;
    position: relative;
    z-index: 9;

    .text {
        margin: 0 20rpx;
        position: relative;
    }

    .active {
        &::after {
            content: "";
            width: 40rpx;
            height: 4rpx;
            transform: translate(-50%);
            background-color: #27ba9b;
            position: absolute;
            left: 50%;
            bottom: 24rpx;
        }
    }
}

.scroll-view {
    flex: 1;
    overflow: hidden;
}

.goods {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0 20rpx 20rpx;

    .navigator {
        width: 345rpx;
        padding: 20rpx;
        margin-top: 20rpx;
        border-radius: 10rpx;
        background-color: #fff;
    }

    .thumb {
        width: 305rpx;
        height: 305rpx;
    }

    .name {
        height: 88rpx;
        font-size: 26rpx;
    }

    .price {
        line-height: 1;
        color: #cf4444;
        font-size: 30rpx;
    }
}

.goods .symbol,
.goods .decimal {
    font-size: 70%;
}
</style>
