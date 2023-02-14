<template>
    <view class="viewport">
        <!-- 顶部背景 -->
        <view class="navbar" :style="{ paddingTop: safeArea.top + 'px' }">
            <text class="back icon-left" @click="goBack"></text>
            <view class="title">个人信息</view>
        </view>
        <scroll-view scroll-y>
            <!-- 头像 -->
            <view class="avatar" @tap="changeAvatar">
                <image :src="memberProfile.avatar" mode="aspectFill" />
                <text>点击修改头像</text>
            </view>
            <view class="form">
                <view class="form-item">
                    <text class="label">账号</text>
                    <!-- 账号名不能修改，用 text 组件展示 -->
                    <text>{{ memberProfile.account }}</text>
                </view>
                <view class="form-item">
                    <text class="label">昵称</text>
                    <!-- 输入框通过 v-model 双向绑定修改数据 -->
                    <input v-model="memberProfile.nickname" />
                </view>
                <view class="form-item">
                    <text class="label">性别</text>
                    <radio-group @change="genderChange">
                        <label class="radio">
                            <radio value="男" color="#27ba9b" :checked="memberProfile.gender === '男'" />
                            男
                        </label>
                        <label class="radio">
                            <radio value="女" color="#27ba9b" :checked="memberProfile.gender === '女'" />
                            女
                        </label>
                    </radio-group>
                </view>
                <view class="form-item">
                    <text class="label">出生日期</text>
                    <picker @change="handleBirthdayChange" mode="date" start="1900-01-01" :end="end">
                        <view>{{ memberProfile.birthday || "请选择日期" }}</view>
                    </picker>
                </view>
                <view class="form-item">
                    <text class="label">城市</text>
                    <picker @change="handleFullLocationChange" mode="region">
                        <view>{{ memberProfile.fullLocation || "请选择城市" }}</view>
                    </picker>
                </view>
                <view class="form-item">
                    <text class="label">职业</text>
                    <!-- 输入框通过 v-model 双向绑定修改数据 -->
                    <input v-model="memberProfile.profession" placeholder="请填写职业" />
                </view>
                <!-- 提交按钮 -->
                <view class="button" @click="handleSubmitForm">保 存</view>
            </view>
        </scroll-view>
    </view>
</template>

<script>
// src\pages\my\profile.vue
import { getMemberProfile, postMemberProfileAvatar, putMemberProfile } from '@/api/profile'
import { mapMutations, mapState } from 'vuex';
import dayjs from "dayjs";
export default {
    computed: {
        ...mapState(["safeArea"]),
        ...mapState("user", ["profile"]),
    },
    data() {
        return {
            memberProfile: null,
            end: null
        }
    },
    onLoad() {
        console.log(dayjs().format('YYYY-MM-DD'));
        this.end = dayjs().format('YYYY-MM-DD')
        console.log(this.end);
    },
    onShow(options) {
        this.getMemberProfile();
    },
    methods: {
        ...mapMutations("user", ["setProfile"]),
        // 获取个人信息
        // src\pages\my\profile.vue
        async getMemberProfile() {
            const res = await getMemberProfile();
            console.log(res);
            this.memberProfile = res.result
        },
        // 修改头像
        async changeAvatar() {
            const [err, res] = await uni.chooseMedia({
                count: 1,
                mediaType: ["image"],
            });
            if (!err) {
                console.log("res -----> ", res);
            }
            this.memberProfile.avatar = res.tempFiles[0].tempFilePath
            const [err1, res1] = await postMemberProfileAvatar(
                res.tempFiles[0].tempFilePath
            );
            if (!err1) {
                const data = JSON.parse(res1.data);
                this.memberProfile.avatar = data.result.avatar;
            }
        },
        // 返回
        goBack() {
            uni.navigateBack()
        },
        // 性别
        genderChange(e) {
            console.log(e);
            this.memberProfile.gender = e.detail.value
        },
        // 日期
        handleBirthdayChange(e) {
            this.memberProfile.birthday = e.detail.value
        },
        // 城市
        handleFullLocationChange(e) {
            console.log(e);
            this.memberProfile.fullLocation = e.detail.value.join('')
            const [provinceCode, cityCode, countyCode] = e.detail.code
            this.memberProfile.provinceCode = provinceCode
            this.memberProfile.cityCode = cityCode
            this.memberProfile.countyCode = countyCode
        },
        // 提交表单——保存
        async handleSubmitForm() {

            const data = { ...this.memberProfile }
            // 如果后台不接收 id 、accout 等字段，那么我们需要主动删除
            // delete data.id
            const res = await putMemberProfile(data)
            // 用户提示
            uni.showToast({ title: "修改成功" });
            setTimeout(() => {
                uni.navigateBack();
            }, 1500);
            const obj = {
                ...this.profile,
                avatar: this.memberProfile.avatar,
                nickname: this.memberProfile.nickname,
            };
            this.setProfile(obj);
        }
    },
};
</script>

<style lang="scss">
page {
    height: 100%;
    overflow: hidden;
    background-color: #f4f4f4;
}

.viewport {
    display: flex;
    flex-direction: column;
    height: 100%;
    background-image: url(https://static.botue.com/erabbit/static/images/order_bg.png);
    background-size: auto 392rpx;
    background-repeat: no-repeat;
}

.navbar {
    .title {
        height: 40px;
        line-height: 32px;
        text-align: center;
        font-size: 17px;
        font-weight: 500;
        color: #fff;
    }

    .back {
        position: absolute;
        left: 20rpx;
        top: 22px;
        font-size: 23px;
        z-index: 9;
        color: #fff;
    }
}

.avatar {
    text-align: center;
    padding: 20rpx 0 40rpx;

    image {
        width: 160rpx;
        height: 160rpx;
        border-radius: 50%;
    }

    text {
        display: block;
        padding-top: 20rpx;
        line-height: 1;
        font-size: 26rpx;
        color: #fff;
    }
}

.form {
    margin: 20rpx 20rpx 0;
    padding: 0 20rpx;
    border-radius: 10rpx;
    background-color: #fff;

    .form-item {
        display: flex;
        height: 96rpx;
        line-height: 46rpx;
        padding: 25rpx 10rpx;
        background-color: #fff;
        font-size: 28rpx;
        border-bottom: 1rpx solid #ddd;

        &:last-child {
            border: none;
        }

        .label {
            width: 180rpx;
            color: #333;
        }

        input {
            flex: 1;
            display: block;
            height: 46rpx;
        }

        .radio {
            display: inline-block;
            height: 46rpx;
            margin-right: 20rpx;
            vertical-align: middle;
        }

        radio {
            transform: scale(0.7) translateY(-2px);
        }

        picker {
            flex: 1;
        }
    }
}

.button {
    height: 80rpx;
    text-align: center;
    line-height: 80rpx;
    margin: 30rpx 20rpx;
    color: #fff;
    border-radius: 80rpx;
    font-size: 30rpx;
    background-color: #27ba9b;
}
</style>
