function updateQueryStringParameter(url, key, value) {
    let x = new URL(url);
    let p = new URLSearchParams(x.search)
    p.set(key, value)
    window.history.replaceState(null, null, `${x.origin}${x.pathname}?${p.toString()}`);

}

export {
    updateQueryStringParameter
}
