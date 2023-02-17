<template>
    <view class="viewport">
        <!-- 地址列表 -->
        <scroll-view scroll-y>
            <view class="address">
                <!-- 按组使用 -->
                <uni-swipe-action>
                    <uni-swipe-action-item v-for="item in addressList" :key="item.id" class="swipe-cell">
                        <view class="item" @click="addressClick(item)">
                            <view class="user">
                                {{ item.receiver }}
                                <text>{{ item.contact }}</text>
                                <text v-if="item.isDefault === 1" class="badge"> 默认 </text>
                            </view>
                            <view class="locate">
                                {{ item.fullLocation }}{{ item.address }}
                            </view>
                            <!-- 🐛 添加阻止冒泡 -->
                            <navigator :url="`./form?id=${item.id}`" class="edit" hover-class="none" @tap.stop="() => { }">
                                修改
                            </navigator>
                        </view>
                        <template v-slot:right>
                            <view class="swipe-cell-action">
                                <button @tap="onAddressRemove(item.id)" class="delete-button">
                                    删除
                                </button>
                            </view>
                        </template>
                    </uni-swipe-action-item>
                </uni-swipe-action>
            </view>
        </scroll-view>
        <!-- 添加按钮 -->
        <view class="add-btn">
            <navigator hover-class="none" url="./form">新建地址</navigator>
        </view>
        <uni-popup ref="popup" type="dialog">
            <uni-popup-dialog mode="base" title="是否确认删除" message="成功消息" :duration="2000" :before-close="true" @close="close"
                @confirm="confirm"></uni-popup-dialog>
        </uni-popup>
    </view>
</template>

<script>
import { getMemberAddress, deleteHomeAddress } from '@/api/address'
import { mapMutations, mapState } from 'vuex';
export default {
    data() {
        return {
            // 地址列表
            addressList: [],
            deleteId: 0
        };
    },
    onShow() {
        this.getMemberAddress()
    },
    methods: {
        ...mapMutations('address', ['setSelectedAddress']),
        ...mapState('address', ['selectedAddress']),
        // 获取地址列表
        async getMemberAddress() {
            const res = await getMemberAddress()
            this.addressList = res.result
        },
        // 删除地址
        async onAddressRemove(id) {
            this.$refs.popup.open()
            this.deleteId = id
        },
        // 点击弹窗确认
        async confirm() {
            const res = await deleteHomeAddress(this.deleteId)
            this.$refs.popup.close()
            uni.showToast({ title: "删除成功" });
            this.getMemberAddress()
        },
        // 点击弹窗关闭
        close() {
            this.$refs.popup.close()
        },
        addressClick(item) {
            this.setSelectedAddress(item);
            const pages = getCurrentPages()
            const currentPage = pages[pages.length - 1]
            const { from } = currentPage.options
            if (from === 'order') {
                // 选择完，直接后退
                uni.navigateBack();
            }
        }
    }
};
</script>


<style lang="scss">
page {
    height: 100%;
    overflow: hidden;
}

.viewport {
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: #f4f4f4;

    scroll-view {
        padding-top: 20rpx;
    }
}

.address {
    padding: 0 20rpx;
    margin: 0 20rpx;
    border-radius: 10rpx;
    background-color: #fff;

    .item {
        line-height: 1;
        padding: 40rpx 10rpx 38rpx;
        border-bottom: 1rpx solid #ddd;
        position: relative;

        .user {
            font-size: 28rpx;
            margin-bottom: 20rpx;
            color: #333;

            text {
                color: #666;
            }

            .badge {
                display: inline-block;
                padding: 4rpx 10rpx 2rpx 14rpx;
                margin: 2rpx 0 0 10rpx;
                font-size: 26rpx;
                color: #27ba9b;
                border-radius: 6rpx;
                border: 1rpx solid #27ba9b;
            }
        }

        .locate {
            line-height: 1.6;
            font-size: 26rpx;
            color: #333;
        }

        .edit {
            position: absolute;
            top: 36rpx;
            right: 30rpx;
            padding: 2rpx 0 2rpx 20rpx;
            border-left: 1rpx solid #666;
            font-size: 26rpx;
            color: #666;
            line-height: 1;
        }
    }

    .swipe-cell {
        &:last-child {
            .item {
                border: none;
            }
        }
    }
}

.swipe-cell-action {
    height: 100%;

    .delete-button {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50px;
        height: 100%;
        font-size: 28rpx;
        color: #fff;
        border-radius: 0;
        padding: 0;
        background-color: #cf4444 !important;
    }
}

.add-btn {
    height: 80rpx;
    text-align: center;
    line-height: 80rpx;
    margin: 30rpx 20rpx;
    color: #fff;
    border-radius: 80rpx;
    font-size: 30rpx;
    background-color: #27ba9b;
}

.blank {
    margin-top: 300rpx;
    text-align: center;
    font-size: 32rpx;
    color: #888;
}
</style>
