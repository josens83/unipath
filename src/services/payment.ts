import { loadTossPayments } from '@tosspayments/payment-sdk';
import type { PlanType } from '../types';

// 토스페이먼츠 클라이언트 키 (실제 서비스에서는 환경변수로 관리)
const CLIENT_KEY = 'test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq';

export interface PaymentRequest {
  amount: number;
  orderId: string;
  orderName: string;
  customerName: string;
  customerEmail: string;
  plan: PlanType;
}

export interface PaymentResult {
  success: boolean;
  paymentKey?: string;
  orderId?: string;
  amount?: number;
  error?: string;
}

class PaymentService {
  private tossPayments: any = null;

  async initialize() {
    if (!this.tossPayments) {
      this.tossPayments = await loadTossPayments(CLIENT_KEY);
    }
    return this.tossPayments;
  }

  async requestPayment(request: PaymentRequest): Promise<void> {
    const tossPayments = await this.initialize();

    // 실제 프로덕션에서는 서버에서 successUrl과 failUrl을 제공해야 합니다
    const successUrl = `${window.location.origin}/payment/success`;
    const failUrl = `${window.location.origin}/payment/fail`;

    await tossPayments.requestPayment('카드', {
      amount: request.amount,
      orderId: request.orderId,
      orderName: request.orderName,
      customerName: request.customerName,
      customerEmail: request.customerEmail,
      successUrl,
      failUrl,
    });
  }

  generateOrderId(): string {
    return `ORDER-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  getPlanAmount(plan: PlanType): number {
    const prices: Record<PlanType, number> = {
      free: 0,
      basic: 49000,
      premium: 99000,
    };

    return prices[plan];
  }

  getPlanName(plan: PlanType): string {
    const names: Record<PlanType, string> = {
      free: 'Free 플랜',
      basic: 'Basic 플랜',
      premium: 'Premium 플랜',
    };

    return names[plan];
  }

  async confirmPayment(
    paymentKey: string,
    orderId: string,
    amount: number
  ): Promise<PaymentResult> {
    try {
      // 실제 프로덕션에서는 서버에서 결제 승인을 처리해야 합니다
      // 여기서는 Mock으로 처리
      await new Promise(resolve => setTimeout(resolve, 1000));

      return {
        success: true,
        paymentKey,
        orderId,
        amount,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : '결제 승인에 실패했습니다.',
      };
    }
  }

  async cancelPayment(
    paymentKey: string,
    _cancelReason: string
  ): Promise<PaymentResult> {
    try {
      // 실제 프로덕션에서는 서버에서 결제 취소를 처리해야 합니다
      await new Promise(resolve => setTimeout(resolve, 1000));

      return {
        success: true,
        paymentKey,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : '결제 취소에 실패했습니다.',
      };
    }
  }
}

export const paymentService = new PaymentService();
