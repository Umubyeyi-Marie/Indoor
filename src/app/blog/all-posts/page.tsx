"use client";
import { useState } from "react";
import { Grid, List, LayoutGrid, Rows } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import articles from "../../../jsondata/articles.json";

export default function AllPostsPage() {
  const [viewMode, setViewMode] = useState("grid");
  const [activeFilter, setActiveFilter] = useState("All Blog");
  const [sortOption, setSortOption] = useState("Latest");

  const filteredPosts = articles.filter((post) =>
    activeFilter === "All Blog"
      ? true
      : activeFilter === "Featured"
      ? post.featured
      : false
  );

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return sortOption === "Latest" ? dateB - dateA : dateA - dateB;
  });

  const ViewModeButton = ({ 
  mode, 
  icon: Icon, 
  isActive 
}: { 
  mode: string; 
  icon: React.ComponentType<{ className?: string }>; 
  isActive: boolean 
}) =>  (
    <button
      onClick={() => setViewMode(mode)}
      className={`p-2 rounded ${
        isActive ? "bg-gray-200" : "hover:bg-gray-100"
      }`}
    >
      <Icon className="w-4 h-4" />
    </button>
  );

  const getGridClass = () => {
    switch (viewMode) {
      case "single":
        return "grid-cols-1";
      case "two":
        return "grid-cols-1 md:grid-cols-2";
      case "list":
        return "grid-cols-1";
      default:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
    }
  };

  return (
    <div className="bg-white">
      <section className="px-4 py-10 max-w-4xl mx-auto ">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex items-center gap-6">
            {["All Blog", "Featured"].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`text-sm font-medium ${
                  activeFilter === filter
                    ? "text-black border-b-2 border-black pb-1"
                    : "text-gray-500 hover:text-gray-700"
                } transition-all duration-200`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Sort by</span>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="text-sm border border-gray-300 rounded px-2 py-1"
              >
                <option value="Latest">Latest</option>
                <option value="Oldest">Oldest</option>
              </select>
            </div>

            <div className="flex items-center gap-1 border border-gray-300 rounded p-1">
              <ViewModeButton
                mode="grid"
                icon={LayoutGrid}
                isActive={viewMode === "grid"}
              />
              <ViewModeButton
                mode="two"
                icon={Grid}
                isActive={viewMode === "two"}
              />
              <ViewModeButton
                mode="single"
                icon={Rows}
                isActive={viewMode === "single"}
              />
              <ViewModeButton
                mode="list"
                icon={List}
                isActive={viewMode === "list"}
              />
            </div>
          </div>
        </div>

        <div className={`grid ${getGridClass()} gap-6 mb-8`}>
          {sortedPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group">
              <div
                className={`bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 ${
                  viewMode === "list" ? "flex gap-4" : ""
                }`}
              >
                <div
                  className={`${
                    viewMode === "list" ? "w-48 flex-shrink-0" : ""
                  }`}
                >
                  <Image
                    src={post.image}
                    alt={post.title || "Blog image"}
                    width={400}
                    height={300}
                    className={`w-full object-cover group-hover:scale-105 transition-transform duration-300 ${
                      viewMode === "list" ? "h-32" : "h-48"
                    }`}
                  />
                </div>
                <div className={`p-4 ${viewMode === "list" ? "flex-1" : ""}`}>
                  <div className="flex items-center gap-2 mb-2">
                    {/* <span className="text-xs text-gray-500 uppercase tracking-wide">
                      {post.category}
                    </span> */}
                    {post.featured && (
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        Featured
                      </span>
                    )}
                  </div>
                  <h3
                    className={`font-medium text-gray-900 mb-2 leading-tight group-hover:text-blue-600 transition-colors ${
                      viewMode === "list" ? "text-lg" : "text-base"
                    }`}
                  >
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">{post.date}</p>
                  {/* {viewMode === "list" && (
                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                      {post.expert || "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
                    </p>
                  )} */}
                  <div className="mt-4 text-sm text-blue-600 group-hover:underline">
                    Read More →
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
