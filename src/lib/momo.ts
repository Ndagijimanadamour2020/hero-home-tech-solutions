import { randomUUID } from 'crypto';

interface MomoConfig {
  baseUrl: string;
  primaryKey: string;
  apiUser: string;
  apiKey: string;
  targetEnvironment: string;
  currency: string;
  callbackUrl?: string;
}

export interface RequestToPayInput {
  amount: number;
  currency?: string;
  phoneNumber: string;
  externalId: string;
  payerMessage?: string;
  payeeNote?: string;
}

export type MomoStatus = 'PENDING' | 'SUCCESSFUL' | 'FAILED';

function readConfig(): MomoConfig {
  const primaryKey = process.env.MTN_MOMO_PRIMARY_KEY;
  const apiUser = process.env.MTN_MOMO_API_USER;
  const apiKey = process.env.MTN_MOMO_API_KEY;

  if (!primaryKey || !apiUser || !apiKey) {
    throw new Error(
      'MTN MoMo is not configured. Set MTN_MOMO_PRIMARY_KEY, MTN_MOMO_API_USER and MTN_MOMO_API_KEY.'
    );
  }

  return {
    baseUrl: process.env.MTN_MOMO_BASE_URL || 'https://sandbox.momodeveloper.mtn.com',
    primaryKey,
    apiUser,
    apiKey,
    targetEnvironment: process.env.MTN_MOMO_TARGET_ENVIRONMENT || 'sandbox',
    currency: process.env.MTN_MOMO_CURRENCY || 'EUR',
    callbackUrl: process.env.MTN_MOMO_CALLBACK_URL,
  };
}

/** Normalizes local Rwandan numbers (07XXXXXXXX) to the MSISDN format MoMo expects. */
export function toMsisdn(phoneNumber: string): string {
  const digits = phoneNumber.replace(/\D/g, '');
  if (digits.startsWith('250')) return digits;
  if (digits.startsWith('0')) return `250${digits.slice(1)}`;
  return digits;
}

export function isValidMomoNumber(phoneNumber: string): boolean {
  return /^250(78|79)\d{7}$/.test(toMsisdn(phoneNumber));
}

async function getAccessToken(config: MomoConfig): Promise<string> {
  const credentials = Buffer.from(`${config.apiUser}:${config.apiKey}`).toString('base64');

  const response = await fetch(`${config.baseUrl}/collection/token/`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${credentials}`,
      'Ocp-Apim-Subscription-Key': config.primaryKey,
    },
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok || !data.access_token) {
    throw new Error(data?.message || 'Unable to authenticate with MTN MoMo.');
  }

  return String(data.access_token);
}

export async function requestToPay(input: RequestToPayInput): Promise<{ referenceId: string }> {
  const config = readConfig();
  const token = await getAccessToken(config);
  const referenceId = randomUUID();

  const response = await fetch(`${config.baseUrl}/collection/v1_0/requesttopay`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'X-Reference-Id': referenceId,
      'X-Target-Environment': config.targetEnvironment,
      'Ocp-Apim-Subscription-Key': config.primaryKey,
      'Content-Type': 'application/json',
      ...(config.callbackUrl ? { 'X-Callback-Url': config.callbackUrl } : {}),
    },
    body: JSON.stringify({
      amount: String(input.amount),
      currency: input.currency || config.currency,
      externalId: input.externalId,
      payer: { partyIdType: 'MSISDN', partyId: toMsisdn(input.phoneNumber) },
      payerMessage: input.payerMessage || 'Hero Home Tech purchase',
      payeeNote: input.payeeNote || 'Hero Home Tech purchase',
    }),
  });

  if (response.status !== 202) {
    const detail = await response.text();
    throw new Error(detail || 'MTN MoMo rejected the payment request.');
  }

  return { referenceId };
}

export async function getPaymentStatus(referenceId: string): Promise<{
  status: MomoStatus;
  reason?: string;
}> {
  const config = readConfig();
  const token = await getAccessToken(config);

  const response = await fetch(
    `${config.baseUrl}/collection/v1_0/requesttopay/${referenceId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'X-Target-Environment': config.targetEnvironment,
        'Ocp-Apim-Subscription-Key': config.primaryKey,
      },
      cache: 'no-store',
    }
  );

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data?.message || 'Unable to read the MoMo payment status.');
  }

  const status: MomoStatus =
    data.status === 'SUCCESSFUL' ? 'SUCCESSFUL' : data.status === 'FAILED' ? 'FAILED' : 'PENDING';

  return {
    status,
    reason: typeof data.reason === 'string' ? data.reason : data.reason?.message,
  };
}
