import React, { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';

interface SimpleCaptchaProps {
  onVerify: (isValid: boolean) => void;
  error?: string;
}

const SimpleCaptcha: React.FC<SimpleCaptchaProps> = ({ onVerify, error }) => {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [answer, setAnswer] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  const generateQuestion = () => {
    const n1 = Math.floor(Math.random() * 10) + 1;
    const n2 = Math.floor(Math.random() * 10) + 1;
    setNum1(n1);
    setNum2(n2);
    setAnswer('');
    setIsVerified(false);
    onVerify(false);
  };

  useEffect(() => {
    generateQuestion();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAnswer(value);
    
    const correctAnswer = num1 + num2;
    const isValid = value === correctAnswer.toString();
    setIsVerified(isValid);
    onVerify(isValid);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Security Verification *
      </label>
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2 bg-gray-50 border-2 border-gray-200 rounded-lg px-4 py-2">
          <span className="text-lg font-bold text-gray-900">{num1}</span>
          <span className="text-gray-600">+</span>
          <span className="text-lg font-bold text-gray-900">{num2}</span>
          <span className="text-gray-600">=</span>
          <input
            type="number"
            value={answer}
            onChange={handleChange}
            className="w-16 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center font-semibold"
            placeholder="?"
            required
          />
        </div>
        <button
          type="button"
          onClick={generateQuestion}
          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          title="Generate new question"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>
      {isVerified && (
        <p className="text-sm text-green-600 flex items-center">
          <span className="mr-1">✓</span> Verification successful
        </p>
      )}
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
      <p className="text-xs text-gray-500 mt-1">
        Please solve this simple math problem to verify you're human
      </p>
    </div>
  );
};

export default SimpleCaptcha;

