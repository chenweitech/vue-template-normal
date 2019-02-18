// 处理权限
import navConfig from '@/configs/SideBarConfig';

const hashMenu = {};      //  存放导航信息的hashmap

const withAuthorization = {
  data: function () {
    return {
      nav: [],
    }
  },
  created() {
    // 递归配置文件，节点生成树
    this.generateIndex(navConfig.config);
    // 获取权限信息
    if(navConfig.withAuthorization) { // 配置权限信息
      this.getPermissions();
    }else{                            // 不配置权限信息
      this.nav = navConfig.config;
    }
  },
  methods: {
    // 获取权限的接口
    getPermissions: function () {
      this.$http.getPermissions().then(res => {
        let permissionList = res.data.permissionList
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
      this.nav = arr;
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

export default withAuthorization;