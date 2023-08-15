<script lang="tsx">
  import { defineComponent, ref, h, compile, computed } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useRoute, useRouter, RouteRecordRaw } from 'vue-router';
  import type { RouteMeta } from 'vue-router';
  // import { useAppStore } from '@/store';
  import { listenerRouteChange } from '@/utils/route-listener';
  import { openWindow, regexUrl } from '@/utils';
  import useMenuTree from './use-menu-tree';

  export default defineComponent({
    setup() {
      const { t } = useI18n();
      const router = useRouter();
      const route = useRoute();
      const { menuTree } = useMenuTree();
      

      // const topMenu = computed(() => appStore.topMenu);
      const openKeys = ref<string[]>([]);
      const selectedKey = ref<string[]>([]);

      // 链接逻辑
      const goto = (item: RouteRecordRaw) => {
        // 打开外部链接
        if (regexUrl.test(item.path)) {
          openWindow(item.path);
          selectedKey.value = [item.name as string];
          return;
        }
        // 消除外部链接副作用
        const { hideInMenu, activeMenu } = item.meta as RouteMeta;
        if (route.name === item.name && !hideInMenu && !activeMenu) {
          selectedKey.value = [item.name as string];
          return;
        }
        // 触发路由器变更
        router.push({
          name: item.name,
        });
      };
      const findMenuOpenKeys = (target: string) => {
        const result: string[] = [];
        let isFind = false;
        const backtrack = (item: RouteRecordRaw, keys: string[]) => {
          if (item.name === target) {
            isFind = true;
            result.push(...keys);
            return;
          }
          if (item.children?.length) {
            item.children.forEach((el) => {
              backtrack(el, [...keys, el.name as string]);
            });
          }
        };
        menuTree.value.forEach((el: RouteRecordRaw) => {
          if (isFind) return; // Performance optimization
          backtrack(el, [el.name as string]);
        });
        return result;
      };

      // 路由切换监听
      listenerRouteChange((newRoute) => {
        const { requiresAuth, activeMenu, hideInMenu } = newRoute.meta;
        if (requiresAuth && (!hideInMenu || activeMenu)) {
          const menuOpenKeys = findMenuOpenKeys(
            (activeMenu || newRoute.name) as string
          );

          const keySet = new Set([...menuOpenKeys, ...openKeys.value]);
          openKeys.value = [...keySet];

          selectedKey.value = [
            activeMenu || menuOpenKeys[menuOpenKeys.length - 1],
          ];
        }
      }, true);

      const renderSubMenu = () => {
        function travel(_route: RouteRecordRaw[], nodes = []) {
          if(_route){
            
            //如存在路由节点，侧将其结构定制化渲染
            _route.forEach((element) => {
              const icon = element?.meta?.icon
                ? () => h(compile(`<${element?.meta?.icon}/>`))
                : null;
                
                // 定制菜单节点
                const node = element?.children && element?.children.length !== 0 ? 
                (
                  <a-sub-menu
                    key={element?.name}
                    v-slots={{
                      icon,
                      title: () => h(compile(t(element?.meta?.locale || ''))),
                    }}
                  >
                    {travel(element?.children)}
                  </a-sub-menu>
                ) : (
                  <a-menu-item
                    key={element?.name}
                    v-slots={{ icon }}
                    onClick={() => goto(element)}
                  >
                    {t(element?.meta?.locale || '')}
                  </a-menu-item>
                );
              
              nodes.push(node as never);
            })
          }
          return nodes;
        }
        return travel(menuTree.value)
      }

      return () => (
        <a-menu
          mode={!false ? 'horizontal' : 'vertical'}
          v-model:open-keys={openKeys.value}
          auto-open={false}
          selected-keys={selectedKey.value}
          auto-open-selected={true}
          level-indent={34}
          style="height: 100%;width:100%;"
        >
        
          {renderSubMenu()}
        </a-menu>
      )
    },
  })
</script>
