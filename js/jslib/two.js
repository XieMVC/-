$.ajax({
	type : "POST",
	async : true, //同步执行
	url : "two/userplat.do",
	dataType : "JSON",
	success : function(data) {
		optuserplat(data);
	}
});

/* 饼图    main  
ECharts单文件引入 */		
	function optuserplat(data) {
		require([ 'echarts','js/chart/dark', 'echarts/chart/pie', 'echarts/chart/funnel' ],
				function(ec,theme) {
					var myChart = ec.init(document.getElementById('fengxian'),theme);
					myChart.setOption(mationuserplat(data));
					var ecConfig = require('echarts/config');
					myChart.on(ecConfig.EVENT.CLICK, function(param) {
						tanceng();
						 function tanceng(){
							  layer.open({
							  type: 1,
							  title: param.name+'的风险评估详情',
							  maxmin: true,
							  shadeClose: true, //点击遮罩关闭层
							  area : ['800px' , '600px'],
							  content: '\<\div style="width:730px;margin:auto;">   \<\div id="container" style="position: absolute;margin-top:30px; width: 730px; height: 600px; top: 50; border: 1px solid gray;overflow:hidden;">\<\/div>\<\/div>'
							  });
							};
							WeiDuDetail(param.name);
						
					});
				});
		
	}
	
	function mationuserplat(data) {
		var option = {
			title : {
				text : '用户评估的等级',
				/*subtext : '平台',*/
				x : 'center'
			},
			tooltip : {
				trigger : 'item',
				formatter : "{a} <br/>{b} : {c} ({d}%)"
			},
			legend : {
				orient : 'vertical',
				x : 'left',
				data : [ '高危用户', '中危用户', '低危用户',
						'普通用户' ]
			},
			calculable : true,
			series : [ {
				name : '风险等级',
				type : 'pie',
				itemStyle: {
					normal: {
						label: {
				            show: true,
				            position: 'outer',
				            formatter :"{b}:{c}({d}%)" 
				        },
				        labelLine: {
				            show: true
				        }
					},
					emphasis:{
						label:{
							show :true,
							 position: 'inner',
						    
						},
						labelLine: {
				            show: true
				        }
					}
				},
				radius : '55%',
				center : [ '50%', '60%' ],
				data : data
			} ]
			
		};
		return option;
	};
	
	$.ajax({
		type : "POST",
		async : true, //同步执行
		url : "two/fengxianweidu.do",
		dataType : "JSON",
		success : function(data) {
			weidu(data);
		}
	});
	
	function weidu(data) {
		require([ 'echarts','js/chart/dark', 'echarts/chart/radar' ],
				function(ec,theme) {
					var myChart = ec.init(document.getElementById('fengxianweidu'),theme);
					var option = {
						    title : {
						        text: 'Online Service',
						        subtext: '平台'
						    },
						    tooltip : {
						        trigger: 'axis'
						    },
						    legend: {
						        orient : 'vertical',
						        x : 'right',
						        /*y : 'bottom',*/
						        data:['高危用户','中危用户','低危用户','普通用户']
						    },
						    polar : [
						       {
						           indicator : [
						               { text: '用户情绪得分', max: 5},
						               { text: '申告次数', max: 5},
						               { text: '呼叫次数', max: 11}
						            ]
						        }
						    ],
						    calculable : true,
						    series : [
						        {
						            name: 'Online Service',
						            type: 'radar',
						            data : [
						                {
						                    value : data.gao,
						                    name : '高危用户'
						                },
						                 {
						                    value : data.zhong,
						                    name : '中危用户'
						                },
						                {
						                    value : data.di,
						                    name : '低危用户'
						                },
						                {
						                    value : data.pu,
						                    name : '普通用户'
						                },
						            ]
						        }
						    ]
						};
					
					// 为echarts对象加载数据 
	                myChart.setOption(option); 
						                    
				});
		
	}
	
	function WeiDuDetail(user) {
		$.ajax({
			type : "POST",
			async : false, // 同步执行 结束请求后再在执行下一个ajax
			url : "two/weidudetail.do",
			data : {
				suser : user
			},
			dataType : "JSON",
			success : function(data) {
				$("#container").html("");
				$("#container").append(
						"<table class=\"table\"><thead><tr><th>"
								+ "用户账号" + "</th><th>" + "风险等级"
								+ "</th><th>" + "情绪得分" + "</th><th>"
								+ "申告次数" + "</th><th>" + "呼叫次数 "
								+ "</th></tr></thead></table>");
				for ( var i = 0; i < data.detailList.length; i++) {
					$(".table").append(
							"<tr><td>"
									+ data.detailList[i].userid
									+ "</td><td>"
									+ data.detailList[i].dengji
									+ "</td><td>"
									+ data.detailList[i].mood
									+ "</td><td>"
									+ data.detailList[i].sg_num
									+ "</td><td>"
									+ data.detailList[i].call_num
									+ "</td></tr>");
				}
			}
		});
	};
	
	
	