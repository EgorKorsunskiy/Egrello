import { makeAutoObservable } from "mobx";

export class Card {
    id = 0;
    name = '';

    constructor( card ){

        Object.assign( this, card );

        makeAutoObservable( this );
    }
}