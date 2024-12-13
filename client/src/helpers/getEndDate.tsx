export default function getEndDate(startDate: string) {
  const today = new Date(startDate)
  const offset = today.getTimezoneOffset() * 60000 // Time zone offset in milliseconds
  const localToday = new Date(today.getTime() - offset)

  const minutes = localToday.getMinutes()

  if (minutes <= 30) {
    // Set to the next hour and a half (e.g., 2:10 → 3:30)
    localToday.setHours(localToday.getHours() + 1, 0, 0, 0)
    localToday.setMinutes(30, 0, 0) // 30 minutes, 0 seconds, 0 milliseconds
  } else {
    // Set to the next full hour (e.g., 2:31 → 4:00)
    localToday.setHours(localToday.getHours() + 2, 0, 0, 0) // +1 hour, 0 minutes, 0 seconds, 0 milliseconds
  }

  return localToday.toISOString().slice(0, 16)
}
