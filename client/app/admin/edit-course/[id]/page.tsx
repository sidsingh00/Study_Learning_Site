"use client";
import CourseContent from "@/app/components/Admin/Course/CourseContent";
import CourseData from "@/app/components/Admin/Course/CourseData";
import CourseInformation from "@/app/components/Admin/Course/CourseInformation";
import CourseOptions from "@/app/components/Admin/Course/CourseOptions";
import CoursePreview from "@/app/components/Admin/Course/CoursePreview";
import {
  useEditCourseMutation,
  useGetAllCoursesQuery,
} from "@/redux/features/course/courseApi";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

type Props = {};

const Page = ({ params }: any) => {
  // get id from url parameters
  const id = params?.id;

  const { isLoading, data, refetch } = useGetAllCoursesQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  // get single course from all courses
  const course = data && data.courses.find((item: any) => item._id === id);

  const [active, setActive] = useState(0);
  const [courseInfo, setCourseInfo] = useState({
    name: "",
    description: "",
    price: "",
    estimatedPrice: "",
    tags: "",
    level: "",
    demoUrl: "",
    thumbnail: "",
  });
  const [benefits, setBenefits] = useState([{ title: "" }]);
  const [prerequisites, setPrerequisites] = useState([{ title: "" }]);
  const [courseContentData, setCourseContentData] = useState([
    {
      videoUrl: "",
      title: "",
      description: "",
      videoSection: "Untitled Section 1",
      links: [
        {
          title: "",
          url: "",
        },
      ],
      suggestion: "",
    },
  ]);
  const [courseData, setCourseData] = useState({});
  const [editCourse, { isSuccess, error }] = useEditCourseMutation();

  const handleSubmit = async () => {
    // format benefits array
    const formattedBenifits = benefits.map((benefit) => ({
      title: benefit.title,
    }));

    // format prerequisites array
    const formattedPrerequisites = prerequisites.map((prerequisite) => ({
      title: prerequisite.title,
    }));

    // format course content array
    const formattedCourseContent = courseContentData.map((courseContent) => ({
      videoUrl: courseContent.videoUrl,
      title: courseContent.title,
      description: courseContent.description,
      videoSection: courseContent.videoSection,
      links: courseContent.links.map((link) => ({
        title: link.title,
        url: link.url,
      })),
      suggestion: courseContent.suggestion,
    }));

    // prepare data object
    const data = {
      name: courseInfo.name,
      description: courseInfo.description,
      price: courseInfo.price,
      estimatedPrice: courseInfo.estimatedPrice,
      tags: courseInfo.tags,
      level: courseInfo.level,
      demoUrl: courseInfo.demoUrl,
      thumbnail: courseInfo.thumbnail,
      totalVideos: courseContentData.length,
      benefits: formattedBenifits,
      prerequisites: formattedPrerequisites,
      courseData: formattedCourseContent,
    };

    setCourseData(data);
  };

  const handleCourseCreate = async (e: any) => {
    const data = courseData;
    await editCourse({ id, data });
  };

  useEffect(() => {
    if (course) {
      setCourseInfo({
        name: course.name,
        description: course.description,
        price: course.price,
        estimatedPrice: course.estimatedPrice,
        tags: course.tags,
        level: course.level,
        demoUrl: course.demoUrl,
        thumbnail: course?.thumbnail?.url,
      });

      setBenefits(course.benefits);
      setPrerequisites(course.prerequisites);
      setCourseContentData(course.courseData);
    }
  }, [course]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Course updated successfully!");
      redirect("/admin/courses");
    }

    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error, isLoading]);
  return (
    <div className="w-full flex min-h-screen">
      <div className="w-[80%]">
        {active === 0 && (
          <CourseInformation
            courseInfo={courseInfo}
            setCourseInfo={setCourseInfo}
            active={active}
            setActive={setActive}
          />
        )}

        {active === 1 && (
          <CourseData
            benefits={benefits}
            setBenefits={setBenefits}
            prerequisites={prerequisites}
            setPrerequisites={setPrerequisites}
            active={active}
            setActive={setActive}
          />
        )}

        {active === 2 && (
          <CourseContent
            handleSubmit={handleSubmit}
            courseContentData={courseContentData}
            setCourseContentData={setCourseContentData}
            active={active}
            setActive={setActive}
          />
        )}

        {active === 3 && (
          <CoursePreview
            handleCourseCreate={handleCourseCreate}
            courseData={courseData}
            active={active}
            setActive={setActive}
            isEdit={true}
          />
        )}
      </div>
      <div className="w-[20%] mt-[100px] h-screen fixed z-[-1] top-16 right-0">
        <CourseOptions active={active} setActive={setActive} />
      </div>
    </div>
  );
};

export default Page;
