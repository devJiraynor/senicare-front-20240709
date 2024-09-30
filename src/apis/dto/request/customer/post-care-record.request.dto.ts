// interface: post care record request body dto //
export default interface PostCareRecordRequestDto {
    contents: string;
    usedToolNumber: number | null;
    count: number | null;
}