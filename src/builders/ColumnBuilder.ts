import { Column, Cell, Row } from "../types";

function makeIdGenerator() {
  let id = 1;
  return function generateId() {
    return `${id++}`;
  };
}

const idGenerator = makeIdGenerator();

function getCellId(cell: Cell | Row) {
  return typeof cell === "string" ? cell : cell.id;
}

class ColumnBuilder {
  id: Column["id"] = idGenerator();
  isHidden: Column["isHidden"] = false;
  additional: Column["additional"] = {};
  rowGap: Column["rowGap"];
  cells: Column["cells"] = [];
  cellIdToIndex = new Map<string, number>();

  static getRowBuilder(Column: Column) {
    return new ColumnBuilder({
      yGap: Column.rowGap,
      isHidden: Column.isHidden,
      additional: Column.additional,
      cells: Column.cells,
      id: Column.id
    });
  }

  constructor(input: {
    yGap: Column["rowGap"];
    isHidden?: Column["isHidden"];
    additional?: Column["additional"];
    cells?: Column["cells"];
    id?: Column["id"];
  }) {
    this.rowGap = input.yGap;

    if (input.isHidden != null) {
      this.isHidden = input.isHidden;
    }

    if (input.additional != null) {
      this.additional = input.additional;
    }

    if (input.cells != null) {
      this.cells = input.cells;
      this.cellIdToIndex = new Map(
        input.cells.map((cell, index) => [getCellId(cell.cellItem), index])
      );
    }

    if (input.id != null) {
      this.id = input.id;
    }

    return this;
  }

  addCell(cell: Cell | Row) {
    this.cells = this.cells.concat({ cellItem: cell });
    this.cellIdToIndex.set(getCellId(cell), this.cells.length - 1);
    return this;
  }

  removeCell(cellId: string) {
    const index = this.cellIdToIndex.get(cellId);
    if (index == null) {
      return this;
    }
    this.cells = [
      ...this.cells.slice(0, index),
      ...this.cells.slice(index + 1)
    ];
    this.cellIdToIndex.delete(cellId);
    return this;
  }

  setAdditional(additional: any) {
    this.additional = additional;
    return this;
  }

  markHidden() {
    this.isHidden = true;
    return this;
  }

  markVisible() {
    this.isHidden = false;
    return this;
  }

  build(): Column {
    return {
      id: this.id,
      isHidden: this.isHidden,
      additional: this.additional,
      rowGap: this.rowGap,
      cells: this.cells
    };
  }
}

export { ColumnBuilder };
