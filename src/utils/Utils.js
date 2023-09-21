
// write a method to return only first 10 words from a string
export const truncateString = (str, wordCount) => {
    const words = str.split(" ");

    const truncatedWords = words.slice(0, wordCount).join(" ") + "...";
    
    // make sure the truncated words is not longer than 20 words
    if (truncatedWords.length > 50) {
        // return first 20 characters
        return str.substring(0, 50) + "...";
    }

    if (words.length <= wordCount) {
        return str;
    }




    return truncatedWords
}

export function formatTime(time) {
    // format the time to timezone 7 with format HH:mm
    const date = new Date(time);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    if (minutes < 10) {
        return `${hours}:0${minutes}`;
    }
    return `${hours}:${minutes}`;
}

