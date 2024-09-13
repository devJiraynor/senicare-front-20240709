import ResponseDto from "../response.dto";

// interface: 로그인 Response Body Dto //
export default interface SignInResponseDto extends ResponseDto {
    accessToken: string;
    expiration: number;
}