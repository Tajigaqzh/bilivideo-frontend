import {RouteRecordRaw} from 'vue-router';

export const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name:"home",
        component: () => import('@/views/index/index.vue'),
        meta: {
            title: '首页',
        },
    }, {
        path: '/video',
        component: () => import('@/views/video/index.vue'),
        meta: {
            title: '视频',
        }
    },

    {
        path: "/demo",
        component: () => import("@/views/collect/index.vue")
    },

    // 用下面这个
    {
        path: '/video/:id',
        component: () => import('@/views/video/index.vue'),
    },
    {
        path: '/live',
        name: "live",
        component: () => import('@/views/live/live.vue'),
    },
    {
        path: "/push",
        name:"push",
        component: () => import("@/views/push/index.vue")
    },
    {
        path: "/detail/:id",
        name: "detail",
        component: () => import("@/views/detail/index.vue")
    },
    {
        path: '/history',
        component: () => import('@/views/history/index.vue'),
    },
    {
        path: '/dynamic',
        component: () => import('@/views/dynamic/index.vue'),
    }, {
        path: "/create",
        component: () => import("@/views/create/index.vue"),
        redirect: "/create/index",
        children: [
            {
                path: "/create/index",
                component: () => import("@/views/create/index/Home.vue"),
            },
            {
                path: "/create/draft",
                component: () => import("@/views/create/content/Draft.vue"),
            },
            {
                path: "/create/appeal",
                component: () => import("@/views/create/content/Appeal.vue"),
            },
            {
                path: "/create/subtitle",
                component: () => import("@/views/create/content/SubTitle.vue"),
            },
            {
                path: "/create/data",
                component: () => import("@/views/create/data/Statistics.vue"),

            },
            {
                path: "/create/fans",
                component: () => import("@/views/create/fans/Fans.vue")
            },
            {
                path: "/create/comment",
                component: () => import("@/views/create/interact/Comment.vue")
            },
            {
                path: "/create/danmu",
                component: () => import("@/views/create/interact/Danmu.vue")
            },
            {
                path: "/create/income",
                component: () => import("@/views/create/income/IncomeCenter.vue")
            }, {
                path: "/create/inspire",
                component: () => import("@/views/create/income/Inspire.vue")
            },
            {
                path: "/create/charge",
                component: () => import("@/views/create/income/Charge.vue")
            },
            {
                path: "/create/sale",
                component: () => import("@/views/create/income/Sale.vue")
            },
            {
                path: "/create/task",
                component: () => import("@/views/create/income/Task.vue")
            },
            {
                path: "/create/huahuo",
                component: () => import("@/views/create/income/Huahuo.vue")
            },
            {
                path: "/create/template",
                component: () => import("@/views/create/income/Template.vue")
            }
            ,
            {
                path: "/create/academe",
                component: () => import("@/views/create/grow/Academe.vue")
            },
            {
                path: "/create/achieve",
                component: () => import("@/views/create/grow/Achieve.vue")
            },
            {
                path: "/create/setting",
                component: () => import("@/views/create/setting/Setting.vue")
            },
            {
                path: "/create/copyright",
                component: () => import("@/views/create/right/CopyRight.vue")
            },
            {
                path: "/create/auth",
                component: () => import("@/views/create/right/Auth.vue")
            },
            {
                path: "/create/music",
                component: () => import("@/views/create/right/Music.vue")
            }
        ]
    }
];
