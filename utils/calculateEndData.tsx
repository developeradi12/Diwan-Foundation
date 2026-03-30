export const calculateEndDate = (
    startDate: string,
    durationMonths: number
) => {
    const date = new Date(startDate);
    date.setMonth(date.getMonth() + durationMonths)
    return date
}