function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'Europe/London', // Specify the desired time zone
  };

  return new Intl.DateTimeFormat('en-GB', options).format(date);
}

export { formatDate };
