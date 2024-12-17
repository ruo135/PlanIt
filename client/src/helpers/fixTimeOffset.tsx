// Lucas Chew 260971542

export default function fixTimeOffset(time: Date, forwards: boolean) {
  const offset = new Date().getTimezoneOffset() * 60000 // Time zone offset in milliseconds
  return forwards
    ? new Date(time.getTime() + offset)
    : new Date(time.getTime() - offset)
}
