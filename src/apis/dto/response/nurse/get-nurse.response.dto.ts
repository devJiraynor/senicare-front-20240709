import ResponseDto from "../response.dto";

// interface: get nurse response body dto //
export default interface GetNurseResponseDto extends ResponseDto {
    userId: string;
    name: string;
    telNumber: string;
}