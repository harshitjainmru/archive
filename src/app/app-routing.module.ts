import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ACCOUNT, HOME, WELCOME } from "./constants/routes";
import { AccountGuard } from "./guards/account.guard";
import { UserResolverService } from "./resolvers/user-resolver.service";
import { FeatureGuard } from "./guards/feature.guard";

const routes: Routes = [
  {
    path: "sign-contract",
    loadChildren: () =>
      import("./modules/sign-contract/sign-contract.module").then(
        (m) => m.SignContractModule
      ),
  },
  {
    path: "",
    redirectTo: HOME.path,
    pathMatch: "full",
  },

  {
    path: WELCOME.path,
    loadChildren: () =>
      import("./modules/landing/landing.module").then((m) => m.LandingModule),
    canActivate: [AccountGuard],
    canLoad: [AccountGuard],
  },
  {
    path: ACCOUNT.path,
    loadChildren: () =>
      import("./modules/account/account.module").then((m) => m.AccountModule),
  },

  {
    path: HOME.path,
    loadChildren: () =>
      import("./modules/features/features.module").then(
        (m) => m.FeaturesModule
      ),
    resolve: { userData: UserResolverService },
    canLoad: [FeatureGuard],
    canActivate: [FeatureGuard],
  },
  {
    path: "**",
    loadChildren: () =>
      import("./modules/common/modules/not-found/not-found.module").then(
        (m) => m.NotFoundModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: "top",
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
