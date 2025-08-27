
import React from 'react';
import type { EvaluationResult, DetailedAnalysis } from '../types';

interface EvaluationResultDisplayProps {
  result: EvaluationResult;
  onReset: () => void;
}

const ScoreCircle: React.FC<{ score: number }> = ({ score }) => {
  const getScoreColor = (s: number) => {
    if (s >= 80) return 'text-green-500';
    if (s >= 60) return 'text-yellow-500';
    if (s >= 40) return 'text-orange-500';
    return 'text-red-500';
  };

  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative w-40 h-40">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        <circle
          className="text-gray-200"
          strokeWidth="10"
          stroke="currentColor"
          fill="transparent"
          r="45"
          cx="50"
          cy="50"
        />
        <circle
          className={`${getScoreColor(score)} transition-all duration-1000 ease-out`}
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r="45"
          cx="50"
          cy="50"
          transform="rotate(-90 50 50)"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`text-4xl font-bold ${getScoreColor(score)}`}>
          {score}
        </span>
        <span className="text-sm font-medium text-gray-500">/ 100</span>
      </div>
    </div>
  );
};

const IconCard: React.FC<{ title: string; items: string[]; icon: React.ReactNode; color: string }> = ({ title, items, icon, color }) => (
  <div className="bg-gray-50 rounded-lg p-6">
    <div className="flex items-center">
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${color}`}>
        {icon}
      </div>
      <h3 className="ml-3 text-lg font-semibold text-gray-800">{title}</h3>
    </div>
    <ul className="mt-4 space-y-2 list-disc list-inside text-gray-600">
      {items.map((item, index) => <li key={index}>{item}</li>)}
    </ul>
  </div>
);

const AnalysisItem: React.FC<{ item: DetailedAnalysis }> = ({ item }) => (
  <div className="py-4 border-b border-gray-200 last:border-b-0">
    <div className="flex justify-between items-center">
      <h4 className="font-semibold text-gray-800">{item.category}</h4>
      <span className="font-bold text-lg text-indigo-600">{item.score}/100</span>
    </div>
    <p className="mt-2 text-sm text-gray-600">{item.analysis}</p>
  </div>
);


export const EvaluationResultDisplay: React.FC<EvaluationResultDisplayProps> = ({ result, onReset }) => {
  return (
    <div className="space-y-10">
      <div className="text-center p-6 bg-gray-50 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-900">Kết Quả Đánh Giá Tiềm Năng</h2>
        <div className="mt-6 flex justify-center">
          <ScoreCircle score={result.overallScore} />
        </div>
        <p className="mt-6 max-w-2xl mx-auto text-gray-600">{result.summary}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <IconCard 
          title="Điểm mạnh" 
          items={result.strengths} 
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>}
          color="bg-green-500"
        />
        <IconCard 
          title="Điểm yếu" 
          items={result.weaknesses} 
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>}
          color="bg-red-500"
        />
      </div>
      
      <div className="bg-indigo-50 rounded-lg p-6">
        <div className="flex items-center">
            <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-indigo-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor"><path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" /><path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" /></svg>
            </div>
            <h3 className="ml-3 text-lg font-semibold text-gray-800">Đề xuất & Hành động</h3>
        </div>
        <ul className="mt-4 space-y-2 list-disc list-inside text-gray-600">
            {result.recommendations.map((item, index) => <li key={index}>{item}</li>)}
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">Phân tích chi tiết</h3>
        <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-200">
          {result.detailedAnalysis.map((item) => (
            <AnalysisItem key={item.category} item={item} />
          ))}
        </div>
      </div>

      <div className="mt-10 text-center p-6 bg-indigo-50 rounded-lg border border-indigo-200">
        <h4 className="text-lg font-semibold text-gray-900">Cần tư vấn chuyên sâu?</h4>
        <p className="mt-2 text-gray-600">
            Liên hệ chuyên gia để được tư vấn chi tiết và chuẩn xác hơn:
        </p>
        <p className="mt-2 font-semibold text-indigo-700 text-lg">
            <a href="tel:0948458589" className="hover:underline">0948458589</a> - <a href="mailto:vien.nguyenh@gmail.com" className="hover:underline">vien.nguyenh@gmail.com</a>
        </p>
      </div>

      <div className="pt-5 text-center">
        <button
          onClick={onReset}
          className="w-full sm:w-auto inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Đánh giá mặt bằng khác
        </button>
      </div>
    </div>
  );
};
