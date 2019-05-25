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
              :default-checked-keys="[5]"
              @node-click="getCurrentNode()"
              @check="getCheckedNodes()"
              :props="defaultProps">
            </el-tree>

          </el-aside>
        </el-collapse-transition>

        <el-main>
          <!-- 点击折叠按钮 -->
          <el-button @click="show3 = !show3"></el-button>
          <!-- 调入高德实例 -->
          <div id="car_all">所有车辆</div>
          <div id="car_info">信息窗口</div>
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
  // import AMap from 'AMap'
  // import AMapUI from 'AMapUI'
  methods: {
    /* 获取当前已经Checked节点的key所组成的数组 */
    getCheckedKeys () {
      var keysId = this.$refs.tree.getCheckedKeys()
      console.log(keysId)
    },
    /* 获取当前被选中节点的 key */
    getCurrentKey () {
      var keyId = this.$refs.tree.getCurrentKey()
      var keysId = this.$refs.tree.getCheckedKeys()
      var arrCon1 = keysId.indexOf(keyId)
      if (arrCon1 > -1) {
        console.log(keyId)
      }
    },
    /* 获取当前已经Checked节点的数组 */
    getCheckedNodes () {
      console.log(this.$refs.tree.getCheckedNodes())
    },
    /* 获取当前被选中节点的 data */
    getCurrentNode () {
      var nodeId = this.$refs.tree.getCurrentNode()
      var nodesId = this.$refs.tree.getCheckedNodes()
      var arrCon2 = nodesId.indexOf(nodeId)
      if (arrCon2 > -1) {
        console.log(nodeId)
      }
    }
  },

  data () {
    return {
      /* element折叠动画 */
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
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }, {
          id: 9,
          label: '二级 3-3'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style>
  @import url("../assets/css/default.css");
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
  /* 地图css */
  #outer-box{
  height:100%;
  }
  #container{
  height:100%;
  width:100%;
  }
  #panel{
  height:100%;
  width:100%;
  background:#fff;
  text-align: left;
  }
  #btnList{
  padding:0;
  margin:0;
  }
  #btnList li{
  padding:5px;
  background: #f1f1f1;
  border-bottom: 1px solid #fff;
  }
/*  #btnList input{
  padding:3px 10px;
  min-width:120px;
  } */
  li.poibox{
  border-bottom:1px solid #eaeaea;
  border-left:2px solid rgba(0,0,0,0);
  padding:10px 3px;
  cursor:pointer;
  }
  li.poibox.selected{
  border-left-color:#f00;
  background:#f6f6f6;
  }
  li.poibox:hover{
  background:#f6f6f6;
  }
  li.poibox:last-child{
  border-bottom:none;
  }
  h3.poi-title{
  margin:3px 0;
  font-size:13px;
  }
  .poibox .poi-info-left{
  padding-left:8px
  }
  .poi-addr{
  margin:7px 0 0;
  }
  .poibox .poi-imgbox{
  width:100px;
  height:74px;
  vertical-align:top;
  float:right;
  margin:0 8px;
  overflow:hidden
  }
  .poibox .poi-img{
  display:inline-block;
  width:100%;
  height:100%;
  background-size:cover;
  background-position:50% 50%;
  }
  .amap-simple-marker.my-marker .amap-simple-marker-label{
  font-size:12px;
  color:#eee;
  font-family:sans-serif;
  }
  .selected .amap-simple-marker.my-marker .amap-simple-marker-label{
  font-size:14px;
  color:orange;
  font-weight:700;
  }
  @-webkit-keyframes flash{
  from,
  50%,
  to{
  opacity:1;
  }
  25%,
  75%{
  opacity:0;
  }
  }
  @keyframes flash{
  from,
  50%,
  to{
  opacity:1;
  }
  25%,
  75%{
  opacity:0;
  }
  }
  .flash{
  -webkit-animation-name:flash;
  animation-name:flash;
  }
  .animated{
  -webkit-animation-duration:1s;
  animation-duration:1s;
  -webkit-animation-fill-mode:both;
  animation-fill-mode:both;
  }
  .scrollbar1::-webkit-scrollbar-track{
  -webkit-box-shadow:inset 0 0 6px rgba(0,0,0,0.3);
  background-color:#fff;
  }
  .scrollbar1::-webkit-scrollbar{
  width:6px;
  background-color:#fff;
  }
  .scrollbar1::-webkit-scrollbar-thumb{
  background-color:#aaa;
  }
  .clear{
  clear:both;
  }
  .mapw_con{
    padding: 3px 0;
  }
  .mapw_con .t1{
    font-weight: bold;
    width: 80px;
    display: inline-block;
    vertical-align: top;
  }
  .mapw_con .t2{
    display: inline-block;
    width: calc(100% - 80px);
    vertical-align: top;
  }
  /* 地图窗口css */
  .amap-ui-smp-ifwn-content-body {
      box-shadow: 1px 3px 5px rgba(0,0,0,.3) !important;;
      background: 0 0 #fff;
      border-radius: 8px !important;;
      text-align: left;
      border: silver solid 0px !important;;
      padding: 5px !important;
  }
  .amap-ui-smp-ifwn-info-title {
      font-size: 16px !important;;
      font-weight: bold !important;;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding: 5px 25px 5px 5px !important;;
      border-bottom: 1px solid #e1e1e1 !important;;
      margin: 0;
      line-height: 1.5;
  }
  .amap-ui-smp-ifwn-info-content {
      padding: 10px 5px !important;
      font-size: 14px !important;;
      line-height: 1 !important;;
      color: #999;
      min-width: 300px;
  }
  .amap-ui-smp-ifwn-def-tr-close{
    border-radius: 50% !important;
    color: #aaa !important;
    margin: 5px 5px 0 0 !important;
  }
  .amap-ui-smp-ifwn-def-tr-close:hover{
    text-decoration: none;
    color: #777 !important;
  }

  #car_all,#car_info{ background: #00A2FF; color: #fff; width: 200px; height: 100px;display: inline-block;}
  #car_info{ background: #FF4D51;}
</style>
