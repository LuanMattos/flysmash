import {AfterViewInit, Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';


import { UserService } from 'src/app/core/user/user.service';
import SwiperCore, { EffectCube, Navigation } from "swiper";

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
    private userService: UserService
  ) {}

  ngOnInit(): void{
    this.$user = this.userService.getUser();
    // this.form = this.formBuilder.group({});  
  }
  screen(){
    this.right= !this.right;
    // var screen = document.getElementById("screen");
    
    //   if (screen.classList.contains("screen--showing-right")) {
    //     screen.classList.add("screen--showing-front");
    //     screen.classList.remove("screen--showing-right");
    //   } else {
    //     screen.classList.add("screen--showing-right");
    //     screen.classList.remove("screen--showing-front");
    //   }

  }
  ngAfterViewInit(): void{    
  }
  addStorie(){
    alert('add')
  }
  openModal(){
    this.openModalStories = !this.openModalStories;
  }
  
}

