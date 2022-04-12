import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './layout/landing-page/landing-page.component';
import { LoginComponent } from './security/login/login.component';
import { SignUpComponent } from './security/sign-up/sign-up.component';
import { HomeComponent } from './layout/home/home.component';
import { AboutUsComponent } from './components/sections/about-us/about-us.component';
import { ContactUsComponent } from './components/sections/contact-us/contact-us.component';
import { ForumComponent } from './components/sections/forum/forum.component';
import{ViewPostComponent} from './components/view-post/view-post.component';
import { PageNotFoundComponent } from './layout/page-not-found/page-not-found.component';
import { AuthGuard } from "./security/auth/auth.guard";




const routes: Routes = [ 
  { path: '', component: LandingPageComponent },
  {path: 'login', component: LoginComponent },
  {path: 'signup', component: SignUpComponent},
  {path:'about-us', component: AboutUsComponent},
  {path:'contact-us', component: ContactUsComponent},
  {path:'forum', component: ForumComponent},
  {path:'view-post/:id', component:ViewPostComponent},
  {path:'page-not-found', component:PageNotFoundComponent},

  {
    path:'home', component:HomeComponent,
    children: [

      { path: '', loadChildren: () => import('./layout/dashboard/dashboard.module').then(m => m.DashboardModule),canActivate: [AuthGuard]},
      { path: 'create-post', loadChildren: () => import('./components/post/create-post/create-post.module').then(m => m.CreatePostModule),canActivate: [AuthGuard]},
      { path: 'post-list', loadChildren: () => import('./components/post/post-list/post-list.module').then(m => m.PostListModule),canActivate: [AuthGuard]},
      { path: 'add-category',  loadChildren: () => import('./components/post/add-category/add-category.module').then(m => m.AddCategoryModule),canActivate: [AuthGuard]},

    ]
  },

  { path: "**", redirectTo: "page-not-found" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],





exports: [RouterModule]
})
export class AppRoutingModule { }
