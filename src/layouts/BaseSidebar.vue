<script>
// 读取路由配置文件
import nav from '../configs/SideBarConfig'

export default {
  name: 'BaseSidebar',
  methods: {
    // 根据path 生成递归的Index
    generateIndex (arr, pIndex) {
      arr.forEach((item) => {
        item.index = pIndex? `${pIndex}/${item.path}` : `/${item.path}`;
        if (item.hasOwnProperty('children')) {
          this.generateIndex(item.children, item.index);
        }
      })
    }
  },
  render () {
    this.generateIndex(nav.config);

    const subMenuItem = function (arr) {
      let components = [];
      arr.map(item=>{
        components.push(<el-menu-item index={item.index}>{item.title}</el-menu-item>)
      })
      return components
    }

    return (
      <div>
        <el-menu
          default-active={nav.defaultActive}
          unique-opened={nav.uniqueOpened}
          router>
          {
            nav.config.map(item => {
              return (
                <el-submenu index={item.index}>
                  <template slot="title">
                    <i class={item.icon}></i>
                    <span>{item.title}</span>
                  </template>
                  {
                    item.children? subMenuItem(item.children): ''
                  }
                </el-submenu>
              )
            })
          }
        </el-menu>
      </div>
    )
  }
}
</script>

<style lang="scss">
// 禁止鼠标选中导航栏标签内容
.el-submenu{
  user-select: none;
}
</style>
