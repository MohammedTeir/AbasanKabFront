export default function useFormattedDate(initialDate: any) {
  const date = new Date(initialDate);
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  return date.toLocaleDateString("ar-EG", options);
}
