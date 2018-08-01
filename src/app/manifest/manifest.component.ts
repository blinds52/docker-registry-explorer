import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ClientService } from '../client.service';

@Component({
  selector: 'app-manifest',
  templateUrl: './manifest.component.html',
  styleUrls: ['./manifest.component.scss']
})

export class ManifestComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private clientService: ClientService,
    private location: Location
  ) {}

  ngOnInit() {
    this.getManifest();
  }

  getManifest(): void {

    var mythis = this;

    var tag = this.route.snapshot.paramMap.get('tag');
    this.clientService.getManfiest(tag)
      .subscribe(manifest => mythis.manifest = JSON.stringify(manifest, null,4));
  }

  manifest: string;

}
