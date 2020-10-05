import React from "react";
import { Box } from "theme-ui";

import { CellConfig, Dict, Row } from "../types";
import { Cell } from "./Cell";
import { ColumnArranger } from "./ColumnArranger";

type Props = {
  row: Row;
  cellConfigMap: Dict<CellConfig>;
};

const RowArranger = ({ row, cellConfigMap }: Props) => {
  const gridTemplateColumns = row.cells
    .reduce(
      (acc, cell) => {
        acc[0].push(cell.cellSpan[0]);
        acc[1].push(cell.cellSpan[1]);
        acc[2].push(cell.cellSpan[2]);
        return acc;
      },
      [[], [], []]
    )
    .map((list) =>
      list.every((val) => val === "full")
        ? "none"
        : list
            .map((val) => (typeof val === "number" ? `${val}px` : val))
            .join(" ")
    );

  return (
    <Box
      sx={{
        gridTemplateColumns,
        display: "grid",
        columnGap: row.columnGap,
        rowGap: row.rowGap
      }}
    >
      {row.cells.map(({ cellItem }) => {
        if (typeof cellItem === "string") {
          return (
            <Box>
              <Cell cellConfig={cellConfigMap[cellItem]} />
            </Box>
          );
        }

        return (
          <Box>
            <ColumnArranger column={cellItem} cellConfigMap={cellConfigMap} />
          </Box>
        );
      })}
    </Box>
  );
};

export { RowArranger };
