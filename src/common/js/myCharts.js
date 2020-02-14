import echarts from 'echarts'

// 定义颜色
let color = ['rgba(44,181,171, 1)', 'rgba(44,181,171,.3)', 'rgba(145,191,93,1)', 'rgba(145,191,93, .3)', 'rgba(248,168,159,1)', 'rgba(248,168,159,.3)',
  'rgba(138, 43, 226, 1)', 'rgba(220, 20, 60, 1)', 'rgba(0, 0, 139, 1)', 'rgba(255,140,0,1)', 'rgba(121,85,72,1)', 'rgba(124,252,0,1)',
  'rgba(0,0,128,1)', 'rgba(158,158,158,1)', 'rgba(172,89,163,1)', 'rgba(53,231,255,1)', 'rgba(16,16,16,1)', 'rgba(52,135,158,1)'],
  dataBar = [{
    show: true,
    height: 25,
    start: 30,
    end: 70,
    handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
    handleSize: '110%',
    handleStyle: {
      color: "#d3dee5",
    },
    textStyle: {
      color: "#6f7479"
    },
    borderColor: "#90979c"
  }, {
    type: 'inside',
    realtime: true,
    start: 20,
    end: 80
  }],
  yAxis = [{ // y轴设置
    type: 'value',
    min: 0,
    splitLine: {
      show: true,
      lineStyle: {
        color: '#ececec'
      }
    },
    axisLine: { //坐标轴轴线相关设置。就是数学上的y轴
      show: false,
      lineStyle: {
        color: 'rgba(170,172,178,0.53)'
      }
    },
    axisLabel: {
      textStyle: {
        color: '#6f7479',
      }
    },
  }],
  tooltip = { // 提示框样式重写
    bordeRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    backgroundColor: 'rgba(255,255,255,0.9)',
    padding: 0,
    formatter: function (params) {
      let color = "#757b90",
        a = "<div style='background-color:" + color + ";padding: 5px 10px;border:0;marging-top:1px;text-align:center;color:white;font-size: 14px;'>" + params[0].name + "</div>";
      a += "<div style='padding:5px;color:#36383c;font-size:14px;'>"
      params.forEach(function (v) { //保留两位小数    
        a += "<span style='margin-right:5px;display: inline-block;display: inline-block; height:8px;width: 8px;border: 2px solid " + v.color + ";border-radius: 50%;'/></span>" + v.seriesName + "  :  " + (Number.isInteger(v.value) ? v.value : Math.round(v.value * 100) / 100 || '--') + "<br>";
      })
      a += "</div>"
      return a
    },
    trigger: 'axis',
    textStyle: {
      fontSize: 15,
      color: "#fff"
    },
    axisPointer: {
      lineStyle: {
        color: '#00c1de'
      }
    }
  },
  legend = {
    orient: 'horizontal',
    bottom: 5,
    left: "5%",
    itemGap: 20,
    textStyle: {
      color: '#6f7479',
      fontSize: 12
    }
  },
  toolbox = {
    show: true,
    feature: {
      mark: {
        show: true
      },
      dataView: {
        show: false,
        readOnly: false
      },
      magicType: {
        show: true,
        type: ['line', 'bar']
      },
      saveAsImage: {
        show: true
      },
      restore: {
        show: true
      }
    }
  },
  xAxis = {
    type: 'category',
    boundaryGap: false,
    axisLine: { //坐标轴轴线相关设置。就是数学上的x轴
      show: true,
      lineStyle: {
        color: '#00c1de',
        width: 2
      },
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      align: "right",
      textStyle: {
        color: '#6f7479',
      },
    }
  }
