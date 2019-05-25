<template>
  <div class="tree">

	<el-container>
		<el-header height="70px"><img src="../assets/header.jpg"></el-header>
		<el-container>
			<el-collapse-transition>
			<el-aside width="200px" v-show="show3">
				<el-tree
				  :props="props"
				  :load="loadNode"
				  lazy
				  show-checkbox
				  @check-change="handleCheckChange">
				</el-tree>
			</el-aside>
			</el-collapse-transition>
			
			<el-main>				
				<el-button @click="show3 = !show3"></el-button>
				
				<div class="amap-page-container">
				  <el-amap
					vid="amapDemo"  
					:center="center"
					:zoom="zoom"  
					@node-click="handleNodeClick"
					class="amap-demo">
					<el-amap-marker v-for="marker in markers" :position="marker.position" :events="marker.events"></el-amap-marker>
					<el-amap-info-window v-if="window" :position="window.position" :visible="window.visible" :content="window.content"></el-amap-info-window>
				  </el-amap>
				</div>
				
			</el-main>
		</el-container>
		<el-footer>
			Copyright (C) RuanMei.com All Rights Re &nbsp;   扬州市广陵区环境卫生管理办公室版权所有<br>

            技术支持:<a href="http://www.yzldwl.com" target="_blank" style="color: #0d5cac">名扬亮点 </a>
		</el-footer>
	</el-container>

  </div>
	
</template>

<script>    
	module.exports = {
		methods: {
			handleCheckChange(data, checked, indeterminate) {
			console.log(data, checked, indeterminate);
			},
			handleNodeClick(data) {
			console.log(data);
			},
			loadNode(node, resolve) {
			if (node.level === 0) {
			  return resolve([{ name: 'region1' }, { name: 'region2' }]);
			}
			if (node.level > 3) return resolve([]);

			var hasChild;
			if (node.data.name === 'region1') {
			  hasChild = true;
			} else if (node.data.name === 'region2') {
			  hasChild = false;
			} else {
			  hasChild = Math.random() > 0.5;
			}

			setTimeout(() => {
			  var data;
			  if (hasChild) {
				data = [{
				  name: 'zone' + this.count++
				}, {
				  name: 'zone' + this.count++
				}];
			  } else {
				data = [];
			  }

			  resolve(data);
			}, 300);
			},
		},

		data() {
			return {				  
				show3: true,
				props: {
				  label: 'name',
				  children: 'zones'
				},
				count: 1,
				
				zoom: 16,
				center: [121.59996, 31.197646],
				markers: [],
				windows: [],
				window: '',
			};
		},
		

      mounted() {
        let markers = [];
        let windows = [];

        let num = 10;
        let self = this;

        for (let i = 0 ; i < num ; i ++) {
          markers.push({
            position: [121.59996, 31.197646 + i * 0.001],
            events: {
              click() {
                self.windows.forEach(window => {
                  window.visible = false;
                });

                self.window = self.windows[i];
                self.$nextTick(() => {
                  self.window.visible = true;
                });
              }
            }
          });

          windows.push({
            position: [121.59996, 31.197646 + i * 0.001],
            content: `
				<div class="amap-ui-smp-ifwn-content-body">
						<h3 class="amap-ui-infowindow-title amap-ui-smp-ifwn-info-title"><div class="info-title"><b class="name">苏KU7828</b></div></h3>
						<div class="amap-ui-infowindow-body amap-ui-smp-ifwn-info-content">
							<div class="life-content">
								<p><b>所属物业公司:</b>名扬物业</p>
								<p><b>IMEI号：</b>9170641019</p>
								<p><b>速度：</b>0.00</p>
								<p><b>状态：</b>在线</p>
								<p><b>定位时间：</b>2019-05-21 11:14:02</p>
								<p><b>地址：</b>江苏省扬州市邗江区施桥镇临江路</p>
								<p>
									<a target="_blank" href="/car/gps/realTimeTracking/car_imei/9170641019" class="track">追踪定位</a>
									<a target="_blank" href="/car/gps/historytrack/car_imei/9170641019" class="historytrack">历史轨迹</a>
								</p>
							</div>
						</div>
					</div>			
			`,
            visible: false
          });
        }

        this.markers = markers;
        this.windows = windows;
      }
		
	};
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
		
	.el-aside::-webkit-scrollbar-track{-webkit-box-shadow: inset 0 0 3px rgba(0,0,0,0); border-radius: 4px; background-color:rgba(0,0,0,.0);}
	.el-aside::-webkit-scrollbar{width: 4px; background-color:rgba(0,0,0,.0);}
	.el-aside::-webkit-scrollbar-thumb{border-radius: 4px; -webkit-box-shadow: inset 0 0 3px rgba(0,0,0,0); background-color: rgba(0,0,0,0.2);}
</style>