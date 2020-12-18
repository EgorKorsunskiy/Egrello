import { makeAutoObservable } from "mobx";
import { UID } from "../../utilits";
import { Card } from "../Card/card";

export class Table {
    id = UID();
    name = '';
    cards = [];

    constructor( table ){

        Object.assign(this, table);

        makeAutoObservable( this );
    }

    addCard(name){
        this.cards.push(
            new Card({tableId: this.id,name})
        );
    }
    addCardAtIndex(name, index){
        this.cards.splice(index, 0, new Card({tableId: this.id,name}));
    }
    deleteCard(index){
        this.cards.splice(index, 1);
    }
}