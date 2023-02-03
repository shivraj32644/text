export const compactInrFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  notation: 'compact',
  minimumSignificantDigits: 3,
  maximumSignificantDigits: 4,
});

export const InrFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
});

export const compactNumberFormatter = new Intl.NumberFormat('en-IN', {
  style: 'decimal',
  notation: 'compact',
  minimumSignificantDigits: 3,
  maximumSignificantDigits: 4,
});
