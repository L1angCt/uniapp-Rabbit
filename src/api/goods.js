import http from "@/utils/http";

/**
 * 获取商品详情
 */
export const getGoods = (id) => {
    return http({
        url: "/goods",
        data: {
            id
        },
    });
}


/**
 * 猜你喜欢
 */
export const getGoodsRelevant = (data) => {
    return http({
        url: '/goods/relevant',
        data
    })
}