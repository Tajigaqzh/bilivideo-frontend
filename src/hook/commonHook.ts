import {computed, getCurrentInstance, onUnmounted, ref} from "vue";
import MessageLogin from "@/views/index/children/MessageLogin.vue";
import PasswordLogin from "@/views/index/children/PasswordLogin.vue";


export function useSearchHook() {

    const headerIsFixed = ref(false)
    //@ts-ignore
    const {proxy} = getCurrentInstance();

    const isSearching = ref(false);

    const focusInput = () => {
        isSearching.value = !isSearching.value
    }
    const searchKey = ref<string>('');

    const searchHistory = ref(["你好李焕英", "elasticSearch", "分布式锁", "JUC", "林徽因"])

    const cleanInput = () => {
        searchKey.value = '';
    }

    //登录的页面是否显示
    const dialogVisible = ref(false);

    const activeLoginType = ref(0);

    const changeLoginType = (value: number) => {
        activeLoginType.value = value;
    }

    const activeTab = computed(() => {
        return activeLoginType.value === 1 ? MessageLogin : PasswordLogin;
    })

    const handleClose = (done: () => void) => {
        done()
    }

    proxy.$bus.on('afterLogin', () => {
        dialogVisible.value = false;
    })

    onUnmounted(() => {
        proxy.$bus.off('afterLogin')
    })
    return {
        focusInput,
        headerIsFixed,
        searchKey,
        searchHistory,
        isSearching,
        activeTab,
        activeLoginType,
        changeLoginType,
        dialogVisible,
        handleClose,
        cleanInput,
    }
}