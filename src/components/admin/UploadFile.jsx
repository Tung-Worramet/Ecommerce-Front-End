import React, { useState } from "react";
import { toast } from "react-toastify";
import Resizer from "react-image-file-resizer";
import { removeFiles, uploadFiles } from "../../api/product";
import useEcomStore from "../../store/ecom-store";
import { Loader } from "lucide-react";

const UploadFile = ({ form, setForm }) => {
  // // Standard
  // const [isLoading, setIsLoading] = useState(false);
  // const token = useEcomStore((state) => state.token);

  // const handleOnChange = (e) => {
  //   setIsLoading(true);
  //   const files = e.target.files;

  //   if (files) {
  //     setIsLoading(true);
  //     let allFiles = form.images; // [] empty array
  //     for (let i = 0; i < files.length; i++) {
  //       // Validate file type
  //       const file = files[i];
  //       if (!file.type.startsWith("image/")) {
  //         toast.error(`File ${file.name} not image`);
  //         continue;
  //       }
  //       // Image Resize
  //       Resizer.imageFileResizer(
  //         files[i],
  //         720,
  //         720,
  //         "JPEG",
  //         100,
  //         0,
  //         (data) => {
  //           // endpoint Backend
  //           uploadFiles(token, data)
  //             .then((res) => {
  //               allFiles.push(res.data);
  //               setForm({
  //                 ...form,
  //                 images: allFiles,
  //               });
  //               setIsLoading(false);
  //               toast.success("Upload Image Success");
  //             })
  //             .catch((err) => {
  //               console.log(err);
  //               setIsLoading(false);
  //             });
  //         },
  //         "base64"
  //       );
  //     }
  //   }
  // };

  // const handleDelete = async (public_id) => {
  //   const images = form.images;
  //   await removeFiles(token, public_id)
  //     .then((res) => {
  //       const filterImages = images.filter((item) => {
  //         return item.public_id !== public_id;
  //       });

  //       setForm({
  //         ...form,
  //         images: filterImages,
  //       });

  //       toast.error(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const [isLoading, setIsLoading] = useState(false);
  const token = useEcomStore((state) => state.token);

  const handleOnChange = (e) => {
    const files = e.target.files;
    if (!files) return;

    let allFiles = [...form.images]; // สำเนา images ปัจจุบัน
    setIsLoading(true);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error(`ไฟล์ ${file.name} ไม่ใช่รูปภาพ`);
        continue;
      }

      // Image Resize
      Resizer.imageFileResizer(
        file,
        720,
        720,
        "JPEG",
        100,
        0,
        (data) => {
          uploadFiles(token, data)
            .then((res) => {
              allFiles.push(res.data); // เพิ่มรูปใหม่เข้า array
              setForm({ ...form, images: allFiles });
              toast.success(`อัพโหลดรูปภาพ ${file.name} สำเร็จ`);
            })
            .catch((err) => {
              console.error(`Error uploading ${file.name}`, err);
              toast.error(`อัพโหลดรูป ${file.name} ล้มเหลว`);
            })
            .finally(() => setIsLoading(false)); // ปิดสถานะโหลด
        },
        "base64"
      );
    }
  };

  const handleDelete = async (public_id) => {
    setIsLoading(true); // ตั้งสถานะโหลด
    try {
      const res = await removeFiles(token, public_id);
      const filterImages = form.images.filter(
        (item) => item.public_id !== public_id
      );

      setForm({ ...form, images: filterImages });
      toast.success(res.data || "ลบรูปภาพสำเร็จ");
    } catch (err) {
      console.error("Error deleting file:", err);
      toast.error("ลบรูปภาพล้มเหลว");
    } finally {
      setIsLoading(false); // ปิดสถานะโหลด
    }
  };

  return (
    // // Standard
    // <div className="my-4">
    //   {
    //     // ถ้า isLoading เป็น true จะทำใน () ถ้าเป็น false จะไม่ทำ
    //     isLoading && (
    //       <div className="flex justify-center items-center h-full">
    //         <Loader className="animate-spin w-16 h-16" />
    //       </div>
    //     )
    //   }
    //   {/* <Loader className="animate-spin w-16 h-16" /> */}
    //   {/* Image */}
    //   <div className="flex gap-4 my-4">
    //     {form.images.map((item, index) => (
    //       <div className="relative" key={index}>
    //         <img src={item.url} className="w-24 h-24 hover:scale-105" />
    //         <span
    //           className="absolute top-0 right-0 bg-red-500 p-1 rounded"
    //           onClick={() => handleDelete(item.public_id)}
    //         >
    //           X
    //         </span>
    //       </div>
    //     ))}
    //   </div>

    //   <div>
    //     {/* ใส่ multiple เพื่อให้เลือกได้หลายรุป */}
    //     <input onChange={handleOnChange} type="file" name="images" multiple />
    //   </div>
    // </div>

    // แต่ง css
    <div className="my-4">
      {/* รูปภาพที่อัพโหลด */}
      <div className="my-4">
        <h2 className="text-lg font-bold text-gray-800 mb-2">
          รูปภาพที่อัพโหลด
        </h2>

        {/* Loader */}
        {isLoading && (
          <div className="flex justify-center items-center h-32">
            <Loader className="animate-spin w-16 h-16 text-blue-500" />
          </div>
        )}

        <div className="flex flex-wrap gap-4">
          {form.images.map((item, index) => (
            <div
              className="relative w-24 h-24 border border-gray-200 rounded-lg shadow-md overflow-hidden group"
              key={index}
            >
              <img
                src={item.url}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                alt={`Uploaded ${index + 1}`}
              />
              <button
                className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => handleDelete(item.public_id)}
              >
                X
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* เพิ่มรูปภาพ */}
      <h2 className="text-lg font-bold text-gray-800 mb-2">เพิ่มรูปภาพ</h2>
      <label className="block">
        <span className="sr-only">เลือกไฟล์</span>
        <input
          onChange={handleOnChange}
          type="file"
          name="images"
          multiple
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100
          "
        />
      </label>
    </div>
  );
};

export default UploadFile;
