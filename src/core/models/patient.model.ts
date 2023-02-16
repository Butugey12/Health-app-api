import { Address } from "./address.model";
import { ContactDetails } from "./contact-details.model";

export interface Patient {
  idNumber?: string;
  name: string;
  email: string;
  contactDetails?: ContactDetails;
  address?: Address;
}
