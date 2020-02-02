import { Component, OnInit } from '@angular/core';
import { ScrollEvent } from 'ngx-scroll-event';
import { Router, RouterState, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { identifierModuleUrl } from '@angular/compiler';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor(router: Router) {
    const state: RouterState = router.routerState;
    const snapshot: RouterStateSnapshot = state.snapshot;
    const root: ActivatedRouteSnapshot = snapshot.root;
    const child = root.firstChild;
    console.log(child,'child')
    const id: Observable<string> = child.params.slug
    id.subscribe( data => {console.log(data,'data')  })
   }

  ngOnInit() {
   
  }

  public handleScroll(event: ScrollEvent) {
    // console.log('scroll occurred', event.originalEvent);
    if (event.isReachingBottom) {
      console.log(`the user is reaching the bottom`);
    }
    if (event.isReachingTop) {
      console.log(`the user is reaching the Top`);
    }
    if (event.isWindowEvent) {
      console.log(`This event is fired on Window not on an element.`);
    }
    
  }
}
