import React, { Component } from 'react'
import * as echarts from 'echarts'
import './App.css'
const days = {
  '0': '一月份报表',
  '1': '二月份报表',
  '2': '月报表'
}
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 1,
      days: '一月份报表'
    };
  };
  componentDidMount = () => {
    this.ChartInit()
  }
  componentDidUpdate = () => {
    this.ChartInit()
  }
  ChartInit = () => {
    var chartDom = document.getElementById('main');
    var myChart = echarts.init(chartDom);
    var option;
    var app = {};
    const categories = (function () {
      let now = new Date();
      let res = [];
      let len = 10;
      while (len--) {
        res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''));
        //-1800表示最近1h内的数据显示
        now = new Date(+now - 3600000);
      }
      return res;
    })();
    const categories2 = (function () {
      let res = [];
      let len = 10;
      while (len--) {
        res.push(10 - len - 1);
      }
      return res;
    })();
    const data = (function () {
      let arr = [0.725, 0.705, 0.723, 0.795, 0.777, 0.756, 0.739, 0.731, 0.736, 0.694,
        0.650, 0.715, 0.646, 0.780, 0.798, 0.742, 0.777, 0.835, 0.837, 0.765, 0.786,
        0.799, 0.831, 0.839, 0.821, 0.831, 0.776, 0.848, 0.835];
      return arr;

    })();
    const data2 = (function () {
      let arr = [0.725, 0.705, 0.723, 0.795, 0.777, 0.756, 0.739, 0.731, 0.736, 0.694,
        0.650, 0.715, 0.646, 0.780, 0.798, 0.742, 0.777, 0.835, 0.837, 0.765, 0.786,
        0.799, 0.831, 0.839, 0.821, 0.831, 0.776, 0.848, 0.835];
      let i = 10;
      let res = [];
      let len = 10;
      while (len--) {
        // res.push(Math.random() * 1000);
        res.push(arr[i--]);
      }
      return arr;
    })();
    const ceshi = [0.725, 0.705, 0.723, 0.795, 0.777, 0.756, 0.739, 0.731, 0.736, 0.694, 0.650, 0.715,
      0.646, 0.780, 0.798, 0.742, 0.777, 0.835, 0.837, 0.765, 0.786, 0.799, 0.831, 0.839, 0.821, 0.831, 0.776, 0.848, 0.835];
    option = {
      title: {
        text: this.state.days
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#283b56'
          }
        }
      },
      legend: {},
      toolbox: {
        show: true,
        feature: {
          dataView: { readOnly: false },
          restore: {},
          saveAsImage: {}
        }
      },
      dataZoom: {
        show: false,
        start: 0,
        end: 100
      },
      xAxis: [
        {
          // type: 'category',
          // boundaryGap: true,
          //时间步长
          data: categories
        },
        {
          // type: 'category',
          // boundaryGap: true,
          //历史存储的10个数据
          data: categories2
        }
      ],
      yAxis: [
        {
          type: 'value',
          scale: true,
          name: '吨/小时',
          // max: 18100,
          // min: 17500,
          max: 0.84,
          min: 0.61,
          // boundaryGap: [0.2, 0.2]
        },
        {
          type: 'value',
          scale: true,
          name: 'Order',
          max: 0.84,
          min: 0.61,
          // boundaryGap: [0.2, 0.2]
        }
      ],
      series: [
        {
          name: this.state.days + '柱状图',
          type: 'bar',
          xAxisIndex: 1,
          yAxisIndex: 1,
          data: data
        },
        {
          // name: 'Dynamic Line',
          name: this.state.days + '曲线图',
          type: 'line',
          data: data2
        }
      ]
    };
    app.count = 11;
    setInterval(function () {
      let axisData = new Date().toLocaleTimeString().replace(/^\D*/, '');
      //测试集的数据ceshi输出
      // console.log('取出之前ceshi输出', ceshi);
      //删除data数组的第一个元素，并且返回第一个data元素的值,送入第一个ceshi数值的数据给data
      data.shift();
      data.push(ceshi[0]);
      //删除ceshi数值里面的第一个数据，数组减少了一个数字
      ceshi.shift(ceshi[0]);
      //为了防止ceshi数组里面的数据全部被shift完，每次输出一个，再给ceshi末尾添加一个随机数字
      ceshi.push(Math.round(Math.random() * 0.1 + 0.65));
      // console.log('取出ceshi后的数据', ceshi);
      categories.shift();
      categories.push(axisData);
      categories2.shift();
      categories2.push(app.count++);
      myChart.setOption({
        xAxis: [
          {
            data: categories
          },
          {
            data: categories2
          }
        ],
        series: [
          {
            data: data
          },
          {
            data: data
          }
        ]
      });
    }, 3000);
    option && myChart.setOption(option);
  }
  handleChangeday = () => {
    this.setState({
      count: this.state.count > 5 ? 1 : this.state.count + 1,
      days: days[0],
    }, () => {
      console.log("+1后count数值:", this.state.count, '日期:', this.state.days, 'data的格式是', typeof (data))
    })
    let myChart0 = echarts.init(document.getElementById('main'));
    myChart0.clear()
    myChart0.dispose()
    var chartDom = document.getElementById('main');
    var myChart = echarts.init(chartDom);
    var option;
    var app = {};
    const categories = (function () {
      let now = new Date();
      let res = [];
      let len = 10;
      while (len--) {
        res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''));
        //-1800表示最近1h内的数据显示
        now = new Date(+now - 3600000);
      }
      return res;
    })();
    const categories2 = (function () {
      let res = [];
      let len = 10;
      while (len--) {
        res.push(10 - len - 1);
      }
      return res;
    })();
    const data = (function () {
      let arr = [0.725, 0.705, 0.723, 0.795, 0.777, 0.756, 0.739, 0.731, 0.736, 0.694,
        0.650, 0.715, 0.646, 0.780, 0.798, 0.742, 0.777, 0.835, 0.837, 0.765, 0.786,
        0.799, 0.831, 0.839, 0.821, 0.831, 0.776, 0.848, 0.835];
      return arr;

    })();
    const data2 = (function () {
      let arr = [0.725, 0.705, 0.723, 0.795, 0.777, 0.756, 0.739, 0.731, 0.736, 0.694,
        0.650, 0.715, 0.646, 0.780, 0.798, 0.742, 0.777, 0.835, 0.837, 0.765, 0.786,
        0.799, 0.831, 0.839, 0.821, 0.831, 0.776, 0.848, 0.835];
      let i = 10;
      let res = [];
      let len = 10;
      while (len--) {
        // res.push(Math.random() * 1000);
        res.push(arr[i--]);
      }
      return arr;
    })();
    const ceshi = [0.725, 0.705, 0.723, 0.795, 0.777, 0.756, 0.739, 0.731, 0.736, 0.694, 0.650, 0.715,
      0.646, 0.780, 0.798, 0.742, 0.777, 0.835, 0.837, 0.765, 0.786, 0.799, 0.831, 0.839, 0.821, 0.831, 0.776, 0.848, 0.835];
    option = {
      title: {
        text: this.state.days
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#283b56'
          }
        }
      },
      legend: {},
      toolbox: {
        show: true,
        feature: {
          dataView: { readOnly: false },
          restore: {},
          saveAsImage: {}
        }
      },
      dataZoom: {
        show: false,
        start: 0,
        end: 100
      },
      xAxis: [
        {
          // type: 'category',
          // boundaryGap: true,
          //时间步长
          data: categories
        },
        {
          // type: 'category',
          // boundaryGap: true,
          //历史存储的10个数据
          data: categories2
        }
      ],
      yAxis: [
        {
          type: 'value',
          scale: true,
          name: '吨/小时',
          // max: 18100,
          // min: 17500,
          max: 0.84,
          min: 0.61,
          // boundaryGap: [0.2, 0.2]
        },
        {
          type: 'value',
          scale: true,
          name: 'Order',
          max: 0.84,
          min: 0.61,
          // boundaryGap: [0.2, 0.2]
        }
      ],
      series: [
        {
          name: this.state.days + '柱状图',
          type: 'bar',
          xAxisIndex: 1,
          yAxisIndex: 1,
          data: data
        },
        {
          // name: 'Dynamic Line',
          name: this.state.days + '曲线图',
          type: 'line',
          data: data2
        }
      ]
    };
    app.count = 11;
    setInterval(function () {
      let axisData = new Date().toLocaleTimeString().replace(/^\D*/, '');
      //测试集的数据ceshi输出
      // console.log('取出之前ceshi输出', ceshi);
      //删除data数组的第一个元素，并且返回第一个data元素的值,送入第一个ceshi数值的数据给data
      data.shift();
      data.push(ceshi[0]);
      //删除ceshi数值里面的第一个数据，数组减少了一个数字
      ceshi.shift(ceshi[0]);
      //为了防止ceshi数组里面的数据全部被shift完，每次输出一个，再给ceshi末尾添加一个随机数字
      ceshi.push(Math.round(Math.random() * 0.1 + 0.65));
      // console.log('取出ceshi后的数据', ceshi);
      categories.shift();
      categories.push(axisData);
      categories2.shift();
      categories2.push(app.count++);
      myChart.setOption({
        xAxis: [
          {
            data: categories
          },
          {
            data: categories2
          }
        ],
        series: [
          {
            data: data
          },
          {
            data: data
          }
        ]
      });
    }, 3000);
    option && myChart.setOption(option);
    // echarts.init(document.getElementById('chart')).dispose();
    //如果新状态依赖于原状态,使用函数式 
    /*  this.setState((state, props) => {
       if (this.state.plusone < 5) {
         return { plusone: this.state.plusone + 1 }
       } else { return { plusone: 1 } }
     }, () => {
       console.log("plusone目前的数值:", this.state.plusone);
     }) */
  };
  handleChangeweek = () => {
    // let myChart=echarts.init(document.getElementById('main')).dispose();
    let myChart1 = echarts.init(document.getElementById('main'));
    myChart1.clear()
    myChart1.dispose()
    var chartDom0 = document.getElementById('main');
    var myChart0 = echarts.init(chartDom0);
    var option0;
    var app = {};
    const categories = (function () {
      let now = new Date();
      let res = [];
      let len = 10;
      while (len--) {
        res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''));
        //-1800表示最近1h内的数据显示
        now = new Date(+now - 3600000);
      }
      return res;
    })();
    const categories2 = (function () {
      let res = [];
      let len = 10;
      while (len--) {
        res.push(10 - len - 1);
      }
      return res;
    })();
    const data = (function () {
      let arr = [0.797, 0.829, 0.815, 0.732, 0.756, 0.748, 0.784, 0.769, 0.735, 0.637, 0.684, 0.667, 0.738, 0.800
        , 0.803, 0.749, 0.757, 0.763, 0.747, 0.766, 0.720, 0.735, 0.712, 0.730, 0.812, 0.754, 0.757, 0.744];
      return arr;

    })();
    const data2 = (function () {
      let arr = [0.797, 0.829, 0.815, 0.732, 0.756, 0.748, 0.784, 0.769, 0.735, 0.637, 0.684, 0.667, 0.738, 0.800
        , 0.803, 0.749, 0.757, 0.763, 0.747, 0.766, 0.720, 0.735, 0.712, 0.730, 0.812, 0.754, 0.757, 0.744];
      let i = 10;
      let res = [];
      let len = 10;
      while (len--) {
        // res.push(Math.random() * 1000);
        res.push(arr[i--]);
      }
      return arr;
    })();
    const ceshi = [0.797, 0.829, 0.815, 0.732, 0.756, 0.748, 0.784, 0.769, 0.735, 0.637, 0.684, 0.667, 0.738, 0.800
      , 0.803, 0.749, 0.757, 0.763, 0.747, 0.766, 0.720, 0.735, 0.712, 0.730, 0.812, 0.754, 0.757, 0.744];
    // console.log('categories时间步长', categories);
    // console.log('categories2历史10个数据', categories2);
    // console.log('data增大的10个数据', data);
    // console.log('data2增大的10个数据', data2);
    option0 = {
      title: {
        text: '二月份报表'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#283b56'
          }
        }
      },
      legend: {},
      toolbox: {
        show: true,
        feature: {
          dataView: { readOnly: false },
          restore: {},
          saveAsImage: {}
        }
      },
      dataZoom: {
        show: false,
        start: 0,
        end: 100
      },
      xAxis: [
        {
          // type: 'category',
          // boundaryGap: true,
          //时间步长
          data: categories
        },
        {
          // type: 'category',
          // boundaryGap: true,
          //历史存储的10个数据
          data: categories2
        }
      ],
      yAxis: [
        {
          type: 'value',
          scale: true,
          name: '收率',
          max: 0.84,
          min: 0.61,
          // boundaryGap: [0.2, 0.2]
        },
        {
          type: 'value',
          scale: true,
          name: 'Order',
          max: 0.84,
          min: 0.61,
          // boundaryGap: [0.2, 0.2]
        }
      ],
      series: [
        {
          name: '二月份报表柱状图',
          type: 'bar',
          xAxisIndex: 1,
          yAxisIndex: 1,
          data: data
        },
        {
          name: '二月份报表趋势图',
          type: 'line',
          data: data2
        }
      ]
    };
    app.count = 11;
    setInterval(function () {
      let axisData = new Date().toLocaleTimeString().replace(/^\D*/, '');
      //测试集的数据ceshi输出
      // console.log('取出之前ceshi输出', ceshi);
      //删除data数组的第一个元素，并且返回第一个data元素的值,送入第一个ceshi数值的数据给data
      data.shift();
      data.push(ceshi[0]);
      //删除ceshi数值里面的第一个数据，数组减少了一个数字
      ceshi.shift(ceshi[0]);
      //为了防止ceshi数组里面的数据全部被shift完，每次输出一个，再给ceshi末尾添加一个随机数字
      ceshi.push(Math.round(Math.random() * 0.1 + 0.65));
      // console.log('取出ceshi后的数据', ceshi);
      categories.shift();
      categories.push(axisData);
      categories2.shift();
      categories2.push(app.count++);
      myChart0.setOption({
        xAxis: [
          {
            data: categories
          },
          {
            data: categories2
          }
        ],
        series: [
          {
            data: data
          },
          {
            data: data
          }
        ]
      });
    }, 3000);
    option0 && myChart0.setOption(option0);
  };
  render() {
    return (
      <div className='bg0'>
        <div className='box0'>
          <button onClick={this.handleChangeday}>一月份报表</button>&nbsp;&nbsp;&nbsp;
          <button onClick={this.handleChangeweek}>二月份报表</button>&nbsp;&nbsp;&nbsp;
        </div>
        <div className='box1'>
          <div id='main' style={{ width: '1000px', height: ' 600px' }}></div>
          {/* <div id='main1' style={{ width: '1000px', height: ' 600px' }}></div> */}
        </div>
      </div>
    )
  }
}
