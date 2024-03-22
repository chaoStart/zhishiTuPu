import React, { useEffect } from 'react';
import * as echarts from 'echarts'
import './App.css'
import graph from "./tupu1.json";
console.log('知识图谱数据:', graph)
const MyComponent = () => {
  useEffect(() => {
    var chartDom = document.getElementById('main');
    var myChart = echarts.init(chartDom);
    // var option;
    myChart.showLoading();
    // 将原始代码中的 $.getJSON() 回调函数中的代码放在此处，使用导入的 JSON 数据 graph
    myChart.hideLoading();
    graph.nodes.forEach(function (node) {
      node.label = {
        show: node.symbolSize > 30
      };
    });
    const option = {
      title: {
        text: '知识图谱',
        subtext: 'Default layout',
        top: 'bottom',
        left: 'center',
        color: 'red',
        textStyle: {
          color: 'red' // 设置标题文本颜色为红色
        }
      },
      tooltip: {},
      legend: [
        {
          // selectedMode: 'single',
          data: graph.categories.map(function (a) {
            return a.name;
          }),
          textStyle: {
            color: 'white' // 设置标题文本颜色为红色
          }
        }
      ],
      animationDuration: 1500,
      animationEasingUpdate: 'quinticInOut',
      series: [
        {
          name: '叶轮产线',
          type: 'graph',
          layout: 'none',
          data: graph.nodes,
          links: graph.links,
          categories: graph.categories,
          roam: true,
          label: {
            position: 'left',
            formatter: '{b}'
          },
          lineStyle: {
            color: 'source',
            curveness: 0.3
          },
          emphasis: {
            focus: 'adjacency',
            lineStyle: {
              width: 10
            }
          }
        }
      ]
    };
    myChart.setOption(option);
  }, []);

  return (
    <div className='aa' style={{ width: '100%', height: ' 100%' }}>
      <div id='main' style={{ backgroundColor: 'rgb(20, 39, 95)', width: '100vw', height: ' 100vh' }}  ></div>
    </div>
  );
}
export default MyComponent