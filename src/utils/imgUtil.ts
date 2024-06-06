export function withPrefix(url: string) {
    return import.meta.env.VITE_PICPREFIX + url;
}

export function removePrefix(url: string) {
    return url.replace(import.meta.env.VITE_PICPREFIX, "");
}