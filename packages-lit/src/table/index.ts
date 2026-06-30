import {
  html,
  TemplateResult
} from "lit";

import "./index.css";

export interface ITableColumn<T extends Record<string, unknown> = Record<string, unknown>> {
  key: keyof T;
  title: string;
  width?: string;
  align?: "left" | "center" | "right";
  render?: (value: T[keyof T], record: T, index: number) => TemplateResult | string;
}

export interface ITableProps<T extends Record<string, unknown> = Record<string, unknown>> {
  columns: ITableColumn<T>[];
  data: T[];
  bordered?: boolean;
  striped?: boolean;
  size?: "small" | "medium" | "large";
  headerBackground?: string;
}

const Table = <T extends Record<string, unknown>>({
  columns,
  data,
  bordered = false,
  striped = false,
  size = "medium",
  headerBackground
}: ITableProps<T>): TemplateResult => {
  const renderCell = (column: ITableColumn<T>, record: T, index: number): TemplateResult | string => {
    const value = record[column.key];

    if (column.render) {
      return column.render(value, record, index);
    }

    return String(value ?? "");
  };

  return html`
    <table class=${[
    "storybook-table",
    `storybook-table--${size}`,
    bordered ? "storybook-table--bordered" : "",
    striped ? "storybook-table--striped" : ""
  ].filter(Boolean).join(" ")}>
      <thead>
        <tr style=${headerBackground ? `background-color: ${headerBackground}` : ""}>
          ${columns.map(column => {
    return html`
      <th
        style=${column.width ? `width: ${column.width}` : ""}
        class=${column.align ? `storybook-table--align-${column.align}` : ""}
      >
        ${column.title}
      </th>
    `;
  })}
        </tr>
      </thead>
      <tbody>
        ${data.map((record, rowIndex) => {
    return html`
      <tr>
        ${columns.map(column => {
    return html`
      <td
        class=${column.align ? `storybook-table--align-${column.align}` : ""}
      >
        ${renderCell(column, record, rowIndex)}
      </td>
    `;
  })}
      </tr>
    `;
  })}
      </tbody>
    </table>
  `;
};

export default Table;
