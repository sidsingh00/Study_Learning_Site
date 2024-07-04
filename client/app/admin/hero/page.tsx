/* eslint-disable @next/next/no-img-element */
"use client";
import { styles } from "@/app/Style";
import {
  useEditLayoutMutation,
  useGetLayoutDataQuery,
} from "@/redux/features/layout/layoutApi";
import React, { useState, FC, useEffect } from "react";
import toast from "react-hot-toast";
import { AiOutlineCamera } from "react-icons/ai";

type Props = {};

const Page: FC<Props> = (props: Props) => {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const { data, refetch } = useGetLayoutDataQuery("Banner", {
    refetchOnMountOrArgChange: true,
  });
  const [editLayout, { isSuccess, error }] = useEditLayoutMutation();

  const handleUpdate = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = async () => {
    await editLayout({
      type: "Banner",
      image,
      title,
      subTitle,
    });
    refetch();
  };

  useEffect(() => {
    if (data) {
      setTitle(data?.layout?.banner.title);
      setSubTitle(data?.layout?.banner.subTitle);
      setImage(data?.layout?.banner.image?.url);
    }

    if (isSuccess) {
      toast.success("Hero updated successfully");
    }

    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [data, isSuccess, error]);
  return (
    <>
      <div className="w-full 1000px:flex items-center">
        <div className="absolute top-[100px] 1000px:top-[unset] 1500px:h-[700px] 1500px:w-[700px] 1100px:h-[600px] 1100px:w-[600px] h-[50vh] w-[50vh] hero-animation rounded-full mx-5"></div>
        <div className="1000px:w-[40%] flex 1000px:min-h-screen items-center justify-end pt-[70px] 1000px:pt-[0] z-10">
          <div className="relative flex items-center justify-end">
            <img
              src={image}
              alt=""
              className="object-contain 1100px:max-w-[65%] w-[65%] 1500px:max-w-[65%] h-[auto] z-[10]"
            />
            <input
              type="file"
              name=""
              id="banner"
              accept="image/*"
              onChange={handleUpdate}
              className="hidden"
            />
            <label htmlFor="banner" className="absolute bottom-0 right-0 z-20">
              <AiOutlineCamera className="dark:text-white text-black text-[50px] cursor-pointer" />
            </label>
          </div>
        </div>
        <div className="1000px:w-[60%] flex flex-col items-center 1000px:mt-[0px] 1000px:text-left mt-[150px]">
          <textarea
            className="dark:text-white text-[#000000ac] text-[30px] px-3 w-full 1000px:text-[70px] font-[600] font-Josefin py-2 1000px:leading-[75px] 1500px:!w-[75%] 1100px:!w-[82%] resize-none text-black outline-0 "
            rows={4}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Improve Your Online Learning Experience Better Instantly"
          ></textarea>
          <br />

          <textarea
            className="dark:text-[#edfff4] text-[#000000ac] font-Josefin font-[600] text-[18px] 1500px:!w-[55%] 1100px:!w-[78%]dark:text-white resize-none text-black px-3 w-full  outline-0"
            rows={4}
            value={subTitle}
            onChange={(e) => setSubTitle(e.target.value)}
            placeholder="We have 40k+ online courses & 500k+ online registered students. Find your desired courses from them."
          ></textarea>
          <br />
          <br />
          <div className="1500px:w-[55%] 1100px:w-[78%] w-[90%] h-[50px] bg-transparent relative">
            <button
              className={`${styles.button}`}
              onClick={
                data?.layout?.banner.title !== title ||
                data?.layout?.banner.subTitle !== subTitle ||
                data?.layout?.banner.image?.url !== image
                  ? handleEdit
                  : () => null
              }
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
