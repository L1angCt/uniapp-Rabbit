import http from '@/utils/http'

/**
 * 获取预付订单(填写订单)
 */
export const getMemberOrderPre = () => {
    return http({
        url: '/member/order/pre'
    })
}

/**
 * 提交订单
 */
export const postMemberOrder = (data) => {
    return http({
        url: '/member/order',
        method: 'post',
        data
    })
}