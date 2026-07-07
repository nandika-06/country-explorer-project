import {
  type ColumnDef,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { memo } from "react";
import type { Country } from "../types";

type CountriesTableProps = {
  data: Country[];
  sorting: SortingState;
  setSorting: React.Dispatch<React.SetStateAction<SortingState>>;
  onRowClick?: (country: Country) => void;
  columnVisibility: VisibilityState;
  setColumnVisibility: React.Dispatch<React.SetStateAction<VisibilityState>>;
};

function CountriesTableComponent({
  data,
  sorting,
  setSorting,
  onRowClick,
  columnVisibility,
  setColumnVisibility,
}: CountriesTableProps) {
  const columns: ColumnDef<Country>[] = [
    {
      accessorKey: "emoji",
      header: "Flag",
      cell: ({ row }) => {
        return <span className="text-lg">{row.original.emoji}</span>;
      },
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => {
        return <span className="font-medium">{row.original.name}</span>;
      },
    },
    { accessorKey: "code", header: "Code" },
    { accessorKey: "capital", header: "Capital" },
    { accessorKey: "currency", header: "Currency" },
    {
      accessorFn: (row) => row.continent.name,
      id: "continent",
      header: "Continent",
    },
    {
      accessorKey: "emoji",
      header: "Emoji",
    },
    {
      accessorKey: "phone",
      header: "Phone",
    },
    {
      id: "statesCount",
      accessorFn: (row) => row.states?.length ?? 0,
      header: "States",
    },
  ];

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
  });

  console.log(table, "table");

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-slate-800 bg-slate-900 p-4">
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={table.getToggleAllColumnsVisibilityHandler()}
            className="px-3 py-1 rounded bg-slate-800 text-sm"
          >
            Toggle All
          </button>

          {table.getAllLeafColumns().map((column) => (
            <label key={column.id} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={column.getIsVisible()}
                onChange={column.getToggleVisibilityHandler()}
                disabled={!column.getCanHide()}
              />
              {column.id}
            </label>
          ))}
        </div>
      </div>
      <div className="rounded-lg border border-slate-800 bg-slate-900 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-800">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    console.log(header, "header");

                    return (
                      <th
                        key={header.id}
                        className="px-4 py-3 text-left font-semibold"
                      >
                        {header.isPlaceholder ? null : (
                          <button
                            type="button"
                            onClick={header.column.getToggleSortingHandler()}
                            className="flex items-center gap-1"
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                            {{
                              asc: "▲",
                              desc: "▼",
                            }[header.column.getIsSorted() as string] ?? null}
                          </button>
                        )}
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>

            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-t border-slate-800 cursor-pointer"
                  onClick={() => onRowClick?.(row.original)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-3">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between gap-4 p-4 border-t border-slate-800">
          <div className="text-sm text-slate-400">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="px-3 py-1 rounded bg-slate-800 disabled:opacity-50"
            >
              Prev
            </button>
            <button
              type="button"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="px-3 py-1 rounded bg-slate-800 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export const CountriesTable = memo(CountriesTableComponent);
