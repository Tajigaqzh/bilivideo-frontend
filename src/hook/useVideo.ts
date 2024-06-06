import {onUnmounted, ref, ShallowRef, shallowRef,Ref} from "vue";
//@ts-ignore
import Mpegts from "mpegts.js";
import {ElMessage} from "element-plus";
import mpegts from "mpegts.js";
import DanmuJs from "danmu.js";
import {useCookies} from "@vueuse/integrations/useCookies";
import {nextTick} from "vue";

/**
 *
 * @param danMu 弹幕实例
 * @param videoRef 弹幕也要用到这个，还是在comp中创建，统一给两个传吧
 * @param startDanMu 播放弹幕的函数，不能再onMounted中调用，由于网络原因，那个时候可能视频还没请求回来
 * 要在视频加载后调用开启弹幕
 */
export function useVideo(danMu: ShallowRef<DanmuJs>, videoRef: Ref<HTMLVideoElement | null>, startDanMu: Function) {

    const cookies = useCookies(['token']);


    const muted = ref(true);


    const isPlaying = ref(true);

    const isFirst = ref(true);

    const parentClick = () => {

        console.log("parent")
        if (isFirst.value) {
            muted.value = false;
            console.log(muted.value)
            setTimeout(() => {
                videoRef.value.volume = 1;
                videoRef.value?.play();
            }, 50)
            isFirst.value = false;
        }
    }


    const autoEmit = () => {

        const htmlDivElement = document.createElement('div');


        htmlDivElement.addEventListener('click', () => {
            console.log("默认监听")
            // muted.value = false;
            console.log(muted.value)
        })

        nextTick(() => {


            document.body.appendChild(htmlDivElement);

            setTimeout(() => {
                htmlDivElement.click();
                document.body.removeChild(htmlDivElement);
            }, 1000)


            // muted.value = false;


        }).then(() => {
            return null
        });


    }
    autoEmit();
    const pauseVideoFn = () => {
        if (isFirst.value) {
            isPlaying.value = true;
            isFirst.value = false;
        } else {
            if (videoRef.value?.paused) {
                isPlaying.value = true;
                videoRef.value?.play();
            } else {
                isPlaying.value = false;
                videoRef.value?.pause();
            }
        }
    }


    const player = shallowRef<any>();
    const videoPlay = () => {
        danMu.value.play();
    }
    const videoPause = () => {
        danMu.value.pause();
    }

    /**
     * onMounted调用
     */
    function playVideo() {
        const token = cookies.get("token");
        if (!token) {
            ElMessage.error("登录后才能进入直播间")
            return;
        }

        if (mpegts.isSupported()) {
            if (player.value) {
                destroy();
            }

            player.value = mpegts.createPlayer({
                //播放的格式 flv mp4 ts mse等
                type: "mp4",
                url: `//pic.nwyzx.com/video/992ce240-a241-4e16-b5f3-89b0a8ca6a12.mp4`,
                //@ts-ignore
                isLive: true,//指示数据源是否为直播流
                isAutoPlay: true,//是否自动播放
                isContinue: false, //是否继续播放
                lazyLoad: true,//如果有足够的数据进行播放，则终止http连接
                hasAudio: false,//声音关闭，如果传来的视频流没有声音，就一定要设置这个参数，否则会报错
            }, {
                enableWorker: true,//是否启用分离线程
                enableStashBuffer: false,////是否关闭IO隐藏缓冲区
                stashInitialSize: 128,//IO存储缓冲区初始大小，默认为384kb

            })

            player.value.on("ERROR", () => {

            })
            player.value.attachMediaElement(videoRef.value);
            player.value.load();
            startDanMu();
            player.value.play();
        }

    }

    function destroy() {
        if (player.value) {
            try {
                player.value.pause(); //暂停播放
                player.value.unload();//取消数据流加载
                player.value.detachMediaElement();//将播放实例从节点中取出
                player.value.destroy(); //销毁
                player.value = null;
            } catch (e) {
            }
        }
    }

    onUnmounted(() => {
        destroy();
    })
    return {
        muted,
        parentClick,
        isPlaying,
        destroy,
        videoPlay,
        videoPause,
        playVideo,
        pauseVideoFn
    }
}