"use client";

import { useState } from "react";
import UploadImageCard from "./uploadImageCard";
import Image from "next/image";
import api from "@/config/axios";

export default function DashBoard() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    postType: "PLACE",
    state: "",
    locationName: "",
    latitude: "",
    longitude: "",
    types: "",
    activities: "",
  });

  const [images, setImages] = useState<File[]>([]);



  const [event, setEvent] = useState("")

  const [place, setPlace] = useState("")

  const [service, setService] = useState("")





  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title || !form.description || !form.locationName || !form.state) {
      alert("Please fill all required fields");
      return;
    }

    if (images.length === 0) {
      alert("Please upload at least one image");
      return;
    }

    const formData = new FormData();

    // Basic fields
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("postType", form.postType);
    formData.append("state", form.state);

    // Location
    formData.append(
      "location",
      JSON.stringify({
        name: form.locationName,
        latitude: form.latitude ? Number(form.latitude) : null,
        longitude: form.longitude ? Number(form.longitude) : null,
      })
    );

    formData.append(
      "metadata",
      JSON.stringify({
        types: form.types
          ? form.types.split(",").map((t) => t.trim()).filter(Boolean)
          : [],
        activities: form.activities
          ? form.activities.split(",").map((a) => a.trim()).filter(Boolean)
          : [],
      })
    );

    images.forEach((file) => {
      formData.append("Images", file);
    });

    console.log("Submitting FormData:");
    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }

    try {
      const res = await api.post("api/post/create", formData);
      console.log(res.data);

      setForm({
        title: "",
        description: "",
        postType: "PLACE",
        state: "",
        locationName: "",
        latitude: "",
        longitude: "",
        types: "",
        activities: "",
      });
      setImages([]);

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen p-6 flex justify-center">



      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-2xl space-y-4"
      >


        <h2 className="text-xl font-semibold text-center">CONTRIBUTE</h2>

        <p className="text-sm text-gray-500  text-center">
          select type of the contributiion        </p>
        <div className="flex flex-row gap-5 items-center justify-center">

          <div
            className="cursor-pointer hover:bg-green-200 p-2 rounded-lg"
            onClick={() => setPlace("PLACE")}
          >
            PLACE
          </div>
          <div
            className="cursor-pointer hover:bg-green-200 p-2 rounded-lg"
            onClick={() => setEvent("EVENT")}
          >
            EVENT
          </div>

          <div
            className="cursor-pointer hover:bg-green-200 p-2 rounded-lg"
            onClick={() => setService("SERVICE")}
          >
            SERVICE
          </div>

        </div>

        {/* Title */}
        <input
          name="title"
          value={form.title}
          placeholder="Title"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        {/* Description */}
        <textarea
          name="description"
          value={form.description}
          placeholder="Description"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        {/* Location */}
        <input
          name="locationName"
          value={form.locationName}
          placeholder="Place's Name"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          name="state"
          value={form.state}
          placeholder="State Name"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        {/* Types */}
        <h1 className="font-medium">Write the type of the Place:</h1>
        <input
          name="types"
          value={form.types}
          placeholder="Eco, natural, cultural..."
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        {/* Activities */}
        <h1 className="font-medium">
          Write the activities that can be done:
        </h1>
        <input
          name="activities"
          value={form.activities}
          placeholder="Cycling, rafting, trekking..."
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        {/* Upload */}
        <UploadImageCard onAction={(files) => setImages(files)} />

        {/* Preview */}
        <div className="grid grid-cols-3 gap-2 mt-3">
          {images.map((file, i) => (
            <Image
              key={i}
              src={URL.createObjectURL(file)}
              alt="preview"
              width={100}
              height={100}
              className="h-24 w-full object-cover rounded-lg"
            />
          ))}
        </div>

        {/* Note */}
        <p className="text-sm text-gray-500">
          Use clear types, relevant activities, and a detailed description to
          improve reach and help like-minded users discover your post.
        </p>

        {/* Submit */}
        <button className="bg-black text-white px-4 py-2 rounded w-full">
          Upload
        </button>
      </form>
    </div>
  );
}
