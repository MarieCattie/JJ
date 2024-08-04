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

export interface MarkResponse {
    mark: number;
}

export default ($apiClient: AxiosInstance) => ({
    /** Получение отзывов о соискателе */
    async getReviewsByApplicant(uuid: string): Promise<Review[]> {
        const response = await $apiClient.get<Review[]>(`/reviews/applicant/${uuid}`);
        return response.data;
    },

    /** Отзыв о соискателе (uuid, текст, оценка) */
    async createReviewForApplicant(uuid: string, mark: number, body: string): Promise<Review> {
        const response = await $apiClient.post<Review>(`/reviews/applicant/${uuid}`, {
            mark,
            body
        });
        return response.data;
    },

    /** Получение средней оценки (рейтинга) соискателя по его uuid */
    async getApplicantAverageMark(uuid: string): Promise<MarkResponse> {
        const response = await $apiClient.get<MarkResponse>(`/reviews/mark/applicant/${uuid}`);
        return response.data;
    }
});
