
import { GoogleGenAI, Type } from "@google/genai";
import type { FormData, EvaluationResult } from '../types';

if (!process.env.API_KEY) {
  console.error("API_KEY is not set in environment variables.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const generatePrompt = (data: FormData): string => {
  return `
    **YÊU CẦU PHÂN TÍCH MẶT BẰNG KINH DOANH**

    **Vai trò:** Bạn là một chuyên gia hàng đầu về phân tích và lựa chọn mặt bằng bán lẻ tại Việt Nam, đặc biệt là cho các cửa hàng tiện lợi.

    **Nhiệm vụ:** Dựa vào các thông tin chi tiết được cung cấp dưới đây, hãy thực hiện một phân tích toàn diện, khách quan và đưa ra đánh giá về tiềm năng của mặt bằng này để mở cửa hàng tiện lợi.

    **Trọng số điểm (Thang điểm 100):**
    *   Vị trí, Giao thông & Khách hàng mục tiêu: 40%
    *   Giá thuê & Chi phí: 30%
    *   Cạnh tranh & Tiện ích xung quanh: 15%
    *   Hiện trạng mặt bằng: 10%
    *   Các yếu tố khác (giờ giấc, phong thủy...): 5%

    **Dữ liệu mặt bằng:**
    *   **Lĩnh vực kinh doanh:** ${data.businessType}
    *   **Thành phố/Tỉnh:** ${data.city}
    *   **Đặc điểm khu vực:** ${data.areaType}
    *   **Đối tượng khách hàng mục tiêu:** ${data.targetCustomers.join(', ')}
    *   **Diện tích mặt bằng:** ${data.areaSize} m2
    *   **Chiều rộng mặt tiền:** ${data.facadeWidth} m
    *   **Hiện trạng:** ${data.condition}
    *   **Vỉa hè rộng rãi:** ${data.sidewalk ? 'Có' : 'Không'}
    *   **Giờ mở cửa dự kiến:** ${data.openingHour}:00
    *   **Giờ đóng cửa dự kiến:** ${data.closingHour}:00
    *   **Số đối thủ cạnh tranh trực tiếp (bán kính 500m):** ${data.competitors}
    *   **Các tiện ích xung quanh:** ${data.amenities.join(', ')}
    *   **Giá thuê hàng tháng (VNĐ):** ${data.rent.toLocaleString('vi-VN')} VNĐ
    *   **Hình thức thanh toán:** ${data.paymentMethod}
    *   **Yếu tố phong thủy (tùy chọn):** ${data.fengShui || 'Không có thông tin'}
    *   **Ghi chú thêm:** ${data.notes || 'Không có'}

    **Yêu cầu đầu ra:** Vui lòng trả về kết quả dưới dạng một đối tượng JSON duy nhất, tuân thủ nghiêm ngặt theo schema đã được định nghĩa. Phân tích phải bằng tiếng Việt, súc tích, thực tế và đưa ra các lời khuyên hữu ích.
  `;
};

const responseSchema: any = {
  type: Type.OBJECT,
  properties: {
    overallScore: {
      type: Type.INTEGER,
      description: "Điểm tổng thể trên thang 100."
    },
    summary: {
      type: Type.STRING,
      description: "Một đoạn tóm tắt ngắn gọn (2-3 câu) về kết luận chính."
    },
    strengths: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Danh sách các điểm mạnh chính của mặt bằng."
    },
    weaknesses: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Danh sách các điểm yếu hoặc rủi ro chính."
    },
    recommendations: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Danh sách các đề xuất, gợi ý để cải thiện hoặc các điểm cần lưu ý khi đàm phán."
    },
    detailedAnalysis: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          category: { type: Type.STRING, description: "Tên hạng mục phân tích (ví dụ: Vị trí, Giá thuê)." },
          score: { type: Type.INTEGER, description: "Điểm cho hạng mục đó trên thang 100." },
          analysis: { type: Type.STRING, description: "Phân tích chi tiết cho hạng mục đó." }
        },
        required: ["category", "score", "analysis"]
      },
      description: "Phân tích chi tiết cho từng hạng mục."
    }
  },
  required: ["overallScore", "summary", "strengths", "weaknesses", "recommendations", "detailedAnalysis"]
};


export const evaluateLocation = async (formData: FormData): Promise<EvaluationResult> => {
  const prompt = generatePrompt(formData);
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.5,
      },
    });

    const jsonText = response.text.trim();
    // Đôi khi API có thể trả về ```json ... ```, cần loại bỏ
    const cleanedJsonText = jsonText.replace(/^```json\s*|```$/g, '');
    const result: EvaluationResult = JSON.parse(cleanedJsonText);
    
    return result;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Không thể phân tích mặt bằng. Vui lòng kiểm tra lại thông tin và thử lại.");
  }
};
