
export const calculateDuration = (start: string, end: string) => {
  const startDate = new Date(`1970/01/01 ${start}`);
  const endDate = new Date(`1970/01/01 ${end}`);
  const diff = endDate.getTime() - startDate.getTime();
  const hours = Math.floor(diff / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  return `${hours}h ${minutes}m`;
};
