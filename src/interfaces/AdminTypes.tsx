export default interface AdminTypes {
  id: number;
  is_flagged: boolean;
  front_text: "string";
  back_text: "string";
  text: "string";
  comments: [id?: number, text?: string];
}
