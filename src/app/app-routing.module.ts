import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExplorerComponent } from './explorer/explorer.component';
import { ManifestComponent } from './manifest/manifest.component';
import { DefaultComponent } from './default/default.component';

const routes: Routes = [
    { path: '', component: ExplorerComponent },
    // { path: 'tags', component: ExplorerComponent },
    // { path: 'manifest/:tag', component: ManifestComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})

export class AppRoutingModule { }
