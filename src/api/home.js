import http from "@/utils/http";

/**
 * 首页-广告区域-小程序
 */
export const getHomeBanner = (distributionSite = 1) => {
    return http({
        url: "/home/banner",
        data: {
            distributionSite,
        },
    });
};

/**
 * 首页-前台分类-小程序
 */
export const getHomeCategoryMutli = () => {
    return http({
        url: "/home/category/mutli"
    })
}

/**
 * 首页-热门推荐
 */
export const getHomeHotMutli = () => {
    return http({
        url: '/home/hot/mutli'
    })
}

/**
 * 首页-新鲜好物
 */
export const getHomeNewList = (limit = 4) => {
    return http({
        url: '/home/new',
        data: { limit }
    })
}

/**
 * 猜你喜欢
 */
export const getHomeGoodsGuessLike = (data) => {
    return http({
        url: '/home/goods/guessLike',
        data
    })
}
/**
 * 封装推荐页的接口
 */
export const getHomeRecommend = (url, data) => {
    return http({
        url: url,
        data
    })
}