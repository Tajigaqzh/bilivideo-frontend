import {computed, nextTick, onMounted, ref} from "vue";

export function useTags(form: any) {
    const selectContainerWidth = ref(0);
    const emitEnter = () => {
        form.selectTags.includes(form.currentTags) || form.selectTags.push(form.currentTags);
        console.log(form.selectTags);
        form.currentTags = "";

        nextTick(() => {
            selectContainerWidth.value = selectContainer.value?.clientWidth!;
        })
    }

    onMounted(() => {
        selectContainerWidth.value = selectContainer.value?.clientWidth!;
    })
    const selectContainer = ref<HTMLDivElement>();

    const formatWidth = computed(() => {
        return `${selectContainerWidth.value}px`
    })

    const handleCloseTag = (name: string) => {
        form.selectTags = form.selectTags.filter((tag: string) => tag !== name);
        nextTick(() => {
            selectContainerWidth.value = selectContainer.value?.clientWidth!;
        })
    }

    return {
        emitEnter, selectContainer, formatWidth, handleCloseTag
    }

}