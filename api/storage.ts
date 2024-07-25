import { AxiosInstance } from "axios";

export default ($apiClient: AxiosInstance) => ({
    async showVacancyImage(filename: string): Promise<string> {
        return `storage/vacancies/${filename}`
    },
    async showUserImage(filename: string): Promise<string> {
        return `storage/users/${filename}`
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
