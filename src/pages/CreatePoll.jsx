import React, { useContext, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { Message } from '@/utils/Message';
import { createPoll } from '@/services/poll/poll';

export const CreatePoll = () => {
  const { user } = useContext(AuthContext);
  const [response, setResponse] = useState(null);
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']); // Default to 4 options
  const handleOptionChange = (index, value) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(filteredOptions, question, user); 
    
    if (!user) {
      setResponse({ status: 401, data: { message: 'Please log in to create a poll' } });
      return;
    }
    
    try {
      const filteredOptions = options.filter(opt => opt.trim());
      const result = await createPoll({ question, options: filteredOptions }, user);
      console.log(result);
      setResponse(result);
      setQuestion('');
      setOptions(['', '', '', '']); // Reset to 4 options after successful creation
    } catch (err) {
      setResponse(err.response)
    }
  };

  return (
    <div className="flex justify-center p-4 flex-col">
      {response && <div className="mb-4"><Message response={response} /></div>}
      <Card className="w-full max-w-2xl shadow-md rounded-xl">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Create a Poll</CardTitle>
        </CardHeader>
        <CardContent>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Question</Label>
              <Input
                placeholder="What is your question?"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                required
              />
            </div>

            {options.map((opt, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-full">
                  <Label>Option {index + 1}</Label>
                  <Input
                    placeholder={`Option ${index + 1}`}
                    value={opt}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    required
                  />
                </div>
              </div>
            ))}

            <Button type="submit" className="w-full bg-amber-400 text-black hover:bg-amber-300">
              Create Poll
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
