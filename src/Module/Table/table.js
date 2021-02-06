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
    addCardAtIndex(name, description, index){
        console.log(description)
        this.cards.splice(index, 0, new Card({tableId: this.id,name,description}));
    }
    deleteCard(cardId){
        const index = this.cards.findIndex(card => card.id === cardId);
        this.cards.splice(index, 1);
    }
}