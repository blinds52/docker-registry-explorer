import { Component, OnInit, Input } from '@angular/core';
import { Tag } from '../tag';

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.scss']
})
export class ExplorerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.registry = 'docker.io';
    this.repository = 'ubuntu';
    this.insecure = false;
    this.anonymous = true;
  }

  onLoad() {

    var drc = require('docker-registry-client');
    
    var client = drc.createClientV2({name: this.repository});

    console.log(this.registry);
    console.log(this.repository);

    var mythis = this;
    
    client.listTags(function (err, tags) {

      //Create a place to put the transformed tags
      let otherTags: Array<Tag> = [];

      //Consider each of the source tags
      for (let tag of tags.tags) {

        //Add the transformed tag
        otherTags.push(
          new Tag(mythis.registry, tags.name, tag)
        )
      }

      mythis.tags = otherTags;
  
      /*
        * Because the client is typically using Keep-Alive, it will maintain
        * open connections. Therefore you should call `.close()` to close
        * those when finished.
        */
      client.close();
    });
  }

/* To copy any Text */
copyText(val: string){
  let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  onCopy(tag: Tag): void {
    this.copyText(tag.qualifiedName);
  }

  @Input() registry: string;
  @Input() repository: string;
  @Input() insecure: boolean;
  @Input() anonymous: boolean;
  @Input() username: string;
  @Input() password: string;

  tags: Tag[];
}
