import {ref} from "vue";

export function useMenu() {
    const menu = ref<HTMLUListElement>();
    const closeMenu = (e:any) => {
        e.preventDefault()
        menu.value!.style.opacity = "0";
    }
    const openMenu = (e: any) => {
        e.preventDefault()
        menu.value!.style.opacity = "1";
        if (e.clientX + 240 < e.target.offsetWidth) {
            menu.value!.style.left = (e.clientX - 80) + "px";
        } else {
            menu.value!.style.left = (e.clientX - 100 - 240) + "px";
        }

        if (e.clientY + 180 < e.target.offsetHeight) {
            menu.value!.style.top = (e.clientY - 20) + "px";
        } else {
            menu.value!.style.top = (e.clientY - 300) + "px";
        }
    }

    return {
        menu,
        openMenu,
        closeMenu
    }
}