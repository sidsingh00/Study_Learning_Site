import { styles } from "@/app/Style";
import React, { FC, useState } from "react";
import { AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { BsLink45Deg, BsPencil } from "react-icons/bs";
import toast from "react-hot-toast";

type Props = {
  active: number;
  setActive: (active: number) => void;
  courseContentData: any;
  setCourseContentData: (courseContentData: any) => void;
  handleSubmit: any;
};

const CourseContent: FC<Props> = ({
  active,
  setActive,
  courseContentData,
  setCourseContentData,
  handleSubmit: handleCourseSubmit,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(
    Array(courseContentData.length).fill(false)
  );

  const [activeSection, setActiveSection] = useState(1);

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  const handleCollapseToggle = (index: number) => {
    const updatedCollapsed = [...isCollapsed];
    updatedCollapsed[index] = !updatedCollapsed[index];
    setIsCollapsed(updatedCollapsed);
  };

  const handleRemoveLink = (index: number, linkIndex: number) => {
    const updateData = [...courseContentData];
    updateData[index].links.splice(linkIndex, 1);
    setCourseContentData(updateData);
  };

  const handleAddLink = (index: number) => {
    const updateData = [...courseContentData];
    updateData[index].links.push({ title: "", url: "" });
    setCourseContentData(updateData);
  };

  const newContentHandler = (item: any) => {
    if (
      item.title === "" ||
      item.description === "" ||
      item.videoUrl === "" ||
      item.links[0].title === "" ||
      item.links[0].url === ""
    ) {
      toast.error("Please fill all the fields first!");
    } else {
      let newVideoSection = "";

      if (courseContentData.length > 0) {
        const lastVideoSection =
          courseContentData[courseContentData.length - 1].videoSection;

        // use the last videoSection if available, else use user input
        if (lastVideoSection) {
          newVideoSection = lastVideoSection;
        }
      }

      const newContent = {
        videoUrl: "",
        title: "",
        description: "",
        videoSection: newVideoSection,
        links: [
          {
            title: "",
            url: "",
          },
        ],
        suggestion: "",
      };

      setCourseContentData([...courseContentData, newContent]);
    }
  };

  const addNewSection = () => {
    if (
      courseContentData[courseContentData.length - 1].title === "" ||
      courseContentData[courseContentData.length - 1].description === "" ||
      courseContentData[courseContentData.length - 1].videoUrl === "" ||
      courseContentData[courseContentData.length - 1].links[0].title === "" ||
      courseContentData[courseContentData.length - 1].links[0].url === ""
    ) {
      toast.error("Please fill all the fields first!");
    } else {
      setActiveSection(activeSection + 1);
      const newContent = {
        videoUrl: "",
        title: "",
        description: "",
        videoSection: `Untitled Section ${activeSection + 1}`,
        links: [
          {
            title: "",
            url: "",
          },
        ],
        suggestion: "",
      };
      setCourseContentData([...courseContentData, newContent]);
    }
  };

  const prevButton = () => {
    setActive(active - 1);
  };

  const handleOptions = () => {
    if (
      courseContentData[courseContentData.length - 1].title === "" ||
      courseContentData[courseContentData.length - 1].description === "" ||
      courseContentData[courseContentData.length - 1].videoUrl === "" ||
      courseContentData[courseContentData.length - 1].links[0].title === "" ||
      courseContentData[courseContentData.length - 1].links[0].url === ""
    ) {
      toast.error("Section cannot be empty!");
    } else {
      setActive(active + 1);
      handleCourseSubmit();
    }
  };

  return (
    <div className="w-[80%] m-auto mt-12 p-3">
      <form onSubmit={handleSubmit}>
        {courseContentData?.map((item: any, index: number) => {
          const showSectionInput =
            index === 0 ||
            item.videoSection !== courseContentData[index - 1].videoSection;

          return (
            <>
              <div
                className={`w-full bg-[#cdc8c817] p-4 ${
                  showSectionInput ? "mt-10" : "mt-0"
                }`}
              >
                {showSectionInput && (
                  <>
                    <div className="flex w-full items-center">
                      <input
                        type="text"
                        className={`text-[20px] ${
                          item.videoSection === "Untitled Section"
                            ? "w-[170px]"
                            : "w-full"
                        } font-Poppins cursor-pointer bg-transparent outline-none`}
                        value={item.videoSection}
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index].videoSection = e.target.value;
                          setCourseContentData(updatedData);
                        }}
                      />
                      <BsPencil className="cursor-pointer hover:text-green-500" />
                    </div>
                  </>
                )}
                <div className="flex w-full items-center justify-between my-0">
                  {isCollapsed[index] ? (
                    <>
                      {item.title ? (
                        <p className="font-Poppins">
                          {index + 1}. {item.title}
                        </p>
                      ) : (
                        <></>
                      )}
                    </>
                  ) : (
                    <div></div>
                  )}
                  {/* arrow button for collaped video content */}
                  <div className="flex items-center">
                    <AiOutlineDelete
                      className={`text-[20px] mr-2 ${
                        index > 0 ? "cursor-pointer" : "cursor-no-drop"
                      }`}
                      onClick={() => {
                        if (index > 0) {
                          const updateData = [...courseContentData];
                          updateData.splice(index, 1);
                          setCourseContentData(updateData);
                        }
                      }}
                    />
                    <MdOutlineKeyboardArrowDown
                      fontSize="large"
                      className="cursor-pointer hover:text-blue-500"
                      style={{
                        transform: isCollapsed[index]
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                      }}
                      onClick={() => handleCollapseToggle(index)}
                    />
                  </div>
                </div>
                {!isCollapsed[index] && (
                  <>
                    <div className="my-3">
                      <label htmlFor="videoTitle" className={styles.label}>
                        Video Title
                      </label>
                      <input
                        type="text"
                        placeholder="Project Plan"
                        className={styles.input}
                        value={item.title}
                        onChange={(e) => {
                          const updateData = [...courseContentData];
                          updateData[index].title = e.target.value;
                          setCourseContentData(updateData);
                        }}
                      />
                    </div>

                    <div className="my-3">
                      <label htmlFor="videoUrl" className={styles.label}>
                        Video Url
                      </label>
                      <input
                        type="text"
                        placeholder="URL"
                        className={styles.input}
                        value={item.videoUrl}
                        onChange={(e) => {
                          const updateData = [...courseContentData];
                          updateData[index].videoUrl = e.target.value;
                          setCourseContentData(updateData);
                        }}
                      />
                    </div>

                    <div className="my-3">
                      <label htmlFor="description" className={styles.label}>
                        Video Description
                      </label>
                      <textarea
                        rows={8}
                        cols={30}
                        placeholder="Type Description"
                        className={`${styles.input} py-2 !h-min`}
                        value={item.description}
                        onChange={(e) => {
                          const updateData = [...courseContentData];
                          updateData[index].description = e.target.value;
                          setCourseContentData(updateData);
                        }}
                      />
                    </div>
                    {item?.links.map((link: any, linkIndex: number) => (
                      <div key={linkIndex} className="mb-3 block">
                        <div className="w-full flex items-center justify-between">
                          <label htmlFor="" className={styles.label}>
                            Link {linkIndex + 1}
                          </label>
                          <AiOutlineDelete
                            className={`text-[20px] ${
                              linkIndex === 0
                                ? "cursor-no-drop"
                                : "cursor-pointer"
                            }`}
                            onClick={() => {
                              linkIndex === 0
                                ? null
                                : handleRemoveLink(index, linkIndex);
                            }}
                          />
                        </div>
                        <input
                          type="text"
                          placeholder="Source Code... (Link Title)"
                          className={styles.input}
                          value={link.title}
                          onChange={(e) => {
                            const updateData = [...courseContentData];
                            updateData[index].links[linkIndex].title =
                              e.target.value;
                            setCourseContentData(updateData);
                          }}
                        />

                        <input
                          type="text"
                          placeholder="Source Code Url... (Link Url)"
                          className={styles.input}
                          value={link.url}
                          onChange={(e) => {
                            const updateData = [...courseContentData];
                            updateData[index].links[linkIndex].url =
                              e.target.value;
                            setCourseContentData(updateData);
                          }}
                        />
                      </div>
                    ))}
                    {/* add link button */}
                    <div className="inline-block mb-4">
                      <p
                        className="flex items-center text-[18px] cursor-pointer text-blue-500"
                        onClick={() => handleAddLink(index)}
                      >
                        <BsLink45Deg className="mr-2" /> Add Link
                      </p>
                    </div>
                  </>
                )}
                {/* add new content */}
                {index === courseContentData.length - 1 && (
                  <div>
                    <p
                      className="flex items-center text-[18px] cursor-pointer text-blue-500"
                      onClick={(e: any) => newContentHandler(item)}
                    >
                      <AiOutlinePlusCircle className="mr-2" /> Add New Content
                    </p>
                  </div>
                )}
              </div>
            </>
          );
        })}
        <br />
        <div
          className="flex items-center text-[20px] cursor-pointer text-blue-500"
          onClick={() => addNewSection()}
        >
          <AiOutlinePlusCircle className="mr-2" /> Add new section
        </div>
      </form>
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
          onClick={handleOptions}
          className={`${styles.button} text-white text-sm`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CourseContent;
