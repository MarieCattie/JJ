export default function useStorage() {
    const config = useRuntimeConfig();
    return {
        showUserImage(filename: string) {
            
           return `${config.public.backendAddress}/storage/users/${filename}`
        }, 
        showCategoryImage(filename: string) {
            
            return `${config.public.backendAddress}/storage/vacanciesCategory/${filename}`
         }, 
        showArticleImage(filename: string) {
            
            return `${config.public.backendAddress}/storage/articles/${filename}`
        },
        showVacancyImage(filename: string) {
            return `${config.public.backendAddress}/storage/vacancies/${filename}`
        }
        
    }
}