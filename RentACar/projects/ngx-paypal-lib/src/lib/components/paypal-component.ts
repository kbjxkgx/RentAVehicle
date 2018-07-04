import { AfterViewInit, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';

import { PayPalFunding } from '../models/paypal-funding';
import { PayPalIntegrationType } from '../models/paypal-integration';
import { IPaypalClient, IPayPalPaymentCompleteData, PayPalConfig } from '../models/paypal-models';

/**
 * Global variable where PayPal is loaded to
 */
declare var paypal: any;

@Component({
    selector: 'ngx-paypal',
    template: `
    <div #payPalScriptElem></div>
    <div #payPalButtonContainerElem [id]="payPalButtonContainerId"></div>
    `
})
export class NgxPaypalComponent implements OnChanges, AfterViewInit {

    /**
     * Configuration for paypal.
     */
    @Input() config: PayPalConfig;

    /**
     * Indicates if global configuration (provided via 'forRoot') is used
     */
    @Input() useGlobalConfig = false;

    /**
     * Container for paypal script
     */
    @ViewChild('payPalScriptElem') paypalScriptElem: ElementRef;

    /**
     * Used for indicating delayed rendered if container is not yet ready in DOM
     */
    private registerPayPalScriptWhenContainerIsReady = false;

    /**
     * Holds current container element
     */
    private _payPalButtonContainerElem?: ElementRef;
    @ViewChild('payPalButtonContainerElem') set payPalButtonContainerElem(content: ElementRef) {
        if (content) {
            this._payPalButtonContainerElem = content;
        }
    }

    /**
    * Name of the global variable where paypal is stored
    */
    private readonly paypalWindowName = 'paypal';

    /**
     * PayPal integration script url
     */
    private readonly paypalScriptUrl = 'https://www.paypalobjects.com/api/checkout.js';

    /**
     * Id of the element where PayPal button will be rendered
     */
    public payPalButtonContainerId?: string;

    private readonly payPalButtonContainerIdPrefix = 'ngx-paypal-button-container-';

    constructor(
    ) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        // init when config once its available
        if (this.config) {
            this.initPayPal();
        }
    }

    ngAfterViewInit(): void {
        // register script if element is ready in dom
        if (this.registerPayPalScriptWhenContainerIsReady && this._payPalButtonContainerElem) {
            this.setupScript();
            this.registerPayPalScriptWhenContainerIsReady = false;
        }
    }

    private initPayPal(): void {
        // set unique paypal container button id
        this.payPalButtonContainerId = `${this.payPalButtonContainerIdPrefix}${this.getPseudoUniqueNumber()}`;
        // check if paypal was already register and if so, don't add it to page again
        if (!window[this.paypalWindowName]) {
            // register script
            this.addPayPalScriptToPage();
        } else {
            // just register payment
            this.handleScriptRegistering();
        }
    }

    private getPseudoUniqueNumber(): number {
        return new Date().valueOf();
    }

    private addPayPalScriptToPage(): void {
        const script = document.createElement('script');
        script.innerHTML = '';
        script.src = this.paypalScriptUrl;
        script.onload = () => this.handleScriptRegistering();
        script.async = true;
        script.defer = true;

        this.paypalScriptElem.nativeElement.appendChild(script);
    }

    private handleScriptRegistering(): void {
        // check if container with requested id exists
        // this is here because dynamically switching between components would cause PayPal to
        // throw an error if the container already existed before
        if (this._payPalButtonContainerElem && this._payPalButtonContainerElem.nativeElement &&
            this._payPalButtonContainerElem.nativeElement.id === this.payPalButtonContainerId) {
            // container is ready, setup script right away
            this.setupScript();
        } else {
            // container is not ready, delay registering until it is
            this.registerPayPalScriptWhenContainerIsReady = true;
        }
    }

    private setupScript(): void {
        // first clear container
        if (!this._payPalButtonContainerElem) {
            throw Error(`Cannot setup script because paypal button container with id '${this.payPalButtonContainerId}' is not yet ready`);
        }

        this._payPalButtonContainerElem.nativeElement.innerHTML = '';

        if (!window[this.paypalWindowName]) {
            throw Error('PayPal script is not available', );
        }

        // render PayPal button as per their docs at
        // https://developer.paypal.com/docs/integration/direct/express-checkout/integration-jsv4/add-paypal-button/
        window[this.paypalWindowName].Button.render({
            // set environment
            env: this.config.environment.toString(),

            // Show the buyer a 'Pay Now' button in the checkout flow
            commit: this.config.commit,

            // init client for client side integration
            client: this.getClient(),

            // set button config if available
            style: this.config.button,

            // set funding if available
            funding: this.getFunding(),

            // payment() is called when the button is clicked
            payment: (data, actions) => {
                if (this.config.integrationType === PayPalIntegrationType.ServerSideREST) {
                    // client needs to create payment on server side
                    if (!this.config.payment) {
                        throw Error(`You need set up a create payment method and return
                            PayPal's payment id when using server side integration`);
                    }

                    // Paypal expects promise with payment id (string) to be returned
                    return this.config.payment().toPromise()
                        .then(paymentId => {
                            return paymentId;
                        });
                }

                if (this.config.integrationType === PayPalIntegrationType.ClientSideREST) {
                    if (!this.config.transactions || !Array.isArray(this.config.transactions) || this.config.transactions.length <= 0) {
                        throw Error(`You need to provide at least 1 transaction for client side integration`);
                    }

                    return actions.payment.create({
                        payment: {
                            transactions: this.config.transactions
                        }
                    });
                }
            },

            // onAuthorize() is called when the buyer approves the payment
            onAuthorize: (data: IPayPalPaymentCompleteData, actions: any) => {
                if (this.config.integrationType === PayPalIntegrationType.ServerSideREST) {
                    // client needs to server to execute the payment
                    if (!this.config.onAuthorize) {
                        throw Error(`You need set up an execute method when using server side integration`);
                    }

                    // Paypal expects promise
                    return this.config.onAuthorize(data, actions).toPromise();
                }

                if (this.config.integrationType === PayPalIntegrationType.ClientSideREST) {
                    // Make a call to the REST api to execute the payment
                    return actions.payment.execute().then(() => {
                        if (!this.config.onPaymentComplete) {
                            throw Error(`You should provide some callback when payment is finished when using client side integration`);
                        }
                        this.config.onPaymentComplete(data, actions);
                    });
                }
            },

            onError: (err) => {
                if (this.config.onError) {
                    this.config.onError(err);
                }
            },

            onCancel: (data, actions) => {
                if (this.config.onCancel) {
                    this.config.onCancel(data, actions);
                }
            }
        }, `#${this.payPalButtonContainerId}`);
    }

    private getClient(): IPaypalClient | undefined {
        if (this.config.integrationType === PayPalIntegrationType.ClientSideREST) {
            if (!this.config.client) {
                throw Error(`You need to setup client information when using client side integration`);
            }

            return {
                production: this.config.client.production,
                sandbox: this.config.client.sandbox
            };
        }

        return undefined;
    }

    private getFunding(): {
        allowed: any[],
        disallowed: any[]
    } | undefined {
        // resolve funding to use paypal's properties
        if (!this.config.funding) {
            // no funding provided
            return undefined;
        }

        const allowed: any[] = [];
        const disallowed: any[] = [];

        if (this.config.funding.allowed) {
            this.config.funding.allowed.forEach(type => {
                allowed.push(this.mapFundingType(type));
            });
        }

        if (this.config.funding.disallowed) {
            this.config.funding.disallowed.forEach(type => {
                disallowed.push(this.mapFundingType(type));
            });
        }

        return {
            allowed: allowed,
            disallowed: disallowed
        };
    }

    private mapFundingType(type: PayPalFunding): any {
        if (type === PayPalFunding.Card) {
            return paypal.FUNDING.CARD;
        }
        if (type === PayPalFunding.Credit) {
            return paypal.FUNDING.CREDIT;
        }
        if (type === PayPalFunding.Elv) {
            return paypal.FUNDING.ELV;
        }
        throw Error(`Unsupported funding type '${type}'`);
    }
}

