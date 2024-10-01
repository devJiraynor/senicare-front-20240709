import { ChargerdCustomer } from "src/types";
import ResponseDto from "../response.dto";

// interface: get charged customer response body dto //
export default interface GetChargedCustomerResponseDto extends ResponseDto {
    customers: ChargerdCustomer[];
}