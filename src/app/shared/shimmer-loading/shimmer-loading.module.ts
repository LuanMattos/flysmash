import { CommonModule } from "@angular/common";
import {NgModule} from "@angular/core";
import { ShimmerLoadingComponent } from "./shimmer-loading.component";

@NgModule({
  declarations:[ShimmerLoadingComponent],
  exports:[ShimmerLoadingComponent],
  imports: [
    CommonModule,
  ]
})
export class ShimmerLoadingModule{

}
