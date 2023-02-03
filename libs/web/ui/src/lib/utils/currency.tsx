export const compactInrFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  notation: 'compact',
  maximumFractionDigits: 2,
});

export const InrFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
});

export const compactNumberFormatter = new Intl.NumberFormat('en-IN', {
  style: 'decimal',
  notation: 'compact',
  maximumFractionDigits: 2,
});

export const compactNumberTwoDecimalFormatter = new Intl.NumberFormat('en-IN', {
  style: 'decimal',
  notation: 'compact',
  minimumSignificantDigits: 1,
  maximumSignificantDigits: 2,
});
