<template>
  <section class="d_section">
    <div class="amap-page-container">
      <img class="toggle-img" v-on:click="lastMap()" style="top: 50%;"/>
      <img class="toggle-img" v-on:click="nextMap()" style="top: 70%;"/>
      <span class="demo-affix" style="top: 15px;">当前位于{{contry}}--点击图标进入城市</span>
      <span class="demo-affix" style="top: 70px;">点击左侧切换按钮选择国家</span>
      <el-amap vid="amapDemo" :zoom="zoom" :center="center" class="amap-demo">
        <el-amap-marker v-for="marker in markers" :key="marker.mapName" :position="marker.position" :content="marker.content" :visible="true" :draggable="false"></el-amap-marker>
      </el-amap>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'map',
    data() {
      return {
        // 缩放级别  
        zoom: 12,
        // 当前点坐标组数组下标
        i: 0,
        // 定义点坐标组数组
        markerGroups: [
          [
            {
              position: [113.78109,35.19799],
              content: this.getContentHtml('郑州'),
              contry: '中国'
            }
          ],
          [
            {
              position: [108.909426,34.513185],
              content: this.getContentHtml('西安'),
              contry: '中国'
            }
          ],
          [
            {
              position: [118.919945,32.374795],
              content: this.getContentHtml('南京'),
              contry: '中国'
            }
          ]
        ],
      };
    },
methods: {
	// 切换函数 通过对i进行增减实现点坐标组切换
	nextMap() {
		if (this.markerGroups.length > this.i + 1) {
		  this.i += 1;
		}else {
		  this.i = 0;
		}
	},

	getContentHtml(content) {
		return `
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
		`;
	}

},
    computed: {
      // 点坐标组getter方法 通过i从点坐标组数组中获取点坐标组
      markers: function () {
        // `this` points to the vm instance
        return this.markerGroups[this.i];
      },
     // 当前地图中心getter方法
      center: function () {
        return this.markerGroups[this.i][0].position;
      },
     // 当前国家getter方法
      contry: function () {
        return this.markerGroups[this.i][0].contry;
      }
    }
  };
</script>    


<style>	
  .demo-affix{
    background-color: #f1c40f;
    padding: 10px 20px;
    color: white;
    position: absolute;
    z-index: 999;
  }
  html,body,.d_section,.amap-page-container{
    height: 100%;
		width: 100%;
  }
  .toggle-img{
    width: 80px; height:80px; position: absolute;left: 5px;color: red; z-index: 999;font-size: 40px;
  }
</style>