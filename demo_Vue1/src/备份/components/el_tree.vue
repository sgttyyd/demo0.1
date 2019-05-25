<template>
  <div class="tree">
  <el-container>
    <el-header height="70px"><img src="../assets/header.jpg"></el-header>
    <el-container>
      <el-collapse-transition>
      <el-aside width="200px" v-show="show3">
        <!-- element-tree组件 -->
        <el-tree
          :data="data2"
          show-checkbox
          node-key="id"
          ref="tree"
          default-expand-all
          highlight-current
          @node-click="switchWindow(i)"
          :default-checked-keys="[1,2,3]"
          :props="defaultProps">
        </el-tree>
      </el-aside>
      </el-collapse-transition>

      <el-main>
        <!-- 点击折叠按钮 -->
        <el-button @click="show3 = !show3"></el-button>
        <!-- 高德vue_amap -->
    <div class="amap-page-container">
      <el-amap vid="amap" :zoom="zoom" :center="center" class="amap-demo">
        <el-amap-info-window
          :position="currentWindow.position"
          :content="currentWindow.content"
          :visible="currentWindow.visible"
          :events="currentWindow.events">
        </el-amap-info-window>
      </el-amap>
    </div>

      </el-main>
    </el-container>
    <el-footer>
      Copyright (C) RuanMei.com All Rights Re &nbsp; 扬州市广陵区环境卫生管理办公室版权所有<br> 技术支持:<a href="http://www.yzldwl.com" target="_blank" style="color: #0d5cac">名扬亮点 </a>
    </el-footer>
  </el-container>

  </div>

</template>

