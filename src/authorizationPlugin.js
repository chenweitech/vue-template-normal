/**
 * 这个mixins会在全局根实例上注入两个对象
 * @globalNavigationMenu 导航栏配置对象
 * @globalResourcesPermissionsArray  全局的资源权限验证对象
 */
import GlobalConfig from './configs/GlobalConfig';
import navConfig from './configs/SideBarConfig';

const hashMenu = {};

const authorizationMixins = {
  data: function () {
    return {
      globalNavigationMenu: [],
      globalResourcesPermissionsArray: []
    }
  },
  created() {
    // 递归配置文件，节点生成树
    this.generateIndex(navConfig.config);
    // 获取权限信息
    if(GlobalConfig.withGlobalAuthotrization||GlobalConfig.withSideBarAuthorization) { // 配置权限信息
      this.getPermissions();
    }else{                            // 不配置权限信息
      this.globalNavigationMenu = navConfig.config;
    }
  },
  methods: {
    // 获取权限的接口
    getPermissions: function () {
      this.$http.getPermissions().then(res => {
        /**
         * 生成动态路由
         */
        if(GlobalConfig.withSideBarAuthorization){
          let permissionList = res.data.routerPermissions
          permissionList.forEach(item => {
            let path = '';
            if(item.p_id) {
              permissionList.forEach(i => {
                if (i.id===item.p_id) {
                  path = `/${i.route}/${item.route}`
                }
              })
            }else {
              path = `/${item.route}`
            }
            hashMenu[path] = true   // 对比hash表，将有权限的路由设置成true
          })

          // 根据hashMenu生成动态路由
          this.addRouters();
        }
        /**
         * 生成全局权限验证信息
         */
        if(GlobalConfig.withGlobalAuthotrization) {
          let _perfixUrl = res.data.system;  // 获取当前系统前缀
          this.globalResourcesPermissionsArray = []
          res.data.resourcesPermissions.forEach(item => {
            let regexp = new RegExp(_perfixUrl+':')
            if(regexp.test(item)) {
              this.globalResourcesPermissionsArray.push(item.replace(regexp,''));
            }
          })
        }
      })
    },
    addRouters () {
      let arr = []
      navConfig.config.forEach(item => {
        if(item.hasOwnProperty('children')) {
          let childArr = [];
          item.children.forEach(i => {
            if(hashMenu[i.index]) {
              childArr.push(i);
            }
          });
          item.children = childArr
        }
        if(hashMenu[item.index]) {
          arr.push(item)
        }
      })
      this.globalNavigationMenu = arr;
    },
    // 递归出Index
    generateIndex (arr, pIndex) {
      arr.forEach((item) => {
        item.index = pIndex? `${pIndex}/${item.path}` : `/${item.path}`;
        hashMenu[item.index] = false;
        if (item.hasOwnProperty('children')) {
          this.generateIndex(item.children, item.index);
        }
      })
    }
  }
}

export default authorizationMixins;