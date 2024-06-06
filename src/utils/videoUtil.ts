/**
 * 根据传入的源截取图片
 * @param source 源
 */
export const generateBase64 = (source: CanvasImageSource) => {
    const imageCanvas = document.createElement("canvas");

    //获取实际宽高
    //@ts-ignore
    let {width, height} = source.getBoundingClientRect();

    if (source instanceof HTMLVideoElement) {
        width = source.videoWidth && source.videoWidth;
        height = source.videoHeight && source.videoHeight;
    }
    if (source instanceof HTMLCanvasElement) {
        width = source.width && source.width;
        height = source.height && source.height;
    }
    const rate = width / height;
    const ratio = 1;

    function getImgUrl() {
        const coverWidth = width * ratio;
        const coverHeight = coverWidth / rate;
        imageCanvas.width = coverWidth;
        imageCanvas.height = coverHeight;
        imageCanvas.getContext('2d')!.drawImage(source, 0, 0, coverWidth, coverHeight);
        // webp比png的体积小非常多！因此coverWidth就可以不用压缩太夸张
        return imageCanvas.toDataURL('image/webp', 1);
    }

    return getImgUrl();
}


export interface CreateVideoOptions {
    muted?: boolean;
    autoplay?: boolean;
    appendChild?: boolean;
    show?: boolean;
    controls?: boolean;
    width?: number
    height?: number;
}

/**
 * 创建视频
 * @param muted 是否静音
 * @param autoplay 是否自动播放
 * @param appendChild 是否添加到根容器中
 * @param show 是否展示
 * @param controls 是否显示控制条
 * @param width 大小
 * @param height
 */
export const createVideo = ({
                                muted = true,
                                autoplay = true,
                                appendChild = false,
                                show = false,
                                controls = false,
                                width = 100,
                                height = 56.25
                            }: CreateVideoOptions): HTMLVideoElement => {

    const videoEl = document.createElement('video');
    videoEl.autoplay = autoplay;
    videoEl.muted = muted;
    videoEl.playsInline = true;
    videoEl.loop = true;
    videoEl.controls = controls;
    videoEl.setAttribute('webkit-playsinline', 'true');
    videoEl.setAttribute('x5-video-player-type', 'h5');
    videoEl.setAttribute('x5-video-player-fullscreen', 'true');
    videoEl.setAttribute('x5-video-orientation', 'portraint');

    videoEl.oncontextmenu = (e) => {
        e.preventDefault();
    };
    setTimeout(() => {
        if (autoplay) {
            try {
                videoEl.play();
            } catch (error) {
                console.log('play失败', error);
            }
        }
    }, 0);


    if (appendChild) {
        if (!show) {
            videoEl.style.width = `1px`;
            videoEl.style.height = `1px`;
            videoEl.style.opacity = '0';
            videoEl.style.pointerEvents = 'none';
        } else {
            videoEl.style.width = `${width}px`;
            videoEl.style.height = `${height}px`;
        }
        videoEl.style.position = 'fixed';
        videoEl.style.bottom = '0';
        videoEl.style.right = '0';

        document.body.appendChild(videoEl);
    }
    return videoEl;
}

/**
 * 格式化倒计时
 * @param data
 */
export function formatCountdownTime(
    data: {
        endTime: number;
        startTime: number;
        day?: string;
        hour?: string;
        minute?: string;
        second?: string;
        millisecond?: string;
        showMillisecond?: boolean;
        addZero?: boolean;
    }
) {

    const times = (data.endTime - data.startTime) / 1000;
    // js获取剩余天数
    const d = parseInt(String(times / 60 / 60 / 24));
    // js获取剩余小时
    let h = parseInt(String((times / 60 / 60) % 24));
    // js获取剩余分钟
    let m = parseInt(String((times / 60) % 60));
    // js获取剩余秒
    let s = parseInt(String(times % 60));
    let ms = new Date(data.endTime).getMilliseconds();

    function addZero(num: number, flag: boolean) {
        if (flag) {
            return num < 10 ? `0${num}` : `${num}`;
        } else {
            return `${num}`;
        }
    }

    // @ts-ignore
    h = addZero(h, data.addZero);
    // @ts-ignore
    m = addZero(m, data.addZero);
    // @ts-ignore
    s = addZero(s, data.addZero);

    if (Number(ms) < 100) {
        if (ms < 10) {
            // @ts-ignore
            ms = `00${ms}`;
        } else {
            // @ts-ignore
            ms = `0${ms}`;
        }
    }
    return {
        d,
        h,
        m,
        s,
        ms,
    };
}


/**
 * requestFileSystem保存文件，成功返回code:1，失败返回code:2
 * @param data
 */
export function saveFile(data: { file: File; fileName: string }) {
    return new Promise<{ code: number }>((resolve) => {
        const {file, fileName} = data;
        const requestFileSystem =
            // @ts-ignore
            window.requestFileSystem || window.webkitRequestFileSystem;
        if (!requestFileSystem) {
            console.error('不支持requestFileSystem');
            resolve({code: 2});
            return;
        }

        function onError(error: any) {
            console.error('saveFile错误', data.fileName);
            console.log(error);
            resolve({code: 2});
        }

        function onFs(fs: any) {
            // 创建文件
            fs.root.getFile(
                fileName,
                {create: true},
                (fileEntry: any) => {
                    // 创建文件写入流
                    fileEntry.createWriter(function (fileWriter: any) {
                        fileWriter.onwriteend = () => {
                            // 完成后关闭文件
                            fileWriter.abort();
                            resolve({code: 1});
                        };
                        // 写入文件内容
                        fileWriter.write(file);
                    });
                },
                onError
            );
        }

        // Opening a file system with temporary storage
        requestFileSystem(
            // @ts-ignore
            window.PERSISTENT,
            0,
            onFs,
            onError
        );
    });
}

