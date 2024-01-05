export default function getFormattedDateFromUTC(UTCDate: Date) {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(new Date());
}
