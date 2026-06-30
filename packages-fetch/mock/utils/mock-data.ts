export interface IUserInfo {
  id: number;
  password: string;
  realName: string;
  roles: string[];
  username: string;
  homePath?: string;
}

export const MOCK_USERS: IUserInfo = {
  id: 1,
  password: "123456",
  realName: "Admin",
  roles: [
    "admin"
  ],
  username: "admin",
  homePath: "/workspace"
};

export const MOCK_MENU_LIST = [
  {
    id: 1,
    name: "Workspace",
    status: 1,
    type: "menu",
    icon: "mdi:dashboard",
    path: "/workspace",
    component: "/dashboard/workspace/index",
    meta: {
      icon: "carbon:workspace",
      title: "page.dashboard.workspace",
      affixTab: true,
      order: 0
    }
  },
  {
    id: 2,
    meta: {
      icon: "carbon:settings",
      order: 9997,
      title: "system.title",
      badge: "new",
      badgeType: "normal",
      badgeVariants: "primary"
    },
    status: 1,
    type: "catalog",
    name: "System",
    path: "/system",
    children: [
      {
        id: 201,
        pid: 2,
        path: "/system/menu",
        name: "SystemMenu",
        authCode: "System:Menu:List",
        status: 1,
        type: "menu",
        meta: {
          icon: "carbon:menu",
          title: "system.menu.title"
        },
        component: "/system/menu/list",
        children: [
          {
            id: 20_101,
            pid: 201,
            name: "SystemMenuCreate",
            status: 1,
            type: "button",
            authCode: "System:Menu:Create",
            meta: {
              title: "common.create"
            }
          },
          {
            id: 20_102,
            pid: 201,
            name: "SystemMenuEdit",
            status: 1,
            type: "button",
            authCode: "System:Menu:Edit",
            meta: {
              title: "common.edit"
            }
          },
          {
            id: 20_103,
            pid: 201,
            name: "SystemMenuDelete",
            status: 1,
            type: "button",
            authCode: "System:Menu:Delete",
            meta: {
              title: "common.delete"
            }
          }
        ]
      },
      {
        id: 202,
        pid: 2,
        path: "/system/dept",
        name: "SystemDept",
        status: 1,
        type: "menu",
        authCode: "System:Dept:List",
        meta: {
          icon: "carbon:container-services",
          title: "system.dept.title"
        },
        component: "/system/dept/list",
        children: [
          {
            id: 20_401,
            pid: 201,
            name: "SystemDeptCreate",
            status: 1,
            type: "button",
            authCode: "System:Dept:Create",
            meta: {
              title: "common.create"
            }
          },
          {
            id: 20_402,
            pid: 201,
            name: "SystemDeptEdit",
            status: 1,
            type: "button",
            authCode: "System:Dept:Edit",
            meta: {
              title: "common.edit"
            }
          },
          {
            id: 20_403,
            pid: 201,
            name: "SystemDeptDelete",
            status: 1,
            type: "button",
            authCode: "System:Dept:Delete",
            meta: {
              title: "common.delete"
            }
          }
        ]
      }
    ]
  },
  {
    id: 9,
    meta: {
      badgeType: "dot",
      order: 9998,
      title: "demos.vben.title",
      icon: "carbon:data-center"
    },
    name: "Project",
    path: "/vben-admin",
    type: "catalog",
    status: 1,
    children: [
      {
        id: 901,
        pid: 9,
        name: "VbenDocument",
        path: "/vben-admin/document",
        component: "IFrameView",
        type: "embedded",
        status: 1,
        meta: {
          icon: "carbon:book",
          iframeSrc: "https://doc.vben.pro",
          title: "demos.vben.document"
        }
      },
      {
        id: 902,
        pid: 9,
        name: "VbenGithub",
        path: "/vben-admin/github",
        component: "IFrameView",
        type: "link",
        status: 1,
        meta: {
          icon: "carbon:logo-github",
          link: "https://github.com/vbenjs/vue-vben-admin",
          title: "Github"
        }
      },
      {
        id: 903,
        pid: 9,
        name: "VbenAntdv",
        path: "/vben-admin/antdv",
        component: "IFrameView",
        type: "link",
        status: 0,
        meta: {
          icon: "carbon:hexagon-vertical-solid",
          badgeType: "dot",
          link: "https://ant.vben.pro",
          title: "demos.vben.antdv"
        }
      }
    ]
  },
  {
    id: 10,
    component: "_core/about/index",
    type: "menu",
    status: 1,
    meta: {
      icon: "lucide:copyright",
      order: 9999,
      title: "demos.vben.about"
    },
    name: "About",
    path: "/about"
  }
];

export function getMenuIds(menus: { id: number;
children?: { id: number }[]; }[]) {
  const ids: number[] = [];

  for (const item of menus) {
    ids.push(item.id);

    if (item.children && item.children.length > 0) {
      ids.push(...getMenuIds(item.children));
    }
  }

  return ids;
}
