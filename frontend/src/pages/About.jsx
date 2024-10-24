import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          className="w-full md:max-w-[450px] object-cover"
          src={assets.about_img}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Our system is designed to streamline fund and inventory management
            for aces, making it easier for students and staff to request
            resources and for administrators to efficiently manage approvals.
          </p>
          <p>
            With a focus on security, transparency, and convenience, we aim to
            create a seamless experience for users while ensuring that processes
            like fund requests and inventory tracking are managed smoothly from
            start to finish.
          </p>
          <b className="text-gray-600">Our Mission</b>
          <p>
            Our mission is to empower institutions with an easy-to-use platform
            that simplifies fund distribution and inventory control. By
            integrating key features such as request tracking and real-time
            inventory updates, we hope to save time and reduce manual workload
            for everyone involved.
          </p>
        </div>
      </div>

      <div className="text-xl py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-200">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Efficient Resource Management:</b>
          <p className="text-gray-600">
            Our system ensures that resources are allocated efficiently,
            minimizing delays and manual paperwork while keeping track of
            inventory and fund requests in real-time.
          </p>
        </div>

        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Streamlined Process:</b>
          <p className="text-gray-600">
            We provide a user-friendly interface for both students and
            administrators, allowing users to quickly submit requests and admins
            to review, approve, or reject them in an organized way.
          </p>
        </div>

        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Transparent Approval System:</b>
          <p className="text-gray-600">
            Every request follows a clear approval process, where users can
            track their requests' status, and admins can ensure accountability
            and transparency in decision-making.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
