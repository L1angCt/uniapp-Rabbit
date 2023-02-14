import http from '@/utils/http'

export const postLoginWxMin = (data) => {
    return http({
        url: '/login/wxMin',
        method: 'post',
        data
    })
}


/**
 * 小程序登录 - 测试
 * @param {string} phoneNumber 手机号
 */
export const postLoginWxMinSimple = (phoneNumber) => {
    return http({
        url: "/login/wxMin/simple",
        method: "POST",
        data: { phoneNumber },
    });
};

/**
 * 个人信息src\api\profile.js
 */
export const getMemberProfile = () => {
    return http({
        url: "/member/profile",
    });
};

/**
 * 修改头像
 */
export const postMemberProfileAvatar = (data) => {
    return uni.uploadFile({
        url: "/member/profile/avatar",
        filePath: data,
        name: "file",
    });
};

/**
 * 保存个人信息
 */
export const putMemberProfile = (data) => {
    return http({
        method: 'put',
        url: '/member/profile',
        data
    })
}