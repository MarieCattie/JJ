<template>
    <div
        class="vacancy-response-card bg-white rounded-lg shadow-md p-6 hover:shadow-purple-300 transition-shadow duration-300 cursor-pointer">
        <!-- Job Title -->
        <h2 class="text-xl font-semibold text-black">{{ response?.vacancy?.title }}</h2>

        <!-- Company Name -->
        <p class="text-gray-500 mb-4">{{ employerName }}</p>

        <!-- Status Block -->
        <div class="relative flex items-center mb-4" @mouseenter="showTooltip = true" @mouseleave="showTooltip = false">
            <!-- Status Indicator -->
            <span :class="statusColor" class="inline-block w-3 h-3 rounded-full mr-2" :title="statusTooltip"></span>

            <!-- Status Text -->
            <span class="font-medium">{{ statusText }}</span>

            <div v-if="showTooltip" class="absolute bg-gray-700 text-white text-sm py-1 px-2 rounded shadow-lg -top-8 left-0">
                {{ statusTooltip }}
              </div>
        </div>

        <!-- Cover Letter Text -->
        <p class="text-gray-700 mb-4">
            {{ response.message }}
        </p>

        <!-- Action Buttons -->
        <div class="flex space-x-4">
            <button class="bg-purplefresh text-white px-4 py-2 rounded-lg hover:bg-purplelight" @click="openChat">
                Написать в чат
            </button>
            <button class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600" @click="deleteApplication(response.uuid)">
                Удалить отклик
            </button>
            <ModalMessage
      :isVisible="isModalVisible"
      :recipient="response.employer"
      :vacancyTitle="response.vacancy.title"
      @update:isVisible="isModalVisible = $event"
      @sendMessage="handleSendMessage"
    />
    <ModalMessageSuccess 
    :companion="response.employer.user_uuid"
    :isVisible="isModalMessageSuccessVisible" 
    @update:isVisible="isModalMessageSuccessVisible = $event" 
  />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue';
import type { VacancyResponse } from '~/api/vacancy_responses';
import { useChatStore } from '~/stores/chat';

const emit = defineEmits(['deleteResponse']);
const props = defineProps<{
    response: VacancyResponse[] | [] | null;
    jobTitle: string;
    companyName: string;
    status: string;
    coverLetter: string;
}>();

const showTooltip = ref(false);

const chatStore = useChatStore();

const statusInfo = {
    sent: {
        color: 'bg-purple-500',
        text: 'Отклик отправлен',
        tooltip: 'Ваш отклик отправлен, работодатель еще не выбрал исполнителя',
    },
    invited: {
        color: 'bg-green-500',
        text: 'Приглашение',
        tooltip: 'Работодатель выбрал вас в качестве исполнителя',
    },
    rejected: {
        color: 'bg-red-500',
        text: 'Отказ',
        tooltip: 'Работодатель выбрал другого исполнителя',
    },
};

const statusColor = computed(() => statusInfo[status.value]?.color || '');
const statusText = computed(() => statusInfo[status.value]?.text || '');
const statusTooltip = computed(() => statusInfo[status.value]?.tooltip || '');

const status = computed(() => {

    if (props.response.vacancy.responseSelected === null) {
        return 'sent';
    }
    else if(props.response.vacancy.responseSelected === props.response.uuid) {
        return 'invited';
    }
    else {
        return 'rejected'
    }
})

const openChat = () => {
    
    isModalVisible.value = true;
};

const deleteApplication = (uuid:string) => {
    console.log('Удалить отклик');
    emit('deleteResponse', {uuid: uuid});
};
const isModalVisible = ref(false);
const isModalMessageSuccessVisible = ref(false);
const employerName = computed(() => {
    let name = '';
    if (props.response.employer.surname) {
        name += props.response.employer.surname;
    }
    if (props.response.employer.name) {
        name += ` ${props.response.employer.name}`
    }
    if (props.response.employer.patronymic) {
        name += ` ${props.response.employer.patronymic}`
    }
    if (props.response.employer.title) {
        name = props.response.employer.title
    }
    return name;
})

const handleSendMessage = (data: any) => {
    if(data.status === "success") {
        isModalMessageSuccessVisible.value = true;

        chatStore.loading = true;
        let interval;
        interval = setInterval(() => {
            if(chatStore.loading === true) {
                console.log("interval working")
                // chatStore.socket.emit("message", {body: data.message})
                chatStore.sendMessageShort(data.message)
        } else {
clearInterval(interval)
console.log("interval not working")
        }
           
            
        }, 100)
        
       
        
        
        // chatStore.disconnectSocket();
        // chatStore.disconnectSocket()
    }
};
</script>

<style scoped lang="scss">
.vacancy-response-card {
    &:hover {
        box-shadow: 0 0 4px 1px rgba(170, 159, 239, 0.3);
    }
}
</style>