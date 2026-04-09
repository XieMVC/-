
ShowHistory();
function ShowHistory() {
	$.ajax({
		type : "POST",
		async : true, // 同步执行 结束请求后再在执行下一个ajax
		url : "one/history.do",
		dataType : "JSON",
		success : function(data) {
			$("#history").html(data + "W");
		}

	});
}

ShowMonth();
function ShowMonth() {
	$.ajax({
		type : "POST",
		async : true, // 同步执行 结束请求后再在执行下一个ajax
		url : "one/month.do",
		dataType : "JSON",
		success : function(data) {
			$("#month").html(data + "W");
		}
	});
}

showToday();
function showToday() {
	$.ajax({
		type : "POST",
		async : true, // 同步执行 结束请求后再在执行下一个ajax
		url : "one/today.do",
		dataType : "JSON",
		success : function(data) {
			$("#today").html(data.ss + "W");
		}
	});
}

showSecond();
function showSecond() {
	require([ 'echarts', 'js/chart/dark', 'echarts/chart/map' ],
			function(ec, theme) {
				var myChart = ec.init(document.getElementById('SecondMiddleMap'), theme);
				var option = {
					title : {
						text : '区域申告分布',
						x : 'center'
					},
					tooltip : {
						trigger : 'item'
					},
					legend : {
						orient : 'vertical',
						x : 'left',
						data : [ '申告覆盖量' ]
					},
					dataRange : {
						x : 'left',
						y : 'bottom',
						splitList : [ {
							start : 300000,
							label : '>30W'
						}, {
							start : 200000,
							end : 300000,
							label : '20W-30W'
						}, {
							start : 200000,
							end : 100000,
							label : '10W-20W'
						}, {
							start : 100000,
							end : 1,
							label : '1-10W'
						}, {
							end : 0,
						}, 
						],
						color : [ '#FF0000', '#FF3300', '#FFCC00', "#CCFF00", "#99FF00"]
					},
					roamController : {
						show : true,
						x : 'right',
						mapTypeControl : {
							'china' : true
						}
					},
					series : [ {
						name : '工单覆盖量',
						type : 'map',
						mapType : 'china',
						roam : false,
						itemStyle : {
							normal : {
								label : {
									show : true,
									textStyle : {
										color : "rgb(249, 249, 249)"
									}
								}
							},
							emphasis : {
								label : {
									show : true
								}
							}
						},
						data : [ {
							name : '北京',
							value : 0
						}, {
							name : '天津',
							value : 0
						}, {
							name : '上海',
							value : 0
						}, {
							name : '重庆',
							value : 0
						}, {
							name : '河北',
							value : 0
						}, {
							name : '河南',
							value : 0
						}, {
							name : '云南',
							value : 345000
						}, {
							name : '辽宁',
							value : 0
						}, {
							name : '黑龙江',
							value : 0
						}, {
							name : '湖南',
							value : 0
						}, {
							name : '安徽',
							value : 0
						}, {
							name : '山东',
							value : 0
						}, {
							name : '新疆',
							value : 68000
						}, {
							name : '江苏',
							value : 0
						}, {
							name : '浙江',
							value : 0
						}, {
							name : '江西',
							value : 0
						}, {
							name : '湖北',
							value : 0
						}, {
							name : '广西',
							value : 212000
						}, {
							name : '甘肃',
							value : 261940
						}, {
							name : '山西',
							value : 0
						}, {
							name : '内蒙古',
							value : 0
						}, {
							name : '陕西',
							value : 0
						}, {
							name : '吉林',
							value : 0
						}, {
							name : '福建',
							value : 0
						}, {
							name : '贵州',
							value : 0
						}, {
							name : '广东',
							value : 384000
						}, {
							name : '青海',
							value : 0
						}, {
							name : '西藏',
							value : 0
						}, {
							name : '四川',
							value : 0
						}, {
							name : '宁夏',
							value : 0
						}, {
							name : '海南',
							value : 0
						}, {
							name : '台湾',
							value : 0
						}, {
							name : '香港',
							value : 0
						}, {
							name : '澳门',
							value : 0
						} ]
					} ]
				};
				myChart.setOption(option);
			});
	
}

