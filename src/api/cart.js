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