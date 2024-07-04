import { styles } from "@/app/Style";
import CoursePlayer from "@/app/Utils/CoursePlayer";
import Ratings from "@/app/Utils/Ratings";
import React, { FC } from "react";
import { IoCheckmarkDoneOutline } from "react-icons/io5";

type Props = {
  active: number;
  setActive: (active: number) => void;
  courseData: any;
  handleCourseCreate: any;
  isEdit: boolean;
};

const CoursePreview: FC<Props> = ({
  active,
  setActive,
  courseData,
  handleCourseCreate,
  isEdit,
}) => {
  const discountPercentage =
    ((courseData?.estimatedPrice - courseData?.price) /
      courseData?.esitmatedPrice) *
    100;

  const discountPercentagePrice = discountPercentage.toFixed(0);

  const prevButton = () => {
    setActive(active - 1);
  };

  const createCourse = () => {
    handleCourseCreate();
  };

  return (
    <div className="w-[90%] m-auto py-5 mb-5">
      <div className="w-full relative">
        <div className="w-full mt-10">
          <CoursePlayer
            videoUrl={courseData?.demoUrl}
            title={courseData?.title}
          />
        </div>
        <div className="flex items-center">
          <h1 className="pt-5 text-[25px]">
            {courseData?.price === 0 ? "Free" : courseData?.price + "$"}
          </h1>
          <h5 className="pl-3 text-[20px] mt-2 line-through opacity-80">
            {courseData?.estimatedPrice}$
          </h5>
          <h4>{discountPercentagePrice}% Off</h4>
        </div>

        <div className="flex items-center">
          <div
            className={`${styles.button} text-white !w-[180px] my-3 font-Poppins !bg-[crimson] cursor-not-allowed`}
          >
            Buy Now {courseData?.price}$
          </div>
        </div>

        <div className="flex items-center">
          <input
            type="text"
            name=""
            id=""
            placeholder="Discount code..."
            className={`${styles.input} 1500px:!w-[50%] 1100px:w-[60%]   !mt-0`}
          />
          <div
            className={`${styles.button} text-white !w-[120px] my-3 ml-4 font-Poppins cursor-pointer`}
          >
            Apply
          </div>
        </div>

        <ul className="list-disc">
          <li>Source code included</li>
          <li>Full lifetime access</li>
          <li>Certificate of completion</li>
          <li>Premium Support</li>
        </ul>
      </div>

      <div className="w-full 800px:pr-5 mt-4">
        <h1 className="text-[25px] font-Poppins font-[600]">
          {courseData?.name}
        </h1>
        <div className="flex items-center justify-between pt-3">
          <div className="flex items-center">
            <Ratings rating={0} />
            <h5>0 Reviews</h5>
          </div>
          <h5>0 Students</h5>
        </div>
        <br />
        <h1 className="text-[25px] font-Poppins font-[600]">
          What you will learn from this course?
        </h1>
      </div>
      {courseData?.benefits?.map((item: any, index: number) => (
        <div key={index} className="w-full flex 800px:items-center py-2">
          <div className="w-[15px] mr-1">
            <IoCheckmarkDoneOutline size={20} />
          </div>
          <p className="pl-2">{item.title}</p>
        </div>
      ))}

      <br />
      {/* prerequisites */}
      <h1 className="text-[25px] font-Poppins font-[600]">Prerequisites</h1>
      {courseData?.prerequisites?.map((item: any, index: number) => (
        <div key={index} className="w-full flex 800px:items-center py-2">
          <div className="w-[15px] mr-1">
            <IoCheckmarkDoneOutline size={20} />
          </div>
          <p className="pl-2">{item.title}</p>
        </div>
      ))}

      <br />

      {/* course description */}
      <div className="w-full">
        <h1 className="text-[25px]  font-Poppins font-[600]">Course Details</h1>
        <p className="whitespace-pre-line overflow-hidden text-[18px] text-gray-500">
          {courseData?.description}
        </p>
      </div>

      <div className="flex justify-between mt-5">
        <button
          className={`${styles.button} text-white text-sm`}
          onClick={prevButton}
          style={{ width: "20%" }}
        >
          Previous
        </button>
        <button
          style={{ width: "20%" }}
          onClick={createCourse}
          className={`${styles.button} text-white text-sm`}
        >
          {isEdit ? "Update" : "Create"}
        </button>
      </div>
    </div>
  );
};

export default CoursePreview;
