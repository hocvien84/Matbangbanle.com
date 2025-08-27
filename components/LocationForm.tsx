
import React, { useState } from 'react';
import type { FormData } from '../types';
import { FormSection } from './FormSection';

interface LocationFormProps {
  onEvaluate: (formData: FormData) => void;
  isLoading: boolean;
}

const initialFormData: FormData = {
  businessType: 'Cửa hàng tiện lợi',
  city: 'Hồ Chí Minh',
  areaType: 'Khu dân cư đông đúc',
  targetCustomers: ['Sinh viên - Học sinh'],
  areaSize: 50,
  facadeWidth: 5,
  condition: 'Tốt, có thể sử dụng ngay',
  sidewalk: true,
  openingHour: 6,
  closingHour: 22,
  competitors: 2,
  amenities: ['Trường học / Đại học'],
  fengShui: '',
  rent: 20000000,
  paymentMethod: 'Cọc 2 tháng, trả tiền hàng tháng',
  notes: '',
  customerEmail: '',
  customerPhone: '',
};

const businessTypes = ['Cửa hàng tiện lợi', 'Cửa hàng thực phẩm', 'Cửa hàng mẹ và bé', 'Cửa hàng thời trang', 'Cửa hàng hoa quả', 'Quán Trà sữa - cafe'];
const areaTypes = ['Khu dân cư đông đúc', 'Gần trường học/đại học', 'Khu văn phòng', 'Mặt tiền đường lớn', 'Trong hẻm lớn, đông người qua lại', 'Gần chợ / TTTM', 'Khu công nghiệp'];
const customerTypes = ['Sinh viên - Học sinh', 'Dân văn phòng', 'Người dân trong khu vực', 'Khách vãng lai', 'Công nhân'];
const amenityTypes = ['Trường học / Đại học', 'Tòa nhà văn phòng', 'Bệnh viện', 'Trạm xe buýt / Ga tàu', 'Khu dân cư', 'Chợ / TTTM', 'Khu công nghiệp'];
const conditions = ['Rất tốt, không cần sửa chữa', 'Tốt, có thể sử dụng ngay', 'Cần cải tạo / sửa chữa nhỏ', 'Cần cải tạo / sửa chữa lớn'];


