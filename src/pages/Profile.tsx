import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Instagram, Github, Mail } from 'lucide-react';
import { siteConfig } from '@server/storage/siteConfig';

const Profile: React.FC = () => {
  const { profile, about } = siteConfig;

  return (
    <div className="min-h-screen bg-black text-white">
      End
    </div>
  );
};

export default Profile;