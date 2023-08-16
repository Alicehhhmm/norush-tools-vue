import 'vue-router';

declare module 'vue-router' {
  interface RouteMeta {
    roles?: string[]; // 控制对该页具有访问权限的角色
    requiresAuth: boolean; // 是否需要登录才能访问当前页面(每个路由都必须声明)
    icon?: string; // 图标显示在侧边菜单中
    locale?: string; // 区域设置名称显示在侧菜单和面包屑中
    hideInMenu?: boolean; // 如果为true，则不会显示在侧边菜单中
    hideChildrenInMenu?: boolean; // 如果设置为true，子元素不会显示在侧菜单中
    activeMenu?: string; // 如果设置了名称，菜单将根据您设置的名称高亮显示 
    order?: number; // 排序路由菜单项。如果设置key，该值越大，越向前
    noAffix?: boolean; // 如果设置为true，标签将不附加在标签栏上
    ignoreCache?: boolean; // 如果设置为true，页面将不会被缓存
  }
}
