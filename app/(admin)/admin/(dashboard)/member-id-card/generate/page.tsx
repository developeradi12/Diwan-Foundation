"use client";
import Header from "@/app/(admin)/_components/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { ChevronDown, Search, X } from "lucide-react";

interface User {
  _id: string;
  fullName: string;
}

const GenerateIdCard = () => {
  const [memberId, setMemberId] = useState("");
  const [selectedName, setSelectedName] = useState("");
  const [members, setMembers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setSearchQuery("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen) setTimeout(() => searchRef.current?.focus(), 50);
  }, [isOpen]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await api.get("/users");
        setMembers(res.data.users);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch users");
      }
    };
    fetchMembers();
  }, []);

  const filtered = members.filter((m) =>
    m.fullName.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

  const handleSelect = (member: User) => {
    setMemberId(member._id);
    setSelectedName(member.fullName);
    setIsOpen(false);
    setSearchQuery("");
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMemberId("");
    setSelectedName("");
    setSearchQuery("");
  };

  const handleGenerate = async () => {
    if (!memberId) {
      toast.error("Please select a user first");
      return;
    }
    setIsLoading(true);
    try {
      await api.post("/id-card/generate", { memberId });
      toast.success("ID card generated successfully");
      router.push("/admin/member-id-card");
    } catch (error: any) {
      const message = error.response?.data?.message || "Something went wrong";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Header
        backlink="/admin/dashboard"
        pageName="Dashboard"
        currentPage="Create ID Card"
      />

      <div className="p-6 bg-gray-50 h-[60vh] flex items-center">
        <div className="bg-white p-5 rounded-md lg:min-w-xl mx-auto w-full max-w-lg">
          <div className="mb-5">
            <h3 className="text-xl font-bold">Generate ID Card</h3>
            <p className="text-sm text-gray-400 mt-0.5">
              First choose a user for creating an ID card
            </p>
          </div>

          {/* Searchable Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <div
              onClick={() => setIsOpen((prev) => !prev)}
              className={`flex items-center justify-between w-full px-3 py-2.5 border rounded-md cursor-pointer text-sm transition-all ${
                isOpen
                  ? "border-blue-500 ring-1 ring-blue-500"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <span className={selectedName ? "text-gray-900" : "text-gray-400"}>
                {selectedName || "Select User"}
              </span>
              <div className="flex items-center gap-1">
                {selectedName && (
                  <button
                    onClick={handleClear}
                    className="p-0.5 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-600"
                  >
                    <X size={14} />
                  </button>
                )}
                <ChevronDown
                  size={16}
                  className={`text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                />
              </div>
            </div>

            {isOpen && (
              <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden">
                <div className="p-2 border-b border-gray-100">
                  <div className="relative">
                    <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <Input
                      ref={searchRef}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search user..."
                      className="h-8 pl-8 text-sm border-gray-200 focus-visible:ring-1"
                    />
                  </div>
                </div>

                <ul className="max-h-52 overflow-y-auto py-1">
                  {filtered.length === 0 ? (
                    <li className="px-3 py-6 text-center text-sm text-gray-400">
                      No users found
                    </li>
                  ) : (
                    filtered.map((m) => (
                      <li
                        key={m._id}
                        onClick={() => handleSelect(m)}
                        className={`px-3 py-2 text-sm cursor-pointer transition-colors capitalize ${
                          memberId === m._id
                            ? "bg-blue-50 text-blue-700 font-medium"
                            : "hover:bg-gray-50 text-gray-700"
                        }`}
                      >
                        {m.fullName}
                      </li>
                    ))
                  )}
                </ul>

                {filtered.length > 0 && (
                  <div className="px-3 py-1.5 border-t border-gray-100 text-xs text-gray-400">
                    {filtered.length} user{filtered.length !== 1 ? "s" : ""}
                  </div>
                )}
              </div>
            )}
          </div>

          <Button
            onClick={handleGenerate}
            disabled={!memberId || isLoading}
            className="text-white px-4 py-2 mt-4 cursor-pointer w-full disabled:opacity-50"
          >
            {isLoading ? "Generating..." : "Create ID Card"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GenerateIdCard;