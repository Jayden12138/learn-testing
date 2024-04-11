import type { App } from 'vue'
import type { RouteRecordRaw, Router } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'
import { RouteNames } from './const'

import Home from '@/pages/Home.vue'
import Task from '@/pages/Task.vue'
import Login from '@/pages/Login.vue'

export const routes: RouteRecordRaw[] = [
	{
		path: '/',
		component: Home,
		name: RouteNames.HOME,
	},
	{
		path: '/task',
		component: Task,
		name: RouteNames.TASK,
		meta: {
			requiresAuth: true,
		},
	},
	{
		path: '/login',
		component: Login,
		name: RouteNames.LOGIN,
		meta: {
			layout: false,
		},
	},
]

export function setupRouterGuard(router: Router) {
	router.beforeEach(() => {
		// startLoading()
	})
	router.afterEach(() => {
		// finishLoading()
	})

	router.beforeEach((to, from, next) => {
		if (to.matched.some(r => r.meta.requiresAuth)) {
			next()
		} else {
			next()
		}
	})
}

let router: Router
export const setupRouter = async (app: App) => {
	router = createRouter({
		history: createWebHashHistory(),
		routes,
	})

	app.use(router)
	setupRouterGuard(router)
	await router.isReady()
}

export function setRouterInstance(routerInstance: Router) {
	router = routerInstance
}

export function getRouterInstance() {
	return router
}
