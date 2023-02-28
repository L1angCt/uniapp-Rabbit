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

/**
 * 获取订单详情
 */
export const getMemberOrderDetail = (id) => {
    return http({
        url: `/member/order/${id}`
    })
}