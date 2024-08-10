import { useEffect, useState } from "react";
import validateData from "../utils/validateData";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ViewData({ data }: { data: any }) {
  const [isValid, setIsValid] = useState(true);

  const headers = data[0];
  const rows = data.slice(1);

  useEffect(() => {
    setIsValid(validateData(data).length === 0);
  }, [data]);

  return (
    <>
      {data.length > 0 && isValid && (
        <div className="mt-4">
          <h2 className="text-xl font-bold">Uploads</h2>
          <div className="bg-secondary-bg p-4 rounded-2xl text-secondary-text mt-12">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-primary-bg">
                  {headers.map((header, index) => (
                    <th key={index} className="border p-2 text-left">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, rowIndex) => (
                  <tr key={rowIndex} className="border-b">
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex} className="border-r p-2">
                        {cellIndex === 1 ? (
                          <a
                            href={cell}
                            className="text-blue-500 hover:underline"
                          >
                            {cell}
                          </a>
                        ) : cellIndex === 3 ? (
                          <select className="border rounded p-1">
                            <option>Select Tags</option>
                            {cell.split(", ").map((tag, i) => (
                              <option key={i}>{tag}</option>
                            ))}
                          </select>
                        ) : cellIndex === 4 ? (
                          <div className="flex flex-wrap gap-1">
                            {cell.split(", ").map((tag, i) => (
                              <span
                                key={i}
                                className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        ) : (
                          cell
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}
