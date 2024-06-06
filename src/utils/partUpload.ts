import SparkMD5 from "spark-md5";
import {checkMd5Api, videoUpload} from "@/api/upload.ts";
import {Ref, ref} from "vue";
import {ElMessage} from "element-plus";

/**
 * 计算文件的md5,默认分块是2MB
 */

export function calculateFileMd5(file: File, chunkSize: number = 2097152) {

    return new Promise<string>((resolve, reject) => {
        //拿到blob
        let sliceBlob = File.prototype.slice;
        let chunks = Math.ceil(file.size / chunkSize);
        let currentChunk = 0;
        let spark = new SparkMD5.ArrayBuffer();

        let fileReader = new FileReader();

        //todo 将生成缩略图的逻辑合并
        fileReader.onload = function (e) {
            spark.append(e.target?.result as ArrayBuffer);
            currentChunk++;
            if (currentChunk < chunks) {
                loadNext();
            } else {
                //结束md5的生成
                let md5 = spark.end();
                resolve(md5);
            }
        };
        fileReader.onerror = function (e) {
            reject(e);
        };

        function loadNext() {
            let start = currentChunk * chunkSize;
            let end = start + chunkSize;
            if (end > file.size) {
                end = file.size;
            }
            fileReader.readAsArrayBuffer(sliceBlob.call(file, start, end));
        }

        loadNext();
    })
}

/**
 * 获取文件的后缀名
 * @param FileName 文件名
 */
// const getFileType = (FileName: string) => {
//     return FileName.substring(FileName.lastIndexOf(".") + 1);
// };

/**
 * 向后端发送请求检查该文件的md5是否存在（秒传）
 * @param md5
 */
export function checkMd5(md5: string) {
    return new Promise((resolve, reject) => {
        checkMd5Api(md5).then(res => {
            if (res.data) return resolve(res.data);

            reject(null)
        })
    })
    // checkMd5Api(md5).then(res => {
    //     if (res.data) {
    //         //已经有,直接返回路径
    //         return Promise.resolve(res.data);
    //     }
    //     return Promise.reject(null)
    // })
}


/**
 * 上传文件
 * @param file
 * @param index
 * @param md5
 * @param name
 */
let retry = 0;


export const url = ref('')


export const calculateTotal = (file: File) => {
    const size = file.size; //总大小shardSize = 2 * 1024 * 1024,
    const sharedSize = 2 * 1024 * 1024; //以4MB为一个分片,每个分片的大小
    return Math.ceil(size / sharedSize); //总片数
}

export function postFile(file: File, index: number, md5: string, name: string, resultUrl: Ref<string>, progress: Ref<number>) {

    const preIndex = localStorage.getItem("uploadIndex")

    if (preIndex) {
        index = preIndex as unknown as number;
    }
    const size = file.size; //总大小shardSize = 2 * 1024 * 1024,
    const sharedSize = 2 * 1024 * 1024; //以4MB为一个分片,每个分片的大小

    const sharedCount = Math.ceil(size / sharedSize); //总片数

    if (index > sharedCount) {
        return;
    }
    const start = index * sharedSize;
    const end = start + sharedSize;

    const packet = file.slice(start, end); //将文件进行切片

    let formData = new FormData();
    formData.append("md5", md5); // 前端生成uuid作为标识符传个后台每个文件都是一个uuid防止文件串了
    formData.append("file", packet); //slice方法用于切出文件的一部分
    formData.append("index", (index + 1).toString()); //当前是第几片
    formData.append("total", sharedCount.toString()); //总片数
    formData.append("name", name);

    videoUpload(formData).then(res => {
        if (res.data === "ok") {
            formData = new FormData();
            retry = 0;
            // console.log((index / sharedCount) * 100)

            index++;
            progress.value = parseInt(((index / sharedCount) * 100).toFixed(0))
            console.log(progress.value)

            localStorage.removeItem("uploadIndex")

            postFile(file, index, md5, file.name, resultUrl, progress);
        } else if (res.data === undefined || !res.data) {
            formData = new FormData();
            localStorage.setItem("uploadIndex", index.toString())
            if (retry < 3) {

                postFile(file, index, md5, file.name, resultUrl, progress);
                retry++;

            }
            //失败了
            return Promise.reject(index);
        } else {
            resultUrl.value = res.data;
            progress.value = 100
            console.log(res)
        }
    }).catch(err => {
        console.log(err);
        return Promise.reject(index);
        if (retry < 3) {
            videoUpload(formData);
            retry++;
        }

        ElMessage.error("失败")

    })
}