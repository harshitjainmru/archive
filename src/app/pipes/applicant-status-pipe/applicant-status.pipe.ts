import { Pipe, PipeTransform } from "@angular/core";
import { CANDIDATE_STATUS } from "src/app/constants/enums";

@Pipe({
  name: "applicantStatus",
})
export class ApplicantStatusPipe implements PipeTransform {
  
  // applicantDetails?.currentApplicationStatus transformed  into appropriate status 
  
  transform(value: CANDIDATE_STATUS, ...args: unknown[]): unknown {
    console.log(value);

    switch (value) {
      case CANDIDATE_STATUS.APPLIED:
        return "Unprocessed applications";
      case CANDIDATE_STATUS.HIRED:
        return "Hired";

      case CANDIDATE_STATUS.SHORTLISTED:
        return "Shortlisted";

      case CANDIDATE_STATUS.NOT_SUITABLE:
        return "Not suitable";

      case CANDIDATE_STATUS.INVITATION:
        return "Invitations";

      case CANDIDATE_STATUS.CONTRACT_SEND:
        return "Hired";
      case CANDIDATE_STATUS.CONTRACT_SIGNED:
        return "Hired";

      default:
        break;
    }
    return "";
  }
}
