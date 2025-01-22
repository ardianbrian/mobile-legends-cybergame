"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import LoadingEdit from "./loading";

export default function EditHeroPage({
  params: asyncParams,
}: {
  params: Promise<{ id: string }>;
}) {
  const [hero, setHero] = useState({ name: "", category: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [id, setId] = useState<string | null>(null); // State to hold unwrapped `id`
  const router = useRouter();

  // Unwrap `params` using `useEffect`
  useEffect(() => {
    const unwrapParams = async () => {
      const resolvedParams = await asyncParams;
      setId(resolvedParams.id);
    };

    unwrapParams();
  }, [asyncParams]);

  // Fetch hero data when `id` is set
  useEffect(() => {
    if (!id) return;

    const fetchHero = async () => {
      try {
        const response = await axios.get(`/api/heroes/${id}`);
        setHero(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch hero:", err);
        setError("Failed to load hero data");
        setLoading(false);
      }
    };

    fetchHero();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!id) throw new Error("Hero ID is missing");

      await axios.patch(`/api/heroes/${id}`, hero);
      router.push("/heroes");
    } catch (err) {
      console.error("Failed to update hero:", err);
      setError("Failed to update hero");
    }
  };

  if (loading) return <LoadingEdit />;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-8">
      <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-yellow-500 mb-4">Edit Hero</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Name</label>
            <input
              type="text"
              value={hero.name}
              onChange={(e) => setHero({ ...hero, name: e.target.value })}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Category</label>
            <select
              value={hero.category}
              onChange={(e) => setHero({ ...hero, category: e.target.value })}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none"
            >
              <option value="MARKSMAN">Marksman</option>
              <option value="TANK">Tank</option>
              <option value="FIGHTER">Fighter</option>
              <option value="ASSASSIN">Assassin</option>
              <option value="MAGE">Mage</option>
              <option value="SUPPORT">Support</option>
            </select>
          </div>
          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => router.push("/heroes")}
              className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-lg transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
