import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader } from 'lucide-react';
import { getPolls, votePoll } from '@/services/poll/poll';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import socket from '@/services/poll/socket';
import { Footer } from '@/components/Footer';

export const Home = () => {
  const [polls, setPolls] = useState([]);
  // Change votedPolls to track both poll ID and option index
  const [votedPolls, setVotedPolls] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedVotes = localStorage.getItem("votedPolls");
    if (storedVotes) setVotedPolls(JSON.parse(storedVotes));

    const loadPolls = async () => {
      try {
        const data = await getPolls();
        setPolls(data.data.polls);
      } catch (error) {
        console.error('Failed to fetch polls', error);
      } finally {
        setLoading(false);
      }
    };

    loadPolls();

    socket.on('voteUpdate', (updatedPoll) => {
      setPolls((prevPolls) =>
        prevPolls.map((poll) => (poll._id === updatedPoll._id ? updatedPoll : poll))
      );
    });

    return () => {
      socket.off('voteUpdate');
    };
  }, []);

  const handleVote = async (optionIndex, pollId) => {
    try {
      await votePoll({ optionIndex, pollId });
      setVotedPolls((prev) => {
        const updated = { ...prev, [pollId]: optionIndex };
        localStorage.setItem("votedPolls", JSON.stringify(updated));
        return updated;
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="px-4 py-5 max-w-5xl mx-auto min-h-screen">
        <h1 className="text-4xl font-bold text-center text-amber-500 mb-10 mt-20">🗳️ All Polls</h1>

        {loading ? (
          <div className="flex justify-center items-center text-gray-500 py-16">
            <Loader className="animate-spin mr-2" /> Loading polls...
          </div>
        ) : polls.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No polls available yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {polls.map((poll) => {
              const totalVotes = poll.options.reduce((sum, opt) => sum + opt.votes, 0);
              const hasVoted = poll._id in votedPolls;
              const votedOptionIndex = votedPolls[poll._id];
              const createdBy = poll.createdBy;
              const createdAt = new Date(poll.createdAt).toLocaleString();

              return (
                <Card key={poll._id} className="bg-white rounded-2xl border border-gray-200">
                  <CardHeader className="flex flex-row items-center gap-3">
                    <Avatar className="bg-gray-300">
                      <AvatarImage src={createdBy?.avatar || ''} />
                      <AvatarFallback className="capitalize">
                        {createdBy?.fullName?.[0] ?? 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-semibold text-gray-800 capitalize">{createdBy?.fullName || 'Unknown'}</p>
                      <p className="text-xs text-gray-500">{createdAt}</p>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2 pt-0">
                    <CardTitle className="text-base font-semibold text-gray-900">{poll.question}</CardTitle>
                    <p className="text-xs text-gray-500">{totalVotes} answered</p>

                    <div className="space-y-3">
                      {poll.options.map((option, index) => {
                        const percentage = totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0;
                        const isVotedOption = hasVoted && votedOptionIndex === index;

                        return (
                          <button
                            key={index}
                            disabled={hasVoted}
                            onClick={() => handleVote(index, poll._id)}
                            className={`w-full px-4 py-3 rounded-lg text-left font-medium border transition-colors duration-200 
                              ${hasVoted
                                ? isVotedOption
                                  ? 'bg-amber-100 border-amber-400 text-amber-900' // Highlight voted option
                                  : 'bg-gray-100 text-gray-700 cursor-not-allowed'
                                : 'hover:bg-amber-100 border-amber-300 text-gray-900'}`}
                          >
                            <div className="flex justify-between items-center">
                              <span>{option.text}</span>
                              {hasVoted && (
                                <span className="text-sm font-medium text-amber-600">{option.votes} votes</span>
                              )}
                            </div>
                            {hasVoted && (
                              <div className="w-full mt-2 h-2 rounded bg-gray-200 overflow-hidden">
                                <div
                                  className="h-full bg-amber-500 transition-all"
                                  style={{ width: `${percentage}%` }}
                                ></div>
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
      <div className='bottom-0'>
        <Footer/>
      </div>
    </>
  );
};