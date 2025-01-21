"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";

export default function AddHeroPage() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState<
    "MARKSMAN" | "TANK" | "FIGHTER" | "ASSASSIN" | "MAGE" | "SUPPORT"
  >("MARKSMAN");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await axios.post("/api/heroes", { name, category });
      router.push("/heroes"); // Redirect to heroes list
    } catch (err) {
      console.error("Error adding hero:", err); // Log error ke console
      setError("Failed to add hero. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-8">
      <div className="max-w-3xl mx-auto bg-gray-800 p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-yellow-500 mb-4">Add Hero</h1>

        {error && (
          <div className="mb-4 p-4 bg-red-500 text-white rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-300 mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 rounded-lg bg-gray-700 text-white"
              placeholder="Enter hero name"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2" htmlFor="category">
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value as typeof category)}
              className="w-full p-2 rounded-lg bg-gray-700 text-white"
            >
              <option value="MARKSMAN">Marksman</option>
              <option value="TANK">Tank</option>
              <option value="FIGHTER">Fighter</option>
              <option value="ASSASSIN">Assassin</option>
              <option value="MAGE">Mage</option>
              <option value="SUPPORT">Support</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded-lg transition"
          >
            {loading ? "Adding..." : "Add Hero"}
          </button>
        </form>

        <div className="mt-4">
          <Link
            href="/heroes"
            className="text-yellow-500 hover:underline text-sm"
          >
            Back to Heroes List
          </Link>
        </div>
      </div>
    </div>
  );
}
