import Button from "@components/Button";
import Layout from "./layout";
import Input from "@components/Input";
import React, { ChangeEvent, FormEvent, useRef, useState } from "react";
import { FaUpload } from "react-icons/fa";
import Loader from "@components/Loader";
import { MAX_UPLOAD_SIZE } from "config";
import { api } from "config/api";
import toast from "react-hot-toast";
interface IError {
  file: string;
  password: string;
  general: "";
}

const UploadPage = () => {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<IError>({
    file: "",
    password: "",
    general: "",
  });
  const openBox = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const displayFileName = (e: ChangeEvent<HTMLInputElement>) => {
    setError((prev) => ({ ...prev, file: "" }));
    let file = e.target.files?.[0];
    file && setFile(file);
  };

  const update = (e: ChangeEvent<HTMLInputElement>) => {
    error.password && setError((prev) => ({ ...prev, password: "" }));
    setPassword(e.target.value);
  };

  const upload = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      setError((prev) => ({ ...prev, file: "File is required" }));
      return;
    }
    if (!password) {
      setError((prev) => ({ ...prev, password: "Password is required" }));
      return;
    }

    const size = file.size / (1024 * 1024);
    if (size > MAX_UPLOAD_SIZE.size) {
      setError((prev) => ({
        ...prev,
        file: `Max file size is ${MAX_UPLOAD_SIZE.size}${MAX_UPLOAD_SIZE.type}`,
      }));
    }
    const formData = new FormData();
    formData.append("cert", file);
    formData.append("pass", password);
    setLoading(true);
    try {
      const { data } = await api.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
     
      toast.success(data.msg);
    } catch (error) {
     const err = error as any;
      const apiError = err.response?.data?.msg;
      if (apiError) {
        toast.error(apiError);
      } else {
        toast.error(err.message || "An Error Occurred");
      }
    } finally {
      setLoading((prev) => false);
    }
  };
  return (
    <Layout title="Upload Certificate <> Techathon">
      {loading && <Loader />}
      <div className="rounded-md bg-white shadow-xl p-5 max-w-lg lg:p-10 mx-auto">
        <h1 className="text-center font-techathonMedium text-primary text-2xl">
          Upload Certificate Data
        </h1>
        <form
          encType="multipart/form-data"
          onSubmit={upload}
          className="mt-2 flex flex-col space-y-3 items-center"
        >
          <div
            onClick={openBox}
            className="cursor-pointer group w-28 h-28 rounded-lg border-2 border-slate-200 hover:border-primary/30 duration-500 flex flex-col items-center justify-center space-y-2"
          >
            <FaUpload className="text-slate-300 text-5xl group-hover:text-primary/70 duration-500" />
            <span className="text-xs text-center max-w-[90%] mx-auto text-slate-300 group-hover:text-primary/70 duration-500">
              Select file to upload
            </span>
          </div>
          <p
            className={`!my-[4px] text-center text-sm italic line-clamp-2 ${
              error.file ? "text-red-600" : "text-slate-400"
            }`}
          >
            {file?.name || ""}
            {error.file && (
              <span className="block mt-4 text-xs">{error.file}</span>
            )}
          </p>

          <Input
            onChange={displayFileName}
            ref={inputRef}
            error=""
            className="hidden"
            type="file"
            name="cert_file"
            accept=".xlsx"
          />
          <Input
            error={error.password}
            value={password}
            onChange={update}
            className=""
            placeholder="Upload Password"
            type="password"
            name="password"
          />
          <Button disabled={loading}>Upload</Button>
        </form>
      </div>
    </Layout>
  );
};

export default UploadPage;
