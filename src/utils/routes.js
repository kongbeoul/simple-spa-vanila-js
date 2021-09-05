export const pushState = ({ state, title, url }) => {
    history.pushState(state, title, url);
    document.title = title;
}

export const replaceState = ({ state, title, url }) => {
    history.replaceState(state, title, url);
    document.title = title;
}