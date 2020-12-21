import { makeAutoObservable } from "mobx";
import { UID } from "../../utilits";
import { Table } from "../Table/table";

export class Board {
    id = UID();
    title = '';
    color = '';
    tables = []

    constructor( board ){

        this.setDefaultColor(board.defaultColor);

        Object.assign( this, board );

        makeAutoObservable( this );
    }

    addTable(name){
        this.tables.push(new Table({name}))
    }
    deleteTable(tableId){
        const index = this.tables.findIndex(table => table.id = tableId);
        this.tables.splice(index, 1);
    }
    setDefaultColor(color){
        this.color = color;
    }
}