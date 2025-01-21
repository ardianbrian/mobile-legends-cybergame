"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import Loading from "./loading";

// Definisikan tipe untuk Hero
interface Hero {
  id: string;
  name: string;
  category: "MARKSMAN" | "TANK" | "FIGHTER" | "ASSASSIN" | "MAGE" | "SUPPORT";
  createdAt: string;
}

export default function HeroesPage() {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHeroes = async () => {
      try {
        const response = await axios.get("/api/heroes");
        setHeroes(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch heroes");
        setLoading(false);
      }
    };

    fetchHeroes();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/heroes/${id}`);
      setHeroes((prev) => prev.filter((hero) => hero.id !== id));
    } catch (err) {
      console.error("Failed to delete hero:", err);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-8">
        <div className="max-w-6xl mx-auto text-center text-red-500">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-yellow-500">Heroes List</h1>
          <Link
            href="/"
            className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition"
          >
            Back to Home
          </Link>
        </div>

        <div className="flex justify-between items-center mb-6">
          <Link
            href="/heroes/add"
            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition"
          >
            Add Hero
          </Link>
        </div>

        <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-700">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  No
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Created At
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {heroes.map((hero, index) => (
                <tr
                  key={hero.id}
                  className="hover:bg-gray-700 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {hero.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${getCategoryColor(
                        hero.category
                      )}`}
                    >
                      {hero.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {new Date(hero.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    <div className="flex gap-2">
                      <button
                        onClick={() => alert(`Edit Hero: ${hero.name}`)}
                        className="bg-yellow-500 hover:bg-yellow-400 text-white px-3 py-1 rounded-lg transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(hero.id)}
                        className="bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded-lg transition"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {heroes.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            No heroes found. Add some heroes to get started.
          </div>
        )}
      </div>
    </div>
  );
}

function getCategoryColor(category: string) {
  const colors = {
    MARKSMAN: "bg-blue-500 text-white",
    TANK: "bg-green-500 text-white",
    FIGHTER: "bg-red-500 text-white",
    ASSASSIN: "bg-purple-500 text-white",
    MAGE: "bg-yellow-500 text-black",
    SUPPORT: "bg-pink-500 text-white",
  };
  return colors[category as keyof typeof colors] || "bg-gray-500 text-white";
}
