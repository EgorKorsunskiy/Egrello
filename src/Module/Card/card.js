import { makeAutoObservable } from "mobx";

export class Card {
    id = Math.floor(((Math.random() * Math.random() * Math.pow(10, Math.random())) * (Math.random() * 100))); // really random number
    tableId = 0;
    index = 0;
    name = '';

    constructor( card ){

        Object.assign( this, card );

        makeAutoObservable( this );
    }
}