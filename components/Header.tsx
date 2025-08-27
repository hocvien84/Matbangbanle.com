
import React from 'react';

const StoreIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-500" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 1L1 5v2.586l2 1.414V22h18V8.999l2-1.414V5L12 1zm8 20H4V9.827l-1-.707V6.17l9-3.858 9 3.858v2.95l-1 .707V21z"/>
    <path d="M12 9a3 3 0 0 0-3 3v6h6v-6a3 3 0 0 0-3-3zm1 7h-2v-4h2v4z"/>
    <path d="M7 13h2v4H7zm8 0h2v4h-2z"/>
  </svg>
);

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md w-full">
      <div className="container mx-auto px-4 py-4 flex items-center justify-center text-center">
        <StoreIcon />
        <div className="ml-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Trợ Lý AI Đánh Giá Mặt Bằng
          </h1>
          <p className="text-sm md:text-base text-gray-500 mt-1">
            Phân tích & chấm điểm tiềm năng kinh doanh cửa hàng tiện lợi
          </p>
        </div>
      </div>
    </header>
  );
};
