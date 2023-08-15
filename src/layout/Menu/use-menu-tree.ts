import { computed } from 'vue';
import { useAppStore } from '@/store';
import { RouteRecordRaw, RouteRecordNormalized } from 'vue-router';
import appClientMenus from '@/router/app-menus';
import { cloneDeep } from 'lodash';


export default function useMenuTree() {

  const appRoute = computed(() => {
    return appClientMenus
  })

  const menuTree = computed(() => {
    const copyRouter = cloneDeep(appRoute.value) as RouteRecordNormalized[];
    copyRouter.sort((a: RouteRecordNormalized, b: RouteRecordNormalized) => {
      return (a.meta.order || 0) - (b.meta.order || 0);
    });

    // 核心: 菜单焦点触发逻辑
    function travel(_routes: RouteRecordRaw[], layer: number) {
      if (!_routes) return null;

      const collector: any = _routes.map((element) => {

        // leaf node
        if (element.meta?.hideChildrenInMenu || !element.children) {
          element.children = [];
          return element;
        }

        // 路由过滤器hideInMenu为true
        element.children = element.children.filter(
          (x) => x.meta?.hideInMenu !== true
        );

        // 关联子节点
        const subItem = travel(element.children, layer + 1);

        if (subItem.length) {
          element.children = subItem;
          return element;
        }

        // the else logic
        if (layer > 1) {
          element.children = subItem;
          return element;
        }

        if (element.meta?.hideInMenu === false) {
          return element;
        }

        return null;

      });
      return collector.filter(Boolean);
    }
    return travel(copyRouter, 0);

  })

  return {
    menuTree,
  }
}