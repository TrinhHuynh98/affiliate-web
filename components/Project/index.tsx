import React from "react";
import ProjectItem from "./ProjectItem";

import project1 from "../../public/project/project1.png";
import project2 from "../../public/project/project2.png";

const Project = () => {
  return (
    <div id="projects" className="w-full">
      <div className="max-w-[1240px] mx-auto px-2 py-16">
        <p className="text-xl tracking-widest uppercase text-orange-600">
          Projects
        </p>
        <h2 className="py-4">What I&apos;ve Built</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <ProjectItem
            title="Sample Project 1"
            backgroundImg={project1}
            projectUrl="/projectDetail"
            tech="Next JS"
          />
          <ProjectItem
            title="Sample Project 2"
            backgroundImg={project2}
            projectUrl="/project2"
            tech="Next JS"
          />
        </div>
      </div>
    </div>
  );
};

export default Project;
