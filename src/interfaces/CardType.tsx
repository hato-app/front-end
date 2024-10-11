import { CardUpdateType } from "./CardUpdateType";

export default interface CardType extends CardUpdateType {
  id: number;
  category_id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
  front_text: string;
  back_text: string;
  views: number;
  text: string;
}
