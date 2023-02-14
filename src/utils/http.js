const baseURL = "https://pcapi-xiaotuxian-front-devtest.itheima.net";
import store from "@/store";

const request = {
    invoke(args) {
        uni.showLoading({ title: "加载中" });
        if (!args.url.startsWith("http")) {
            args.url = baseURL + args.url;
        }
        args.header = {
            ...args.header, // 保留原本的 header
            "source-client": "miniapp", // 添加小程序端调用标识
            Authorization: store.state.user.profile?.token,
        };
    },
    complete(res) {
        uni.hideLoading();
    },
};
uni.addInterceptor("request", request);
uni.addInterceptor("uploadFile", request);

export default (options) => {
    return new Promise((resolve, reject) => {
        uni.request({
            ...options,
            success(res) {
                // 如果返回的状态码是 401，代表没登录，跳转登录页
                if (res.statusCode === 401) {
                    uni.navigateTo({ url: "/pages/login/index" });
                }
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    resolve(res.data);
                } else {
                    reject(res);
                }
            },
            fail(err) {
                reject(err);
            },
        });
    });
};