import { AxiosInstance } from "axios";
// НЕ ИСПОЛЬЗУЕТСЯ! ИСПОЛЬЗУЙ COMPOSABLES USESTORAGE
export default ($apiClient: AxiosInstance) => ({
    async showVacancyImage(filename: string): Promise<string> {
        return `storage/vacancies/${filename}`
    },
    showUserImage(filename: string) {
        return `${$config.public.backendAddress}/storage/users/${filename}`
    },
    async showVacanciesCategoryImage(filename: string): Promise<string> {
        return `storage/vacanciesCategory/${filename}`
    },
    async showProfessionalTrialImage(filename: string): Promise<string> {
        return `storage/professionalTrial/${filename}`
    },
    async showArticlesImage(filename: string): Promise<string> {
        return `storage/articles/${filename}`
    }
})
