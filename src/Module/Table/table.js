import { makeAutoObservable } from "mobx";
import { Card } from "../Card/card";

export class Table {
    id = 0;
    name = '';
    cards = [];

    constructor( table ){

        Object.assign(this, table);

        makeAutoObservable( this );
    }

    addCard(name){
        this.cards.push(
            new Card({id: this.cards.length ,name})
        );
    }
    addCardAtIndex(name, index){
        this.cards.splice(index, 0, new Card({id: this.cards.length ,name}));
    }
    deleteCard(index){
        this.cards.splice(index, 1);
    }
}