export function setLineData(opt) {
  let legendData = [], // 说明图例
    series = [],
    arrLength = opt.series.length > 15 ? 15 : opt.series.length // 防止有些组件中渲染折线图过多
  opt.series.forEach((v, k) => {
    if (k <= arrLength) {
      legendData.push(v.name)
    }
    series.push({
      name: v.name,
      type: v.type || 'line',
      smooth: v.smooth || true, // 是否平滑曲线显示
      lineStyle: {
        normal: {
          width: 1,
          color: color[k * 2]
        }
      },
      areaStyle: { //区域填充样式
        normal: {
          //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
          color: color[k * 2 + 1]
        }
      },
      itemStyle: { //折现拐点标志的样式
        normal: {
          color: color[k * 2]
        }
      },
      data: v.data
    })
  })

  let options = {
    title: {
      text: opt.title || '',
      left: '1%',
      top: '-1%',
      textStyle: {
        fontSize: 16,
        fontWeight: "normal",
        fontFamily: "微软雅黑",
        color: "#36383c"
      }
    },
    tooltip: tooltip,
    legend: Object.assign(legend, { data: legendData }),
    grid: {
      orient: 'horizontal',
      bottom: 70,
      left: "6%",
      right: '1%',
      itemGap: 20,
      textStyle: {
        color: '#6f7479',
        fontSize: 12
      }
    },
    toolbox: toolbox,
    calculable: true,
    xAxis: [Object.assign(xAxis, { data: opt.xAxisData })],
    yAxis: opt.yAxis || yAxis,
    series: series
  }
  if (opt.xAxisData.length > 20) {
    options.dataZoom = dataBar
    options.dataZoom[0].bottom = 15 + Math.ceil(legendData.length / 8) * 20
    options.grid.bottom = 70 + Math.ceil(legendData.length / 8) * 20
  } else {
    options.grid.bottom = 70
  }
  if (arrLength > 15) {
    options.legend.bottom = 0
  }
  return options
}

export function setRadiiData (opt) {
// export function setRadiiData (title, tipTitle, obj) {
  var legendData = [], seriesData = []
  for (var key in opt.obj) {
    legendData.push(key)
    var _obj = {}
    _obj.value = opt.obj[key]
    _obj.name = key
    seriesData.push(_obj)
  }
  var option = {
    title: {
      text: opt.title,
      x: 'center'
    },
    tooltip: {
      trigger: 'item',
      bordeRadius: 4,
      borderWidth: 1,
      borderColor: 'rgba(0,0,0,0.2)',
      backgroundColor: 'rgba(255,255,255,0.9)',
      padding: 0,
      formatter: function (params) {
        let color = "#757b90";
        var a = ''
        a += "<div style='background-color:" + color + ";padding: 5px 10px;border:0;marging-top:1px;text-align:center;color:white;font-size: 14px;'>" + params.seriesName + "</div>";
        a += "<div style='padding:5px;color:#36383c;font-size: 14px;'>";
        a += "<span style='margin-right:5px;display: inline-block;display: inline-block; height:10px;width: 10px;border: 2px solid " + params.color + ";border-radius: 50%;'/></span>" + params.name + "  :  " + (Number.isInteger(params.value) ? params.value : Math.round(params.value * 100) / 100) + "(" + params.percent + "%)";
        a += "</div>";
        return a;
      },
      textStyle: {
        fontSize: 15,
        color: "#fff"
      },
      axisPointer: {
        lineStyle: {
          color: '#00c1de'
        }
      }
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: legendData,
      itemStyle: {
        normal: {
          opacity: 0.5
        }
      }
    },
    toolbox: toolbox,
    series: [{
      name: opt.tipTitle,
      type: 'pie',
      radius: ['40%', '70%'],
      center: ['50%', '60%'],
      data: seriesData,
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }],
    color: ['rgba(0, 175, 159,.5)', 'rgba(41, 168, 227,.5)', 'rgba(53, 117, 88,.5)', 'rgba(221, 129, 187,.5)', 'rgba(120, 208, 123,.5)', 'rgba(119, 146, 202,.5)', 'rgba(155, 141, 175,.5)', 'rgba(215, 191, 110,.5)', 'rgba(125, 193, 213,.5)', 'rgba(133, 137, 184,.5)']
  };

  if (window.innerWidth < 480) {
    delete option.legend
    delete option.toolbox
  }
  return option
}

export function renderChart(container, option) {
  var myChart = echarts.init(container),
    DOMs = document.getElementsByClassName('card-content')
  myChart.clear()
  myChart.setOption(option)
  myChart.resize({
    width: DOMs[0].clientWidth > 0 ? DOMs[0].clientWidth : document.getElementsByClassName('charts')[0].clientWidth
  })
  return myChart
}
