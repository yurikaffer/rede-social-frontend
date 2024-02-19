export function formatTime(dateTime: string, extendedTime?: boolean): string {
    const now = new Date();
    const commentDate = new Date(dateTime);
    const timeDifference = Math.abs(now.getTime() - commentDate.getTime());
    const seconds = Math.floor(timeDifference / 1000);
    let formattedTime: string;

    if (seconds >= 86400) {
        const days = Math.floor(seconds / 86400);
        if (extendedTime) {
            days > 1 ? formattedTime = `${days} dias` : formattedTime = `${days} dia`
        } else {
            formattedTime = `${days}d`;
        }
    } else if (seconds >= 3600) {
        const hours = Math.floor(seconds / 3600);
        if (extendedTime) {
            hours > 1 ? formattedTime = `${hours} horas` : formattedTime = `${hours} hora`
        } else {
            formattedTime = `${hours}h`;
        }
    } else if (seconds >= 60) {
        const minutes = Math.floor(seconds / 60);
        if (extendedTime) {
            minutes > 1 ? formattedTime = `${minutes} minutos` : formattedTime = `${minutes} minuto`
        } else {
            formattedTime = `${minutes}m`;
        }

    } else {
        if (extendedTime) {
            formattedTime = `${seconds} segundos`;
        } else {
            formattedTime = `${seconds}s`;
        }
    }

    return formattedTime;
}

