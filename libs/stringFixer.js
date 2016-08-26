// "key: value"

export default (uglyString) => {
    return uglyString.split(": ").reduce((pre, cur) => {
        return {title: pre, dep: cur};
    });
}
