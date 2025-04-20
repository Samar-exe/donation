import axios from './axiosConfig';

interface ReferralInfo {
  referralCode: string;
  referralCount: number;
  sawabPoints: number;
}

export const getReferralInfo = async (): Promise<ReferralInfo> => {
  const response = await axios.get('/api/referral');
  return response.data;
};

export const applyReferralCode = async (referralCode: string): Promise<{ message: string; sawabPoints: number }> => {
  const response = await axios.post('/api/referral/apply', { referralCode });
  return response.data;
};

export const shareReferralLink = async (): Promise<{ message: string; sawabPoints: number }> => {
  const response = await axios.post('/api/referral/share');
  return response.data;
};

export const getSawabPoints = async (): Promise<{ sawabPoints: number }> => {
  const response = await axios.get('/api/referral/points');
  return response.data;
}; 