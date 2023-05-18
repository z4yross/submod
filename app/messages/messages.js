export function warning(message) {
    const template = "{{message}} 🟨"
    return template.replace("{{message}}", message);
}

export function error(message) {
    const template = "{{message}} 🟥"
    return template.replace("{{message}}", message);
}

export function success(message) {
    const template =  "{{message}} 🟩"
    return template.replace("{{message}}", message);
}