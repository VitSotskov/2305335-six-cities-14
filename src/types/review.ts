import { Host } from './offer-host';

export type ReviewType = {
  comment: string;
  date: string;
  id: number;
  rating: number;
  user: Host;
}
