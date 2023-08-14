/**
 * @description 路由动态映射
 * @param modules|内部路由模块配置
 * @param externalModules|外部路由
 * @param RouteRecordNormalized|用于记录内部路由系统的处理和路由匹配过程。
 */
import type { RouteRecordNormalized } from 'vue-router';

const modules = import.meta.glob('./modules/*.ts', { eager: true });

function formatModules(_modules: any, result: RouteRecordNormalized[]) {
  Object.keys(_modules).forEach((key) => {
    const defaultModule = _modules[key].default;
    if (!defaultModule) return;
    const moduleList = Array.isArray(defaultModule)
      ? [...defaultModule]
      : [defaultModule];
    result.push(...moduleList);
  });
  return result;
}

export const appRoutes: RouteRecordNormalized[] = formatModules(modules, []);
