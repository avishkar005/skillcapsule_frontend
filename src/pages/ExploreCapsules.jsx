import React, { useState, useMemo } from 'react';
import { Search, Filter, X } from 'lucide-react';
import CapsuleCard from '../components/CapsuleCard';
import { mockCapsules, categories } from '../data/mockData';
import Button from '../components/Button';

const ExploreCapsules = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [showFilters, setShowFilters] = useState(false);

  const levels = ['All Levels', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredCapsules = useMemo(() => {
    let filtered = [...mockCapsules];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (capsule) =>
          capsule.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          capsule.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          capsule.skills.some((skill) =>
            skill.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(
        (capsule) => capsule.category.toLowerCase().replace(' / ', '-').replace(' ', '-') === selectedCategory
      );
    }

    // Level filter
    if (selectedLevel !== 'all') {
      filtered = filtered.filter(
        (capsule) => capsule.level.toLowerCase() === selectedLevel.toLowerCase()
      );
    }

    // Sort
    switch (sortBy) {
      case 'popular':
        filtered.sort((a, b) => b.students - a.students);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    return filtered;
  }, [searchQuery, selectedCategory, selectedLevel, sortBy]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedLevel('all');
    setSortBy('popular');
  };

  const hasActiveFilters = searchQuery || selectedCategory !== 'all' || selectedLevel !== 'all' || sortBy !== 'popular';

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-display font-bold text-neutral-900 mb-2">
          Explore Capsules
        </h1>
        <p className="text-neutral-600">
          Discover curated micro-learning capsules to accelerate your skills
        </p>
      </div>

      {/* Search and Filter Bar */}
      <div className="card p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              placeholder="Search capsules, topics, or skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
          >
            <option value="popular">Most Popular</option>
            <option value="rating">Highest Rated</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>

          {/* Filter Toggle */}
          <Button
            variant="secondary"
            icon={<Filter className="w-5 h-5" />}
            onClick={() => setShowFilters(!showFilters)}
          >
            Filters
          </Button>
        </div>

        {/* Expandable Filters */}
        {showFilters && (
          <div className="mt-6 pt-6 border-t border-neutral-200 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Categories */}
            <div>
              <h3 className="font-semibold text-neutral-900 mb-3">Category</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <label key={category.id} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === category.id}
                      onChange={() => setSelectedCategory(category.id)}
                      className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-neutral-700">
                      {category.name} ({category.count})
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Levels */}
            <div>
              <h3 className="font-semibold text-neutral-900 mb-3">Skill Level</h3>
              <div className="space-y-2">
                {levels.map((level) => (
                  <label key={level} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="level"
                      checked={selectedLevel === (level === 'All Levels' ? 'all' : level.toLowerCase())}
                      onChange={() => setSelectedLevel(level === 'All Levels' ? 'all' : level.toLowerCase())}
                      className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-neutral-700">{level}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Active Filters */}
        {hasActiveFilters && (
          <div className="mt-4 pt-4 border-t border-neutral-200 flex items-center gap-3">
            <span className="text-sm text-neutral-600">Active filters:</span>
            {searchQuery && (
              <span className="badge bg-primary-100 text-primary-700">
                Search: {searchQuery}
              </span>
            )}
            {selectedCategory !== 'all' && (
              <span className="badge bg-primary-100 text-primary-700">
                {categories.find((c) => c.id === selectedCategory)?.name}
              </span>
            )}
            {selectedLevel !== 'all' && (
              <span className="badge bg-primary-100 text-primary-700">
                {selectedLevel.charAt(0).toUpperCase() + selectedLevel.slice(1)}
              </span>
            )}
            <button
              onClick={clearFilters}
              className="ml-auto text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
            >
              <X className="w-4 h-4" />
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Results */}
      <div>
        <p className="text-neutral-600 mb-6">
          Showing {filteredCapsules.length} capsule{filteredCapsules.length !== 1 ? 's' : ''}
        </p>

        {filteredCapsules.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCapsules.map((capsule) => (
              <CapsuleCard key={capsule.id} capsule={capsule} />
            ))}
          </div>
        ) : (
          <div className="card p-12 text-center">
            <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-neutral-400" />
            </div>
            <h3 className="font-semibold text-neutral-900 mb-2">No capsules found</h3>
            <p className="text-neutral-600 mb-4">
              Try adjusting your search or filters
            </p>
            <Button variant="primary" onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExploreCapsules;
