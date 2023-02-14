import http from "@/utils/http";

/**
 * 获取地址列表
 */

export const getMemberAddress = () => {
    return http({
        url: '/member/address'
    })
}

/**
 * 新增地址
 */
export const postHomeAddress = (data) => {
    return http({
        url: "/member/address",
        method: "post",
        data,
    });
};

/**
 * 删除地址
 */
export const deleteHomeAddress = (id) => {
    return http({
        url: `/member/address/${id}`,
        method: 'delete'
    })
}
