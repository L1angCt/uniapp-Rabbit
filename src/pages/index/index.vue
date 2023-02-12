<template>
    <view>
        <Navbar> </Navbar>
        <view @click="addCount(10)">调用addCount</view>
        <view>123ysdfghjk</view>
        <view>
            {{ count }}{{ obj.name }}{{ obj.age }}
        </view>

    </view>

</template>

<script>
import http from '@/utils/http'
import { mapMutations, mapState } from 'vuex'
import Navbar from './components/Navbar.vue'
export default {
    components: { Navbar },
    async onLoad() {
        const res = await http({ url: '/home/banner' })
        console.log(res);
    },
    computed: {
        ...mapState(['count', 'obj'])
    },
    data() {
        return {
        }
    },
    methods: {
        ...mapMutations(['addCount'])
    }
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