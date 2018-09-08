import { Component, ViewEncapsulation,OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import * as CanvasJS from './canvasjs.min'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {
	ngOnInit() {
    let dataPoints = [];
    let y = 0;		
    for ( var i = 0; i < 50; i++ ) {		  
      y += Math.round(5 + Math.random() * (-5 - 5));	
      dataPoints.push({ y: y});
    }
    console.log(dataPoints);
    
    let chart = new CanvasJS.Chart("chartContainer", {
      zoomEnabled: true,
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Token#1"
      },
      subtitles:[{
        text: "Try Zooming and Panning"
      }],
      data: [
      {
        type: "line",                
        dataPoints: dataPoints
      }]
    });
      
    chart.render();

    let chart2 = new CanvasJS.Chart("chartContainer2", {
      zoomEnabled: true,
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Token#2"
      },
      subtitles:[{
        text: "Try Zooming and Panning"
      }],
      data: [
      {
        type: "line",                
        dataPoints: dataPoints
      }]
    });
      
    chart2.render();

      }

}
