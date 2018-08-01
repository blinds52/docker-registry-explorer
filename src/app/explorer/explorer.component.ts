import { Component, OnInit, Input } from '@angular/core';
import { Tag } from '../tag';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.scss']
})
export class ExplorerComponent implements OnInit {

  constructor(public clientService: ClientService) { }

  ngOnInit() {

    this.onLoad();

  }

  onLoad() {

    //Clear the list
    this.tags = null;

    //Get the tags (observable)
    var tags = this.clientService.getTags();

    //capture this
    var mythis = this;

    //subscribe to the updates
    tags.subscribe(t => 
      {
        console.log("callback!");

        console.log(JSON.stringify(t, null, 4));

        mythis.tags = t; 
    })
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

  onManifest(tag: Tag): void {
    
    // var client = this.createClient();

    // console.log("Getting manifest");

    // var opts = {
    //   ref: tag.tag 
    // };

    // client.getManifest(opts, function (err, manifest){

    //   console.log(JSON.stringify(manifest, null, 4));

    // });

  }
  
  tags: Tag[];
}
