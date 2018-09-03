import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-smart',
  templateUrl: './smart.component.html',
  encapsulation: ViewEncapsulation.None
})

export class SmartComponent {
  
  constructor() { 
    var acc = document.getElementsByClassName("accordion");
    var i;
    
    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.display === "block") {
                panel.style.display = "none";
            } else {
                panel.style.display = "block";
            }
        });
    }
  }

  

}
