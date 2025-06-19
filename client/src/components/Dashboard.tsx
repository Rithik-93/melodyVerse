
import React from 'react';
import { Music, LogOut, User, Settings, Search, Heart, PlayCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

const Dashboard = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast({
      title: "Goodbye!",
      description: "You've been successfully logged out.",
    });
  };

  const featuredPlaylists = [
    { id: 1, name: "Today's Top Hits", description: "The most played songs today", tracks: 50 },
    { id: 2, name: "Chill Vibes", description: "Relax and unwind with these tracks", tracks: 35 },
    { id: 3, name: "Workout Motivation", description: "High-energy tracks to keep you moving", tracks: 42 },
    { id: 4, name: "Indie Discoveries", description: "Fresh indie tracks you'll love", tracks: 28 },
  ];

  const recentlyPlayed = [
    { id: 1, title: "Blinding Lights", artist: "The Weeknd", album: "After Hours" },
    { id: 2, title: "Levitating", artist: "Dua Lipa", album: "Future Nostalgia" },
    { id: 3, title: "Good 4 U", artist: "Olivia Rodrigo", album: "SOUR" },
    { id: 4, title: "Stay", artist: "The Kid LAROI & Justin Bieber", album: "Stay" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-blue-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-full">
                <Music className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">MelodyVerse</h1>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
              
              <div className="flex items-center space-x-2">
                <Avatar>
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="bg-purple-500 text-white">
                    {user?.name ? user.name.charAt(0).toUpperCase() : user?.username?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="text-white text-sm">{user?.name || user?.username}</span>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-white hover:bg-white/10"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            Welcome back, {user?.name || user?.username}!
          </h2>
          <p className="text-gray-300">Ready to discover your next favorite song?</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Button className="h-20 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0">
            <div className="flex flex-col items-center">
              <PlayCircle className="h-6 w-6 mb-1" />
              <span className="text-sm">Quick Play</span>
            </div>
          </Button>
          <Button className="h-20 bg-white/10 hover:bg-white/20 text-white border-white/20">
            <div className="flex flex-col items-center">
              <Heart className="h-6 w-6 mb-1" />
              <span className="text-sm">Liked Songs</span>
            </div>
          </Button>
          <Button className="h-20 bg-white/10 hover:bg-white/20 text-white border-white/20">
            <div className="flex flex-col items-center">
              <Clock className="h-6 w-6 mb-1" />
              <span className="text-sm">Recently Played</span>
            </div>
          </Button>
          <Button className="h-20 bg-white/10 hover:bg-white/20 text-white border-white/20">
            <div className="flex flex-col items-center">
              <Settings className="h-6 w-6 mb-1" />
              <span className="text-sm">Settings</span>
            </div>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Featured Playlists */}
          <div className="lg:col-span-2">
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Featured Playlists</CardTitle>
                <CardDescription className="text-gray-300">
                  Curated playlists just for you
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {featuredPlaylists.map((playlist) => (
                    <div
                      key={playlist.id}
                      className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors cursor-pointer group"
                    >
                      <div className="bg-gradient-to-br from-purple-500 to-pink-500 w-16 h-16 rounded-lg mb-3 flex items-center justify-center group-hover:scale-105 transition-transform">
                        <Music className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-white font-semibold mb-1">{playlist.name}</h3>
                      <p className="text-gray-400 text-sm mb-2">{playlist.description}</p>
                      <p className="text-gray-500 text-xs">{playlist.tracks} tracks</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recently Played */}
          <div>
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Recently Played</CardTitle>
                <CardDescription className="text-gray-300">
                  Your recent listening history
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentlyPlayed.map((track) => (
                    <div
                      key={track.id}
                      className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/5 cursor-pointer transition-colors"
                    >
                      <div className="bg-gradient-to-br from-purple-500 to-pink-500 w-10 h-10 rounded-md flex items-center justify-center">
                        <Music className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium truncate">{track.title}</p>
                        <p className="text-gray-400 text-xs truncate">{track.artist}</p>
                      </div>
                      <Button variant="ghost" size="sm" className="p-1 h-8 w-8 text-gray-400 hover:text-white">
                        <PlayCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
