
import React, { useState } from 'react';
import { LocationForm } from './components/LocationForm';
import { EvaluationResultDisplay } from './components/EvaluationResultDisplay';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Spinner } from './components/Spinner';
import { evaluateLocation } from './services/geminiService';
import type { FormData, EvaluationResult } from './types';

const App: React.FC = () => {
  const [evaluationResult, setEvaluationResult] = useState<EvaluationResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleEvaluate = async (formData: FormData) => {
    setIsLoading(true);
    setError(null);
    setEvaluationResult(null);
    try {
      const result = await evaluateLocation(formData);
      setEvaluationResult(result);
      // As a frontend-only application, we cannot directly send emails from a server.
      // This console log simulates the action for when a backend service is integrated.
      if (formData.customerEmail) {
        console.log(`Evaluation complete. A backend service would send results to: ${formData.customerEmail}`);
      }
    } catch (err) {
      console.error('Lỗi khi gọi Gemini API:', err);
      setError('Đã xảy ra lỗi khi phân tích. Vui lòng thử lại sau. Hãy chắc chắn rằng bạn đã cung cấp API key.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleReset = () => {
    setEvaluationResult(null);
    setError(null);
    setIsLoading(false);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-800">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
          {!evaluationResult ? (
            <div className="p-6 md:p-10">
              <LocationForm onEvaluate={handleEvaluate} isLoading={isLoading} />
            </div>
          ) : (
            <div className="p-6 md:p-10">
              <EvaluationResultDisplay result={evaluationResult} onReset={handleReset} />
            </div>
          )}
          {isLoading && (
            <div className="p-10 flex flex-col items-center justify-center">
              <Spinner />
              <p className="mt-4 text-lg text-gray-600 animate-pulse">AI đang phân tích, vui lòng chờ trong giây lát...</p>
            </div>
          )}
          {error && !isLoading && (
            <div className="p-10 text-center">
              <p className="text-red-500 font-semibold">{error}</p>
              <button
                onClick={handleReset}
                className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                Thử lại
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
