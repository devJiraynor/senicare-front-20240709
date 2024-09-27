import ResponseDto from "../response.dto";

// interface: get customer response body dto //
export default interface GetCustomerResponseDto extends ResponseDto {
    customerNumber: number;
    profileImage: string;
    name: string;
    birth: string;
    chargerName: string;
    chargerId: string;
    address: string;
    location: string;
}