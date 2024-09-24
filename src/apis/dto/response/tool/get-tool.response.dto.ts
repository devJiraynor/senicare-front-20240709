import ResponseDto from "../response.dto";

// interface: get tool response body dto //
export default interface GetToolResponseDto extends ResponseDto {
    toolNumber: number;
    name: string;
    purpose: string;
    count: number;
}