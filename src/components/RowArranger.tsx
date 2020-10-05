import React from "react";
import { Box } from "theme-ui";

import { CellConfig, CellSpanTuple, Dict, Row } from "../types";
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
      [[], [], []] as [
        (number | "1fr")[],
        (number | "1fr")[],
        (number | "1fr")[]
      ]
    )
    .map((list, index) =>
      row.containerType[index] === "COLUMN"
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
        rowGap: row.rowGap,
      }}
    >
      {row.cells.map(({ cellItem }) => {
        if (typeof cellItem === "string") {
          return (
            <Box key={cellItem}>
              <Cell cellConfig={cellConfigMap[cellItem]} />
            </Box>
          );
        }

        return (
          <Box key={cellItem.id}>
            <ColumnArranger column={cellItem} cellConfigMap={cellConfigMap} />
          </Box>
        );
      })}
    </Box>
  );
};

export { RowArranger };
