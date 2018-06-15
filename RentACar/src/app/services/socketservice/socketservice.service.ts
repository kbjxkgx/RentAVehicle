import { Injectable, EventEmitter } from '@angular/core';
import { Configuration } from '../../Constants/constants';
// declare the global variables
declare var $: any;

@Injectable()

export class SocketserviceService {

  // Declare the variables
  private proxy: any;
  private proxyName: string = 'notifications';
  private connection: any;

  // create the Event Emitter
  public notificationReceived: EventEmitter < string >;
  public connectionEstablished: EventEmitter < Boolean >;
  public connectionExists: Boolean;

  constructor() {

    this.connectionEstablished = new EventEmitter < Boolean > ();
    this.notificationReceived = new EventEmitter < string > ();
    this.connectionExists = false;
  }

  startHubConnection() {
    // create hub connection
    this.connection = $.hubConnection('http://localhost:51680/');
    this.connection.qs = { 'token' : 'Bearer ' + localStorage.jwt };
    // create new proxy as name already given in top
    this.proxy = this.connection.createHubProxy(this.proxyName);
    // register on server events
    this.registerOnServerEvents();

    // call the connecion start method to start the connection to send and receive events. 
    this.startConnection();
  }

  private startConnection(): void {
    this.connection.start()
    .done((data: any) => {
        console.log('Now connected ' + data.transport.name + ', connection ID= ' + data.id);
        this.connectionEstablished.emit(true);
        this.connectionExists = true;
    })
    .fail((error: any) => {
        console.log('Could not connect ' + error);
        this.connectionEstablished.emit(false);
    });
  }

  private registerOnServerEvents(): void {
    this.proxy.on('newNotification', (data: string) => {
        console.log('received notification: ' + data);
        this.notificationReceived.emit(data);
    });
  }

}
