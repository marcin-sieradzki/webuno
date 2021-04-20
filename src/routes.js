import Home from "./views/Home.vue";
import Game from "./views/Game.vue";
import NotFound from "./views/NotFound.vue";

/** @type {import('vue-router').RouterOptions['routes']} */
export const routes = [
  { path: "/", component: Home, meta: { title: "Home" } },
  { path: "/game", component: Game, meta: { title: "Game" } },
  { path: "/:path(.*)", component: NotFound },
];
