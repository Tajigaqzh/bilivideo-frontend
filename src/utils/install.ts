import { App, Component } from 'vue';

export type WithInstall<T> = T & {
    install(app: App): void;
};
export type CustomComponent = Component & { displayName?: string };

/**
 * @description: install component
 * @param component component组件
 * @param alias alias
 */
export const withInstall = <T extends CustomComponent>(
    component: T,
    alias?: string,
) => {
    (component as Record<string, unknown>).install = (app: App) => {
        const compName = component.name || component.displayName;
        if (!compName) return;
        app.component(compName, component);
        if (alias) {
            app.config.globalProperties[alias] = component;
        }
    };
    return component as WithInstall<T>;
};
