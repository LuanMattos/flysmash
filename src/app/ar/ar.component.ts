import {Component, OnInit} from '@angular/core';
const AFRAME = require('aframe')

@Component({
    selector: 'app-ar',
    templateUrl: 'ar.component.html',
    styleUrls: ['./ar.component.scss'],
})
export class ArComponent implements  OnInit{
    ngOnInit(): void{
        // var cursor = document.getElementById('cursor');
        // cursor.addEventListener('click', function () {
        //     alert('rtete')
        // });

        // AFRAME.registerComponent('scale-on-mouseenter', {
        //     schema: {
        //       to: {default: '2.5 2.5 2.5', type: 'vec3'}
        //     },
        
        //     init: function () {
        //       var data = this.data;
        //       var el = this.el;
        //       this.el.addEventListener('mouseenter', function () {
        //         el.object3D.scale.copy(data.to);
        //       });
        //     }
        //   });
    }
}