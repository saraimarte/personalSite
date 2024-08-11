function formatDate(date: Date): string {
  // Convert to UTC to avoid time zone issues
  const utcDate = new Date(date.toISOString().split('T')[0]);

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };

  return utcDate.toLocaleDateString(undefined, options);
}

export { formatDate };