showXN();
function showXN() {
	$.ajax({
		type : "POST",
		async : true, // 同步执行 结束请求后再在执行下一个ajax
		url : "one/xiaonong.do",
		dataType : "JSON",
		success : function(data) {
			require([ 'echarts', 'js/chart/dark', 'echarts/chart/pie', // 按需加载所需图表，如需动态类型切换功能，别忘了同时加载相应图表
			'echarts/chart/bar', 'echarts/chart/line' ], function(ec, theme) {
				var myChart = ec.init(document.getElementById('secondzz'),
						theme);
				var option = {
					tooltip : {
						trigger : 'axis'
					},
					calculable : true,
					grid : {
						y : 90,
						y2 : 30,
						x : 60,
						x2 : 60
					},
					legend : {
						x : 'right',
						data : [ '申告量', '服务效能', '甘肃', '广东', '广西', '新疆', '云南' ]
					},
					xAxis : [ {
						show : false,
						type : 'category',
						splitLine : {
							show : false
						},
						data : data.month
					} ],
					/*
					 * yAxis : [ { //show : false, type : 'value', position :
					 * 'right' } ],
					 */
					yAxis : [ {
						show : false,
						type : 'value',
						name : '量',
						axisLabel : {
							formatter : '{value}'
						}
					}, {
						show : false,
						type : 'value',
						name : '率',
						position : 'right',
						axisLabel : {
							formatter : '{value} %'
						}
					} ],
					series : [ {
						name : '申告量',
						type : 'bar',
						itemStyle : {
							normal : {
								color : 'rgba(75,225,213,1)',
								label : {
									show : true
								}
							}
						},
						data : data.n

					}, {
						name : '服务效能',
						type : 'line',
						yAxisIndex : 1,
						data : data.e
					},

					{
						name : '申告量细分',
						type : 'pie',
						tooltip : {
							trigger : 'item',
							formatter : '{a} <br/>{b} : {c} ({d}%)'
						},
						center : [ 120, 80 ],
						radius : [ 0, 50 ],
						data : [ {
							value : 1048,
							name : '甘肃'
						}, {
							value : 251,
							name : '广东'
						}, {
							value : 147,
							name : '广西'
						}, {
							value : 102,
							name : '新疆'
						}, {
							value : 60,
							name : '云南'
						} ]
					} ]
				};

				myChart.setOption(option);
			});
		}
	});
}


OneTrendDownRightOne();
function OneTrendDownRightOne() {
	require([ 'echarts', 'js/chart/dark', 'echarts/chart/line',
	  		'echarts/chart/bar' // 按需加载所需图表，如需动态类型切换功能，别忘了同时加载相应图表
	  ], function(ec, theme) {
	  	var myChart = ec.init(document
	  			.getElementById('OneDownRightOne'), theme);

	  	option = {
	  		    tooltip : {
	  		        trigger: 'axis'
	  		    },
	  		  grid : {
					y : 50,
					y2 : 30,
					x : 30,
					x2 : 50
				},
	  		    legend: {
	  		        data:['互联网中心','天翼高清中心','宽带中心']
	  		    },
	  		    calculable : true,
	  		    xAxis : [
	  		        {
	  		        	
	  		            type : 'category',
	  		            boundaryGap : false,
	  		            data : ['2008','2009','2010','2011','2012','2013','2014']
	  		        }
	  		    ],
	  		    yAxis : [
	  		        {
	  		        	show : false,
	  		            type : 'value'
	  		        }
	  		    ],
	  		    series : [
	  		        {
	  		            name:'互联网中心',
	  		            type:'line',
	  		          itemStyle : {
							normal : {
								color : 'rgba(75,225,213,1)',
							/*
							 * label : { show : true }
							 */
							}
						},
	  		            data:[ 2,2, 2, 3,3,6,9,9]
	  		        },
	  		        {
	  		            name:'天翼高清中心',
	  		            type:'line',
//	  		            stack: '总量',
	  		            data:[0,0 , 0,0 ,0 , 3, 4,6]
	  		        },
	  		        {
	  		            name:'宽带中心',
	  		            type:'line',
//	  		            stack: '总量',
	  		            data:[0,0,0,0,0,5,8,8]
	  		        }
	  		    ]
	  		};
	  		                            

	  	myChart.setOption(option);
	  });
	
}


