// interface: 전화번호 인증 확인 Request Body Dto //
export default interface TelAuthCheckRequestDto {
    telNumber: string;
    authNumber: string;
}