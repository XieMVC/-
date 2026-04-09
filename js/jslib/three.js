var dataMap = null;
$.ajax({
	type : "POST",
	async : false, // 同步执行
	url : "three/area.do",
	dataType : "JSON",
	success : function(data) {
		dataMap = data;
	}
});

require([ 'echarts','js/chart/dark', 'echarts/chart/map' ], function(ec,theme) {

	var myChart = ec.init(document.getElementById('areaMap'),theme);
	// var dataMap = data;
	var option = {
		tooltip : {
			trigger : 'item'
		},
		dataRange : {
			orient : 'horizontal',
			x : 'left',
			min : 0,
			max : 3000,
			color : [ 'orange', 'yellow' ],
			text : [ '高', '低' ], // 文本，默认为数值文本
			splitNumber : 0
		},
		series : [ {
			tooltip : {
				trigger : 'item',
				formatter : '{b}'
			},
			name : '选择器',
			type : 'map',
			mapType : 'china',
			mapLocation : {
				x : 'left',
				y : 'top',
				width : '50%'
			},
			selectedMode : 'single',
			itemStyle : {
				normal : {
					label : {
						show : true
					}
				},
				emphasis : {
					label : {
						show : true
					}
				}
			},
			data : [ /*{
				name : '北京',
				selected : false
			}, {
				name : '天津',
				selected : false
			}, {
				name : '上海',
				selected : false
			}, {
				name : '重庆',
				selected : false
			}, {
				name : '河北',
				selected : false
			}, {
				name : '河南',
				selected : false
			},*/ {
				name : '云南',
				value :dataMap.sheng[0].yunnan,
				selected : false
			}, /*{
				name : '辽宁',
				selected : false
			}, {
				name : '黑龙江',
				selected : false
			}, {
				name : '湖南',
				selected : false
			}, {
				name : '安徽',
				selected : false
			}, {
				name : '山东',
				selected : false
			},*/ {
				name : '新疆',
				value :dataMap.sheng[0].xinjiang,
				selected : false
			}, /*{
				name : '江苏',
				selected : false
			}, {
				name : '浙江',
				selected : false
			}, {
				name : '江西',
				selected : false
			}, {
				name : '湖北',
				selected : false
			},*/ {
				name : '广西',
				value :dataMap.sheng[0].guangxi,
				selected : false
			}, {
				name : '甘肃',
				value : dataMap.sheng[0].gansu,
				selected : true
			}, /*{
				name : '山西',
				selected : false
			}, {
				name : '内蒙古',
				selected : false
			}, {
				name : '陕西',
				selected : false
			}, {
				name : '吉林',
				selected : false
			}, {
				name : '福建',
				selected : false
			}, {
				name : '贵州',
				selected : false
			},*/ {
				name : '广东',
				value : dataMap.sheng[0].guangdong,
				selected : false
			}/*, {
				name : '青海',
				selected : false
			}, {
				name : '西藏',
				selected : false
			}, {
				name : '四川',
				selected : false
			}, {
				name : '宁夏',
				selected : false
			}, {
				name : '海南',
				selected : false
			}, {
				name : '台湾',
				selected : false
			}, {
				name : '香港',
				selected : false
			}, {
				name : '澳门',
				selected : false
			} */]
		}, {
			name : 'OnelineData',
			type : 'map',
			mapType : '甘肃',
			itemStyle : {
				normal : {
					label : {
						show : true
					}
				},
				emphasis : {
					label : {
						show : true
					}
				}
			},
			mapLocation : {
				x : '60%'
			},
			roam : true,
			data : dataMap.area
		} ],
		animation : false
	};

	// option到此结束

	var ecConfig = require('echarts/config');
	myChart.on(ecConfig.EVENT.CLICK, function(param) {
		if (param.seriesName != "选择器 " && param.value > 0) {/**/
			var shi = param.name+"市";
			tanceng();
			 function tanceng(){
				  layer.open({
				  type: 1,
				  title: '热点图',
				  maxmin: true,
				  shadeClose: true, //点击遮罩关闭层
				  area : ['1300px' , '600px'],
				  content: '\<\div style="width:1250px;margin:auto;">   \<\div id="container" style="position: absolute; width: 1250px; height: 520px; top: 50; border: 1px solid gray;overflow:hidden;">\<\/div>\<\/div>'
				  });
				};
				
				var map = new BMap.Map("container");
			    map.centerAndZoom(shi, 12);
			    map.enableScrollWheelZoom();    //启用滚轮放大缩小，默认禁用
			    map.enableContinuousZoom();    //启用地图惯性拖拽，默认禁用

			    map.addControl(new BMap.NavigationControl());  //添加默认缩放平移控件
			    map.addControl(new BMap.OverviewMapControl()); //添加默认缩略地图控件
			    map.addControl(new BMap.OverviewMapControl({ isOpen: true, anchor: BMAP_ANCHOR_BOTTOM_RIGHT }));   //右下角，打开

			    var localSearch = new BMap.LocalSearch(map);
			    localSearch.enableAutoViewport(); //允许自动调节窗体大小
			    var nums = [];
			    var i=0;
			    function searchByStationName(weizhi,acs_way,fault_type,fault_2,num) {
			    	 localSearch.setSearchCompleteCallback(function (searchResult) {
			    		var num = nums[i];
			    		i++;
				        var poi = searchResult.getPoi(0);
				        if(poi!=undefined && poi.point!=undefined && num!=undefined){
				        	var point = new BMap.Point(poi.point.lng, poi.point.lat);
					        map.centerAndZoom(point, 13);
					        var marker = new BMap.Marker(point);
					        map.addOverlay(marker);
//					        var rm = new BMapLib.TextIconOverlay(point, num);
//					        map.addOverlay(rm);
//					        map.addOverlay(new BMapLib.TextIconOverlay(point, num));
					        var content="位置信息："+ searchResult.keyword+ "<br/><br/>介入方式：" + acs_way + "<br/>故障类型：" + fault_type+"<br/>故障现象："+fault_2+"<br/>故障次数："+num;
//							console.log(content);
					        var infoWindow = new BMap.InfoWindow("<p style='font-size:14px;'>" + content + "</p>");
//					        marker.addEventListener("click", function () { this.openInfoWindow(infoWindow); });
					        marker.addEventListener("click", function () { this.openInfoWindow(infoWindow); });
//					        marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
				        }
			    	 } );
			    	 localSearch.search(weizhi);
			    }
			   
					
			       
			    	/*var content="位置信息："+ searchResult.keyword+ "<br/><br/>介入方式：" + acs_way + "<br/>故障类型：" + fault_type+"<br/>故障现象："+fault_2+"<br/>故障次数："+num;
					console.log(content);
			        var infoWindow = new BMap.InfoWindow("<p style='font-size:14px;'>" + content + "</p>");
			        marker.addEventListener("click", function () { this.openInfoWindow(infoWindow); });
			        marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
*/							   
				ShowDetail(shi);
				function ShowDetail(shi) {
					$.ajax({
						type : "POST",
						async : false, // 同步执行 结束请求后再在执行下一个ajax
						url : "three/map.do",
						data : {
							gshi : shi
						},
						dataType : "JSON",
						success : function(data) {
							 map.clearOverlays();//清空原来的标注
							 nums = [];
							 for ( var i = 0; i < data.detailList.length; i++) {
									var acs_way=data.detailList[i].acs_way;
									var fault_type=data.detailList[i].fault_type;
									var fault_2=data.detailList[i].fault_2;
									var num=data.detailList[i].num;
									var weizhi=data.detailList[i].shi+ data.detailList[i].address;
									nums.push(num);
									searchByStationName(weizhi,acs_way,fault_type,fault_2,num);
								}
							
							
						}
					});
				}
				
		/*	ShowDetail(shi);
			function ShowDetail(shi) {
				$.ajax({
					type : "POST",
					async : false, // 同步执行 结束请求后再在执行下一个ajax
					url : "carSelect.do",
					data : {
						gshi : shi
					},
					dataType : "JSON",
					success : function(data) {
						$("#detail").html("");
						$("#detail").append(
								"<table class=\"table\"><thead><tr><th>"
										+ "地理位置" + "</th><th>" + "接入方式"
										+ "</th><th>" + "故障类型" + "</th><th>"
										+ "故障现象" + "</th><th>" + "故障次数"
										+ "</th></tr></thead></table>");
						for ( var i = 0; i < data.detailList.length; i++) {
							$(".table").append(
									"<tr><td>"
											+ data.detailList[i].xianqu
											+ data.detailList[i].xiangzhenlu
											+ data.detailList[i].cunxiaoqu
											+ "</td><td>"
											+ data.detailList[i].acs_way
											+ "</td><td>"
											+ data.detailList[i].fault_type
											+ "</td><td>"
											+ data.detailList[i].fault_2
											+ "</td><td>"
											+ data.detailList[i].num
											+ "</td></tr>");
						}
					}
				});
			}*/
		}
	});
	myChart.on(ecConfig.EVENT.MAP_SELECTED, function(param) {
		var selected = param.selected;
		var selectedProvince;
		var name;
		for ( var i = 0, l = option.series[0].data.length; i < l; i++) {
			name = option.series[0].data[i].name;
			option.series[0].data[i].selected = selected[name];
			if (selected[name]) {
				selectedProvince = name;
			}
		}
		if (typeof selectedProvince == 'undefined') {
			option.series.splice(1);
			option.legend = {
				x : 'left',
				data : [ 'OnlineDat' ]
			};

			myChart.setOption(option, true);
			return;
		}
		option.series[1] = {
			name : 'OnlineData',
			type : 'map',
			mapType : selectedProvince,
			itemStyle : {
				normal : {
					label : {
						show : true
					}
				},
				emphasis : {
					label : {
						show : true
					}
				}
			},
			mapLocation : {
				x : '60%'
			},
			data : dataMap.area
		};
		option.legend = {
			x : 'right',
			data : [ 'OnlineData' ]
		};
		option.dataRange = {
			orient : 'horizontal',
			x : 'right',
			min : 0,
			max : 300,
			color : [ 'orange', 'yellow' ],
			text : [ '高', '低' ], // 文本，默认为数值文本
			splitNumber : 0
		};
		myChart.setOption(option, true);
	});
	myChart.setOption(option, true);
	// return option;
});
