interface Module {
	name: string
	roles?: Role[]
	have?: (role: Role) => boolean
	data?: {
		is: (ofRole: Role) => boolean
	}
	api: ModuleApi
	routes?: ModuleRoutes
}

interface Role {
	name: string
	clearance: number
}

interface ModuleApi {
	version: number
	name: string
	url: string
}

interface ModuleRoutes {
	route: Route
}

interface Route {
	component: Object
	name?: string
	subRoutes?: { route: Route }
}

// // Vue 2.0 only:
// interface Route {
// 	path: string,
// 	component: Object,
// 	name?: string,
// 	chilren?: Route[]
// }
