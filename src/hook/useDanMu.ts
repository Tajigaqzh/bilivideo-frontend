import {CSSProperties, ref, shallowRef,Ref} from "vue";
import DanmuJs from 'danmu.js'

interface DanMuComment {
    duration?: number;
    moveV?: string;
    id: string;
    start: number;
    prior: boolean;
    color: boolean;
    txt: string;
    style: CSSProperties;
    mode: 'scroll';
}

export function useDanMu(videoRef: Ref<HTMLVideoElement>) {

    const openDanMu = ref(false);

    const danMuRef = ref<HTMLDivElement>();

    const danMu = shallowRef<DanmuJs>();


    /**
     * 浅层响应式，弹幕一旦发送，样式配置不能修改，所以使用shallowRef，使用shallowReactive也可以
     */
    const allDanMu = shallowRef<Array<DanMuComment>>([
        {
            duration: 20000, //弹幕持续显示时间,毫秒(最低为5000毫秒)
            //moveV: 100, //弹幕匀速移动速度(单位: px/秒)，设置该项时duration无效
            id: '1', //弹幕id，需唯一
            start: 2000, //弹幕出现时间（毫秒）
            prior: true, //该条弹幕优先显示，默认false
            color: true, //该条弹幕为彩色弹幕，默认false
            txt: '长弹幕长弹幕长弹幕', //弹幕文字内容
            style: {
                //弹幕自定义样式
                color: '#ff9500',
                fontSize: '20px',
                padding: '2px 11px'
            },
            mode: 'scroll', //显示模式，top顶部居中，bottom底部居中，scroll滚动，默认为scroll
        },
        {
            duration: 20000, //弹幕持续显示时间,毫秒(最低为5000毫秒)
            //moveV: 100, //弹幕匀速移动速度(单位: px/秒)，设置该项时duration无效
            id: '2', //弹幕id，需唯一
            start: 2000, //弹幕出现时间（毫秒）
            prior: true, //该条弹幕优先显示，默认false
            color: true, //该条弹幕为彩色弹幕，默认false
            txt: '单目但目测', //弹幕文字内容
            style: {
                //弹幕自定义样式
                color: '#ff9500',
                fontSize: '20px',
                padding: '2px 11px'
            },
            mode: 'scroll', //显示模式，top顶部居中，bottom底部居中，scroll滚动，默认为scroll
        },
        {
            duration: 20000, //弹幕持续显示时间,毫秒(最低为5000毫秒)
            //moveV: 100, //弹幕匀速移动速度(单位: px/秒)，设置该项时duration无效
            id: '3', //弹幕id，需唯一
            start: 2000, //弹幕出现时间（毫秒）
            prior: true, //该条弹幕优先显示，默认false
            color: true, //该条弹幕为彩色弹幕，默认false
            txt: '长弹幕长弹幕长弹幕长弹幕长弹幕', //弹幕文字内容
            style: {
                //弹幕自定义样式
                color: '#ff9500',
                fontSize: '20px',
                padding: '2px 11px'
            },
            mode: 'scroll', //显示模式，top顶部居中，bottom底部居中，scroll滚动，默认为scroll
        }, {
            duration: 20000, //弹幕持续显示时间,毫秒(最低为5000毫秒)
            //moveV: 100, //弹幕匀速移动速度(单位: px/秒)，设置该项时duration无效
            id: '4', //弹幕id，需唯一
            start: 2000, //弹幕出现时间（毫秒）
            prior: true, //该条弹幕优先显示，默认false
            color: true, //该条弹幕为彩色弹幕，默认false
            txt: '长弹幕长弹幕长弹幕长弹幕长弹幕', //弹幕文字内容
            style: {
                //弹幕自定义样式
                color: '#ff9500',
                fontSize: '20px',
                padding: '2px 11px'
            },
            mode: 'scroll', //显示模式，top顶部居中，bottom底部居中，scroll滚动，默认为scroll
        },
        {
            duration: 20000, //弹幕持续显示时间,毫秒(最低为5000毫秒)
            //moveV: 100, //弹幕匀速移动速度(单位: px/秒)，设置该项时duration无效
            id: '5', //弹幕id，需唯一
            start: 100, //弹幕出现时间（毫秒）
            prior: true, //该条弹幕优先显示，默认false
            color: true, //该条弹幕为彩色弹幕，默认false
            txt: '真帅', //弹幕文字内容
            style: {
                //弹幕自定义样式
                color: '#1c3256',
                fontSize: '20px',
                padding: '2px 11px'
            },
            mode: 'scroll', //显示模式，top顶部居中，bottom底部居中，scroll滚动，默认为scroll
        }
    ]);

    /**
     * 初始化弹幕，需要在onMounted中
     */
    function startDanMu() {
        danMu.value = new DanmuJs({
            container: danMuRef.value, //弹幕容器，该容器发生尺寸变化时会自动调整弹幕行为
            containerStyle: {
                //弹幕容器样式
                zIndex: 8
            },
            player: videoRef.value, //配合音视频元素（video或audio）同步使用时需提供该项
            comments: allDanMu.value,
            area: {
                //弹幕显示区域
                start: 0.15, //区域顶部到播放器顶部所占播放器高度的比例
                end: 1, //区域底部到播放器顶部所占播放器高度的比例
                lines: undefined // 弹幕虚拟轨道显示行数。当指定行数时，显示范围 start/end 不生效；当弹幕字体大小超过所需要的总虚拟轨道数时，弹幕也不会出现在轨道上，因此请设置好弹幕fontSize及影响弹幕高度的其他样式，让弹幕和轨道高度匹配
            },
            channelSize: 40, // 轨道大小
            mouseControl: true, // 打开鼠标控制, 打开后可监听到 bullet_hover 事件。danmu.on('bullet_hover', function (data) {})
            mouseControlPause: false, // 鼠标触摸暂停。mouseControl: true 生效
            //bOffset: 1000, // 可调节弹幕横向间隔（毫秒）
            // defaultOff: true, // 开启此项后弹幕不会初始化，默认初始化弹幕
            chaseEffect: true // 开启滚动弹幕追逐效果, 默认为true
        })
        danMu.value.start();
    }


    /**
     * 切换弹幕开启和关闭
     */
    const danMuFn = () => {
        if (openDanMu.value) {
            danMu.value.stop()
            openDanMu.value = false;
        } else {
            danMu.value.start();
            openDanMu.value = true;
        }
    }


    const sendDanMu = () => {

    }

    return {
        //实例
        danMu,
        //ref
        danMuRef,
        //发送弹幕
        sendDanMu,
        //是否打开
        openDanMu,
        //初始化
        startDanMu,
        //切换弹幕的开启和关闭
        danMuFn,
    }
}