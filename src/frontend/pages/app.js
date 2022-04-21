export const App = (function(){
    const element = document.createElement("div");
    const views = {};
    let currentView;
    const addView = (view, key) => {
        view.classList.add("page");
        view.classList.add("view");
        views[key] = view;
        element.append(view);
    }
    const setView = (key) => {
        if (views[key]) {
            if(currentView) currentView.classList.remove("active");
            views[key].classList.add("active");
            currentView = views[key];
        }
    }
    return {
        setView,
        addView,
        element
    };
})();