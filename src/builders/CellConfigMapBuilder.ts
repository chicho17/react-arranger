import { CellConfig, Dict } from "../types";

class CellConfigMapBuilder {
  cellIdToCellConfig: Dict<CellConfig> = {};

  addCellConfig<P>(cellConfig: CellConfig<P>) {
    this.cellIdToCellConfig = {
      ...this.cellIdToCellConfig,
      [cellConfig.cellId]: (cellConfig as unknown) as CellConfig,
    };
    return this;
  }

  removeCellItem<P>(cellConfig: CellConfig<P>) {
    this.cellIdToCellConfig = { ...this.cellIdToCellConfig };
    delete this.cellIdToCellConfig[cellConfig.cellId];
    return this;
  }

  updateCellItem<P>(cellConfig: CellConfig<P>) {
    if (this.cellIdToCellConfig[cellConfig.cellId]) {
      this.cellIdToCellConfig = {
        ...this.cellIdToCellConfig,
        [cellConfig.cellId]: (cellConfig as unknown) as CellConfig,
      };
    }
    return this;
  }

  build(): Dict<CellConfig> {
    return this.cellIdToCellConfig;
  }
}

export { CellConfigMapBuilder };
