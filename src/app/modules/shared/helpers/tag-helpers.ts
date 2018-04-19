export function getTagValue(tags: string[], name: string) {
    if (!tags || !tags.length) {
        return null;
    }
    return tags
        .filter(t => t.startsWith(name))
        .map(getValue(name))
        [0];
}

function getValue(name: string): (t: string) => string {
    return (tag: string) => {
        return tag.substr(tag.indexOf(name) + name.length + 1);
    };
}
