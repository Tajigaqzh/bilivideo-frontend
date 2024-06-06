import {ref} from "vue";
import {ElMessage, UploadFile, UploadFiles, UploadProps, UploadRequestOptions} from "element-plus";
import {useLocalStorage} from "@vueuse/core";
import {commonUpload} from "@/views/create/index/utils.ts";

export function useAvatarUpload(form: any) {
    const imageUrl = useLocalStorage("uploading-img", '')
    // const imageUrl = ref('')


    const allowType = ['image/png', 'image/jpeg', 'image/gif']

    const coverList = ref<UploadProps['fileList']>([]);

    const customerCoverRequest = (options: UploadRequestOptions) => {
        commonUpload(options.file,imageUrl,form);
    }

    /**
     * 验证文件类型
     * @param file
     */
    const beforeCoverUpload: UploadProps['beforeUpload'] = (file: File) => {

        console.log(file.type)
        if (!allowType.includes(file.type)) {
            ElMessage.error('文件类型错误，您可以上传png，jpg，jpeg，gif')
            return false
        }
        return true
    }

    const coverChange = (_uploadFile: UploadFile, uploadFiles: UploadFiles) => {
        uploadFiles.pop();
    }

    return {
        imageUrl,
        coverList,
        customerCoverRequest,
        beforeCoverUpload,
        coverChange
    }
}