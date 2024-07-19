import { useMyClientFetch } from "~/composables/useMyFetch";
import useUser from "~/composables/useUser";

const { getUserById } = useUser();

export default function useChat() {
    return {
        async getChatmateData(authUserId: string, firstUserId: string, secondUserId: string) {
            let test;
            const chatmateUserId = authUserId === firstUserId ? firstUserId : secondUserId;
            await getUserById(chatmateUserId).then(
                res => {
                    test = res.data.value
                }
            )
            return test;
        }
    }
}