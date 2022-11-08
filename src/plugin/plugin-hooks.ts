import * as React from 'react';
import type * as types from './types';

const PluginContext = React.createContext<
	Array<types.PluginConfig> | undefined
>(undefined);
PluginContext.displayName = 'PluginContext';

export const PluginContextProvider = PluginContext.Provider;

export const usePluginNavItems = () => {
	const plugins = React.useContext(PluginContext);

	return React.useMemo(
		() =>
			plugins &&
			plugins
				.map((plugin) => plugin.navItems)
				.flat(1)
				.sort((a, b) => a.priority - b.priority),
		[plugins]
	);
};

export const usePluginFillItems = (options: { slotId: string }) => {
	const plugins = React.useContext(PluginContext);

	return React.useMemo(
		() =>
			plugins &&
			plugins
				.map((plugin) =>
					plugin.fillItems.filter((item) => item.slotId === options.slotId)
				)
				.flat(1)
				.sort((a, b) => a.priority - b.priority),
		[plugins, options.slotId]
	);
};

export const usePluginRoutes = () => {
	const plugins = React.useContext(PluginContext);

	return React.useMemo(
		() => plugins && plugins.map((plugin) => plugin.routes).flat(1),
		[plugins]
	);
};
