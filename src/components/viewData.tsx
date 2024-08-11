import { useEffect, useState } from "react";
import validateData from "../utils/validateData";
import { MdClose } from "react-icons/md";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ViewData({ data }: { data: any }) {
  const [isValid, setIsValid] = useState(false);

  const headers = ["Sl No.", "Links", "Prefix", "Add Tags", "Selected Tags"];
  const rows = data.slice(1);

  useEffect(() => {
    if (data.length === 0) return;
    const errors = validateData(data);
    console.log(errors);
    if (errors.length > 0) {
      setIsValid(false);
      window.alert("Invalid data format");
    } else {
      setIsValid(true);
    }
  }, [data]);

  return (
    <>
      {data.length > 0 && isValid && (
        <div className="mt-4">
          <h2 className="text-xl font-bold">Uploads</h2>
          <div className="bg-secondary-bg p-4 rounded-2xl text-secondary-text mt-12">
            <table className="w-full border-separate border-spacing-y-3">
              <thead>
                <tr className="">
                  {headers.map((header: string, index: number) => (
                    <th key={index} className="p-2 text-left">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row: string[], rowIndex: number) => (
                  <tr key={rowIndex} className="p-2 bg-primary-bg rounded-2xl gap-4">
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex} className="p-2">
                        {cellIndex === 1 ? (
                          <a
                            href={cell}
                            className="text-blue-500 hover:underline"
                          >
                            {cell}
                          </a>
                        ) : cellIndex === 3 ? (
                          <select className="rounded p-1 bg-secondary-bg">
                            <option>Select Tags</option>
                            {cell.split(", ").map((tag: string, i: number) => (
                              <option key={i}>{tag}</option>
                            ))}
                          </select>
                        ) : cellIndex === 4 ? (
                          <div className="flex flex-wrap gap-1">
                            {cell.split(", ").length > 0 &&
                              cell !== "" &&
                              cell.split(", ").map((tag: string, i: number) => (
                                <span
                                  key={i}
                                  className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm flex flex-row gap-2 items-center hover:cursor-pointer hover:bg-opacity-80"
                                >
                                  {tag}
                                  <MdClose />
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