OneTrendDownLTow();
function OneTrendDownLTow() {
	require([ 'echarts', 'js/chart/dark', 'echarts/chart/line',
	    		'echarts/chart/bar' // 按需加载所需图表，如需动态类型切换功能，别忘了同时加载相应图表
	    ], function(ec, theme) {
	    	var myChart = ec.init(document
	    			.getElementById('OneDownLeftTow'), theme);

	    	var zrColor = require('zrender/tool/color');
	    	var colorList = [
	    	  '#ff7f50','#87cefa','#da70d6','#32cd32','#6495ed',
	    	  '#ff69b4','#ba55d3','#cd5c5c','#ffa500','#40e0d0'
	    	];
	    	var itemStyle = {
	    	    normal: {
	    	        color: function(params) {
	    	          if (params.dataIndex < 0) {
	    	            // for legend
	    	            return zrColor.lift(
	    	              colorList[colorList.length - 1], params.seriesIndex * 0.1
	    	            );
	    	          }
	    	          else {
	    	            // for bar
	    	            return zrColor.lift(
	    	              colorList[params.dataIndex], params.seriesIndex * 0.1
	    	            );
	    	          }
	    	        }
	    	    }
	    	};
	    	option = {
	    	    title: {
	    	        text: '2008-2016工单走势',
//	    	        subtext: '2008-2016工单走势',
	    	    },
	    	    tooltip: {
	    	        trigger: 'axis',
	    	        backgroundColor: 'rgba(255,255,255,0.7)',
	    	        axisPointer: {
	    	            type: 'shadow'
	    	        },
	    	        formatter: function(params) {
	    	            // for text color
	    	            var color = colorList[params[0].dataIndex];
	    	            var res = '<div style="color:' + color + '">';
	    	            res += '<strong>' + params[0].name + '消费（元）</strong>'
	    	            for (var i = 0, l = params.length; i < l; i++) {
	    	                res += '<br/>' + params[i].seriesName + ' : ' + params[i].value ;
	    	            }
	    	            res += '</div>';
	    	            return res;
	    	        }
	    	    },
	    	    legend: {
	    	        x: 'right',
	    	        data:['2008','2009','2010','2011','2012','2013','2014','2015','2016']
	    	    },
	    	    calculable: true,
	    	    grid: {
	    	        y: 40,
	    	        y2: 40,
	    	        x : 5,
	    	        x2: 40
	    	    },
	    	    xAxis: [
	    	        {
	    	            type: 'category',
	    	            data: ['互联网', '天翼高清', '宽带']
	    	        }
	    	    ],
	    	    yAxis: [
	    	        {
	    	            type: 'value'
	    	        }
	    	    ],
	    	    series: [
	    	        {
	    	            name: '2008',
	    	            type: 'bar',
	    	            itemStyle: itemStyle,
	    	            data: [3100.7]
	    	        },
	    	        {
	    	            name: '2009',
	    	            type: 'bar',
	    	            itemStyle: itemStyle,
	    	            data: [3300.3]
	    	        },
	    	        {
	    	            name: '2010',
	    	            type: 'bar',
	    	            itemStyle: itemStyle,
	    	            data: [3500.9]
	    	        },
	    	        {
	    	            name: '2011',
	    	            type: 'bar',
	    	            itemStyle: itemStyle,
	    	            data: [3800.9]
	    	        },
	    	        {
	    	            name: '2012',
	    	            type: 'bar',
	    	            itemStyle: itemStyle,
	    	            data: [4600.9]
	    	        },
	    	        {
	    	            name: '2013',
	    	            type: 'bar',
	    	            itemStyle: itemStyle,
	    	            data: [4800.9]
	    	        },
	    	        {
	    	            name: '2014',
	    	            type: 'bar',
	    	            itemStyle: itemStyle,
	    	            data: [5500.9,4804.7,5004.7]
	    	        }
	    	        ,
	    	        {
	    	            name: '2015',
	    	            type: 'bar',
	    	            itemStyle: itemStyle,
	    	            data: [6200.9,5504.7,5704.7]
	    	        }
	    	        ,
	    	        {
	    	            name: '2016',
	    	            type: 'bar',
	    	            itemStyle: itemStyle,
	    	            data: [6700.9,6004.7,6204.7]
	    	        }
	    	    ]
	    	};
	    	                    

	    	myChart.setOption(option);
	    });
	
}





