"use client";
import { styles } from "@/app/Style";
import Image from "next/image";
import React, { FC, useState } from "react";
import { AiFillFileImage } from "react-icons/ai";

type Props = {
  courseInfo: any;
  setCourseInfo: (courseInfo: any) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseInformation: FC<Props> = ({
  courseInfo,
  setCourseInfo,
  active,
  setActive,
}) => {
  const [dragging, setDragging] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setActive(active + 1);
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setCourseInfo({ ...courseInfo, thumbnail: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: any) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCourseInfo({ ...courseInfo, thumbnail: reader.result });
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-[80%] m-auto mt-24">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="courseName" className={styles.label}>
            Course Name
          </label>
          <input
            type="text"
            name="courseName"
            required
            value={courseInfo.name}
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, name: e.target.value })
            }
            id="courseName"
            placeholder="MERN stack LMS Platform with next js 13 version"
            className={`${styles.input}`}
          />
        </div>

        <div>
          <label htmlFor="courseDescription" className={styles.label}>
            Course Description
          </label>
          <textarea
            name="courseDescription"
            id="courseDescription"
            cols={30}
            rows={8}
            className={`${styles.input} !h-min !py-2`}
            value={courseInfo.description}
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, description: e.target.value })
            }
            placeholder="Write something amazing..."
          ></textarea>
        </div>

        <div className="w-full flex justify-between">
          <div className="w-[45%]">
            <label htmlFor="price" className={styles.label}>
              Course Price
            </label>
            <input
              type="number"
              name="price"
              required
              value={courseInfo.price}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, price: e.target.value })
              }
              id="price"
              placeholder="2550.00"
              className={`${styles.input}`}
            />
          </div>

          <div className="w-[50%]">
            <label htmlFor="estimatedPrice" className={styles.label}>
              Esitmated Price (Optional)
            </label>
            <input
              type="number"
              name="estimatedPrice"
              required
              value={courseInfo.estimatedPrice}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, estimatedPrice: e.target.value })
              }
              id="estimatedPrice"
              placeholder="2450.00"
              className={`${styles.input}`}
            />
          </div>
        </div>

        <div>
          <label htmlFor="tags" className={styles.label}>
            Course Tags
          </label>
          <input
            type="text"
            name="tags"
            required
            value={courseInfo.tags}
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, tags: e.target.value })
            }
            id="tags"
            placeholder="MERN,NEXT13,SOCKET IO,TAILWINDCSS,LMS,REACT"
            className={`${styles.input}`}
          />
        </div>

        <div className="w-full flex justify-between">
          <div className="w-[45%]">
            <label htmlFor="level" className={styles.label}>
              Course Level
            </label>
            <input
              type="text"
              name="level"
              required
              value={courseInfo.level}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, level: e.target.value })
              }
              id="level"
              placeholder="Begginer / Intermediate / Expert"
              className={`${styles.input}`}
            />
          </div>

          <div className="w-[50%]">
            <label htmlFor="demoUrl" className={styles.label}>
              Demo Url
            </label>
            <input
              type="text"
              name="demoUrl"
              required
              value={courseInfo.demoUrl}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, demoUrl: e.target.value })
              }
              id="demoUrl"
              placeholder="eeftgef"
              className={`${styles.input}`}
            />
          </div>
        </div>

        <div className="w-full">
          <label htmlFor="file" className={styles.label}>
            Thmubnail
          </label>
          <label
            htmlFor="file"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {courseInfo.thumbnail ? (
              <>
                <Image
                  src={courseInfo.thumbnail}
                  alt=""
                  className="max-h-full w-full object-cover"
                  width={50}
                  height={50}
                />
              </>
            ) : (
              <>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    <AiFillFileImage
                      className="mx-auto h-12 w-12 text-gray-300"
                      aria-hidden="true"
                    />
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="file"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file"
                          name="file"
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          onChange={handleFileChange}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </>
            )}
          </label>
        </div>

        <div className="flex justify-between">
          <button
            type="submit"
            className={`${styles.button} w-[25%] text-white text-sm`}
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default CourseInformation;
