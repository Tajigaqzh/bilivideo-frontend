import {App} from 'vue';

// warn: write a component must define a unique name,if not ,it will be covered by the same name component
import * as components from './components';

const installGlobalComponent = (app: App) => {
    Object.entries(components).forEach(([componentName, component]) => {
        app.component(componentName, component);
    });
};
// globalComponentInstall
export default installGlobalComponent;
