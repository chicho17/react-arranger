import React from "react";
import { Box } from "theme-ui";

import { CellConfig, Dict, Column } from "../types";
import { Cell } from "./Cell";
import { RowArranger } from "./RowArranger";

type Props = {
  column: Column;
  cellConfigMap: Dict<CellConfig>;
};

const ColumnArranger = ({ column, cellConfigMap }: Props) => {
  return (
    <Box
      sx={{
        rowGap: column.rowGap,
        display: "grid"
      }}
    >
      {column.cells.map(({ cellItem }) => {
        if (typeof cellItem === "string") {
          return (
            <Box>
              <Cell cellConfig={cellConfigMap[cellItem]} />
            </Box>
          );
        }

        return (
          <Box>
            <RowArranger row={cellItem} cellConfigMap={cellConfigMap} />
          </Box>
        );
      })}
    </Box>
  );
};

export { ColumnArranger };
