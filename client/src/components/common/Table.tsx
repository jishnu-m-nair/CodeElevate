import React from 'react';

type StringKey<T> = Extract<keyof T, string>;

export interface Column<T> {
  key: StringKey<T> | '__index';
  header: string;
  render?: (row: T, index: number) => React.ReactNode;
  width?: string;
}

export interface TableAction<T> {
  label: string;
  onClick: (row: T) => void;
  icon?: React.ReactNode;
  variant?: 'primary' | 'danger' | 'secondary';
  show?: (row: T) => boolean;
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  actions?: TableAction<T>[];
  isLoading?: boolean;
  emptyMessage?: string;
  onRowClick?: (row: T) => void;
  keyExtractor: (row: T) => string | number;
}

export function Table<T>({
  data,
  columns,
  actions,
  isLoading = false,
  emptyMessage = 'No data available',
  onRowClick,
  keyExtractor,
}: TableProps<T>) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="text-center py-8 text-gray-500">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-md border">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-50 border-b">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                style={{ width: column.width }}
              >
                {column.header}
              </th>
            ))}

            {actions && actions.length > 0 && (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            )}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {data.map((row, rowIndex) => (
            <tr
              key={keyExtractor(row)}
              className={
                onRowClick
                  ? 'cursor-pointer hover:bg-gray-50'
                  : undefined
              }
              onClick={() => onRowClick?.(row)}
            >
              {columns.map((column, colIndex) => {
                if (column.key === '__index') {
                  return (
                    <td
                      key={`index-${colIndex}`}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                    >
                      {column.render?.(row, rowIndex)}
                    </td>
                  );
                }

                const value = row[column.key as keyof T];

                return (
                  <td
                    key={column.key}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                  >
                    {column.render
                      ? column.render(row, rowIndex)
                      : typeof value === 'string' ||
                        typeof value === 'number' ||
                        typeof value === 'boolean'
                      ? value
                      : String(value ?? '')}
                  </td>
                );
              })}

              {actions && actions.length > 0 && (
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex gap-2">
                    {actions.map((action, idx) => {
                      if (action.show && !action.show(row)) {
                        return null;
                      }

                      return (
                        <button
                          key={idx}
                          onClick={(e) => {
                            e.stopPropagation();
                            action.onClick(row);
                          }}
                          className={`px-3 py-1 rounded text-sm ${
                            action.variant === 'danger'
                              ? 'bg-red-600 text-white hover:bg-red-700'
                              : action.variant === 'secondary'
                              ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                              : 'bg-blue-600 text-white hover:bg-blue-700'
                          }`}
                        >
                          {action.icon && (
                            <span className="mr-1">
                              {action.icon}
                            </span>
                          )}
                          {action.label}
                        </button>
                      );
                    })}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
