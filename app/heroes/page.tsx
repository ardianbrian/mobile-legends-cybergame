"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import LoadingMain from "./loading";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<"name" | "category" | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const router = useRouter();

  useEffect(() => {
    const fetchHeroes = async () => {
      try {
        const response = await axios.get("/api/heroes", {
          params: {
            page: currentPage,
            limit: 20,
            searchQuery,
            sortOption,
          },
        });

        setHeroes(response.data.data);
        setTotalPages(response.data.meta.totalPages);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch heroes:", err);
        setError("Failed to fetch heroes");
        setLoading(false);
      }
    };

    fetchHeroes();
  }, [currentPage, searchQuery, sortOption]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Fungsi untuk menghapus hero
  const handleDelete = async (heroId: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this hero?"
    );

    if (!confirmDelete) return;

    try {
      // Hapus hero dari backend
      await axios.delete(`/api/heroes/${heroId}`);

      // Menampilkan alert berhasil
      alert("Hero deleted successfully!");

      // Refresh daftar hero setelah penghapusan
      setHeroes((prevHeroes) =>
        prevHeroes.filter((hero) => hero.id !== heroId)
      );
    } catch (err) {
      console.error("Failed to delete hero:", err);
      alert("Failed to delete hero.");
    }
  };

  if (loading) {
    return <LoadingMain />;
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
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-yellow-500">Heroes List</h1>
          <Link
            href="/"
            className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition"
          >
            Back to Home
          </Link>
        </div>

        <div className="flex flex-wrap items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Search heroes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 rounded-lg bg-gray-700 text-white w-full md:w-1/3"
          />
          <select
            value={sortOption || ""}
            onChange={(e) =>
              setSortOption(e.target.value as "name" | "category" | null)
            }
            className="p-2 rounded-lg bg-gray-700 text-white w-full md:w-1/3"
          >
            <option value="">Sort By</option>
            <option value="name">Name</option>
            <option value="category">Category</option>
          </select>
          <Link
            href="/heroes/add"
            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition"
          >
            Add Hero
          </Link>
        </div>

        <div className="bg-gray-800 rounded-lg shadow-xl overflow-x-auto">
          <table className="min-w-full">
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
                    <div className="flex gap-2">
                      <button
                        onClick={() => router.push(`/heroes/${hero.id}/edit`)}
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

        <div className="flex flex-wrap justify-center gap-2 mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg ${
              currentPage === 1
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-gray-700"
            }`}
          >
            &lt;
          </button>
          <span className="px-4 py-2 bg-gray-700 text-white rounded-lg">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg ${
              currentPage === totalPages
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-gray-700"
            }`}
          >
            &gt;
          </button>
        </div>

        {heroes.length === 0 && (
          <div className="text-center py-4 text-gray-300">No heroes found</div>
        )}
      </div>
    </div>
  );
}

function getCategoryColor(category: string) {
  switch (category) {
    case "TANK":
      return "bg-gray-600";
    case "FIGHTER":
      return "bg-red-600";
    case "ASSASSIN":
      return "bg-purple-600";
    case "MAGE":
      return "bg-blue-600";
    case "SUPPORT":
      return "bg-green-600";
    default:
      return "bg-yellow-600";
  }
}