export const LocationForm: React.FC<LocationFormProps> = ({ onEvaluate, isLoading }) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleChange = <T extends keyof FormData,>(field: T, value: FormData[T]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (group: keyof FormData, value: string) => {
    const currentValues = formData[group] as string[];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(item => item !== value)
      : [...currentValues, value];
    handleChange(group, newValues as any);
  };
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onEvaluate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <FormSection title="Thông tin cơ bản" description="Các thông tin tổng quan về kế hoạch kinh doanh của bạn.">
        <div className="sm:col-span-3">
          <label htmlFor="businessType" className="block text-sm font-medium text-gray-700">Lĩnh vực kinh doanh</label>
           <select id="businessType" value={formData.businessType} onChange={e => handleChange('businessType', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
            {businessTypes.map(type => <option key={type} value={type}>{type}</option>)}
          </select>
        </div>
        <div className="sm:col-span-3">
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">Thành phố / Tỉnh</label>
          <input type="text" id="city" value={formData.city} onChange={e => handleChange('city', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
        </div>
      </FormSection>

      <FormSection title="Vị trí & Khách hàng mục tiêu" description="Yếu tố quan trọng nhất quyết định thành công.">
        <div className="sm:col-span-6">
          <label htmlFor="areaType" className="block text-sm font-medium text-gray-700">Đặc điểm khu vực</label>
          <select id="areaType" value={formData.areaType} onChange={e => handleChange('areaType', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
            {areaTypes.map(type => <option key={type} value={type}>{type}</option>)}
          </select>
        </div>
        <div className="sm:col-span-6">
          <label className="block text-sm font-medium text-gray-700">Đối tượng khách hàng mục tiêu</label>
          <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-2">
            {customerTypes.map(type => (
              <div key={type} className="flex items-center">
                <input id={`customer-${type}`} type="checkbox" checked={formData.targetCustomers.includes(type)} onChange={() => handleCheckboxChange('targetCustomers', type)} className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                <label htmlFor={`customer-${type}`} className="ml-2 block text-sm text-gray-900">{type}</label>
              </div>
            ))}
          </div>
        </div>
      </FormSection>

      <FormSection title="Hiện trạng mặt bằng" description="Thông tin chi tiết về diện tích, cấu trúc mặt bằng.">
         <div className="sm:col-span-2">
            <label htmlFor="areaSize" className="block text-sm font-medium text-gray-700">Diện tích (m²)</label>
            <input type="number" id="areaSize" value={formData.areaSize} onChange={e => handleChange('areaSize', parseInt(e.target.value, 10))} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
        </div>
        <div className="sm:col-span-2">
            <label htmlFor="facadeWidth" className="block text-sm font-medium text-gray-700">Mặt tiền (m)</label>
            <input type="number" id="facadeWidth" value={formData.facadeWidth} onChange={e => handleChange('facadeWidth', parseInt(e.target.value, 10))} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
        </div>
        <div className="sm:col-span-2 flex items-end">
            <div className="flex items-center h-full">
                <input id="sidewalk" type="checkbox" checked={formData.sidewalk} onChange={e => handleChange('sidewalk', e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                <label htmlFor="sidewalk" className="ml-2 block text-sm font-medium text-gray-900">Có vỉa hè rộng</label>
            </div>
        </div>
         <div className="sm:col-span-6">
          <label htmlFor="condition" className="block text-sm font-medium text-gray-700">Tình trạng</label>
          <select id="condition" value={formData.condition} onChange={e => handleChange('condition', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
            {conditions.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </FormSection>

      <FormSection title="Môi trường xung quanh" description="Phân tích các yếu tố bên ngoài ảnh hưởng đến kinh doanh.">
        <div className="sm:col-span-3">
          <label htmlFor="openingHour" className="block text-sm font-medium text-gray-700">Giờ mở cửa</label>
          <input type="number" id="openingHour" min="0" max="23" value={formData.openingHour} onChange={e => handleChange('openingHour', parseInt(e.target.value, 10))} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
        </div>
        <div className="sm:col-span-3">
          <label htmlFor="closingHour" className="block text-sm font-medium text-gray-700">Giờ đóng cửa</label>
          <input type="number" id="closingHour" min="0" max="23" value={formData.closingHour} onChange={e => handleChange('closingHour', parseInt(e.target.value, 10))} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
        </div>
        <div className="sm:col-span-6">
          <label htmlFor="competitors" className="block text-sm font-medium text-gray-700">Số đối thủ cạnh tranh trực tiếp (bán kính 500m)</label>
          <input type="number" id="competitors" min="0" value={formData.competitors} onChange={e => handleChange('competitors', parseInt(e.target.value, 10))} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
        </div>
         <div className="sm:col-span-6">
          <label className="block text-sm font-medium text-gray-700">Các tiện ích lân cận</label>
          <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-2">
            {amenityTypes.map(type => (
              <div key={type} className="flex items-center">
                <input id={`amenity-${type}`} type="checkbox" checked={formData.amenities.includes(type)} onChange={() => handleCheckboxChange('amenities', type)} className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                <label htmlFor={`amenity-${type}`} className="ml-2 block text-sm text-gray-900">{type}</label>
              </div>
            ))}
          </div>
        </div>
      </FormSection>

       <FormSection title="Chi phí & Yếu tố khác" description="Thông tin về tài chính và các yếu tố phụ.">
        <div className="sm:col-span-3">
          <label htmlFor="rent" className="block text-sm font-medium text-gray-700">Giá thuê (VNĐ/tháng)</label>
          <input type="number" id="rent" step="100000" value={formData.rent} onChange={e => handleChange('rent', parseInt(e.target.value, 10))} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
        </div>
        <div className="sm:col-span-3">
          <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700">Hình thức thanh toán</label>
          <input type="text" id="paymentMethod" value={formData.paymentMethod} onChange={e => handleChange('paymentMethod', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
        </div>
        <div className="sm:col-span-6">
          <label htmlFor="fengShui" className="block text-sm font-medium text-gray-700">Yếu tố phong thủy (hướng nhà, hình dáng...)</label>
          <input type="text" id="fengShui" value={formData.fengShui} onChange={e => handleChange('fengShui', e.target.value)} placeholder="Ví dụ: hướng Đông Nam, nở hậu" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
        </div>
         <div className="sm:col-span-6">
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Ghi chú thêm</label>
          <textarea id="notes" value={formData.notes} onChange={e => handleChange('notes', e.target.value)} rows={3} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"></textarea>
        </div>
      </FormSection>

      <FormSection title="Thông tin liên hệ" description="Nhập thông tin để nhận kết quả phân tích chi tiết qua email.">
        <div className="sm:col-span-3">
            <label htmlFor="customerEmail" className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" name="customerEmail" id="customerEmail" value={formData.customerEmail} onChange={e => handleChange('customerEmail', e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
        </div>
        <div className="sm:col-span-3">
            <label htmlFor="customerPhone" className="block text-sm font-medium text-gray-700">Số điện thoại</label>
            <input type="tel" name="customerPhone" id="customerPhone" value={formData.customerPhone} onChange={e => handleChange('customerPhone', e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
        </div>
      </FormSection>

      <div className="pt-5">
        <div className="flex justify-end">
          <button type="submit" disabled={isLoading} className="w-full sm:w-auto inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-300 disabled:cursor-not-allowed">
            {isLoading ? 'Đang phân tích...' : 'Phân Tích & Chấm Điểm'}
          </button>
        </div>
      </div>
    </form>
  );
};
