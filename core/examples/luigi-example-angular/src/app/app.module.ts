import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { Sample1Component } from './sample1/sample1.component';
import { Sample2Component } from './sample2/sample2.component';
import { NgLuigiModule } from '../../dist/ng-luigi';
import { ExampleComponent, NormalExampleComponent, StaticExampleComponent } from './example/example.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    Sample1Component,
    Sample2Component,
    ExampleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgLuigiModule.forRoot({
      enableAutoNavigation: true
    })],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
