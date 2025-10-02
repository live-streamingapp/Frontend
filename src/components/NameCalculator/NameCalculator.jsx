import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import axios from "axios";

const tableData = [
  ["A", "B", "C", "D", "E", "U", "O", "F"],
  ["I", "J", "K", "G", "W", "M", "H", "V"],
  ["J", "R", "L", "T", "N", "W", "", ""],
  ["Q", "", "S", "", "X", "", "", ""],
  ["Y", "", "", "", "", "", "", ""],
];

const headers = ["1", "2", "3", "4", "5", "6", "7", "8"];

const NameCalculator = () => {
  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [nameCalculation, setNameCalculation] = useState("");
  const [nameNumber, setNameNumber] = useState("");
  const [soulNumber, setSoulNumber] = useState("");
  const [personalityNumber, setPersonalityNumber] = useState("");
  const [driverNumber, setDriverNumber] = useState("");
  const [livePathNumber, setLivePathNumber] = useState("");
  const [destinyNumber, setDestinyNumber] = useState("");
  const [loShuGrid, setLoShuGrid] = useState({});

  // Numerology letter to number mapping based on the table
  const letterMap = {
    A: 1,
    I: 1,
    J: 1,
    Q: 1,
    Y: 1,
    B: 2,
    K: 2,
    R: 2,
    C: 3,
    G: 3,
    L: 3,
    S: 3,
    D: 4,
    M: 4,
    T: 4,
    E: 5,
    H: 5,
    N: 5,
    X: 5,
    U: 6,
    V: 6,
    W: 6,
    O: 7,
    Z: 7,
    F: 8,
    P: 8,
  };

  const handleCalculate = async () => {
    if (!fullName.trim() || !dob) {
      setError("Please enter both full name and date of birth");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/numerology`,
        {
          params: { fullName, dob },
        }
      );

      console.log("numerology: ", res.data);

      const data = res.data;

      // Set the calculation display (show letters with their values)
      const nameWithoutSpaces = fullName.replace(/[^A-Za-z]/g, "");
      const calculationDisplay = nameWithoutSpaces
        .split("")
        .map((char) => {
          const upperChar = char.toUpperCase();
          const number = letterMap[upperChar] || 0;
          return `${upperChar}(${number})`;
        })
        .join(" + ");
      setNameCalculation(calculationDisplay);

      // Set all the calculated numbers
      setNameNumber(data.nameNumber);
      setSoulNumber(data.soulNumber);
      setPersonalityNumber(data.personalityNumber);
      setDriverNumber(data.lifePathNumber); // Driver number is same as life path
      setLivePathNumber(data.lifePathNumber);
      setDestinyNumber(data.destinyNumber);
      setLoShuGrid(data.loShuGrid);
    } catch (err) {
      console.error("Error calculating numerology:", err);
      setError("Failed to calculate numerology. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Generate Lo Shu Grid display
  const generateLoShuGrid = () => {
    const gridOrder = [4, 9, 2, 3, 5, 7, 8, 1, 6];
    return gridOrder.map((num, i) => (
      <div
        key={i}
        className="border rounded p-4 flex justify-center items-center text-lg font-bold min-h-[60px]"
      >
        {loShuGrid[num] || ""}
      </div>
    ));
  };

  return (
    <>
      <Header />
      <div className="p-6 flex gap-6 max-[800px]:flex-col">
        {/* Left Section */}
        <div className="w-[30%] max-[800px]:w-full space-y-4">
          <div className="bg-white p-4 rounded-lg border-gray-300 shadow">
            <label className="block text-sm font-semibold">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full p-2 border rounded mt-1"
              placeholder="Enter Full Name"
              disabled={loading}
            />

            <label className="block text-sm font-semibold mt-3">
              Date of Birth
            </label>
            <input
              type="text"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full p-2 border rounded mt-1"
              placeholder="DD-MM-YYYY"
              disabled={loading}
            />

            <button
              onClick={handleCalculate}
              disabled={loading || !fullName.trim() || !dob}
              className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-2 rounded mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Calculating..." : "Calculate"}
            </button>

            {error && <div className="mt-2 text-red-600 text-sm">{error}</div>}
          </div>

          {/* Lo Shu Grid */}
          <div>
            <h2 className="font-semibold mb-2">Lo Shu Grid</h2>
            <div className="grid grid-cols-3 gap-2">{generateLoShuGrid()}</div>
          </div>

          {/* Numerology Chart */}
          <div>
            <h2 className="font-semibold mb-2">Numerology Number Chart</h2>
            <div className="overflow-x-auto">
              <table className="border-collapse border border-gray-400">
                <thead>
                  <tr>
                    {headers.map((h, i) => (
                      <th
                        key={i}
                        className="border border-gray-400 p-2 w-12 text-center"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((cell, colIndex) => (
                        <td
                          key={colIndex}
                          className="border border-gray-400 p-2 text-center w-12 h-12"
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex max-[500px]:flex-col flex-1 gap-[2rem]">
          <div className="flex flex-col flex-1 gap-[1rem]">
            <div className="bg-white p-4 rounded-lg border-gray-300 shadow flex-1 border">
              <h2 className="font-semibold mb-2">Name Calculation</h2>
              <p className="text-gray-600 text-sm break-words">
                {nameCalculation || "Enter name to see calculation"}
              </p>
              {nameCalculation && (
                <div className="mt-2 pt-2 border-t">
                  <p className="text-xs text-gray-500">
                    Total:{" "}
                    {nameCalculation.split(" + ").reduce((sum, part) => {
                      const number = part.match(/\((\d+)\)/);
                      return sum + (number ? parseInt(number[1]) : 0);
                    }, 0)}
                  </p>
                </div>
              )}
            </div>
            {/* <div className="bg-white p-4 rounded-lg border-gray-300 shadow flex-1 border">
              <h2 className="font-semibold mb-2">
                Driver Number / Conductor Number Calculate
              </h2>
              <p className="text-2xl font-bold text-orange-600">
                {driverNumber || "-"}
              </p>
            </div> */}
            <div className="bg-white p-4 rounded-lg border-gray-300 shadow flex-1 border">
              <h2 className="font-semibold mb-2">
                Life Path Number / Driver Number
              </h2>
              <p className="text-2xl font-bold text-red-600">
                {livePathNumber || "-"}
              </p>
            </div>
          </div>

          <div className="flex gap-[1rem] flex-col flex-1">
            <div className="bg-white p-4 rounded-lg border-gray-300 shadow flex-1 border">
              <h2 className="font-semibold mb-2">Name Number</h2>
              <p className="text-2xl font-bold text-blue-600">
                {nameNumber || "-"}
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg border-gray-300 shadow flex-1 border">
              <h2 className="font-semibold mb-2">Soul Number</h2>
              <p className="text-2xl font-bold text-purple-600">
                {soulNumber || "-"}
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg border-gray-300 shadow flex-1 border">
              <h2 className="font-semibold mb-2">Personality Number</h2>
              <p className="text-2xl font-bold text-green-600">
                {personalityNumber || "-"}
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg border-gray-300 shadow flex-1 border">
              <h2 className="font-semibold mb-2">
                Destiny Number / Conductor Number
              </h2>
              <p className="text-2xl font-bold text-indigo-600">
                {destinyNumber || "-"}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NameCalculator;
