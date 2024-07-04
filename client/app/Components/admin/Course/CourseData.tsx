import { styles } from "@/app/Style";
import { AddCircleOutline } from "@mui/icons-material";
import React, { FC } from "react";
import toast from "react-hot-toast";

type Props = {
  benefits: { title: string }[];
  setBenefits: (benefits: { title: string }[]) => void;
  prerequisites: { title: string }[];
  setPrerequisites: (prerequisites: { title: string }[]) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseData: FC<Props> = ({
  benefits,
  setBenefits,
  prerequisites,
  setPrerequisites,
  active,
  setActive,
}) => {
  const handleBenifitChange = (index: number, value: any) => {
    const updatedBenifits = [...benefits];
    updatedBenifits[index].title = value;
    setBenefits(updatedBenifits);
  };

  const handleAddBenifit = () => {
    setBenefits([...benefits, { title: "" }]);
  };

  const handlePrerequisiteChange = (index: number, value: any) => {
    const updatedPrerequisites = [...prerequisites];
    updatedPrerequisites[index].title = value;
    setPrerequisites(updatedPrerequisites);
  };

  const handleAddPrerequisite = () => {
    setPrerequisites([...prerequisites, { title: "" }]);
  };

  const prevButton = () => {
    setActive(active - 1);
  };

  const handleOptions = () => {
    if (
      benefits[benefits.length - 1]?.title !== "" &&
      prerequisites[prerequisites.length - 1]?.title !== ""
    ) {
      setActive(active + 1);
    } else {
      toast.error("Please fill the all fileds for goto next");
    }
  };

  return (
    <div className="w-[80%] m-auto mt-24 block">
      <div>
        <label htmlFor="benefit" className={`${styles.label} text-[20px]`}>
          01. What are the benefits for students in this course?
        </label>
        {benefits.map((benefit: any, index: number) => (
          <input
            type="text"
            name="benefit"
            id="benefit"
            key={index}
            required
            placeholder="You will be able to build a fullstack LMS platform"
            className={`${styles.input} my-2`}
            value={benefit.title}
            onChange={(e) => handleBenifitChange(index, e.target.value)}
          />
        ))}
        <AddCircleOutline
          style={{
            margin: "10px 0px",
            cursor: "pointer",
            width: "30px",
            color: "lightgreen",
          }}
          onClick={handleAddBenifit}
        />
      </div>

      <div>
        <label htmlFor="prerequisite" className={`${styles.label} text-[20px]`}>
          02. What are the prerequisites for starting this course?
        </label>
        {prerequisites.map((prerequisite: any, index: number) => (
          <input
            type="text"
            name="prerequisite"
            id="prerequisite"
            key={index}
            required
            placeholder="You need basic knowledge of MERN stack"
            className={`${styles.input} my-2`}
            value={prerequisite.title}
            onChange={(e) => handlePrerequisiteChange(index, e.target.value)}
          />
        ))}
        <AddCircleOutline
          style={{
            margin: "10px 0px",
            cursor: "pointer",
            width: "30px",
            color: "lightgreen",
          }}
          onClick={handleAddPrerequisite}
        />
      </div>

      <div className="flex justify-between">
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

export default CourseData;
