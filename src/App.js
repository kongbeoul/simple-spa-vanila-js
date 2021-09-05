import { pushState, replaceState } from "./utils/routes.js";
import { changeRouter } from "./reducer/route.js"; 
import router from "./router/index.js";

export default function App($app, store) {
    const handlePopState = e => {
        const state = e.state;
        const data = router.find(v => v.state === state);
        store.dispatch(changeRouter({
            ...data
        }));
    }

    const handleLink = e => {
        if(e.target.closest(".link") || e.target.classList.contains("link")) {
            e.preventDefault();
            const data = {
                state: e.target.dataset.forState,
                title: e.target.innerText,
                url: e.target.pathname
            }
            pushState(data);
            store.dispatch(changeRouter(data));
        }
    }

    const init = () => {
        const state = store.getState();
        const { route } = state;

        replaceState({ ...route });
    }
    
    const render = () => {
        const state = store.getState();
        const { route } = state;
        
        switch(route.url) {
            case '/about':
                $app.innerHTML = `
                    <h1>About 페이지 입니다.</h1>
                `
                break;
            default:
                $app.innerHTML = `
                    <a href="/" class="link" data-for-state="v1">홈</a>
                    <a href="/about" class="link" data-for-state="v2">About</a>
                `
                $app.removeEventListener("click", handleLink);
                $app.addEventListener("click", handleLink);
        }

        mounted();
    };

    const mounted = () => {
        window.removeEventListener("popstate", handlePopState);
        window.addEventListener("popstate", handlePopState);
    }

    init();
    render();
    const unsubscribe = store.subscribe(render);   
}