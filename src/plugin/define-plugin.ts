import type * as types from './types';

export type DefinePluginOptions = {
	appName: string;
	navItems?: Array<types.NavItem>;
	fillItems?: Array<types.FillItem>;
	routes?: Array<types.Route>;
};

export const definePlugin = ({
	appName,
	navItems = [],
	fillItems = [],
	routes = [],
}: DefinePluginOptions): types.PluginConfig => ({
	navItems: navItems.map((item) => ({
		appName,
		...item,
	})),
	fillItems: fillItems.map((item) => ({
		appName,
		...item,
	})),
	routes: routes.map((route) => ({
		appName,
		...route,
	})),
});
