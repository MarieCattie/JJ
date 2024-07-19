import { GetAuthUserInfoResponse, GetUserRolesInfoResponse, RoleDto, RoleResponse, UserById } from "~/types/user";
import { useUserStore } from "~/stores/user";
import { useAuthStore } from "~/stores/auth";
export default function useUser() {
    return {
        async fetchAuthUser() {
            const response = await useMyFetch<GetAuthUserInfoResponse>(
                'users/my', {
                method: 'GET'
            }
            )
            return response;
        },

        async getDetailUserData(currentUuid: string) {
            const response = await useMyFetch<GetUserRolesInfoResponse>(
                `roles/${currentUuid}/`
            )
            return response;
        },

        async updateDetailUserData(current: string, uuid: string, payload: any) {
            let currentRole = '';
            switch (current) {
                case 'individual':
                    currentRole = 'individual'
                    break;
                case 'legal_entity':
                    currentRole = 'legal-entity'
                    break;
                case 'applicant':
                    currentRole = 'applicant'
                    break;
                default:
                    currentRole = 'individual'
                    break;
            }
            const { data } = await useMyFetch<any>(`roles/${currentRole}/${uuid}`, {
                method: 'PUT',
                body: {
                    name: payload.name || '',
                    surname: payload.surname || '',
                    patronymic: payload.patronymic || '',
                    birthday: payload.birthday || '',
                    study_place: payload.study_place || '',
                    inn: payload.inn || '',
                    competitions: payload.competitions || '',
                    summary: payload.summary || '',
                    title: payload.title || '',
                    contact_info: payload.contact_info || '',
                }
            });
            return data;
        },

        async changeRole(roleDto: RoleDto) {
            return await useMyFetch<RoleResponse>('roles/change', {
                method: 'PUT',
                body: { role: roleDto.role }
            })
        },

        uploadImage(e: any) {
            const userStore = useUserStore();
            userStore.avatar = e.target.files[0]
        },

        async uploadAvatarToServer(formData: FormData) {
            const url = 'users/uploadImage';
            try {
                const response = await useMyClientFetch(url, {
                    method: 'POST',
                    body: formData,
                })
                console.log('Upload successful:', response);
                return response;
            } catch (error) {
                console.error('Error uploading image:', error);
                throw error;
            }
        }
    }
}