import React, { useContext, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AuthContext } from '../context/AuthContext';
import { Message } from '@/utils/Message';
import { createPoll } from '@/services/poll/poll';
import { Loader } from 'lucide-react';

export const CreatePoll = () => {
  const { user } = useContext(AuthContext);
  const [response, setResponse] = useState(null);
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);

  const handleOptionChange = (index, value) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!user) {
      setResponse({ status: 401, data: { message: 'Please log in to create a poll' } });
      return;
    }

    try {
      const filteredOptions = options.filter(opt => opt.trim());
      const result = await createPoll({ question, options: filteredOptions }, user);
      setResponse(result);
      setQuestion('');
      setOptions(['', '', '', '']);
    } catch (err) {
      setResponse(err.response);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center px-4">
      <div className="w-full max-w-xl mt-23">
        {response && <div className="mb-4"><Message response={response} /></div>}
        <Card className="rounded-2xl shadow-lg border border-gray-200 bg-white">
          <CardHeader className="rounded-t-2xl px-5 py-3">
            <CardTitle className="text-2xl font-semibold text-center text-gray-800">
              ✨ Create a Poll
            </CardTitle>
          </CardHeader>

          <CardContent className="p-5 space-y-5">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <input
                  id="question"
                  placeholder="What's your poll question?"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="mt-1 border border-gray-300 rounded-md p-2 w-full
    focus:outline-none focus:ring-0 focus:border-gray-400 focus-visible:outline-none"
                  required
                />
              </div>

              <div className="space-y-3">
                {options.map((opt, index) => (
                  <div key={index}>
                    <input
                      id={`option-${index}`}
                      placeholder={`Enter option ${index + 1}`}
                      value={opt}
                      onChange={(e) => handleOptionChange(index, e.target.value)}
                      className="mt-1 border-gray-300 border rounded-md p-2 w-full 
                      focus:ring-0 focus:outline-none focus:border-gray-400"
                      required
                    />
                  </div>
                ))}
              </div>

              {
                loading ? <Loader className="animate-spin w-full" /> : 
              <Button
                type="submit"
                className="w-full bg-amber-700 text-white hover:bg-amber-600 transition-colors font-semibold text-md py-2 rounded-xl"
              >
                🚀 Create Poll
              </Button>
              }
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
