import { AxiosInstance } from "axios";

export interface Review {
    uuid: string;
    applicant: string;
    reviewer: string;
    rating: number;
    comment: string;
    created_at: string;
    updated_at: string;
    deleted: boolean;
}

export default ($apiClient: AxiosInstance) => ({
    /** Получение отзывов о соискателе */
    async getReviewsByApplicant(uuid: string): Promise<Review[]> {
        const response = await $apiClient.get<Review[]>(`/reviews/applicant/${uuid}`);
        return response.data;
    }
});
