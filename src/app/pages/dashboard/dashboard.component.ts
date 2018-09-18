import { Component, ViewEncapsulation,OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import * as CanvasJS from './canvasjs.min'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

  chart = [];
	ngOnInit() {


    // let dataPoints = [];
    // let y = 0;		
    // for ( var i = 0; i < 50; i++ ) {		  
    //   y += Math.round(5 + Math.random() * (-5 - 5));	
    //   dataPoints.push({ y: y});
    // }
    // console.log(dataPoints);
    
    // let chart = new CanvasJS.Chart("chartContainer", {
    //   zoomEnabled: true,
    //   animationEnabled: true,
    //   exportEnabled: true,
    //   title: {
    //     text: "Token#1"
    //   },
    //   subtitles:[{
    //     text: "Try Zooming and Panning"
    //   }],
    //   data: [
    //   {
    //     type: "line",                
    //     dataPoints: dataPoints
    //   }]
    // });
      
    // chart.render();

    // let chart2 = new CanvasJS.Chart("chartContainer2", {
    //   zoomEnabled: true,
    //   animationEnabled: true,
    //   exportEnabled: true,
    //   title: {
    //     text: "Token#2"
    //   },
    //   subtitles:[{
    //     text: "Try Zooming and Panning"
    //   }],
    //   data: [
    //   {
    //     type: "line",                
    //     dataPoints: dataPoints
    //   }]
    // });
      
    // chart2.render();




    this.chart = new Chart('canvas',{
      type: 'line',
			data: {
				labels: [ // Date Objects
					'Sep 17',
					' Sep 18 ',
					' Sep 18 ',
					' Sep 19 ',
					' Sep 10 ',
					' Sep 21 ',
					' Sep 22 ',
				],
				datasets: [ {
					label: 'Dataset with point data',
					backgroundColor: '#ffff',
					borderColor: '#000',
					fill: false,
					data: [{
						x: '09/17/2018 15:37',
						y: '40'
					}, {
						x: '09/18/2018 13:37',
						y: '100'
					}, {
						x: '09/20/2018 13:37',
						y: '33'
					}, {
						x: '09/18/2018 13:37',
						y: '88'
					}],
				}]
			},
			// options: {
			// 	title: {
			// 		text: 'Chart.js Time Scale'
			// 	},
			// 	scales: {
			// 		xAxes: [{
			// 			type: 'time',
			// 			time: {
			// 				format: timeFormat,
							
			// 				tooltipFormat: 'll HH:mm'
			// 			},
			// 			scaleLabel: {
			// 				display: true,
			// 				labelString: 'Date'
			// 			}
			// 		}],
			// 		yAxes: [{
			// 			scaleLabel: {
			// 				display: true,
			// 				labelString: 'value'
			// 			}
			// 		}]
			// 	},
			// }
    });
      }

}
