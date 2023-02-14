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