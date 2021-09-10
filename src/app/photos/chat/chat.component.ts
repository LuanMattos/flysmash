import {Component, OnInit, SimpleChanges, OnChanges} from '@angular/core';

@Component({
  selector:  'app-chat',
  templateUrl:  './chat.component.html',
  styleUrls:  ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, OnChanges{

  constructor(
  ) { }

  ngOnInit(): void{
  }
  ngOnChanges(changes: SimpleChanges): void{
  }
  
}
