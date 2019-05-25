<template>
  <div class="tree">

	<el-container>
		<el-header height="70px"><img src="../assets/header.jpg"></el-header>
		<el-container>
			<el-collapse-transition>
			<el-aside width="200px" v-show="show3">
				<el-tree
					:data="data2"
					show-checkbox
					default-expand-all
					node-key="id"
					ref="tree"
					highlight-current
					:props="defaultProps">
				</el-tree>
			</el-aside>
			</el-collapse-transition>
			
			<el-main>				
				<el-button @click="show3 = !show3"></el-button>
				
				<div class="amap-wrapper">
					<el-amap class="amap-box" :vid="'amap-vue'"></el-amap>
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
			getCheckedNodes() {
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
			}
		},

		data() {
			return {
				show3: true,
				data2: [{
					id: 1,
					label: '一级 1',
					children: [{
						id: 4,
						label: '二级 1-1',
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
				}
			};
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
  
  .amap-wrapper {
  width: 100%;
  height: 100%;
  }
.el-aside::-webkit-scrollbar-track{-webkit-box-shadow: inset 0 0 3px rgba(0,0,0,0); border-radius: 4px; background-color:rgba(0,0,0,.0);}
.el-aside::-webkit-scrollbar{width: 4px; background-color:rgba(0,0,0,.0);}
.el-aside::-webkit-scrollbar-thumb{border-radius: 4px; -webkit-box-shadow: inset 0 0 3px rgba(0,0,0,0); background-color: rgba(0,0,0,0.2);}
</style>