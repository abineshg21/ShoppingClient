import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import * as echarts from 'echarts';
import * as $ from 'jquery';
@Component({
  selector: 'app-admin-report',
  templateUrl: './admin-report.component.html',
  styleUrls: ['./admin-report.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdminReportComponent implements OnInit {

  constructor() { }
 
  ngOnInit(): void {
    this.loadScript('../../assets/framework.js');
    this.loadScript('../../assets/datatables.min.js');
    this.loadScript('../../assets/Close.js');
   
debugger;



var myChart = echarts.init(document.getElementById('bar-chart'));

// specify chart configuration item and data
const option = {
    tooltip : {
        trigger: 'axis'
    },
    legend: {
        data:['Site A','Site B']
    },
    toolbox: {
        show : true,
        feature : {
            
            magicType : {show: true, type: ['line', 'bar'],title:''},
            restore : {show: true,title:'refresh'},
            saveAsImage : {show: true,title:'Download'}
        }
    },
    color: ["#55ce63", "#009efb"],
    calculable : true,
    xAxis : [
        {
            type : 'category',
            data : ['Jan','Feb','Mar','Apr','May','Jun','July','Aug','Sept','Oct','Nov','Dec']
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            name:'Site A',
            type:'bar',
            data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
            markPoint : {
                data : [
                    {type : 'max', name: 'Max'},
                    {type : 'min', name: 'Min'}
                ]
            },
            markLine : {
                data : [
                    {type : 'average', name: 'Average'}
                ]
            }
        },
        {
            name:'Site B',
            type:'bar',
            data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
            markPoint : {
                data : [
                    {name : 'The highest year', value : 182.2, xAxis: 7, yAxis: 183, symbolSize:18},
                    {name : 'Year minimum', value : 2.3, xAxis: 11, yAxis: 3}
                ]
            },
            markLine : {
                data : [
                    {type : 'average', name : 'Average'}
                ]
            }
        }
    ]
};
                    

// use configuration item and data specified to show chart
myChart.setOption(option, true), $(function() {
  debugger;
            function resize() {
              debugger;
                setTimeout(function() {
                    myChart.resize()
                }, 100)
            }
            $(window).on("resize", resize), $(".ms-toggler").on("click", resize)
        });
        var pieChart = echarts.init(document.getElementById('pie-chart'));

        // specify chart configuration item and data
     const   option1 = {
           
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                x : 'center',
                y : 'bottom',
                data:['rose1','rose2','rose3','rose4','rose5','rose6','rose7','rose8']
            },
            toolbox: {
                show : true,
                title:'Monthly Chart',
                feature : {
                    
                    dataView : {show: false, readOnly: false,title:'document',name:'Month'},
                    magicType : {
                        show: true, 
                        type: ['pie', 'funnel']
                    },
                    restore : {show: true,title:'Refresh'},
                    saveAsImage : {show: true,title:'download'}
                }
            },
            color: ["#f62d51", "#dddddd","#ffbc34", "#7460ee","#009efb", "#2f3d4a","#90a4ae", "#55ce63"],
            calculable : true,
            series : [
                {
                    name:'Radius mode',
                    type:'pie',
                    radius : [20, 110],
                    center : ['25%', 200],
                    roseType : 'radius',
                    width: '40%',       // for funnel
                    max: 40,            // for funnel
                    itemStyle : {
                        normal : {
                            label : {
                                show : false
                            },
                            labelLine : {
                                show : false
                            }
                        },
                        emphasis : {
                            label : {
                                show : true
                            },
                            labelLine : {
                                show : true
                            }
                        }
                    },
                    data:[
                        {value:10, name:'rose1'},
                        {value:5, name:'rose2'},
                        {value:15, name:'rose3'},
                        {value:25, name:'rose4'},
                        {value:20, name:'rose5'},
                        {value:35, name:'rose6'},
                        {value:30, name:'rose7'},
                        {value:40, name:'rose8'}
                    ]
                },
                {
                    name:'Area mode',
                    type:'pie',
                    radius : [30, 110],
                    center : ['75%', 200],
                    roseType : 'area',
                    x: '50%',               // for funnel
                    max: 40,                // for funnel
                    sort : 'ascending',     // for funnel
                    data:[
                        {value:10, name:'rose1'},
                        {value:5, name:'rose2'},
                        {value:15, name:'rose3'},
                        {value:25, name:'rose4'},
                        {value:20, name:'rose5'},
                        {value:35, name:'rose6'},
                        {value:30, name:'rose7'},
                        {value:40, name:'rose8'}
                    ]
                }
            ]
        };
                            
                            
        
        // use configuration item and data specified to show chart
        pieChart.setOption(option1, true), $(function() {
                    function resize() {
                        setTimeout(function() {
                            pieChart.resize()
                        }, 100)
                    }
                    $(window).on("resize", resize)
                });

                var radarChart = echarts.init(document.getElementById('radar-chart'));

// specify chart configuration item and data

const option2 = {
    
    tooltip : {
        trigger: 'axis'
    },
    legend: {
        orient : 'vertical',
        x : 'right',
        y : 'bottom',
        data:['Allocated Budget','Actual Spending']
    },
    toolbox: {
        show : true,
        title:'Budject',
        feature : {
            dataView : {show: false, readOnly: false,title:'table'},
            restore : {show: true,title:'refresh'},
            saveAsImage : {show: true,title:'download'}
        }
    },
    polar : [
       {
           indicator : [
               { text: 'sales', max: 6000},
               { text: 'Administration', max: 16000},
               { text: 'Information Techology', max: 30000},
               { text: 'Customer Support', max: 38000},
               { text: 'Development', max: 52000},
               { text: 'Marketing', max: 25000}
            ]
        }
    ],
    color: ["#55ce63", "#009efb"],
    calculable : true,
    series : [
        {
            name: 'Budget vs spending',
            type: 'radar',
            data : [
                {
                    value : [4300, 10000, 28000, 35000, 50000, 19000],
                    name : 'Allocated Budget'
                },
                 {
                    value : [5000, 14000, 28000, 31000, 42000, 21000],
                    name : 'Actual Spending'
                }
            ]
        }
    ]
};
radarChart.setOption(option2, true), $(function() {
            function resize() {
                setTimeout(function() {
                    radarChart.resize()
                }, 100)
            }
            $(window).on("resize", resize), $(".ms-toggler").on("click", resize)
        });
        var doughnutChart = echarts.init(document.getElementById('doughnut-chart'));

        // specify chart configuration item and data
        
       const option3 = {
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient : 'vertical',
                x : 'left',
                data:['Item A','Item B','Item C','Item D','Item E']
            },
            toolbox: {
                show : true,
                title:'Yearly',
                feature : {
                    dataView : {show: false, readOnly: false,title:'document'},
                    magicType : {
                        show: true, 
                        title:'',
                        type: ['pie', 'funnel'],
                        option: {
                            funnel: {
                                x: '25%',
                                width: '50%',
                                funnelAlign: 'center',
                                max: 1548
                            }
                        }
                    },
                    restore : {show: true,title:'refresh'},
                    saveAsImage : {show: true,title:'download'}
                }
            },
            color: ["#f62d51", "#009efb", "#55ce63", "#ffbc34", "#2f3d4a"],
            calculable : true,
            series : [
                {
                    name:'Source',
                    type:'pie',
                    radius : ['80%', '90%'],
                    itemStyle : {
                        normal : {
                            label : {
                                show : false
                            },
                            labelLine : {
                                show : false
                            }
                        },
                        emphasis : {
                            label : {
                                show : true,
                                position : 'center',
                                textStyle : {
                                    fontSize : '30',
                                    fontWeight : 'bold'
                                }
                            }
                        }
                    },
                    data:[
                        {value:335, name:'Item A'},
                        {value:310, name:'Item B'},
                        {value:234, name:'Item C'},
                        {value:135, name:'Item D'},
                        {value:1548, name:'Item E'}
                    ]
                }
            ]
        };
                                            
                            
        
        // use configuration item and data specified to show chart
        doughnutChart.setOption(option3, true), $(function() {
                    function resize() {
                        setTimeout(function() {
                            doughnutChart.resize()
                        }, 100)
                    }
                    $(window).on("resize", resize), $(".ms-toggler").on("click", resize)
                });
  }
  
  public loadScript(url: string) {
    const body = <HTMLDivElement> document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }
  
}
