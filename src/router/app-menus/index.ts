/**
 * @description 合并内部页面与外部引入的路由到路由表中
 * @param 
 */
import { appRoutes, appExternalRoutes } from '../routes';

const mixinRoutes = [...appRoutes, ...appExternalRoutes];

const appClientMenus = mixinRoutes.map((el) => {
  const { name, path, meta, redirect, children } = el;
  return {
    name,
    path,
    meta,
    redirect,
    children,
  };
});

export default appClientMenus;