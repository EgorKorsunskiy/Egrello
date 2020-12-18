import { makeAutoObservable } from "mobx"
import { Board } from "../Module/Board";

export class BoardState {
    boards = [];
    availableColors = ['rgb(0, 121, 191)', 'rgb(176, 70, 50)','rgb(81, 152, 57)', 'rgb(137, 96, 158)', 'rgb(205, 90, 145)', 'rgb(210, 144, 52)']

    constructor(){
        makeAutoObservable( this );
    }

    deleteBoard(id){
        if(this.boards.length){
            this.boards.filter(el => el.id !== id)
        }
    }

    addBoard(title, color){
        this.boards.push(new Board({id: this.boards.length,title,color,defaultColor: this.availableColors[0]}));
    }

    getDefaultColor(){
        return this.availableColors[0];
    }
}