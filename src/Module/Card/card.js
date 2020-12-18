import { makeAutoObservable } from "mobx";
import { UID } from "../../utilits";

export class Card {
    id = UID();
    tableId = 0;
    name = '';

    constructor( card ){

        Object.assign( this, card );

        makeAutoObservable( this );
    }
}