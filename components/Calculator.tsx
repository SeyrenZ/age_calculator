"use client";
import { ArrowIcon } from "@/public";
import React, { useState } from "react";

const Calculator = () => {
  // to read input value and store it
  const [dayValue, setDayValue] = useState("");
  const [monthValue, setMonthValue] = useState("");
  const [yearValue, setYearValue] = useState("");
  const [erroMessage, setErrorMessage] = useState("");

  // to display input result
  const [ageResult, setAgeResult] = useState<{
    years: any;
    months: any;
    days: any;
  } | null>({
    years: "--",
    months: "--",
    days: "--",
  });
  const calculateAge = (e: any) => {
    e.preventDefault();

    if (!dayValue || !monthValue || !yearValue) {
      if (!dayValue) {
        document.getElementById("dayInput")?.classList.add("border-red-500");
        document.getElementById("dayLabel")?.classList.add("text-red-500");
        setErrorMessage("This field is required");
      }
      if (!monthValue) {
        document.getElementById("monthInput")?.classList.add("border-red-500");
        document.getElementById("monthLabel")?.classList.add("text-red-500");
        setErrorMessage("This field is required");
      }
      if (!yearValue) {
        document.getElementById("yearInput")?.classList.add("border-red-500");
        document.getElementById("yearLabel")?.classList.add("text-red-500");
        setErrorMessage("This field is required");
      }

      setAgeResult({
        years: "--",
        months: "--",
        days: "--",
      });
    } else {
      // Remove red border if input fields are not empty
      document.getElementById("dayInput")?.classList.remove("border-red-500");
      document.getElementById("monthInput")?.classList.remove("border-red-500");
      document.getElementById("yearInput")?.classList.remove("border-red-500");
      document.getElementById("dayLabel")?.classList.remove("text-red-500");
      document.getElementById("monthLabel")?.classList.remove("text-red-500");
      document.getElementById("yearLabel")?.classList.remove("text-red-500");
      setErrorMessage("");

      // Calculate age if all input fields are filled
      const birthDate = new Date(`${yearValue}-${monthValue}-${dayValue}`);
      const currentDate = new Date();

      const ageDiff = currentDate.getTime() - birthDate.getTime();

      if (isNaN(ageDiff) || birthDate > currentDate) {
        document.getElementById("dayInput")?.classList.add("border-red-500");
        document.getElementById("dayLabel")?.classList.add("text-red-500");
        document.getElementById("monthInput")?.classList.add("border-red-500");
        document.getElementById("monthLabel")?.classList.add("text-red-500");
        document.getElementById("yearInput")?.classList.add("border-red-500");
        document.getElementById("yearLabel")?.classList.add("text-red-500");
        setErrorMessage("Invalid input");
        setAgeResult({
          years: "--",
          months: "--",
          days: "--",
        });
      } else {
        // calculate the years,month and days and rounded it with floor
        const years = Math.floor(ageDiff / (365.25 * 24 * 60 * 60 * 1000));
        const months = Math.floor(
          (ageDiff % (365.25 * 24 * 60 * 60 * 1000)) /
            (30.44 * 24 * 60 * 60 * 1000)
        );
        const days = Math.floor(
          (ageDiff % (30.44 * 24 * 60 * 60 * 1000)) / (24 * 60 * 60 * 1000)
        );
        setAgeResult({ years, months, days });
        document.getElementById("dayInput")?.classList.remove("border-red-500");
        document.getElementById("dayLabel")?.classList.remove("text-red-500");
        document
          .getElementById("monthInput")
          ?.classList.remove("border-red-500");
        document.getElementById("monthLabel")?.classList.remove("text-red-500");
        document
          .getElementById("yearInput")
          ?.classList.remove("border-red-500");
        document.getElementById("yearLabel")?.classList.remove("text-red-500");
        setErrorMessage("");
      }
    }
  };

  return (
    <form
      onSubmit={calculateAge}
      className=" flex flex-col w-[750px] h-auto sm:w-[365px] p-12 sm:p-8 pr-8 bg-white rounded-3xl rounded-br-[180px] sm:rounded-br-[100px] sm:flex sm:flex-col sm:items-center sm:justify-center "
    >
      {/* input box */}
      <div className="flex gap-x-7 sm:gap-x-5">
        <div className="flex flex-col gap-y-2 sm:gap-y-1 ">
          <label
            id="dayLabel"
            className="text-lg sm:text-[17px] font-bold text-[#716f6f]"
          >
            DAY
          </label>
          <input
            onChange={(e) => setDayValue(e.target.value)}
            value={dayValue}
            id="dayInput"
            type="number"
            placeholder="DD"
            className="w-36 sm:w-24 p-4 text-3xl sm:text-xl placeholder-[#6f6d6d] opacity-95 font-extrabold border-2 rounded-lg focus:outline-[#141414]"
          />
          {erroMessage && (
            <div className="text-red-500 sm:text-[9px] italic">
              {erroMessage}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-y-2 sm:gap-y-1">
          <label
            id="monthLabel"
            className="text-lg sm:text-[17px] font-bold text-[#716f6f]"
          >
            MONTH
          </label>
          <input
            onChange={(e) => setMonthValue(e.target.value)}
            value={monthValue}
            id="monthInput"
            type="number"
            placeholder="MM"
            className="w-36 sm:w-24 p-4 text-3xl sm:text-xl placeholder-[#6f6d6d] opacity-95 font-extrabold border-2 rounded-lg focus:outline-[#141414]"
          />
          {erroMessage && (
            <div className="text-red-500 text-[13px] sm:text-[9px] italic">
              {erroMessage}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-y-2 sm:gap-y-1">
          <label
            id="yearLabel"
            className="text-lg sm:text-[17px] font-bold  text-[#716f6f]"
          >
            YEAR
          </label>
          <input
            onChange={(e) => setYearValue(e.target.value)}
            value={yearValue}
            id="yearInput"
            type="number"
            placeholder="YYYY"
            className="w-36 sm:w-24 p-4 text-3xl sm:text-xl placeholder-[#6f6d6d] opacity-95 font-extrabold border-2 rounded-lg focus:outline-[#141414]"
          />
          {erroMessage && (
            <div className="text-red-500 text-[13px] sm:text-[9px] italic">
              {erroMessage}
            </div>
          )}
        </div>
      </div>
      {/* button */}
      <div className="w-full mt-2 flex items-center">
        <div className="border-2 w-full "></div>
        <div>
          <button
            type="submit"
            className="w-20 h-20 sm:w-16 sm:h-16 sm:my-5 bg-[#854cff] hover:bg-[#141414] flex items-center justify-center rounded-full"
          >
            <ArrowIcon />
          </button>
        </div>
        <div className="border-2 w-full lg:hidden md:hidden"></div>
      </div>
      {/* Input result */}
      <div className="flex flex-col gap-y-2">
        <div className="flex gap-x-2 text-8xl sm:text-5xl text[#141414] font-black italic">
          <span className="text-[#854cff]">{ageResult?.years}</span>
          years
        </div>
        <div className="flex gap-x-2 text-8xl sm:text-5xl text[#141414] font-black italic">
          <span className="text-[#854cff]">{ageResult?.months}</span>
          months
        </div>
        <div className="flex gap-x-2 text-8xl sm:text-5xl text[#141414] font-black italic">
          <span className="text-[#854cff]">{ageResult?.days}</span>
          days
        </div>
      </div>
    </form>
  );
};

export default Calculator;
