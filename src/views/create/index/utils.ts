import {removePrefix, withPrefix} from "@/utils/imgUtil.ts";
import {simpleUploadApi} from "@/api/upload.ts";
import {Ref} from "vue";

export const commonUpload = (file: File, url: Ref<string>,
                      form: any
) => {
    const param = {
        file: file,
        prev: removePrefix(url.value)
    }

    simpleUploadApi(param).then(res => {
        if (res.code === 200) {
            url.value = withPrefix(res.data);
            form.coverUrl = res.data;
            return Promise.resolve();
        }
        return Promise.reject("error")
    }).catch(error => {
        return Promise.reject(error)
    })
}

function imageScale(width: number, originWidth: number, originHeight: number) {
    const scaleRatio = width / originWidth;
    const scaleHeight = scaleRatio * originHeight;
    return [width, scaleHeight];
}

export function getVideFirstFrame(file: File | null | undefined, scaleWidth: number, quality: number = 0.7) {
    if (!file) return Promise.reject(null);

    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        if (reader) {
            reader.onload = (e) => {
                let video = document.createElement("video");
                if (e.target) {
                    video.src = e.target.result as unknown as string;
                }
                video.onloadeddata = () => {
                    const canvas = document.createElement("canvas");
                    const [width, height] = imageScale(
                        scaleWidth,
                        video.videoWidth,
                        video.videoHeight
                    );

                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext("2d");
                    if (ctx) {
                        ctx.fillRect(0, 0, width, height);
                        ctx.drawImage(video, 0, 0, width, height);
                        ctx.imageSmoothingEnabled = false;
                    }

                    canvas.toBlob(
                        async (blob) => {
                            video.pause();
                            //@ts-ignore
                            video = null;
                            resolve(blob);
                        },
                        "image/jpeg",
                        quality
                    );
                }
                video.onerror = () => {
                    video.pause();
                    //@ts-ignore
                    video = null;
                    reject();
                };
                video.muted = true;
                video.play();
            }
        }
    })
}
