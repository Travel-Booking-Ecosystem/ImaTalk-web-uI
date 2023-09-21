
// write a method to return only first 10 words from a string
export const truncateString = (str, wordCount) => {
    const words = str.split(" ");
    if (words.length <= wordCount) {
        return str;
    }
    return words.slice(0, wordCount).join(" ") + "...";
}
