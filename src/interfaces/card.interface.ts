import { Data } from "./data.interface";

export interface Card extends Data {
    back_text: string;
    category_id: number;
    created_at: string;
    front_text: string;
    id: number;
    updated_at: string;
    user_id: number;
    views: number | null;
}
