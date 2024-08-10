/* eslint-disable @typescript-eslint/no-explicit-any */
import { MdOutlineFileUpload } from "react-icons/md";
import { useState, CSSProperties } from "react";
import { useCSVReader, formatFileSize } from "react-papaparse";
import ViewData from "../../components/viewData";

const GREY = "#CCC";
const GREY_DIM = "#686868";

const styles = {
  zone: {
    alignItems: "center",
    border: `2px dashed ${GREY}`,
    borderRadius: 20,
    display: "flex",
    flexDirection: "column",
    height: "100%",
    justifyContent: "center",
    padding: 20,
  } as CSSProperties,
  zoneHover: {
    borderColor: GREY_DIM,
  } as CSSProperties,
  default: {
    borderColor: GREY,
  } as CSSProperties,
};

export default function Upload() {
  const { CSVReader } = useCSVReader();
  const [zoneHover, setZoneHover] = useState(false);

  const [data, setData] = useState<any>([]);

  return (
    <div className="bg-secondary-bg md:bg-primary-bg text-primary-text w-full h-full overflow-y-auto flex flex-col p-4">
      <h1 className="text-2xl">Upload CSV</h1>
      <div className="w-full max-h-[600px] h-full flex flex-row items-center justify-center">
        <div className="bg-secondary-bg rounded-lg p-4 w-full h-full max-w-[600px] max-h-[360px] flex flex-col items-center gap-4">
          <div className="h-full w-full  rounded-2xl">
            <CSVReader
              onUploadAccepted={(results: any) => {
                console.log(results.data);
                setData(results.data);
                setZoneHover(false);
              }}
              onDragOver={(event: DragEvent) => {
                event.preventDefault();
                setZoneHover(true);
              }}
              onDragLeave={(event: DragEvent) => {
                event.preventDefault();
                setZoneHover(false);
              }}
              multiple={false}
              onUploadRejected={(file: any) => {
                console.log(file);
                window.alert("File rejected");
              }}
            >
              {({
                getRootProps,
                acceptedFile,
                getRemoveFileProps,
                ProgressBar,
              }: any) => (
                <>
                  <div
                    {...getRootProps()}
                    style={Object.assign(
                      {},
                      styles.zone,
                      zoneHover && styles.zoneHover
                    )}
                  >
                    {acceptedFile ? (
                      <div className="h-full w-full flex flex-col items-center justify-center">
                        <h1 className="text-primary-text text-xl">
                          {acceptedFile.name}
                        </h1>
                        <p>{formatFileSize(acceptedFile.size)}</p>
                        <button
                          {...getRemoveFileProps()}
                          className="text-red-500 font-semibold p-2 rounded-md"
                        >
                          Remove
                        </button>
                        <ProgressBar />
                      </div>
                    ) : (
                      "Drop CSV file here or click to upload"
                    )}
                  </div>
                </>
              )}
            </CSVReader>
          </div>
          <button className="w-full px-4 p-2 bg-accent-bg text-primary-bg font-semibold rounded-md flex flex-row items-center justify-center gap-4">
            <MdOutlineFileUpload className="h-8 w-8" /> Upload
          </button>
        </div>
      </div>
      {data && <ViewData data={data} />}
    </div>
  );
}
