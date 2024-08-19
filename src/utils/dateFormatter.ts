export function dateFormatter(inputDateString: string) {
  const inputDate = new Date(inputDateString);



  // Convert to user-readable format
  const userReadableDate = inputDate.toLocaleDateString("en-US");

  return userReadableDate;
}

export function readableDate(inputDateString: string) {
  const inputDate = new Date(inputDateString);
  // Formatting options
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    // timeZoneName: "short",
  };
  // Convert to user-readable format
  const userReadableDate = inputDate.toLocaleDateString("en-US", options);

  return userReadableDate;
}
