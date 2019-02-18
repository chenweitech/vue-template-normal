<script>
// 读取路由配置文件
import navConfig from '@/configs/SideBarConfig';
import withAuthorization from './withAuthorization';

export default {
  name: 'BaseSidebar',
  mixins: [withAuthorization],
  render () {
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
          default-active={navConfig.defaultActive}
          unique-opened={navConfig.uniqueOpened}
          router>
          {
            this.nav.map(item => {
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
