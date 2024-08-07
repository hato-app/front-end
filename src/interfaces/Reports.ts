export default interface Reports {
    id: string,
    front_text: string,
    back_text: string,
    is_flagged: boolean,
    comments: { id: string, text: string }[]
}

