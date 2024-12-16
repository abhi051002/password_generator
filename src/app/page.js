"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useState } from "react";

export default function Home() {
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [formData, setFormData] = useState({
    passwordLength: 4,
    useSepcial: false,
    useNumber: false,
    useAlphabet: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const generatePassword = () => {
    let char = "abcdefghijklmnopqrstuvwxyz";
    if (formData.useAlphabet) {
      char += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }
    if (formData.useNumber) {
      char += "0123456789";
    }
    if (formData.useSepcial) {
      char += "!@#$%^&*()-_=+[{]};:'\",<.>/?";
    }
    let randomString = "";
    for (let i = 0; i < formData.passwordLength; i++) {
      randomString += char[Math.floor(Math.random() * char.length)];
    }
    setGeneratedPassword(randomString);
  };

  const copyPassword = () => {
    navigator.clipboard.writeText(generatedPassword);
    alert("Password copied to clipboard!");
  };

  return (
    <div className="flex justify-center items-center flex-col min-h-screen">
      <div className="border border-white p-4 rounded-lg">
        <div className="my-4">
          <div>
            <h1 className="font-semibold text-5xl mb-4">Password Generator</h1>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-3">
              <label className="font-semibold text-lg">Password Length</label>
              <input
                type="number"
                min="4"
                placeholder="Password Length"
                className="py-2 px-4 rounded-lg"
                name="passwordLength"
                value={formData.passwordLength}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <input
                type="checkbox"
                id="special"
                name="useSepcial"
                checked={formData.useSepcial}
                onChange={handleInputChange}
              />
              <label className="ml-2" htmlFor="special">
                Include Special Characters
              </label>
            </div>
            <div>
              <input
                type="checkbox"
                id="numbers"
                name="useNumber"
                checked={formData.useNumber}
                onChange={handleInputChange}
              />
              <label className="ml-2" htmlFor="numbers">
                Include Numbers
              </label>
            </div>
            <div>
              <input
                type="checkbox"
                id="capital"
                name="useAlphabet"
                checked={formData.useAlphabet}
                onChange={handleInputChange}
              />
              <label className="ml-2" htmlFor="capital">
                Include Capital Alphabates
              </label>
            </div>
          </div>
          <div className="my-4">
            <button
              className="w-full py-2 px-4 rounded-lg bg-blue-500 text-white"
              onClick={generatePassword}
            >
              Generate Password
            </button>
          </div>
        </div>
        {generatedPassword && (
          <div>
            <hr />
            <div className="my-4">
              <h1 className="font-semibold text-3xl mb-4">
                Generated Password
              </h1>
            </div>
            <div className="w-full flex justify-between bg-gray-500 px-4 py-2 rounded-md my-4">
              <p>{generatedPassword}</p>
              <p
                className="cursor-pointer hover:bg-gray-300 hover:text-black rounded-md px-2"
                onClick={copyPassword}
              >
                Copy
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
