"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";

export default function AddMatchesPage() {
  const [title, setTitle] = useState("");
  const [matchTime, setMatchTime] = useState<string>("");
  const [teamHeroes, setTeamHeroes] = useState<string[]>([]);
  const [enemyHeroes, setEnemyHeroes] = useState<string[]>([]);
  const [teamScore, setTeamScore] = useState<number>(0);
  const [enemyScore, setEnemyScore] = useState<number>(0);
  const [teamGold, setTeamGold] = useState<number>(0);
  const [enemyGold, setEnemyGold] = useState<number>(0);
  const [heroesOptions, setHeroesOptions] = useState<
    { id: string; name: string }[]
  >([]);
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"VICTORY" | "DEFEAT">("VICTORY");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  // Fetch heroes on component mount
  useEffect(() => {
    const fetchHeroes = async () => {
      try {
        const response = await axios.get("/api/heroesmatches");
        setHeroesOptions(response.data.data); // Assuming response has { data: { data: [] } }
      } catch (err) {
        console.error("Error fetching heroes:", err);
      }
    };

    fetchHeroes();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (teamHeroes.length > 5 || enemyHeroes.length > 5) {
      setError("Each team can have up to 5 heroes only.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await axios.post("/api/matches", {
        title,
        matchTime,
        teamHeroIds: teamHeroes,
        enemyHeroIds: enemyHeroes,
        teamScore,
        enemyScore,
        teamGold,
        enemyGold,
        description,
        status,
      });
      router.push("/matches");
    } catch (err) {
      console.error("Error adding match:", err);
      setError("Failed to add match. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
    setState: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    const selectedOptions = Array.from(event.target.selectedOptions).map(
      (option) => option.value
    );
    setState(selectedOptions);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-8">
      <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-yellow-500 mb-4">Add Match</h1>

        {error && (
          <div className="mb-4 p-4 bg-red-500 text-white rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-300 mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 rounded-lg bg-gray-700 text-white"
              placeholder="Enter match title"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Match Time</label>
            <input
              type="datetime-local"
              value={matchTime}
              onChange={(e) => setMatchTime(e.target.value)}
              className="w-full p-2 rounded-lg bg-gray-700 text-white"
              required
            />
          </div>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 mb-2">Team Heroes</label>
              <select
                multiple
                value={teamHeroes}
                onChange={(e) => handleSelectChange(e, setTeamHeroes)}
                className="w-full p-2 rounded-lg bg-gray-700 text-white"
              >
                {heroesOptions.map((hero) => (
                  <option key={hero.id} value={hero.id}>
                    {hero.name}
                  </option>
                ))}
              </select>
              <p className="text-sm text-gray-500 mt-1">
                Hold Ctrl (Windows) or Cmd (Mac) to select multiple options.
              </p>
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Enemy Heroes</label>
              <select
                multiple
                value={enemyHeroes}
                onChange={(e) => handleSelectChange(e, setEnemyHeroes)}
                className="w-full p-2 rounded-lg bg-gray-700 text-white"
              >
                {heroesOptions.map((hero) => (
                  <option key={hero.id} value={hero.id}>
                    {hero.name}
                  </option>
                ))}
              </select>
              <p className="text-sm text-gray-500 mt-1">
                Hold Ctrl (Windows) or Cmd (Mac) to select multiple options.
              </p>
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Team Score</label>
              <input
                type="number"
                value={teamScore}
                onChange={(e) => setTeamScore(parseInt(e.target.value))}
                className="w-full p-2 rounded-lg bg-gray-700 text-white"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Enemy Score</label>
              <input
                type="number"
                value={enemyScore}
                onChange={(e) => setEnemyScore(parseInt(e.target.value))}
                className="w-full p-2 rounded-lg bg-gray-700 text-white"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Team Gold</label>
              <input
                type="number"
                value={teamGold}
                onChange={(e) => setTeamGold(parseInt(e.target.value))}
                className="w-full p-2 rounded-lg bg-gray-700 text-white"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Enemy Gold</label>
              <input
                type="number"
                value={enemyGold}
                onChange={(e) => setEnemyGold(parseInt(e.target.value))}
                className="w-full p-2 rounded-lg bg-gray-700 text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 rounded-lg bg-gray-700 text-white"
              placeholder="Optional description"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as typeof status)}
              className="w-full p-2 rounded-lg bg-gray-700 text-white"
            >
              <option value="VICTORY">VICTORY</option>
              <option value="DEFEAT">DEFEAT</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded-lg transition"
          >
            {loading ? "Adding..." : "Add Match"}
          </button>
        </form>

        <div className="mt-4">
          <Link
            href="/matches"
            className="text-yellow-500 hover:underline text-sm"
          >
            Back to Matches List
          </Link>
        </div>
      </div>
    </div>
  );
}
