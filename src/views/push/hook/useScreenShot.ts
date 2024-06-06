import {generateBase64} from "@/utils/videoUtil.ts";
import {pushCanvasRef} from "./index";


export function useScreenShort() {

    const handleScreenShot = () => {
        const url = generateBase64(pushCanvasRef.value!);
        const a = document.createElement("a");
        const event = new MouseEvent('click');
        a.download = `${+new Date()}截屏`;
        a.href = url;
        a.dispatchEvent(event);
    }
    return {
        handleScreenShot
    }

}
