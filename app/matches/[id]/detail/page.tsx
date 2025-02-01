"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import LoadingMain from "../../../heroes/loading";

interface Match {
  id: string;
  title: string;
  durationMinutes: number;
  teamScore: number;
  enemyScore: number;
  teamGold: number;
  enemyGold: number;
  status: string;
  description?: string;
  createdAt: string;
  teamHeroes: Hero[];
  enemyHeroes: Hero[];
}

interface Hero {
  id: string;
  name: string;
}

export default function MatchDetailPage() {
  const { id } = useParams();
  const [match, setMatch] = useState<Match | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchMatchDetail = async () => {
      try {
        const response = await axios.get(`/api/matches/${id}`);
        setMatch(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch match details:", err);
        setError("Failed to fetch match details");
        setLoading(false);
      }
    };

    if (id) {
      fetchMatchDetail();
    }
  }, [id]);

  if (loading) return <LoadingMain />;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-8">
      <div className="max-w-4xl mx-auto bg-gray-800 rounded-xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-purple-500 mb-4">
          {match?.title}
        </h1>
        <p className="text-gray-400 mb-2">
          Created At: {new Date(match?.createdAt || "").toLocaleString()}
        </p>
        <p className="text-gray-400 mb-4">
          Duration: {match?.durationMinutes} minutes
        </p>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center p-4 rounded-lg bg-gray-700">
            <span className="text-xl font-bold text-blue-500">
              {match?.teamScore}
            </span>
            <p className="text-gray-400">Team Score</p>
          </div>
          <div className="text-center p-4 rounded-lg bg-gray-700">
            <span className="text-xl font-bold text-red-500">
              {match?.enemyScore}
            </span>
            <p className="text-gray-400">Enemy Score</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center p-4 rounded-lg bg-gray-700">
            <span className="text-xl font-bold text-yellow-500">
              {match?.teamGold}
            </span>
            <p className="text-gray-400">Team Gold</p>
          </div>
          <div className="text-center p-4 rounded-lg bg-gray-700">
            <span className="text-xl font-bold text-yellow-500">
              {match?.enemyGold}
            </span>
            <p className="text-gray-400">Enemy Gold</p>
          </div>
        </div>

        <div
          className={`text-center py-2 rounded-lg font-semibold mb-4 ${
            match?.status === "VICTORY"
              ? "bg-green-600"
              : match?.status === "DEFEAT"
              ? "bg-red-600"
              : "bg-yellow-600"
          }`}
        >
          {match?.status}
        </div>

        {match?.description && (
          <p className="text-gray-300 italic mb-4">{match.description}</p>
        )}

        <div className="mb-4">
          <h2 className="text-lg font-semibold text-white mb-2">
            Team Heroes:
          </h2>
          <ul className="text-gray-400 list-disc list-inside">
            {match?.teamHeroes.map((hero) => (
              <li key={hero.id}>{hero.name}</li>
            ))}
          </ul>
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-semibold text-white mb-2">
            Enemy Heroes:
          </h2>
          <ul className="text-gray-400 list-disc list-inside">
            {match?.enemyHeroes.map((hero) => (
              <li key={hero.id}>{hero.name}</li>
            ))}
          </ul>
        </div>

        <div className="flex justify-between mt-6">
          <Link
            href="/matches"
            className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition"
          >
            Back to Matches
          </Link>
          <button
            onClick={() => router.push(`/matches/${match?.id}/edit`)}
            className="bg-yellow-500 hover:bg-yellow-400 text-white px-4 py-2 rounded-lg transition"
          >
            Edit Match
          </button>
        </div>
      </div>
    </div>
  );
}