/**
 * 读取file
 * @param fileName
 */
export function readFile(fileName: string) {
    return new Promise<{ code: number; file?: File }>((resolve) => {
        const requestFileSystem =
            // @ts-ignore
            window.requestFileSystem || window.webkitRequestFileSystem;

        if (!requestFileSystem) {
            console.error('不支持requestFileSystem');
            resolve({code: 2});
            return;
        }

        function onError(error: any) {
            console.error('readFile错误', fileName);
            console.log(error);
            resolve({code: 2});
        }

        function onFs(fs: any) {
            fs.root.getFile(
                fileName,
                {},
                (fileEntry: any) => {
                    fileEntry.file(function (file: File) {
                        resolve({code: 1, file});
                    }, onError);
                },
                onError
            );
        }

        // Opening a file system with temporary storage
        requestFileSystem(
            // @ts-ignore
            window.PERSISTENT,
            0,
            onFs,
            onError
        );
    })
}


/**
 * 获取屏幕
 * @param video
 * @param audio
 */
export async function handleDisplayMedia({video, audio}: {
    video: boolean | MediaTrackConstraints;
    audio: boolean | MediaTrackConstraints;
}) {
    try {
        return await navigator.mediaDevices.getDisplayMedia({
            video,
            audio,
        });
    } catch (error) {
        console.log(error);
    }
}

/**
 * 获取相机
 * @param video
 * @param audio
 */
export async function handleUserMedia({video, audio}: {
    video: boolean | MediaTrackConstraints;
    audio: boolean | MediaTrackConstraints;
}) {
    try {
        return await navigator.mediaDevices.getUserMedia({
            video,
            audio,
        });
    } catch (error) {
        console.log(error);
    }
}


/**
 * @description 获取[min,max]之间的随机整数。
 * @example: getRangeRandom(-10,100) ===> -8
 */
export const getRangeRandom = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;


/**
 * @description 获取随机字符串(ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz)
 * @example: getRandomString(4) ===> abd3
 * @param {number} length
 * @return {*}
 */
export const getRandomEnglishString = (length: number): string => {
    const str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let res = '';
    for (let i = 0; i < length; i += 1) {
        res += str.charAt(getRangeRandom(0, str.length - 1));
    }
    return res;
};


/**
 * @description 将内容复制到剪切板
 * @param {string} text
 * @return {*}
 */
export const copyToClipBoard = (text: string): void => {
    const oInput = document.createElement('input');
    oInput.value = text;
    document.body.appendChild(oInput);
    oInput.select(); // 选择对象
    document.execCommand('Copy'); // 执行浏览器复制命令
    oInput.parentElement?.removeChild(oInput);
};


/**
 * music，该曲目应被视为包含音乐。设置该值时 MediaStreamTrack.kind的值必须为"audio"。
 * speech，该轨道应被视为包含语音数据。设置该值时 MediaStreamTrack.kind的值必须为"audio"。
 * speech-recognition，该轨道应被视为包含用于机器语音识别的数据。设置该值时 MediaStreamTrack.kind的值必须为"audio"。
 * detail，应将曲目视为视频细节格外重要。例如，带有文本内容、绘画或线条艺术的演示文稿或网页。设置该值时 MediaStreamTrack.kind的值必须为"video"。
 * text，轨道应该被视为视频细节特别重要，并且明显的锐利边缘和颜色一致的区域可能经常出现。例如，带有文本内容的演示文稿或网页。设置该值时 MediaStreamTrack.kind的值必须为"video"。
 * motion，应将轨道视为包含运动很重要的视频。例如，网络摄像头视频、电影或视频游戏。设置该值时 MediaStreamTrack.kind的值必须为"video"。
 */
export type VideoHint = 'detail' | 'text' | 'motion';

export function setVideoTrackContentHints(
    stream: MediaStream,
    hint: 'detail' | 'text' | 'motion'
) {
    const tracks = stream.getVideoTracks();
    tracks.forEach((track) => {
        track.contentHint = hint;
        console.log('setVideoTrackContentHints', track.id, hint);
    });
}


/**
 * music，该曲目应被视为包含音乐。设置该值时 MediaStreamTrack.kind的值必须为"audio"。
 * speech，该轨道应被视为包含语音数据。设置该值时 MediaStreamTrack.kind的值必须为"audio"。
 * speech-recognition，该轨道应被视为包含用于机器语音识别的数据。设置该值时 MediaStreamTrack.kind的值必须为"audio"。
 * detail，应将曲目视为视频细节格外重要。例如，带有文本内容、绘画或线条艺术的演示文稿或网页。设置该值时 MediaStreamTrack.kind的值必须为"video"。
 * text，轨道应该被视为视频细节特别重要，并且明显的锐利边缘和颜色一致的区域可能经常出现。例如，带有文本内容的演示文稿或网页。设置该值时 MediaStreamTrack.kind的值必须为"video"。
 * motion，应将轨道视为包含运动很重要的视频。例如，网络摄像头视频、电影或视频游戏。设置该值时 MediaStreamTrack.kind的值必须为"video"。
 */
export type AudioHint = 'music' | 'speech' | 'speech-recognition';

export function setAudioTrackContentHints(
    stream: MediaStream,
    hint: 'music' | 'speech' | 'speech-recognition'
) {
    const tracks = stream.getAudioTracks();
    tracks.forEach((track) => {
        track.contentHint = hint;
        console.log('setAudioTrackContentHints', track.id, hint);
    });
}