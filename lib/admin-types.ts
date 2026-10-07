export type CampaignEvent = {
  eventId: string;
  participantId: string;
  contractId: string;
  actionType: string;
  origin: string;
  occurredAt: string;
  validationStatus: "pending" | "approved" | "rejected" | "corrected";
  numberCount: number;
  correctionReason?: string;
};
export type AdminFilters = {
  action?: string;
  city?: string;
  channel?: string;
  from?: string;
  to?: string;
  status?: CampaignEvent["validationStatus"];
};
export type AdminIndicators = {
  contracts: number;
  renewals: number;
  upgrades: number;
  convertedReferrals: number;
  participants: number;
  issuedNumbers: number;
};
