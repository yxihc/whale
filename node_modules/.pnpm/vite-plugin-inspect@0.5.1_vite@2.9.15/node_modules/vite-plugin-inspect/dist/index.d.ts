import { Plugin } from 'vite';

declare type FilterPattern = ReadonlyArray<string | RegExp> | string | RegExp | null;
interface Options {
    /**
     * Enable the inspect plugin (could be some performance overhead)
     *
     * @default true
     */
    enabled?: boolean;
    /**
     * Filter for modules to be inspected
     */
    include?: FilterPattern;
    /**
     * Filter for modules to not be inspected
     */
    exclude?: FilterPattern;
}
declare function PluginInspect(options?: Options): Plugin;

export { FilterPattern, Options, PluginInspect as default };
