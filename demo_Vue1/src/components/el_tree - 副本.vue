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
            @node-click="submitForm()"
            :props="defaultProps">
          </el-tree>

          <ul id="btnList">
            <li>
              <input value="美食数据"  @click="getCheckedNodes" type="button" data-path="//a.amap.com/amap-ui/static/data/restaurant.json" />
            </li>
            <li>
              <input value="酒店数据" @click="setCheckedNodes" type="button" data-path="//a.amap.com/amap-ui/static/data/hotel.json" />
            </li>
          </ul>

          <div id="panel" class="scrollbar1">
            <ul id="myList">
            </ul>
          </div>
        </el-aside>
        </el-collapse-transition>

        <el-main>
          <!-- 点击折叠按钮 -->
          <el-button @click="show3 = !show3"></el-button>
          <!-- 调入高德实例 -->

          <div id="outer-box">
              <div id="container" tabindex="0"></div>
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
  // import AMap from 'AMap'
  // import AMapUI from 'AMapUI'
  methods: {
    getCheckedNodes() {
      console.log(this.$refs.tree.getCheckedNodes());
    },
    setCheckedNodes() {
      this.$refs.tree.setCheckedNodes([{
          id: 4,
          label: '二级 1-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }, {
          id: 7,
          label: '二级 3-1'
        }]);
    },
    init () {
      // 创建地图
      var map = new AMap.Map('container', {
        zoom: 12
      })

      AMapUI.loadUI(['misc/MarkerList', 'overlay/SimpleMarker', 'overlay/SimpleInfoWindow'],
        function (MarkerList, SimpleMarker, SimpleInfoWindow) {
          // 即jQuery/Zepto
          var $ = MarkerList.utils.$
          var defaultIconStyle = 'red' // 默认的图标样式
          var hoverIconStyle = 'green' // 鼠标hover时的样式
          var selectedIconStyle = 'purple' // 选中时的图标样式
          var markerList = new MarkerList({
            map: map,
            // ListElement对应的父节点或者ID
            listContainer: 'myList', // document.getElementById("myList"),
            // 选中后显示

            // 从数据中读取位置, 返回lngLat
            getPosition: function (item) {
              return [item.longitude, item.latitude]
            },
            // 数据ID，如果不提供，默认使用数组索引，即index
            getDataId: function (item, index) {
              return item.id
            },
            getInfoWindow: function (data, context, recycledInfoWindow) {
              if (recycledInfoWindow) {
                recycledInfoWindow.setInfoTitle(data.name)
                recycledInfoWindow.setInfoBody(
                  '<div class="mapw_con"><div class="t1">所属物业</div><div class="t2">' + data.longitude + '</div></div>' +
                  '<div class="mapw_con"><div class="t1">IMEI号：</div><div class="t2">' + data.id + '</div></div>' +
                  '<div class="mapw_con"><div class="t1">车辆速度：</div><div class="t2">' + data.latitude + '</div></div>' +
                  '<div class="mapw_con"><div class="t1">当前状态：</div><div class="t2">' + data.latitude + '</div></div>' +
                  '<div class="mapw_con"><div class="t1">定位时间：</div><div class="t2">' + data.latitude + '</div></div>' +
                  '<div class="mapw_con"><div class="t1">当前地址：</div><div class="t2">' + data.address + '</div></div>')
                return recycledInfoWindow
              }
              return new SimpleInfoWindow({
                infoTitle: data.name,
                infoBody:
                  '<div class="mapw_con"><div class="t1">所属物业</div><div class="t2">' + data.longitude + '</div></div>' +
                  '<div class="mapw_con"><div class="t1">IMEI号：</div><div class="t2">' + data.id + '</div></div>' +
                  '<div class="mapw_con"><div class="t1">车辆速度：</div><div class="t2">' + data.latitude + '</div></div>' +
                  '<div class="mapw_con"><div class="t1">当前状态：</div><div class="t2">' + data.latitude + '</div></div>' +
                  '<div class="mapw_con"><div class="t1">定位时间：</div><div class="t2">' + data.latitude + '</div></div>' +
                  '<div class="mapw_con"><div class="t1">当前地址：</div><div class="t2">' + data.address + '</div></div>',
                offset: new AMap.Pixel(0, -37)
              })
            },
            // 构造marker用的options对象, content和title支持模板，也可以是函数，返回marker实例，或者返回options对象
            getMarker: function (data, context, recycledMarker) {
              var label = String.fromCharCode('A'.charCodeAt(0) + context.index)
              if (recycledMarker) {
                recycledMarker.setIconLabel(label)
                return
              }
              return new SimpleMarker({
                containerClassNames: 'my-marker',
                iconStyle: defaultIconStyle,
                iconLabel: label
              })
            },
            // 构造列表元素，与getMarker类似，可以是函数，返回一个dom元素，或者模板 html string
            getListElement: function (data, context, recycledListElement) {
              var label = String.fromCharCode('A'.charCodeAt(0) + context.index)
              // 使用模板创建
              var innerHTML = MarkerList.utils.template(
                '<div class="poi-info-left">' +
                '    <h3 class="poi-title">' +
                '        <%- label %>. <%- data.name %>' +
                '    </h3>' +
                '</div>', {
                  data: data,
                  label: label
                })
              if (recycledListElement) {
                recycledListElement.innerHTML = innerHTML
                return recycledListElement
              }
              return '<li class="poibox">' + innerHTML + '</li>'
            },
            // 列表节点上监听的事件
            listElementEvents: ['click', 'mouseenter', 'mouseleave'],
            // marker上监听的事件
            markerEvents: ['click', 'mouseover', 'mouseout'],
            // makeSelectedEvents:false,
            selectedClassNames: 'selected',
            autoSetFitView: true
          })
          window.markerList = markerList
          markerList.on('selectedChanged', function (event, info) {
            checkBtnStats()
            if (info.selected) {
              console.log(info)
              if (info.selected.marker) {
                // 更新为选中样式
                info.selected.marker.setIconStyle(selectedIconStyle)
              }

              // 选中并非由列表节点上的事件触发，将关联的列表节点移动到视野内
              if (!info.sourceEventInfo.isListElementEvent) {
                if (info.selected.listElement) {
                  scrollListElementIntoView($(info.selected.listElement))
                }
              }
            }

            if (info.unSelected && info.unSelected.marker) {
              // 更新为默认样式
              info.unSelected.marker.setIconStyle(defaultIconStyle)
            }
          })

          markerList.on('listElementMouseenter markerMouseover', function (event, record) {
            if (record && record.marker) {
              forcusMarker(record.marker)
              // this.openInfoWindowOnRecord(record);
              // 非选中的id
              if (!this.isSelectedDataId(record.id)) {
                // 设置为hover样式
                record.marker.setIconStyle(hoverIconStyle)
                // this.closeInfoWindow();
              }
            }
          })

          markerList.on('listElementMouseleave markerMouseout', function (event, record) {
            if (record && record.marker) {
              if (!this.isSelectedDataId(record.id)) {
                // 恢复默认样式
                record.marker.setIconStyle(defaultIconStyle)
              }
            }
          })

          // 数据输出完成
          markerList.on('renderComplete', function (event, records) {
            checkBtnStats()
          })
          // markerList.on('*', function(type, event, res) {
          //     console.log(type, event, res);
          // });
          // 加载数据
          function loadData (src, callback) {
            $.getJSON(src, function (data) {
              markerList._dataSrc = src
              // 渲染数据
              markerList.render(data)
              if (callback) {
                callback(null, data)
              }
            })
          }

          var $btns = $('#btnList input[data-path]')
          /**
           * 检测各个button的状态
           */
          function checkBtnStats () {
            $('#btnList input[data-enable]').each(function () {
              var $input = $(this)
              var codeEval = $input.attr('data-enable')
              $input.prop({
                disabled: !eval(codeEval)
              })
            })
          }

          $('#btnList').on('click', 'input', function () {
            var $input = $(this)
            var dataPath = $input.attr('data-path')
            var codeEval = $input.attr('data-eval')
            if (dataPath) {
              loadData(dataPath)
            } else if (codeEval) {
              eval(codeEval)
            }
            checkBtnStats()
          })

          loadData($btns.attr('data-path'))
          function forcusMarker (marker) {
            marker.setTop(true)
            // 不在地图视野内
            if (!(map.getBounds().contains(marker.getPosition()))) {
              // 移动到中心
              map.setCenter(marker.getPosition())
            }
          }

          function isElementInViewport (el) {
            var rect = el.getBoundingClientRect()
            return (
              rect.top >= 0 &&
              rect.left >= 0 &&
              rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /* or $(window).height() */
              rect.right <= (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */
            )
          }

          function scrollListElementIntoView ($listEle) {
            if (!isElementInViewport($listEle.get(0))) {
              $('#panel').scrollTop($listEle.offset().top - $listEle.parent().offset().top)
            }
            // 闪动一下
            $listEle
              .one('webkitAnimationEnd oanimationend msAnimationEnd animationend',
                function (e) {
                  $(this).removeClass('flash animated')
                }).addClass('flash animated')
          }
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
</style>
