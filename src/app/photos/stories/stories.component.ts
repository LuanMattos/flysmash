import {AfterViewInit, Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';


import { UserService } from 'src/app/core/user/user.service';
import SwiperCore, { EffectCube, Navigation } from "swiper";
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
UIkit.use(Icons);


SwiperCore.use([EffectCube, Navigation]);

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.scss']
})
export class StoriesComponent implements OnInit, AfterViewInit {
  form: FormGroup;
  $user;
  openModalStories:boolean;
  right:boolean;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void{
    this.$user = this.userService.getUser();
    // this.form = this.formBuilder.group({});  
  }
  screen(){
    this.right= !this.right;
  }
  ngAfterViewInit(): void{    
  }
  openModal(){
    this.openModalStories = !this.openModalStories;
  }
  
}

