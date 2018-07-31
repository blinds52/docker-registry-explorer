import { Injectable, Input } from '@angular/core';
import { Tag } from './tag';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor() { 
    this.registry = 'docker.io';
    this.repository = 'ubuntu';
    this.insecure = false;
    this.anonymous = true;
  }

  createClient() {

    var drc = require('docker-registry-client');

    var name = `${this.registry}/${this.repository}`;

    console.log(name);

    var options;
    
    if (this.anonymous) {
      options = {
        name: name,
        insecure: this.insecure,
      };
    } else {
      options = {
        name: name,
        insecure: this.insecure,
        username: this.username,
        password: this.password,
      };
    }
    
    //Create the client
    var client = drc.createClientV2(options);

    return client;
  }

  getTags(): Observable<Tag[]> {

    var mythis = this;

    return Observable.create(observer => {

      var client = mythis.createClient();
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
 
        observer.next(otherTags);
        observer.complete();

        client.close();

      });
    });
  }

  @Input() registry: string;
  @Input() repository: string;
  @Input() insecure: boolean;
  @Input() anonymous: boolean;
  @Input() username: string;
  @Input() password: string;
}
