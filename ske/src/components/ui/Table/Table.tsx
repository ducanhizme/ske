import React from 'react';
import { UIComponentProps } from '@/types';

export interface TableColumn<T> {
  key: keyof T;
  title: string;
  render?: (value: unknown, record: T) => React.ReactNode;
}

export interface TableProps<T> extends UIComponentProps {
  columns: TableColumn<T>[];
  data: T[];
  loading?: boolean;
  emptyText?: string;
}

export const Table = <T extends Record<string, unknown>>({
  className = '',
  columns,
  data,
  loading = false,
  emptyText = "No data available",
  ...props
}: TableProps<T>) => {
  const baseClasses = "w-full border-collapse border border-gray-300";
  const combinedClasses = `${baseClasses} ${className}`;

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-sm text-gray-500">Loading...</div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-sm text-gray-500">{emptyText}</div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className={combinedClasses} {...props}>
        <thead>
          <tr className="bg-gray-50">
            {columns.map((column) => (
              <th
                key={String(column.key)}
                className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-900"
              >
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((record, index) => (
            <tr key={index} className="even:bg-gray-50">
              {columns.map((column) => (
                <td
                  key={String(column.key)}
                  className="border border-gray-300 px-4 py-2"
                >
                  {column.render
                    ? column.render(record[column.key], record)
                    : String(record[column.key] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};