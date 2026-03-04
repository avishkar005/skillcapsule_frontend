import React from 'react';
import { Star, Clock, Users, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

const CapsuleCard = ({ capsule, compact = false }) => {
  const navigate = useNavigate();

  const getLevelColor = (level) => {
    switch (level.toLowerCase()) {
      case 'beginner':
        return 'bg-green-100 text-green-700';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-700';
      case 'advanced':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-neutral-100 text-neutral-700';
    }
  };

  if (compact) {
    return (
      <div 
        className="card p-4 cursor-pointer hover:scale-[1.02]"
        onClick={() => navigate(`/capsule/${capsule.id}`)}
      >
        <div className="flex gap-4">
          <img 
            src={capsule.thumbnail} 
            alt={capsule.title}
            className="w-24 h-24 rounded-lg object-cover"
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-neutral-900 mb-1 truncate">{capsule.title}</h3>
            <div className="flex items-center gap-3 text-sm text-neutral-600 mb-2">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>{capsule.rating}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{capsule.duration}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className={`badge ${getLevelColor(capsule.level)}`}>
                {capsule.level}
              </span>
              <span className="text-lg font-bold text-primary-600">₹{capsule.price}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card group cursor-pointer" onClick={() => navigate(`/capsule/${capsule.id}`)}>
      <div className="relative overflow-hidden">
        <img 
          src={capsule.thumbnail} 
          alt={capsule.title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute top-3 right-3">
          <span className={`badge ${getLevelColor(capsule.level)} shadow-sm`}>
            {capsule.level}
          </span>
        </div>
        {capsule.originalPrice && (
          <div className="absolute top-3 left-3 bg-accent-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
            {Math.round((1 - capsule.price / capsule.originalPrice) * 100)}% OFF
          </div>
        )}
      </div>
      
      <div className="p-5">
        <h3 className="font-semibold text-lg text-neutral-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
          {capsule.title}
        </h3>
        
        <p className="text-sm text-neutral-600 mb-4 line-clamp-2">
          {capsule.description}
        </p>

        <div className="flex items-center gap-2 mb-4">
          <img 
            src={capsule.instructorAvatar} 
            alt={capsule.instructor}
            className="w-6 h-6 rounded-full"
          />
          <span className="text-sm text-neutral-700">{capsule.instructor}</span>
        </div>

        <div className="flex items-center gap-4 text-sm text-neutral-600 mb-4">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{capsule.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="w-4 h-4" />
            <span>{capsule.modules} modules</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{capsule.students.toLocaleString()}</span>
          </div>
        </div>

        <div className="flex items-center gap-1 mb-4">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-4 h-4 ${i < Math.floor(capsule.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-neutral-300'}`}
              />
            ))}
          </div>
          <span className="text-sm font-medium text-neutral-700">{capsule.rating}</span>
          <span className="text-sm text-neutral-500">({capsule.reviews})</span>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
          <div>
            {capsule.originalPrice && (
              <span className="text-sm text-neutral-500 line-through mr-2">
                ₹{capsule.originalPrice}
              </span>
            )}
            <span className="text-2xl font-bold text-neutral-900">₹{capsule.price}</span>
          </div>
          <Button 
            variant="primary" 
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/capsule/${capsule.id}`);
            }}
          >
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CapsuleCard;
