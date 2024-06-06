import {createRouter, createWebHistory, Router} from 'vue-router';

import {routes} from './routes';
import {ElMessage} from "element-plus";

const router: Router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHistory(),
    routes, // `routes: routes` 的缩写
    scrollBehavior: () => ({left: 0, top: 0}),
});

router.beforeEach(async (to, _from) => {

    if (to.name == "push" && !document.cookie) {
        ElMessage.success("登录后才能开播")
        return {name:"home"}
    }
    if (to.name=="detail"&& !document.cookie){
        ElMessage.success("登录后才能进入直播间")
        return {name:"home"}
    }
})


export default router;
