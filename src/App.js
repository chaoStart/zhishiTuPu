import React, { Component } from 'react';
import * as echarts from 'echarts'
import $ from 'jquery';
import './App.css'
// 2024年第一次提交
//章淑昱
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 1,
      days: '一月份报表'
    };
  };

  componentDidMount = () => {
    fetch('http://localhost:3000/data/asset/data/flare.json')
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error loading JSON file:', error));
    console.log('获取数据:',)
    this.ChartInit();
  }
  componentDidUpdate = () => {
    this.ChartInit()
  }
  ChartInit = () => {
    var chartDom = document.getElementById('main');
    var myChart = echarts.init(chartDom);
    var option;

    // https://echarts.apache.org/examples/data/asset/data/les-miserables.json
    // http://218.94.19.58:8081/resource/App_007a33cfb6915b54f33fc8855b670b72/dist/assets/tupu1.json
    // $.get('http://218.94.19.58:8081/resource/App_007a33cfb6915b54f33fc8855b670b72/dist/assets/tupu1.json', function (data) {
    //   myChart.hideLoading();
    //   myChart.setOption(
    //     (option = {
    //       tooltip: {
    //         trigger: 'item',
    //         triggerOn: 'mousemove'
    //       },
    //       series: [
    //         {
    //           type: 'tree',
    //           data: [data],
    //           top: '18%',
    //           bottom: '14%',
    //           layout: 'radial',
    //           symbol: 'emptyCircle',
    //           symbolSize: 7,
    //           initialTreeDepth: 3,
    //           animationDurationUpdate: 750,
    //           emphasis: {
    //             focus: 'descendant'
    //           }
    //         }
    //       ]
    //     })
    //   );
    // });
    // option && myChart.setOption(option);
    myChart.showLoading();
    // http://218.94.19.58:8081/resource/App_007a33cfb6915b54f33fc8855b670b72/dist/assets/tupu1.json
    $.getJSON('http://218.94.19.58:8081/resource/App_007a33cfb6915b54f33fc8855b670b72/dist/assets/tupu1.json', function (graph) {
      myChart.hideLoading();
      graph.nodes.forEach(function (node) {
        node.label = {
          show: node.symbolSize > 30
        };
      });
      option = {
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
    });

    option && myChart.setOption(option);

  };
  render() {
    return (
      <div className='bg0' style={{ width: '100%', height: ' 100%' }}>
        <div className='box1' style={{ width: '100%', height: ' 100%' }}>
          <div id='main' style={{ backgroundColor: 'rgb(20, 39, 95)', width: '100vw', height: ' 100vh' }}  ></div>
        </div>
      </div>
    )
  }
}
