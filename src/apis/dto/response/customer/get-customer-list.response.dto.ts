import { Customer } from "src/types";
import ResponseDto from "../response.dto";

// interface: get customer list response body dto //
export default interface GetCustomerListResponseDto extends ResponseDto {
    customers: Customer[];
}