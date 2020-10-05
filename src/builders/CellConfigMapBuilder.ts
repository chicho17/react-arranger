import { CellConfig, Dict } from "../types";

class CellConfigMapBuilder {
  cellIdToCellConfig: Dict<CellConfig> = {};

  addCellConfig(cellConfig: CellConfig) {
    this.cellIdToCellConfig = {
      ...this.cellIdToCellConfig,
      [cellConfig.cellId]: cellConfig,
    };
    return this;
  }

  removeCellItem(cellConfig: CellConfig) {
    this.cellIdToCellConfig = { ...this.cellIdToCellConfig };
    delete this.cellIdToCellConfig[cellConfig.cellId];
    return this;
  }

  updateCellItem(cellConfig: CellConfig) {
    if (this.cellIdToCellConfig[cellConfig.cellId]) {
      this.cellIdToCellConfig = {
        ...this.cellIdToCellConfig,
        [cellConfig.cellId]: cellConfig,
      };
    }
    return this;
  }

  build(): Dict<CellConfig> {
    return this.cellIdToCellConfig;
  }
}

export { CellConfigMapBuilder };
