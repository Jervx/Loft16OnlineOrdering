import React from "react";

import { ImQuotesLeft, ImQuotesRight } from "react-icons/im";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="flex justify-center h-1/2 items-center">
        <p className="text-5xl NotoSerif text-teal-700 mt-14">Our History</p>
      </section>
      <section className="mx-32 mt-14">
        <div className="relative h-14">
          <ImQuotesLeft className="absolute top-8 left-0 h-9 w-9 text-pink-700" />
        </div>
        <p
          style={{ textIndent: "5%" }}
          className="leading-10 indent-10 text-justify text-teal-700"
        >
          Our story is simple since the whole concept of Loft ’16 is authentic
          because the owner is a very hands-on type of owner that she manages
          everything, a woman who was strong and a very independent one, I must
          say. Ms. Maneca is truly inspirational despite her experience before
          finally having the stability the Loft’16 has now. For the first years
          of Loft’16 they struggled to find a place where to settle, until they
          started joining bazaars year 2016 where the store’s name came added by
          the word loft which means “room or space under a house” makes much
          more sense because Loft’16 caters mostly home decorations thus why it
          suits the name.
        </p>
        <p
          style={{ textIndent: "5%" }}
          className="leading-10 indent-10 text-justify text-teal-800"
        >
          Originally the store was called “The Happy Pill” but as time goes by
          the owner didn’t see the relevance to what her store's offering
          especially, since that name came from her cousin who has been her
          partner since the beginning but the second owner, Patricia got a job
          and realized that business is not for her at that time, so they
          decided to part ways since they both have different goals in life.
          That didn’t stop Maneca from growing the business and striving for
          more.
        </p>
        <div className="relative">
          <ImQuotesRight className="absolute right-28 -bottom-3 h-9 w-9 text-pink-700" />
        </div>
      </section>
    </div>
  );
};

export default About;
