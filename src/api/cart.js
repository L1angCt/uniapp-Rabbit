import http from "@/utils/http";

/**
 * 添加到购物车
 */

export const postMemberCart = (data) => {
    return http({
        url: '/member/cart',
        method: 'post',
        data
    })
}

/**
 * 获取购物车列表
 */
export const getMemberCart = () => {
    return http({
        url: '/member/cart'
    })
}

/**
 * 修改购物车商品
 */
export const putMemberCart = (skuId, data) => {
    return http({
        url: `/member/cart/${skuId}`,
        method: 'put',
        data
    })
}