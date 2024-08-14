<template>
    <div>
        <NuxtLayout>
            <div>
                <NuxtPage />
            </div>
        </NuxtLayout>
    </div>
</template>

<script lang="ts" setup>
import { useChatStore } from '~/stores/chat';
import { onMounted } from 'vue';

const chatStore = useChatStore();
onMounted(() => {
    chatStore.initializeSocket();
})
</script>

<style lang="scss" scoped></style>