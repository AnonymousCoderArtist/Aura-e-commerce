export type CurrencyType = 'USD' | 'EUR' | 'GBP' | 'JPY';

const rates = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.78,
  JPY: 155.4
};

const currencyLocale = {
  USD: 'en-US',
  EUR: 'de-DE',
  GBP: 'en-GB',
  JPY: 'ja-JP'
};

export function convertAndFormatPrice(priceInUSD: number, targetCurrency: CurrencyType): string {
  const converted = priceInUSD * rates[targetCurrency];
  return new Intl.NumberFormat(currencyLocale[targetCurrency], {
    style: 'currency',
    currency: targetCurrency,
    minimumFractionDigits: targetCurrency === 'JPY' ? 0 : 2,
    maximumFractionDigits: targetCurrency === 'JPY' ? 0 : 2
  }).format(converted);
}