ShowTrendGanSu();
function ShowTrendGanSu() {
	$.ajax({
		type : "POST",
		async : false, // 同步执行 结束请求后再在执行下一个ajax
		url : "one/trendgansu.do",
		dataType : "JSON",
		success : function(data) {
			require([ 'echarts', 'js/chart/dark', 'echarts/chart/line',
					'echarts/chart/bar' // 按需加载所需图表，如需动态类型切换功能，别忘了同时加载相应图表
			], function(ec, theme) {
				var myChart = ec.init(document
						.getElementById('secondleftDownOne'), theme);

				var option = {

					tooltip : {
						trigger : 'axis'
					},

					calculable : true,
					grid : {
						y : 50,
						y2 : 30,
						x : 80,
						x2 : 80
					},
					legend : {
						data : [ '申告量', '成功率', '及时率' ]
					},
					xAxis : [ {
						show : false,
						type : 'category',
						data : data.date
					} ],
					yAxis : [ {
						show : false,
						type : 'value',
						name : '量',
						axisLabel : {
							formatter : '{value}'
						}
					}, {
						show : false,
						type : 'value',
						name : '率',
						axisLabel : {
							formatter : '{value} %'
						}
					} ],
					series : [

					{
						name : '申告量',
						type : 'bar',
						itemStyle : {
							normal : {
								color : 'rgba(75,225,213,1)',
							/*
							 * label : { show : true }
							 */
							}
						},
						data : data.shengao
					}, {
						name : '成功率',
						type : 'line',
						yAxisIndex : 1,
						data : data.chenggonglv
					}, {
						name : '及时率',
						type : 'line',
						yAxisIndex : 1,
						data : data.jishilv
					} ]
				};

				myChart.setOption(option);
			});
			$("#gs").html(data.tshengao);
			if (data.tscusucceedlv < 30) {
				$("#gcl").append(
						"<p  class=\"f26\" style=\"color: red\">"
								+ data.tscusucceedlv + "%" + "</p>");
			} else {
				$("#gcl").append(
						"<p  class=\"f26\" style=\"color: lime\">"
								+ data.tscusucceedlv + "%" + "</p>");
			}
			;
			if (data.tjslv < 90) {
				$("#gjsl").append(
						"<p  class=\"f26\" style=\"color: red\">" + data.tjslv
								+ "%" + "</p>");
			} else {
				$("#gjsl").append(
						"<p  class=\"f26\" style=\"color: lime\">" + data.tjslv
								+ "%" + "</p>");
			}
			;
		}
	});
}