<script>
module.exports = {
  methods: {
    /* getCheckedNodes() {
      console.log(this.$refs.tree.getCheckedNodes());
    },
    getCheckedKeys() {
      console.log(this.$refs.tree.getCheckedKeys());
    },
    setCheckedNodes() {
      this.$refs.tree.setCheckedNodes([{
        id: 5,
        label: '二级 2-1'
      }]);
    },
    setCheckedKeys() {
      this.$refs.tree.setCheckedKeys([2]);
    },
    resetChecked() {
      this.$refs.tree.setCheckedKeys([]);
    }, */
    /* element-tree组件点击事件 */
    handleNodeClick (data) {
      console.log('Tree点击事件', data)
    },
    switchWindow (tab) {
      this.currentWindow.visible = false
      this.$nextTick(() => {
        this.currentWindow = this.windows[tab]
        this.currentWindow.visible = true
      })
    }
  },

  data () {
    return {
      /* element折叠 */
      show3: true,
      /* element tree组件 */
      data2: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1'
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }, {
          id: 7,
          label: '二级 2-2'
        }, {
          id: 8,
          label: '二级 2-2'
        }, {
          id: 9,
          label: '二级 2-2'
        }, {
          id: 10,
          label: '二级 2-2'
        }, {
          id: 11,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 12,
          label: '二级 3-1'
        }, {
          id: 13,
          label: '二级 3-2'
        }, {
          id: 14,
          label: '二级 3-2'
        }, {
          id: 15,
          label: '二级 3-2'
        }, {
          id: 16,
          label: '二级 3-2'
        }, {
          id: 17,
          label: '二级 3-2'
        }, {
          id: 18,
          label: '二级 3-2'
        }, {
          id: 19,
          label: '二级 3-2'
        }, {
          id: 20,
          label: '二级 3-2'
        }, {
          id: 21,
          label: '二级 3-2'
        }, {
          id: 22,
          label: '二级 3-2'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      },

      /* 高德vue-amap */
      i: 0,
      zoom: 14,
      center: [121.5273285, 31.21515044],
      windows: [
        {
          position: [121.5273285, 31.21515044],
					icon: 'http://a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-1.png',
          content: `
            <div class="amap-ui-smp-ifwn-content-body">
              <h3 class="amap-ui-infowindow-title amap-ui-smp-ifwn-info-title"><div class="info-title"><b class="name">plateNum</b></div></h3>
              <div class="amap-ui-infowindow-body amap-ui-smp-ifwn-info-content">
                <div class="life-content">
                  <p><b>所属物业公司:</b>propertyCo</p>
                  <p><b>IMEI号：</b>IMEI</p>
                  <p><b>速度：</b>speed</p>
                  <p><b>状态：</b>status</p>
                  <p><b>定位时间：</b>locationTime</p>
                  <p><b>地址：</b>address</p>
                  <p>
                    <a target="_blank" href="/car/gps/realTimeTracking/car_imei/9170641019" class="track">追踪定位</a>
                    <a target="_blank" href="/car/gps/historytrack/car_imei/9170641019" class="historytrack">历史轨迹</a>
                  </p>
                </div>
              </div>
            </div>
          `,
          visible: true,
          events: {
            close () {
              console.log('infowindow1')
            }
          }
        }, {
          position: [121.5475285, 31.22515044],
					icon: 'http://a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-1.png',
          content: `
            <div class="amap-ui-smp-ifwn-content-body">
              <h3 class="amap-ui-infowindow-title amap-ui-smp-ifwn-info-title"><div class="info-title"><b class="name">plateNum</b></div></h3>
              <div class="amap-ui-infowindow-body amap-ui-smp-ifwn-info-content">
                <div class="life-content">
                  <p><b>所属物业公司:</b>propertyCo</p>
                  <p><b>IMEI号：</b>IMEI</p>
                  <p><b>速度：</b>speed</p>
                  <p><b>状态：</b>status</p>
                  <p><b>定位时间：</b>locationTime</p>
                  <p><b>地址：</b>address</p>
                  <p>
                    <a target="_blank" href="/car/gps/realTimeTracking/car_imei/9170641019" class="track">追踪定位</a>
                    <a target="_blank" href="/car/gps/historytrack/car_imei/9170641019" class="historytrack">历史轨迹</a>
                  </p>
                </div>
              </div>
            </div>
          `,
          visible: true,
          events: {
            close () {
              console.log('infowindow2')
            }
          }
        }
      ],
      slotWindow: {
        position: [121.5163285, 31.21515044]
      },
      currentWindow: {
        position: [0, 0],
        content: '',
        events: {},
        visible: false
      }
    }
  },
  mounted () {
    this.currentWindow = this.windows[0]
  }
}
</script>
<style>
  .el-header, .el-footer {
    color: #333;
    text-align: center;
    padding: 0;
  }
  .el-header{
    text-align: left;
    background: #fff;
  }
  .el-footer{
    background: #89d188;
    font-size: small;
    padding-top: 15px;
  }
  .el-aside {
    background-color: #ffffff;
    color: #333;
    text-align: center;
  }
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    padding: 0;
    position: relative;
  }
  .el-button{
    background: url(../assets/arrow-close.png) no-repeat;
    border: 0;
    width: 15px;
    height: 27px;
    position: absolute;
    z-index: 10;
    left: 0;
    top: 50%;
  }
  .el-button:hover,
  .el-button:active,
  .el-button:enabled{
    background-color: transparent;
  }
  body{margin: 0;}
  body,.tree,.el-container{
    padding: 0;
    height: 100%;
  }
  .el-aside,
  .el-main{
    height: 100%;
  }
  .amap-page-container{
    width: 100%;
    height: 100%;
  }
  .amap-demo {
    height: 100%;
  }
  .prompt {
    background: white;
    width: 100px;
    height: 30px;
    text-align: center;
  }
  .amap-info-content {
    border-radius: 10px;
    background: #fff;
    padding: 10px 18px 10px 10px;
    line-height: 1.4;
    overflow: auto;
  }
  .amap-info-content h3{
    border-bottom: 1px solid #ccc;
    margin: 0;
    padding: 0.4em 0;
    }
  .life-content{
    font-size: 14px;
    padding: 0;
    line-height: 1;
  }
  .el-aside::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 3px rgba(0,0,0,0);
    border-radius: 4px;
    background-color: rgba(0,0,0,.0);
  }
  .el-aside::-webkit-scrollbar {
    width: 4px;
    background-color: rgba(0,0,0,.0);
  }
  .el-aside::-webkit-scrollbar-thumb {
    border-radius: 4px;
    -webkit-box-shadow: inset 0 0 3px rgba(0,0,0,0);
    background-color: rgba(0,0,0,0.2);
  }
</style>
