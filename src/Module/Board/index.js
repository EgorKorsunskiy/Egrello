import { makeAutoObservable } from "mobx";
import { UID } from "../../utilits";
import { Table } from "../Table/table";

export class Board {
    id = UID();
    title = '';
    color = '';
    tables = [];

    constructor( board ){

        this.setDefaultColor(board.defaultColor);

        Object.assign( this, board );

        makeAutoObservable( this );
    }

    addTable(name){
        this.tables.push(new Table({name}))
    }
    addTableAtIndex(name, index, cards){
        this.tables.splice(index, 0, new Table({name,cards}));
    }
    deleteTable(tableId){
        const index = this.tables.findIndex(table => table.id === tableId);
        this.tables.splice(index, 1);
    }
    swapTables(fromTable, fromTableIndex, fromTableCards, table, tableIndex, tableCards){

        this.deleteTable(fromTableIndex);
        this.deleteTable(tableIndex - 1)

        this.addTableAtIndex(fromTable.name, fromTableIndex, fromTableCards);
        this.addTableAtIndex(table.name, tableIndex, tableCards);
    }
    setDefaultColor(color){
        this.color = color;
    }
}