import { Nurse } from "src/types";
import ResponseDto from "../response.dto";

// interface: get nurse list response body dto //
export default interface GetNurseListResponseDto extends ResponseDto {
    nurses: Nurse[];
}