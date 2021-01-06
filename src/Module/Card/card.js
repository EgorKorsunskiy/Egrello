import { makeAutoObservable } from "mobx";
import { UID } from "../../utilits";

export class Card {
    id = UID();
    tableId = '';
    name = '';
    description = '';

    constructor( card ){

        Object.assign( this, card );

        makeAutoObservable( this );
    }
}