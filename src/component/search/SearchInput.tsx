"use client";
import { useSearch } from "@/context/SearchContext";
import { useRef, useEffect } from "react";

export default function SearchInput() {
  const { query, setQuery, setResult } = useSearch();
  const inputRef = useRef<HTMLInputElement>(null);

  // 검색 기능
  const search = async () => {
    if (!query.trim()) {
      alert("검색어를 입력해주세요.");
      return;
    }
    try {
      const res = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
      if (!res.ok) throw new Error(`${res.status} 에러 발생`);

      const data = await res.json();
      setResult(data.items || []);
    } catch (error) {
      alert(String(error));
      setResult([]);
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // 사용자가 입력할 때마다 query 상태를 업데이트하도록 수정
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-4">
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="검색어를 입력하세요"
        className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
      <button
        onClick={search}
        className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition-colors"
      >
        검색
      </button>
    </div>
  );
}
