
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white mt-8">
      <div className="container mx-auto py-4 px-4 text-center text-gray-500 text-sm">
        <p>
          © {new Date().getFullYear()} Trợ Lý Đánh Giá Mặt Bằng. Cung cấp bởi AI.
        </p>
        <p className="mt-1">
          Mọi kết quả chỉ mang tính chất tham khảo.
        </p>
      </div>
    </footer>
  );
};
