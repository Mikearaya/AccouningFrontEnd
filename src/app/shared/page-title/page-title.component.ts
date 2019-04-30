import { Component, OnInit } from "@angular/core";
import { NavigationEnd, Router, ActivatedRoute } from "@angular/router";
import { filter } from "rxjs/operators";

@Component({
  selector: "app-page-title",
  templateUrl: "./page-title.component.html",
  styleUrls: ["./page-title.component.css"]
})
export class PageTitleComponent implements OnInit {
  title = "";

  constructor(private router: Router, private route: ActivatedRoute) {}
  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(event => {
        let currentRoute = this.route.root;
        do {
          const childrenRoutes = currentRoute.children;
          currentRoute = null;
          childrenRoutes.forEach(route => {
            if (route.outlet === "primary") {
              this.title = route.snapshot.data.title;
              currentRoute = route;
            }
          });
        } while (currentRoute);
      });
  }
}