ShowTrendGuangDong();
function ShowTrendGuangDong() {
	$.ajax({
		type : "POST",
		async : false, // 同步执行 结束请求后再在执行下一个ajax
		url : "one/trendguangdong.do",
		dataType : "JSON",
		success : function(data) {
			require([ 'echarts', 'js/chart/dark', 'echarts/chart/line',
					'echarts/chart/bar', // 按需加载所需图表，如需动态类型切换功能，别忘了同时加载相应图表
			], function(ec, theme) {
				var myChart = ec.init(document
						.getElementById('secondleftDownTwo'), theme);

				var option = {

					tooltip : {
						trigger : 'axis'
					},

					calculable : true,
					grid : {
						y : 50,
						y2 : 30,
						x : 80,
						x2 : 80
					},
					legend : {
						data : [ '申告量', '成功率', '及时率' ]
					},
					xAxis : [ {
						show : false,
						type : 'category',
						boundaryGap : false,
						data : data.date
					} ],
					yAxis : [ {
						show : false,
						type : 'value',
						name : '量',
						axisLabel : {
							formatter : '{value}'
						}
					}, {
						show : false,
						type : 'value',
						name : '率',
						axisLabel : {
							formatter : '{value} %'
						}
					} ],
					series : [

					{
						name : '申告量',
						type : 'bar',
						itemStyle : {
							normal : {
								color : 'rgba(75,225,213,1)',
							/*
							 * label : { show : true }
							 */
							}
						},
						data : data.shengao
					}, {
						name : '成功率',
						type : 'line',
						yAxisIndex : 1,
						data : data.chenggonglv
					}, {
						name : '及时率',
						type : 'line',
						yAxisIndex : 1,
						data : data.jishilv
					} ]
				};

				myChart.setOption(option);
			});
			$("#gds").html(data.tshengao);
			if (data.tscusucceedlv < 30) {
				$("#gdcl").append(
						"<p  class=\"f26\" style=\"color: red\">"
								+ data.tscusucceedlv + "%" + "</p>");
			} else {
				$("#gdcl").append(
						"<p  class=\"f26\" style=\"color: lime\">"
								+ data.tscusucceedlv + "%" + "</p>");
			}
			;
			if (data.tjslv < 90) {
				$("#gdjsl").append(
						"<p  class=\"f26\" style=\"color: red\">" + data.tjslv
								+ "%" + "</p>");
			} else {
				$("#gdjsl").append(
						"<p  class=\"f26\" style=\"color: lime\">" + data.tjslv
								+ "%" + "</p>");
			}
			;
		}
	});
}
ShowTrendGuangXi();
function ShowTrendGuangXi() {
	$.ajax({
		type : "POST",
		async : false, // 同步执行 结束请求后再在执行下一个ajax
		url : "one/trendguangxi.do",
		dataType : "JSON",
		success : function(data) {
			require([ 'echarts', 'js/chart/dark', 'echarts/chart/line',
					'echarts/chart/bar', // 按需加载所需图表，如需动态类型切换功能，别忘了同时加载相应图表
			], function(ec, theme) {
				var myChart = ec.init(
						document.getElementById('secondzdownOne'), theme);

				var option = {

					tooltip : {
						trigger : 'axis'
					},

					calculable : true,
					grid : {
						y : 50,
						y2 : 30,
						x : 80,
						x2 : 80
					},
					legend : {
						data : [ '申告量', '成功率', '及时率' ]
					},
					xAxis : [ {
						show : false,
						type : 'category',
						boundaryGap : false,
						data : data.date
					} ],
					yAxis : [ {
						show : false,
						type : 'value',
						name : '量',
						axisLabel : {
							formatter : '{value}'
						}
					}, {
						show : false,
						type : 'value',
						name : '率',
						axisLabel : {
							formatter : '{value} %'
						}
					} ],
					series : [

					{
						name : '申告量',
						type : 'bar',
						itemStyle : {
							normal : {
								color : 'rgba(75,225,213,1)',
							/*
							 * label : { show : true }
							 */
							}
						},
						data : data.shengao
					}, {
						name : '成功率',
						type : 'line',
						yAxisIndex : 1,
						data : data.chenggonglv
					}, {
						name : '及时率',
						type : 'line',
						yAxisIndex : 1,
						data : data.jishilv
					} ]
				};

				myChart.setOption(option);
			});
			$("#gxs").html(data.tshengao);
			if (data.tscusucceedlv < 30) {
				$("#gxcl").append(
						"<p  class=\"f26\" style=\"color: red\">"
								+ data.tscusucceedlv + "%" + "</p>");
			} else {
				$("#gxcl").append(
						"<p  class=\"f26\" style=\"color: lime\">"
								+ data.tscusucceedlv + "%" + "</p>");
			}
			;
			if (data.tjslv < 90) {
				$("#gxjsl").append(
						"<p  class=\"f26\" style=\"color: red\">" + data.tjslv
								+ "%" + "</p>");
			} else {
				$("#gxjsl").append(
						"<p  class=\"f26\" style=\"color: lime\">" + data.tjslv
								+ "%" + "</p>");
			}
			;

		}
	});
}
ShowTrendXinJiang();
function ShowTrendXinJiang() {
	$.ajax({
		type : "POST",
		async : false, // 同步执行 结束请求后再在执行下一个ajax
		url : "one/trendxinjiang.do",
		dataType : "JSON",
		success : function(data) {
			require([ 'echarts', 'js/chart/dark', 'echarts/chart/line',
					'echarts/chart/bar', // 按需加载所需图表，如需动态类型切换功能，别忘了同时加载相应图表
			], function(ec, theme) {
				var myChart = ec.init(
						document.getElementById('secondzdownTwo'), theme);

				var option = {

					tooltip : {
						trigger : 'axis'
					},

					calculable : true,
					grid : {
						y : 50,
						y2 : 30,
						x : 80,
						x2 : 80
					},
					legend : {
						data : [ '申告量', '成功率', '及时率' ]
					},
					xAxis : [ {
						show : false,
						type : 'category',
						boundaryGap : false,
						data : data.date
					} ],
					yAxis : [ {
						show : false,
						type : 'value',
						name : '量',
						axisLabel : {
							formatter : '{value}'
						}
					}, {
						show : false,
						type : 'value',
						name : '率',
						axisLabel : {
							formatter : '{value} %'
						}
					} ],
					series : [

					{
						name : '申告量',
						type : 'bar',
						itemStyle : {
							normal : {
								color : 'rgba(75,225,213,1)',
							/*
							 * label : { show : true }
							 */
							}
						},
						data : data.shengao
					}, {
						name : '成功率',
						type : 'line',
						yAxisIndex : 1,
						data : data.chenggonglv
					}, {
						name : '及时率',
						type : 'line',
						yAxisIndex : 1,
						data : data.jishilv
					} ]
				};

				myChart.setOption(option);
			});
			$("#xs").html(data.tshengao);
			if (data.tscusucceedlv < 30) {
				$("#xcl").append(
						"<p  class=\"f26\" style=\"color: red\">"
								+ data.tscusucceedlv + "%" + "</p>");
			} else {
				$("#xcl").append(
						"<p  class=\"f26\" style=\"color: lime\">"
								+ data.tscusucceedlv + "%" + "</p>");
			}
			;
			if (data.tjslv < 90) {
				$("#xjsl").append(
						"<p  class=\"f26\" style=\"color: red\">" + data.tjslv
								+ "%" + "</p>");
			} else {
				$("#xjsl").append(
						"<p  class=\"f26\" style=\"color: lime\">" + data.tjslv
								+ "%" + "</p>");
			}
			;
		}
	});
}
ShowTrendYunNan();
function ShowTrendYunNan() {
	$.ajax({
		type : "POST",
		async : false, // 同步执行 结束请求后再在执行下一个ajax
		url : "one/trendyunnan.do",
		dataType : "JSON",
		success : function(data) {
			require([ 'echarts', 'js/chart/dark', 'echarts/chart/line',
					'echarts/chart/bar', // 按需加载所需图表，如需动态类型切换功能，别忘了同时加载相应图表
			], function(ec, theme) {
				var myChart = ec.init(document
						.getElementById('secondRightdown'), theme);

				var option = {

					tooltip : {
						trigger : 'axis'
					},

					calculable : true,
					grid : {
						y : 50,
						y2 : 30,
						x : 80,
						x2 : 80
					},
					legend : {
						data : [ '申告量', '成功率', '及时率' ]
					},
					xAxis : [ {
						show : false,
						type : 'category',
						boundaryGap : false,
						data : data.date
					} ],
					yAxis : [ {
						show : false,
						type : 'value',
						name : '量',
						axisLabel : {
							formatter : '{value}'
						}
					}, {
						show : false,
						type : 'value',
						name : '率',
						axisLabel : {
							formatter : '{value} %'
						}
					} ],
					series : [

					{
						name : '申告量',
						type : 'bar',
						itemStyle : {
							normal : {
								color : 'rgba(75,225,213,1)',
							/*
							 * label : { show : true }
							 */
							}
						},
						data : data.shengao
					}, {
						name : '成功率',
						type : 'line',
						yAxisIndex : 1,
						data : data.chenggonglv
					}, {
						name : '及时率',
						type : 'line',
						yAxisIndex : 1,
						data : data.jishilv
					} ]
				};

				myChart.setOption(option);
			});
			$("#ys").html(data.tshengao);
			if (data.tscusucceedlv < 30) {
				$("#ycl").append(
						"<p  class=\"f26\" style=\"color: red\">"
								+ data.tscusucceedlv + "%" + "</p>");
			} else {
				$("#ycl").append(
						"<p  class=\"f26\" style=\"color: lime\">"
								+ data.tscusucceedlv + "%" + "</p>");
			}
			;
			if (data.tjslv < 90) {
				$("#yjsl").append(
						"<p  class=\"f26\" style=\"color: red\">" + data.tjslv
								+ "%" + "</p>");
			} else {
				$("#yjsl").append(
						"<p  class=\"f26\" style=\"color: lime\">" + data.tjslv
								+ "%" + "</p>");
			}
			;

		}
	});
}
ShowXiaoLv();
function ShowXiaoLv() {
	$.ajax({
		type : "POST",
		async : false, // 同步执行 结束请求后再在执行下一个ajax
		url : "one/xiaolv.do",
		dataType : "JSON",
		success : function(data) {
			require([ 'echarts', 'js/chart/dark', 'echarts/chart/pie', // 按需加载所需图表，如需动态类型切换功能，别忘了同时加载相应图表
			'echarts/chart/bar', 'echarts/chart/line' ], function(ec, theme) {
				var myChart = ec.init(document
						.getElementById('secondRightMiddle'), theme);
				var option = {
					tooltip : {
						trigger : 'axis'
					},

					calculable : true,
					grid : {
						y : 50,
						y2 : 30,
						x : 30,
						x2 : 50
					},
					legend : {
						x : 'right',
						y : '20px',
						data : [ '及时量', '申告量', '成功率' ]
					},
					xAxis : [ {
						show : false,
						type : 'category',
						data : data.month
					} ],
					yAxis : [ {
						show : false,
						type : 'value',
						name : '量',
						axisLabel : {
							formatter : '{value}'
						}
					}, {
						show : false,
						type : 'value',
						name : '率',
						axisLabel : {
							formatter : '{value} %'
						}
					} ],
					series : [ {
						name : '及时量',
						type : 'bar',
						itemStyle : {
							normal : {
								color : 'rgba(0,132,198,1)',
							/*label : {
								show : true
							}*/
							}
						},
						data : data.jishin
					},

					{
						name : '申告量',
						type : 'bar',
						itemStyle : {
							normal : {
								color : 'rgba(75,225,213,1)',
							/*label : {
								show : true
							}*/
							}
						},
						data : data.shengao
					}, {
						name : '成功率',
						type : 'line',
						yAxisIndex : 1,
						data : data.chenggonglv
					} ]
				};

				myChart.setOption(option);
			});
			$("#mjsn").html(data.mjsn + "W");

			$("#msg").append(data.mshengao + "W");
			
			if (data.tjslv < 40) {
				$("#mcg").append(
						"<p  class=\"f26\" style=\"color: red\">"
								+ data.mscusucceedlv + "%" + "</p>");
			} else  {
				$("#mcg").append(
						"<p  class=\"f26\" style=\"color: lime\">"
								+ data.mscusucceedlv + "%" + "</p>");
			}
			;

		}
	});
}







